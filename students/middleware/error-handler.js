const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
const {error_logger} = require('../logger')

const errorHandlerMiddleware = (err, req, res, next) => {
  //console.log(err.message)
  let customError = {
    statusCode:err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg:err.message||"Something went wrong try again later"
  }

  error_logger.error(customError)

  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message })
  }
  // mongoose errors
  if(err.name === 'ValidatorError'){
    customError.msg = Object.values(err.errors).map(item=>item.message).join(',')
    customError.statusCode = 400;
  }
  if(err.name === 'CastError'){
    customError.msg = `No item found with id : ${err.value}`
    customError.statusCode = 400;
  }

  error_logger.error(customError)

  if(err.code === 11000) // mongo error
    return res.status(400).json({"name":err.name,"message":"user already exists"})

  error_logger.error(customError)

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(customError.msg)
}

module.exports = errorHandlerMiddleware
