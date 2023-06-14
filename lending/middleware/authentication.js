const jwt = require('jsonwebtoken')
const {UnauthenticatedError} = require('../errors')

async function authenticationMiddleware(req,res,next){
    const token = req.cookies.jwt  // cookie parser middleware method to access incoming cookies
    if(!token)
        throw new UnauthenticatedError("No Token provided");
    
    try{
        const payload = jwt.verify(token,process.env.JWT_SECRET);
        const {userId,username,isAdmin} = payload;
        req.user = {userId,username,isAdmin};
    }catch(err){
        throw new UnauthenticatedError("You are not allowed to access the API")
    }
    next();
}
module.exports = authenticationMiddleware;