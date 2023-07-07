const Transaction = require('../models/Transaction')
const User = require('../models/User')
const Book = require('../models/Book')
const {StatusCodes} = require('http-status-codes')
const {UnauthenticatedError,BadRequestError,NotFoundError} = require('../errors')

// either librarian will issue book or students can themselves take a book
const takeBook = async(req,res)=>{
    const {student,book} = req.body;
    
    if(!student || !book)
        throw new BadRequestError("Provide student,book in request body")

    try{
        const userExists = await User.exists({ _id: student,isStudent:true });
        const bookExists = await Book.exists({ _id: book });
        if (!userExists || !bookExists)
            throw new Error('yolo') 
    }catch(err){
        throw new NotFoundError('No student or book with provided id not found')
    }

    const transaction = await Transaction.find({student:student,book:book,status:'issued'})
    if (transaction.length > 0)
        throw new BadRequestError('Book already issued to student')

    const {quantity} = await Book.findById(book).select("quantity")

    if(quantity > 0){
        await Transaction.create({...req.body})
        await Book.findByIdAndUpdate(book, { $inc: { quantity: -1 } });
        res.status(StatusCodes.CREATED).json({msg:"Book issued"})
    }
    else
        throw new BadRequestError('No copies of this book are available')
}

// only admin or librarian can do return book
const returnBook = async(req,res) =>{
    const {student,book} = req.body;
    console.log(req.user);
    const {userId,isAdmin} = req.user
    
    if(!isAdmin){
        const user = await User.findById(userId);
        if(!user.isLibrarian)
            throw new UnauthenticatedError('Only Admin and librarian can do return book')
    }
    
    if(!student || !book)
        throw new BadRequestError("Provide student,book in request body")

    try{
        const userExists = await User.exists({ _id: student,isStudent:true });
        const bookExists = await Book.exists({ _id: book });
        if (!userExists || !bookExists)
            throw new Error('yolo') 
    }catch(err){
        throw new NotFoundError('No student or book with provided id not found')
    }

    const transaction = await Transaction.find({student:student,book:book,status:'issued'})
    if (transaction.length == 0)
        throw new NotFoundError('Transaction does not exist')
    
    await Book.findByIdAndUpdate(book, { $inc: { quantity: 1 } });
    await Transaction.findByIdAndUpdate(transaction[0]._id, {status:'returned'});
    res.status(StatusCodes.OK).json({msg:"Book returned"})
}

const booksTakenByStudent = async(req,res) =>{
    const {id:student} = req.params;
    const status = req.query.status

    try{
        const userExists = await User.exists({ _id: student,isStudent:true });
        if (!userExists)
            throw new Error('yolo') 
    }catch(err){
        throw new NotFoundError('No student with provided id found')
    }

    let books = []
    let bookId = []
    if(status == 'issued'){
        bookId = await Transaction.find({status:'issued',student:student}).select('book status issueDate')
    }else if(status == 'returned'){
        bookId = await Transaction.find({status:'returned',student:student}).select('book status issueDate')
    }else{
        bookId = await Transaction.find({student:student}).select('book status issueDate dueDate')
    }
    books = await Promise.all(
        bookId.map(async (el) => {
          let book = await Book.findById(el.book).select("title author isbn description");
          let dueResult = "False";
          if(el.status == "issued"){
            dueResult = (el.dueDate.getTime() < Date.now)+"";
          }
          const data = {
            status: el.status,
            issueDate: el.issueDate,
            dueDate: el.dueDate,
            isDue:  dueResult
          };
          if(book)
            return {...book._doc,...data}
          return {...data}
        })
    );

    // Comparator for sorting according to date
    function compare( a, b ) {
        if ( a.issueDate.getTime() > b.issueDate.getTime() ){
          return -1;
        }
        if ( a.issueDate.getTime() < b.issueDate.getTime() ){
          return 1;
        }
        return 0;
      }

      books.sort(compare);
      
    res.status(StatusCodes.OK).json({books})
}

const studentsTakenBook = async(req,res)=>{
    const {id:book} = req.params;
    const status = req.query.status

    try{
        const bookExists = await Book.exists({ _id: book});
        if (!bookExists)
            throw new Error('yolo') 
    }catch(err){
        throw new NotFoundError('No book with provided id found')
    }

    let studentsId = []
    if(status == 'issued'){
        studentsId = await Transaction.find({status:'issued',book:book}).select('student status issueDate')
    }else if(status == 'returned'){
        studentsId = await Transaction.find({status:'returned',book:book}).select('student status issueDate')
    }else{
        studentsId = await Transaction.find({book:book}).select('student status issueDate')
    }
    const students = await Promise.all(
        studentsId.map(async (el) => {
          let student = await User.findById(el.student).select("_id username email contact");
          const data = {
            status: el.status,
            issueDate: el.issueDate,
          };
          if(student)
            return {...student._doc,...data}
          return {...data}
        })
    );
    res.status(StatusCodes.OK).json({students})
}

const getTransactions = async(req,res)=>{
    const status = req.query.status

    let transactions = []
    if(status == 'issued'){
        transactions = await Transaction.find({status:'issued'})
    }else if(status == 'returned'){
        transactions = await Transaction.find({status:'returned'})
    }else{
        transactions = await Transaction.find({})
    }
    res.status(StatusCodes.OK).json({transactions})
}

// Transactions exceeding due date
const notReturned = async(req,res)=>{
    const transactions = await Transaction.find({ status:'issued',dueDate: { $lt: new Date() } });
    res.status(StatusCodes.OK).json({transactions})
}

const getTotalIssues = async(req,res) =>{
    const issues = await Transaction.find({status:'issued'}).countDocuments()
    const pending = await Transaction.find({ status:'issued',dueDate: { $lt: new Date() } }).countDocuments();
    const issuess = await Transaction.find().countDocuments()
    res.status(StatusCodes.OK).json({"current_issues":issues,"total_issues":issuess,"pending_returns":pending})
}

const getBooksIssuedByMonth = async (req, res) => {
    const year = new Date().getFullYear();
    const transactions = await Transaction.find({
      issueDate: {
        $gte: new Date(year, 0, 1),
        $lte: new Date(year, 11, 31), 
      },
    });

    const booksIssuedByMonth = new Array(12).fill(0);
    const booksReturnedByMonth = new Array(12).fill(0);

    transactions.forEach((transaction) => {
      const month = transaction.issueDate.getMonth();
      if (transaction.status === 'issued') {
        booksIssuedByMonth[month] += 1; // Increment the count for the corresponding month
      } else if (transaction.status === 'returned') {
        booksReturnedByMonth[month] += 1; // Increment the count for the corresponding month
      }
    });
    
    res.status(StatusCodes.OK).json({ booksIssuedByMonth, booksReturnedByMonth });
};

module.exports = {takeBook,returnBook,booksTakenByStudent,studentsTakenBook,getTransactions,notReturned,getTotalIssues,getBooksIssuedByMonth}

