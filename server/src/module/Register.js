const mongoose = require('mongoose');


const RegisterSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required : true
    },
    email:{
        type:String,
        required:true
    },
    mobile_no : {
        type:String,
        required:true
    },
    age:{
        type:Number,
        required : true
    },
    schedule:{
        type:String,
        required:true
    }
},
{
    timestamps:true
});


const Register = mongoose.model('Register',RegisterSchema);

module.exports = Register;