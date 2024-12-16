const mongoose=require('mongoose');

//Schema for registration 
const registerationSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    }
});

const model=new mongoose.model('RegisterationModel',registerationSchema);

module.exports=model;