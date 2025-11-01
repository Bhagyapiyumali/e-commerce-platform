import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Student from './models/studentModel.js';
import studentRouter from './routes/studentRouter.js';
import studentPouter from './routes/studentRouter.js';




const app = express();

const mongodburl = process.env.MONGODB_URL;

mongoose.connect(mongodburl, {})
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Connection error:", err));

const connection = mongoose.connection;

connection.on("error", (err) => {
  console.error("MongoDB error:", err);
});


app.use(bodyParser.json());

app.use("/api/students", studentRouter);
app.use("/api/products", productRouter);

app.listen(
    5000,
    ()=>{
        console.log('server is running on port 5000');
    }
)