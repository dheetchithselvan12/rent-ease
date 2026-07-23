import jwt from "jsonwebtoken";

export const generateToken = async (user) => {
    const token = await jwt.sign(
        {
            userId: user._id,
            role: user.role,
            firstName: user.firstName,
            lastName: user.lastName,
            avatar: user.avatar || "",
            email: user.email,
        },
        process.env.JWT_SCREATE,
        { expiresIn: "7d" }
    );
    
    return token;
}