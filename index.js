import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

const app = express() ;

const mongodburl = "mongodb+srv://admin:Bhagya2001@cluster0.1zfun.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(mongodburl,{})

const connection = mongoose.connection;

connection.once("open", ()=>{
    console.log("Database connected");
})

app.use(bodyParser.json())

app.get("/", 
    (req,res)=>{

    console.log(req.body)
    console.log("This is a get request");

    res.json({
        message: "Good morning "+req.body.name
    })
});

app.post("/",

    (req,res)=>{

        const studentSchema = mongoose.Schema({
            name : String,
            age : Number,
            gender : String
        })
    }

)


app.listen(
    5000,
    ()=>{
        console.log('server is running on port 5000');
    }
)