import express from "express";
import { loginUser, registerUser, googleCallback } from "../controllers/authController.js";
import passport from "passport";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/google", passport.authenticate("google", {scope: ["profile", "email"]}));
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: `${process.env.CLIENT_URI}/login?error=google_failed` }),
  googleCallback,
);

export default router;