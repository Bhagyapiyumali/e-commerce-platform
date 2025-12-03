import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';


import userRouter from './routes/userRouter.js';
import ProductRouter from './routes/productRouter.js';
import orderRouter from './routes/orderRouter.js';

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
            jwt.verify(token, process.env.SECRET, (err, decoded) => {

                if (err) {
                console.log("JWT Error:", err);
            } else {
                console.log("Decoded:", decoded);
                req.user = decoded;
            }
            });
        }
        
        next();
    }
)



app.use("/api/users", userRouter)
app.use("/api/products",ProductRouter)
app.use("/api/orders", orderRouter)


app.listen(
    5000,
    ()=>{
        console.log('server is running on port 5000');
    }
)