import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/generateTokenUtils.js";


export const registerUser = async (req, res) => {
    try {

        // Destructuring values from request body
        const { firstName, lastName, email, password} = req.body;

        if(!firstName || !lastName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        };

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
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: user,
        });

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


export const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        
        // Basic validation
        if(!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        };

        // Check User is available
        const user = await User.findOne({email});

        if(!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            })
        };

        // Compare password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid password",
            });
        };

        const token = await generateToken(user);
        
        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            token,
            user: {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
            }
        })

    } catch (error) {

         res.status(500).json({
            success: false,
            message: "Failed to login user",
            error: error.message,
         });
         console.log("Error: ", error.message);
    }
}