import jwt from "jsonwebtoken";
import Order from "../models/Order.js";

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

export const createOrder = async (req, res) => {
    try {
        const apiOrderData = req.body;
        const userId = getAuthenticatedUserId(req);

        if (!apiOrderData) {
            return res.status(400).json({
                success: false,
                message: "Missing order data",
            });
        }

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Authentication required to place an order",
            });
        }

        const order = new Order({
            ...apiOrderData,
            user: userId,
        });
        await order.save();

        return res.status(201).json({
            success: true,
            data: order,
        });
    } catch (error) {
        console.error("Create order error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to create order",
            error: error.message,
        });
    }
};

export const getOrders = async (req, res) => {
    try {
        const userId = getAuthenticatedUserId(req);

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }

        const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });
        return res.status(200).json({
            success: true,
            data: orders,
        });
    } catch (error) {
        console.error("Get orders error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch orders",
            error: error.message,
        });
    }
};

export const getOrderById = async (req, res) => {
    try {
        const userId = getAuthenticatedUserId(req);
        const orderId = req.params.id;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }

        const orderDetailes = await Order.findOne({ _id: orderId, user: userId });

        if (!orderDetailes) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: orderDetailes,
        });
    } catch (error) {
        console.error("Get order by ID error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch order",
            error: error.message,
        });
    }
};

export const updateOrderStatus = async (req, res) => {
    try {
        const userId = getAuthenticatedUserId(req);
        const order = await Order.findOne({ _id: req.params.id, user: userId });

        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        order.orderStatus = req.body.orderStatus;
        await order.save();

        return res.status(200).json({
            success: true,
            data: order,
        });
    } catch (error) {
        console.error("Update status error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to update order status",
            error: error.message,
        });
    }
};

export const getRentalStatus = async (req, res) => {
    try {
        const userId = getAuthenticatedUserId(req);
        console.log("userId : ",userId);
        // const orderId = req.params.id;
        const order = await Order.find({user: userId, rentalStatus: "Delivered" });
        console.log("order status : ",order);
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: order,
        });
    } catch (error) {
        console.error("Get rental status error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch rental status",
            error: error.message,
        });
    }
};