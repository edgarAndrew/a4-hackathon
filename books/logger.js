const { createLogger,transports,format } = require('winston')

const errorFormat = format.combine(format.timestamp(),format.printf((info)=>{
    return `[${info.timestamp}] - {${info.level.toUpperCase()}} - message: ${info.message.msg}, statuscode: ${info.message.statusCode}`
}))
const error_logger = createLogger({
    format:errorFormat,
    transports:[
        new transports.Console(),
        new transports.File({filename:'./logs/app.log'})
    ]
});

const infoFormat = format.combine(format.timestamp(),format.printf((info)=>{
    return `[${info.timestamp}] - {${info.level.toUpperCase()}} - message: ${info.message}`
}))
const info_logger = createLogger({
    format:infoFormat,
    transports:[
        new transports.Console(),
        new transports.File({filename:'./logs/app.log'})
    ]
})

module.exports = {error_logger,info_logger}