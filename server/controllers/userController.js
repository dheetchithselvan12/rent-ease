import User from "../models/userModel.js";
import jwt from "jsonwebtoken";


const getAuthenticatedUserId = (req) => {
    const authHeader = req.headers.authorization;

    if (authHeader?.startsWith("Bearer ")) {
        const token = authHeader.split(" ")[1];
        try {
            const decodedToken = jwt.verify(token, process.env.JWT_SCREATE);
            
            return decodedToken.userId;
        } catch (error) {
            console.error("Invalid auth token:", error.message);
            return null;
        }
    }

    if (req.user?.userId) {
        return req.user.userId;
    }


    return req.body?.userId || null;
};

export const updateUserProfile = async (req, res) => {

    try {
        const userId = getAuthenticatedUserId(req);
        const user = await User.findByIdAndUpdate(userId, req.body, { returnDocument: 'after' }).select("-password");
        console.log("User profile update : ", user);
        

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "User profile updated successfully",
            user: {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                avatar: user.avatar || "",
            }
        });
        
    } catch (error) {
        console.log("usercontroller update error : ", error.message);
        
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }

}

export const updateUserAddress = async (req, res) => {

    try {

        const userId = getAuthenticatedUserId(req);

        const user = await User.findByIdAndUpdate(userId, { $set: { address: req.body } }, { returnDocument: 'after' }).select("-password");

        console.log("User address update : ", user)

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "User address updated successfully",
            address: user.address
        });

    } catch (error) {
        console.log("usercontroller address update error : ", error.message);
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}