import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

export function createUser(req, res) {
    const newUserData = req.body;

    if(newUserData.type == "admin") {

        if(req.user == null) {
            res.json({
                message: "Please login as admin to create another admin user"
            });
            return;
        }

        if(req.user.type !== "admin") {
            res.json({
                message: "Only admin users can create another admin user"
            });
            return;
        }
    }

    // Hash the password before saving
    newUserData.password = bcrypt.hashSync(newUserData.password, 10);

    const user = new User(newUserData);

    user.save()
        .then(() => {
            res.json({
                message: "User created successfully"
            });
        })
        .catch((err) => {
            console.error("Error creating user:", err); // Log error for debugging
            res.status(500).json({
                message: "Error creating user"
            });
        });
}

export function loginUser(req, res) {
    const { email, password } = req.body;

    User.findOne({ email: email })
        .then((user) => {
            if (!user) {
                return res.json({
                    message: "User not found"
                });
            }

            // Compare plain text password with stored hash
            const isPasswordCorrect = bcrypt.compareSync(password, user.password);

            if (!isPasswordCorrect) {
                return res.json({
                    message: "Invalid password"
                });
            }

            // Generate JWT token
            const token = jwt.sign(
                {
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    isBlocked: user.isBlocked,
                    type: user.type,
                    profilePicture: user.profilePicture
                },
                process.env.SECRET, // Use environment variable in production
                { expiresIn: "7d" } // Optional: token expires in 7 days
            );

            // Send token and success message
            res.json({
                message: "Login successful",
                token: token,
                user: {
                    
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    type: user.type,
                    profilePicture: user.profilePicture
                }
            });

            // Optional: log token (remove in production)
            console.log("Generated Token:", token);
        })
        .catch((err) => {
            console.error("Login error:", err);
            res.status(500).json({
                message: "Server error"
            });
        });
}

export function getCurrentUser(req, res) {
  res.json(req.user);
}


export function isAdmin(req) {
    if (req.user == null) return false;
    return req.user.type === "admin";
}

export function isCustomer(req) {
    if (!req.user) return false;
    return req.user.type === "customer";
}

export async function googleLogin(req,res){
  console.log(req.body)
  const token = req.body.token
  //'https://www.googleapis.com/oauth2/v3/userinfo'
  try{
    const response = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo',{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    const email = response.data.email
    //check if user exists
    const usersList = await User.find({email: email})
    if(usersList.length >0){
      const user = usersList[0]
      const token = jwt.sign({
        email : user.email,
        firstName : user.firstName,
        lastName : user.lastName,
        isBlocked : user.isBlocked,
        type : user.type,
        profilePicture : user.profilePicture
      } , process.env.SECRET)
      
      res.json({
        message: "User logged in",
        token: token,
        user : {
          firstName : user.firstName,
          lastName : user.lastName,
          type : user.type,
          profilePicture : user.profilePicture,
          email : user.email
        }
      })
    }else{
      //create new user
      const newUserData = {
        email: email,
        firstName: response.data.given_name,
        lastName: response.data.family_name,
        type: "customer",
        password: "ffffff",
        profilePicture: response.data.picture
      }
      const user = new User(newUserData)
      user.save().then(()=>{
        res.json({
          message: "User created"
        })
      }).catch((error)=>{
        res.json({      
          message: "User not created"
        })
      })

    }

  }catch(e){
    res.json({
      message: "Google login failed"
    })
  }


}

//"email": "example01@gmail.com", "password": "hashedpassword123"-admin
//"email": "example0110@gmail.com","password": "hashedpassword123"-customer