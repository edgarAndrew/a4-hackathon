const mongoose = require("mongoose")

const BookSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,'please provide title'],
        minlength:3,
        maxlength:30
    },
    isbn:{
        type:String,
        required:[true,'please provide isbn'],
        unique:true,
    },
    author:{
        type:String,
        required:[true,'please provide author'],
    },
    description:{
        type:String
    },
    quantity:{
        type:Number,
        default:5
    }
},{timestamps:true})

// Schema instance methods
BookSchema.methods.getId = function(){
    return this._id;
}
module.exports = mongoose.model('Book',BookSchema);
