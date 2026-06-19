import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/products/productsSlice.js";
import cartReducer from "../features/cart/cartSlice.js";
import checkoutReducer from "../features/checkout/checkoutSlice.js";
import orderReducer from "../features/order/orderSlice.js";

export const store = configureStore({
    reducer: {
        products: productReducer,
        cart: cartReducer,
        checkout: checkoutReducer,
        orders: orderReducer,
    
    },
});