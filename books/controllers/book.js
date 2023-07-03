const Book = require('../models/Book')
const {StatusCodes} = require('http-status-codes')
const {UnauthenticatedError,BadRequestError} = require('../errors')

const addBook = async(req,res)=>{
    const {isbn,title,author,description,quantity} = req.body;

    if(!isbn || !title || !author || !description || !quantity)
        throw new BadRequestError("Provide isbn,title,author,description,quantity")
    
    await Book.create({...req.body})
    res.status(StatusCodes.CREATED).json({msg:"Book Added"})
}
const updateBook = async(req,res)=>{
    const {id} = req.params
    await Book.findByIdAndUpdate(id,{...req.body})
    res.status(StatusCodes.OK).json({msg:"Book Updated"})
}
const removeBook = async(req,res)=>{
    const {id} = req.params
    await Book.findByIdAndDelete(id)
    res.status(StatusCodes.OK).json({msg:"Book Removed"})
}
const getBook = async(req,res)=>{
    const {id} = req.params
    const book = await Book.findById(id)
    res.status(StatusCodes.OK).json({book})
}
const getAllBooks = async(req,res)=>{
    const books = await Book.find({})
    res.status(StatusCodes.OK).json({books})
}
const searchBook = async(req,res)=>{
    const title = req.query.title
    const author = req.query.author

    let book = []

    if(title)
        book = await Book.find( { 'title' : { '$regex' : title, '$options' : 'i' } } )
    if(author)
        book = await Book.find( { 'author' : { '$regex' : author, '$options' : 'i' } } )
    
    res.status(StatusCodes.OK).json({book})
}

const getNoOfBooks = async (req,res) => {
    const rowCount = await Book.countDocuments();
    res.status(StatusCodes.OK).json({"no_of_books":rowCount})
}


module.exports = {addBook,updateBook,removeBook,getBook,getAllBooks,searchBook,getNoOfBooks}
