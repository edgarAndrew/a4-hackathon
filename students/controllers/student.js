const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const {UnauthenticatedError,BadRequestError} = require('../errors')

// to register a student
const addStudent = async(req,res)=>{
    const {email,password,username,contact,image} = req.body;
    const {isAdmin} = req.user

    if(!isAdmin)
        throw new UnauthenticatedError("Only Admin can add a student")

    if(!email || !password || !username || !contact)
        throw new BadRequestError("Provide username,email,password,contact")
    
    // NOTE: image should be base64
    const base64Pattern = /^data:image\/[a-zA-Z]*;base64,/;
    if(image){
        if(!base64Pattern.test(image))
            throw new BadRequestError("Image should be base64")
        req.body.profilePicture = image;
    }
    
    req.body.isStudent = true;
    const user = await User.create({...req.body})
    res.status(StatusCodes.CREATED).json({msg:"Student Added"})
}

const updateStudent = async(req,res)=>{
    const {id} = req.params
    await User.findByIdAndUpdate(id,{...req.body})
    res.status(StatusCodes.OK).json({msg:"Student Updated"})
}
const removeStudent = async(req,res)=>{
    const {id} = req.params
    await User.findByIdAndDelete(id)
    res.status(StatusCodes.OK).json({msg:"Student Removed"})
}
const getStudent = async(req,res)=>{
    const {id} = req.params
    const student = await User.findById(id).select("_id username email contact profilePicture")
    res.status(StatusCodes.OK).json({student})
}
const getAllStudents = async(req,res)=>{
    const students = await User.find({isStudent:true}).select("_id username email contact profilePicture")
    res.status(StatusCodes.OK).json({students})
}

// NOTE: preferably use only one query params
const searchStudent = async(req,res)=>{
    const username = req.query.username
    const email = req.query.email
    const contact = req.query.contact

    let student = []

    if(username)
        student = await User.find( { 'username' : { '$regex' : username, '$options' : 'i' } } ).select("_id username email contact profilePicture")
    if(email)
        student = await User.find( { 'email' : { '$regex' : email, '$options' : 'i' } } ).select("_id username email contact profilePicture")
    if(contact)
        student = await User.find( { 'contact' : { '$regex' : contact, '$options' : 'i' } } ).select("_id username email contact profilePicture")
    
    res.status(StatusCodes.OK).json({student})
}
const getNoOfStudents = async (req,res) => {
    const rowCount = await User.countDocuments();
    res.status(StatusCodes.OK).json({"no_of_students":rowCount})
}

module.exports = {addStudent,updateStudent,removeStudent,getStudent,getAllStudents,searchStudent,getNoOfStudents}