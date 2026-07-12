import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    orderItems: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },

        title: String,
        image: String,
        tenure: Number,
        quantity: Number,
        price: Number,
      },
    ],

    deliveryDetails: {
      name: String,
      phone: String,
      address: String,
      city: String,
      state: String,
      pincode: String,
    },

    deliverySchedule: {
      deliveryDate: Date,
      preferredTime: String,
    },

    paymentMethod: {
      type: String,
      default: "Cash On Delivery",
    },

    itemPrice: {
      type: Number,
      required: true,
    },

    securityDeposit: {
      type: Number,
      required: true,
    },

    totalPrice: {
      type: Number,
      required: true,
    },

    orderStatus: {
      type: String,
      enum: [
        "Order Confirmed",
        "Shipped",
        "Out For Delivery",
        "Delivered",
        "Cancelled",
      ],
      default: "Order Confirmed",
    },
    rentalStatus: {
      type: String,
      enum: [
        "Pending",
        "Active",
        "Expired",
        "Returned",
      ],
      default: "Pending",
    },

    rentalPeriod: {
      startDate: Date,
      endDate: Date,
      durationInMonths: Number,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Order", orderSchema);