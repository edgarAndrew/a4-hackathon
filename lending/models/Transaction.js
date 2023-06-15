const mongoose = require("mongoose")

const TransactionSchema = new mongoose.Schema({
    student:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true,'please provide student id'],
    },
    book:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true,'please provide book id'],
    },
    issueDate: {
        type: Date,
        default: Date.now
    },
    dueDate: {
        type: Date
    },
    status:{
        type: String,
        enum: ['issued', 'returned'],
        default: 'issued',
    }
},{timestamps:true})

TransactionSchema.pre('save',async function(next){
    const twoWeeks = 14 * 24 * 60 * 60 * 1000;
    this.dueDate = new Date(this.issueDate.getTime() + twoWeeks)
    next();
})

module.exports = mongoose.model('Transaction',TransactionSchema);
