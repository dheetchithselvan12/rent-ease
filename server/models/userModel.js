import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
        },
        lastName: {
            type: String,
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            trim: true,
        },
        googleId: {
            type: String,
            unique: true,
            sparse: true,
            default: null,
        },
        avatar: {
            type: String,
            default: "",
        },
        authProvider: {
            type: String,
            enum: ["local", "google"],
            default: "local",
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
        address: {
            name: { type: String, trim: true },
            phone: { type: String, trim: true },
            address: { type: String, trim:true },
            city: { type: String, trim: true },
            state: { type: String, trim: true },
            pincode: { type: String, trim: true },
        },
    },
    { timestamps: true}
);

export default mongoose.model("User", userSchema);