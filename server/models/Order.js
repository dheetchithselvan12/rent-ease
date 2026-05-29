import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    orderItems: [],
    shippingAddress: {},
    totalAmount: Number,
    orderStatus: {
        type: String,
    }
})