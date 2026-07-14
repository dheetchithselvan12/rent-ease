import express from "express";
import { updateUserProfile } from "../controllers/userController.js";

const router = express.Router();

router.put("/profile", updateUserProfile);

export default router;