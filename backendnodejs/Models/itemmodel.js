const mongoose=require('mongoose');

//Schema for registration 
const itemSchema=mongoose.Schema({
    collectionid:{
        type:mongoose.Schema.ObjectId,
        ref:'collectionmodels',
        required:true
    },
     title:{
        type:String,
    },
    description:{
        type:String,
    },
    country:{
        type:String,
    },
    author:{
        type:String,

    },
    category:{
        type:String,

    },
    imageurl:{
        type:String,

    }
});

const itemModel=new mongoose.model('itemModel',itemSchema);

module.exports=itemModel;