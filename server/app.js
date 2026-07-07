import express from "express";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import session from "express-session";
import passport from "passport";
import User from "./models/userModel.js";
import "./config/passport.js";


const app = express();

app.use(cors());
app.use(express.json());

app.use(session({
    secret: process.env.JWT_SCREATE,
    resave: false,
    saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async(id, done) => {
    const user = await User.findById(id);
    done(null, user);
})


app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes)



export default app;