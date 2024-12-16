const express=require('express');
const router=express.Router();
const collectionModel=require('../Models/collectionmodel.js');
const itemModel = require('../Models/itemModel.js');

const checkCollection=(req,res,next)=>{
    const body=req.body;
    if(!body)
    {
        res.json('No details found!');
        return;
    }
    req.bodystore=body;
    next();
}

//Collection DB data stores
router.post('/',checkCollection,async (req,res)=>{
    const body=req.bodystore;

    try
    {
        const collection=await collectionModel.findOne({'userid':body.userid,'collectionname':body.collectionname})

        if(collection)
          return res.status(400).json({"message":"Collection already present"});
        
        console.log(collection);
        
        const newCollection = new collectionModel({
            userid: body.userid,
            collectionname:body.collectionname,
            language:body.language
        });
        await newCollection.save();
        return res.status(400).json({"message":"Collection saved!"});

    }
    catch(exp)
    {
        return res.status(500).json({"message":`error :${exp}`});
    }
})

router.post('/additem',async (req,res)=>{
    const body=req.body;
    try
    {
        const user=await itemModel.create(body);
        await user.save();
        if(!user)
          return  res.status(400).json({"message":"Unable to create item in collection"})
        return res.status(200).json({"message":"item has been created"})
    }
    catch(exp)
    {
        res.json('Collection already present!');
    }
})

router.post('/finditems',async (req,res)=>{
    const {collectionid}=req.body;

    // console.log("collectionid",collectionid)
    try
    {
        const items=await itemModel.find({collectionid:collectionid});

        // console.log("items",items)
        if(!items)
          return  res.status(400).json({"message":"Unable to fetch Items"})

        return res.status(200).json({"message":"item has been found","data":items})
    }
    catch(exp)
    {
        res.status(500).json({"message":"Unable to fetch items"});
    }
})

//Collection find
router.post('/find',async (req,res)=>{
    const {userid}=req.body;

    // console.log(userid);
    try
    {
        const collections=await collectionModel.find({userid:userid});
        const collectionnames=[];
        collections.forEach(element => {
           collectionnames.push(element.collectionname);
          });
          res.json({"message":"Found collection",data:collections,collectionnames:collectionnames});
    }
    catch(exp)
    {
        res.json('Unable to find data!');
    }
});

router.delete('/deleteitem',async (req,res)=>{
    const {itemid}=req.body;

    try
    {
        const item=await itemModel.findOne({_id:itemid});

     
        if(!item)
          return  res.status(400).json({"message":"Unable to find item in collection"})

        const deleted=await itemModel.deleteOne({_id:itemid});

        if(deleted)
           return res.status(200).json({"message":"item has been deleted"})
    }
    catch(exp)
    {
        res.json('Collection already present!');
    }
});
module.exports=router;