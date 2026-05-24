import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/products/productsSlice.js";
import cartReducer from "../features/cart/cartSlice.js";
import checkoutReducer from "../features/checkout/checkoutSlice.js";

export const store = configureStore({
    reducer: {
        products: productReducer,
        cart: cartReducer,
        checkout: checkoutReducer,
    
    },
});