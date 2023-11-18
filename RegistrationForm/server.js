const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path =  require ('path');

const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'));

mongoose.connect('mongodb://127.0.0.1:27017/diggi', { useNewUrlParser: true });


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    number:{
        type:Number,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
})

const user = new mongoose.model("user",userSchema)

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname, '/index.html'));
})

app.post("/",async (req,res)=>{
    
    const newUser = new user({
        name: req.body.name,
        email:req.body.email,
        number:req.body.number,
        address:req.body.address
    })
    await newUser.save();
    return res.redirect("/")
    
   
})


app.listen(8000,()=>{
    console.log("Server Running");
})