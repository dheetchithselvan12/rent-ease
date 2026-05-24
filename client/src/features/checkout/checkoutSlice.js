import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderData: null,
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setCheckoutData: (state, action) => {
      state.orderData = action.payload;
    },
    clearCheckoutData: (state) => {
      state.orderData = null;
    },
  },
});

export const { setCheckoutData, clearCheckoutData } = checkoutSlice.actions;
export default checkoutSlice.reducer;
