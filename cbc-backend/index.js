import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';


import userRouter from './routes/userRouter.js';
import ProductRouter from './routes/productRouter.js';
import orderRouter from './routes/orderRouter.js';
import cors from 'cors';

import jwt from 'jsonwebtoken';


import dotenv from 'dotenv';

dotenv.config();

const app = express() ;

const mongodburl = process.env.MONGO_URI || process.env.MONGODB_URL || process.env.MONGO_URL || "mongodb+srv://bhagyapiyumali2001:bhagyasenevirathna2001@cluster0.1zfun.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

app.use(cors());

mongoose.connect(mongodburl, {
    serverSelectionTimeoutMS: 15000
}).catch((err) => {
    console.error("Database connection error:", err.message);
});

const connection = mongoose.connection;

connection.once("open", () => {
    console.log("Database connected");
});

connection.on("error", (err) => {
    console.error("Database runtime error:", err.message);
});

app.use(bodyParser.json())

app.use((req, res, next) => {
    const authHeader = req.header("Authorization");
    const token = authHeader?.startsWith("Bearer ")
        ? authHeader.slice(7)
        : authHeader;

    if (token && process.env.SECRET) {
        try {
            const decoded = jwt.verify(token, process.env.SECRET);
            req.user = decoded;
        } catch (err) {
            req.user = null;
        }
    } else {
        req.user = null;
    }
    next();
});



app.use("/api/users", userRouter)
app.use("/api/products",ProductRouter)
app.use("/api/orders", orderRouter)


app.listen(
    5000,
    ()=>{
        console.log('server is running on port 5000');
    }
)
