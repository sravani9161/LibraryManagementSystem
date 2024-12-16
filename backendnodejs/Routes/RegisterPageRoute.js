const model=require('../Models/registrationmodel.js');
const express=require('express');
const router=express.Router();
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');

router.post('/login',async(req,res)=>{
    const body=req.body;
    
    console.log(body)
    try
    {
        const user=await model.findOne({email:body.email});

       
        if(user)
        {
            const match=await bcrypt.compare(body.password,user.password);
            if(match)
            {
                const token=jwt.sign({'ID':user._id},process.env.JWT_SECRET);
                console.log("token",token)
                res.json({login:true,message:'Successfully Login!','name':user.name,token:token,'userid':user._id});
            }
            else
               res.json({login:false,message:'Password Incorrect'});
            return;
        }
        else
           res.json({login:false,message:'User not found!'});
    }
    catch(exp)
    {
        res.json({login:false,message:'Error occuring in login!'});
    }
   
});

router.post('/register',async(req,res)=>{
    const body=req.body;


    if(!body)
        return res.status(400).json({"message":"fields can't be empty"});

    const user=await model.findOne({email:body.email});

    console.log(user)
    if(user)
    {
        res.json({"message":'Email already exist! Kindly Login!'});
        return;
    }
        try
        {
            console.log(body)
            const hashedPassword=await bcrypt.hash(body.password,10);
            body.password=hashedPassword;
            const user=new model(body);
            await user.save();
            res.json({"message":'Registered Successfully!Kindly Login!'});
        }
        catch(exp)
        {
            res.json({"message":'Error in Saving details!',exp});
        }
});

module.exports=router;