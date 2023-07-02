const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const {UnauthenticatedError,BadRequestError} = require('../errors')

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
    
    //res.status(StatusCodes.OK).json({user:{name:user.getName(),id:user.getId()}})
    res.status(StatusCodes.OK).json({user:{username:user.getName(),_id:user.getId(),isAdmin:user.isAdmin,isLibrarian:user.isLibrarian,isStudent:user.isStudent}})
}

// verify token route will go through the authentication middleware, so if no cookie present then error thrown
const verifyToken = async(req,res)=>{
    const {userId} = req.user
    const user = await User.findById(userId).select("isAdmin isLibrarian isStudent")
    res.status(StatusCodes.OK).json({status:"Token verified",user})
}
const logout = async(req,res)=>{
    // logout request has to go through authentication middleware
    // so if token cookie is not provided , error will be thrown
    const {userId,username} = req.user;
    res.clearCookie("jwt")
    res.status(StatusCodes.OK).json({user:{id:userId,name:username},status:"Logout Successfull"})
}

module.exports = {login,logout,verifyToken}
