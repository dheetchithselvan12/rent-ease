import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    cartItem : [],
};

const cartSlice = createSlice({
    name : 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const newItem  = action.payload;

            const existingItem = state.cartItem.find((item) => item.productId === newItem.productId);
            if (!existingItem) {
                state.cartItem.push({...newItem, quantity: 1});
            }
        },

        removeFromCart: (state, action) => {
            state.cartItem = state.cartItem.filter((item) => item.productId !== action.payload);
        },
        
        incrementQuantity: (state, action) => {
            const item = state.cartItem.find((item) => item.productId === action.payload);
            if (item) {
                item.quantity += 1;
            }
        },

        decrementQuantity: (state, action) => {
            const item = state.cartItem.find((item) => item.productId === action.payload);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            }
        },

        clearCart: (state) => {
            state.cartItem = [];
        },
    },
});
export const {addToCart, removeFromCart, incrementQuantity, decrementQuantity, clearCart} = cartSlice.actions;
export default cartSlice.reducer;