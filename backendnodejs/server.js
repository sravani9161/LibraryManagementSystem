const express=require('express');
const app=express();
const dotenv=require('dotenv');
const frontroute=require('./Routes/FrontPageRoute.js');
const registerPageRoute=require('./Routes/RegisterPageRoute.js');
const mongoose=require('mongoose');
const cors=require('cors');
const  collectionPageRoute=require('./Routes/CollectionRoute.js');

app.use(cors());

app.use(express.urlencoded({extended:true}));
app.use(express.json());
// Load environment variables from config.env into the default environment object
dotenv.config({
path: 'config.env',
debug: true,
});

//set to route /
app.use('/',frontroute);

//set to route /user
app.use('/user',registerPageRoute);

//set to route /collection
app.use('/collection',collectionPageRoute);


//set database connectivity 
mongoose.connect(process.env.MONGO_URI,{dbName:'LibraryManagement'})
.then(e=>console.log('database connected successfully!'))
.catch(e=>console.log(e.message));



//to enable the server on specific port
app.listen(process.env.PORT || 2000,'0.0.0.0',()=>{
    console.log('connection established!');
});
