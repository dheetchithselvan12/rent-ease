import express from "express";
import { updateUserProfile, updateUserAddress } from "../controllers/userController.js";

const router = express.Router();

router.put("/profile", updateUserProfile);
router.put("/address", updateUserAddress)

export default router;