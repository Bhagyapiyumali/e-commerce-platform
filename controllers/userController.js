import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export function createUser(req, res) {
    const newUserData = req.body;

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
                "bhagya123", // Use environment variable in production
                { expiresIn: "1h" } // Optional: token expires in 1 hour
            );

            // Send token and success message
            res.json({
                message: "Login successful",
                token: token
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