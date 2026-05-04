import mongoose from "mongoose";

const tenureSchema = new mongoose.Schema({
    duration: {
        type: Number,
        required: true,
    },
    pricePerMonth: {
        type: Number,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
});


const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true},
        category: {
            type: String,
            enum: ["furniture","appliance"],
            required: true,
        },
        securityDeposit: { type: Number, required: true},
        stock: { type: Number, required: true},
        availableQuantity: { type: Number, required: true},
        tenurePlans: [tenureSchema],
        images: [String],
        description: String,
    },
    { timestamps: true}
);

export default mongoose.model("Product", productSchema);