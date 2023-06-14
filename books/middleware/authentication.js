const jwt = require('jsonwebtoken')
const User = require('../models/User')
const {UnauthenticatedError} = require('../errors')

async function authenticationMiddleware(req,res,next){
    const token = req.cookies.jwt  // cookie parser middleware method to access incoming cookies
    if(!token)
        throw new UnauthenticatedError("No Token provided");
    
    try{
        const payload = jwt.verify(token,process.env.JWT_SECRET);
        const {userId,username,isAdmin} = payload;
        req.user = {userId,username,isAdmin};
        
        if(!isAdmin){
            const user = await User.findById(userId);
            if(!user.isLibrarian)
                throw new Error('yolo')
        }
    }catch(err){
        throw new UnauthenticatedError("You must be Admin or Librarian to access this API")
    }
    next();
}
module.exports = authenticationMiddleware;