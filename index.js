import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import studentRouter from './routes/studentRouter.js';
import productRouter from './routes/productRouter.js';
import userRouter from './routes/userRouter.js';
import jwt from 'jsonwebtoken';


import dotenv from 'dotenv';
dotenv.config();

const app = express() ;

const mongodburl = "mongodb+srv://bhagyapiyumali2001:bhagyasenevirathna2001@cluster0.1zfun.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(mongodburl,{})

const connection = mongoose.connection;

connection.once("open", ()=>{
    console.log("Database connected");
})

app.use(bodyParser.json())

app.use(
    (req, res, next) => {
        const token = req.header("Authorization")?.replace("Bearer ", "")
        console.log(token)

        if (token != null) {
            jwt.verify(token, "bhagya123", (err, decoded) => {

                if(!error) {
                    console.log(decoded)
                    req.user = decoded
                    
                }
            })
        }
        
        next();
    }
)

app.use("/api/students", studentRouter)
app.use("/api/products", productRouter)
app.use("/api/users", userRouter)


app.listen(
    5000,
    ()=>{
        console.log('server is running on port 5000');
    }
)