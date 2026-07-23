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
    name: { type: String, required: true },
    category: {
      type: String,
      enum: ["furniture", "appliance"],
      required: true,
    },
    securityDeposit: { type: Number, required: true },
    stock: { type: Number, required: true },
    availableQuantity: { type: Number, required: true },
    tenurePlans: [tenureSchema],
    images: [
      {
        public_id: String,
        url: String,
      },
    ],
    title: String,
    description: String,
  },
  { timestamps: true },
);

productSchema.index({ createdAt: -1 });
productSchema.index({ category: 1, createdAt: -1 });

export default mongoose.model("Product", productSchema);
