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

            const existingItem = state.cartItem.find((item) => item.id === newItem.id && item.tenure === newItem.tenure);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.cartItem.push({...newItem, quantity: 1});
            }
        },

        removeFromCart: (state, action) => {
            state.cartItem = state.cartItem.filter((item) => item.id !== action.payload);
        },
        
        clearCart: (state) => {
            state.cartItem = [];
        },
    },
});
export const {addToCart, removeFromCart, clearCart} = cartSlice.actions;
export default cartSlice.reducer;