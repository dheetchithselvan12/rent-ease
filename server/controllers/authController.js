import User from "../models/userModel.js";
import bcrypt from "bcryptjs";


export const registerUser = async (req, res) => {
    try {

        // Destructuring values from request body
        const { firstName, lastName, email, password} = req.body;

        // check if user is already exist in db
        const userExists = await User.findOne({email});
        if (userExists) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        };

        const hashedPassword = await bcrypt.hash(password, 10);   // password hashing

        // User Creating
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });

        // Send Response to client
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: user,
        })

        console.log(message);
        

    } catch (error) {
        
        // Send error response to client
        res.status(500).json({
            success: false,
            message: "Failed to register user",
            error: error.message,
        });
        
        console.error("Register user error:", error);
    }
};