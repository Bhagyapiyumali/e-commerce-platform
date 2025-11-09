import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export function createUser(req,res){

 const newUserData = req.body

 newUserData.password = bcrypt.hashSync(newUserData.password, 10)

 
    
    const user = new User(newUserData)

    user.save().then(()=>{
        res.json({
            message : "User created successfully"
        })
    }).catch(
        ()=>{
            res.json({
                message : "Error creating user"
            })
        }
    )
}

export function loginUser(req,res){

    User.find({email : req.body.email}).then(
        (users)=>{
            if(users.length == 0){

                res.json({
                    message : "User not found"
                })
            }else{

                const user = users[0]

                const isPasswordValid = bcrypt.compareSync(req.body.password, user.password)

                if(isPasswordValid){
                    res.json({
                        message : "Login successful"
                    })
                }else{
                    res.json({
                        message : "Invalid password"
                    })
                }

            } 
        }
    )
}
