import express from 'express';
import Student from '../models/studentModel.js';

const studentRouter = express.Router();



studentRouter.get('/', (req, res) => {

    Student.find().then(
        (studentList)=>{[
            res.json({
                students: studentList
            })
        ]}
    )
})
        

studentRouter.post('/', (req, res) => {

    const student = new Student(req.body)
    student.save().then(()=>{
        res.json(
            {message: "Student created successfully"}  
        )
    }).catch(()=>{
        res.json(
            {message: "Error creating student"}  
        )
    })

    console.log("This is a POST request for student router")
    res.json({
        message: "This is a POST request for student router"
    })
})


export default studentRouter;