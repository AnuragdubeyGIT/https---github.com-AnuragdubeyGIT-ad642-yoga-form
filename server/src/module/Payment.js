const mongoose = require('mongoose');


const PaymentSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    registerId:{
        type:String,
        required:true
    },
    paymentAmount:{
        type:Number,
        required:true
    },
    paymentStatus:{
        type:String,
        required:true,
        default:'Success'
    }
},{
    timestamps:true
});


module.exports = mongoose.model('Payment',PaymentSchema);