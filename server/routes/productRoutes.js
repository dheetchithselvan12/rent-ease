import express from "express";
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from "../controllers/productController.js";
import multerUploads from "../middlewares/multer.js";


const router = express.Router();

router.post("/", multerUploads, createProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.put("/:id", multerUploads, updateProduct);
router.delete("/:id", deleteProduct);

export default router;