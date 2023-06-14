const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const {UnauthenticatedError,BadRequestError} = require('../errors')
const fs = require('fs');

// to register a student
const register = async(req,res)=>{
    const {email,password,username,contact,image} = req.body;
    const {isAdmin} = req.user

    if(!isAdmin)
        throw new UnauthenticatedError("Only Admin can register a student")

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
    const token = user.createJWT();
    
     // For local setup
     res.cookie('jwt',token,{httpOnly:true,expires:new Date(Date.now()+1.728e+8)})
    
     // While in production
     //res.cookie("jwt", token, { httpOnly: true,expires:new Date(Date.now()+1.728e+8), sameSite: "None", secure: true })
    
    res.status(StatusCodes.CREATED).json({user:{name:user.getName(),id:user.getId()}})
}

// login for admin or librarian
const login = async(req,res)=>{
    const {email,password} = req.body;
    if(!email || !password)
        throw new BadRequestError('Please provide email & password')
    const user = await User.findOne({email})
    if(!user)
        throw new UnauthenticatedError('Invalid Credentials')
    const passCorrect = await user.comparePassword(password);
    if(!passCorrect)
        throw new UnauthenticatedError('Invalid Credentials')
    const token = user.createJWT();
    
    // For local setup
    res.cookie('jwt',token,{httpOnly:true})
    
    // While in production
    //res.cookie("jwt", token, { httpOnly: true, sameSite: "None", secure: true })
    
    res.status(StatusCodes.OK).json({user:{name:user.getName(),id:user.getId()}})
}

// verify token route will go through the authentication middleware, so if no cookie present then error thrown
const verifyToken = async(req,res)=>{
    res.status(StatusCodes.OK).json({status:"Token verified"})
}
const logout = async(req,res)=>{
    // logout request has to go through authentication middleware
    // so if token cookie is not provided , error will be thrown
    const {userId,username} = req.user;
    res.clearCookie("jwt")
    res.status(StatusCodes.OK).json({user:{id:userId,name:username},status:"Logout Successfull"})
}

module.exports = {register,login,logout,verifyToken}
