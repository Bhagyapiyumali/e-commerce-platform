import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import studentRouter from './routes/studentRouter.js';
import productRouter from './routes/productRouter.js';



const app = express() ;

const mongodburl = "mongodb+srv://bhagyapiyumali2001:bhagyasenevirathna2001@cluster0.1zfun.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(mongodburl,{})

const connection = mongoose.connection;

connection.once("open", ()=>{
    console.log("Database connected");
})

app.use(bodyParser.json())

app.use("/api/students", studentRouter)
app.use("/api/products", productRouter)

app.get("/",
    ()=>{
        console.log("server is running properly");
    }   
)
app.listen(
    5000,
    ()=>{
        console.log('server is running on port 5000');
    }
)