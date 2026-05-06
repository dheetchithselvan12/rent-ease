import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/products/productsSlice.js"

export const store = configureStore({
    reducer: {
        products: productReducer,
    },
});