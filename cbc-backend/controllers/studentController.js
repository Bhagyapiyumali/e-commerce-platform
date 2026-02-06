import Student from '../models/studentModel.js';

export function getStudents(req, res) {

    Student.find().then(
        (studentList)=>{[
            res.json({
                list: studentList
            })
        ]}
    )
}



export function createStudent(req, res) {
    const newStudent = new Student(req.body)
    student.save().then(() => {
        res.json({
            message: 'Student created successfully'
        })
    }).catch(() => {
        res.json({
            message: 'Error creating student'
        })
    })
}

export function deleteStudent(req, res) {
    Student.deleteOne({ name: req.body.name }).then(() => {
        res.json({
            message: 'Student deleted successfully'
        })
    })
}