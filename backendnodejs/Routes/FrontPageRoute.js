const express=require('express');
const frontroute=express.Router();

frontroute.get('/',(req,res)=>{
  
    // Send the JavaScript code as the response
    res.send(res.sendDate);
});

module.exports=frontroute;