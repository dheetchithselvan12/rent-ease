import express from "express";
import { createOrder, getOrders, getOrderById, updateOrderStatus, getRentalStatus } from "../controllers/orderController.js";

const router = express.Router();

router.post("/", createOrder);
router.get("/", getOrders);
router.get("/active",getRentalStatus);
router.get("/:id", getOrderById);
router.put("/:id/status", updateOrderStatus);

export default router;