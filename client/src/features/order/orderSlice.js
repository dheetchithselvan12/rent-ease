import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchOrderAPI } from "./orderAPI.js";

const initialState = {
    orderData: null,
    loading: false,
    error: null,
};

export const fetchOrders = createAsyncThunk(
    "orders/fetchOrders",
    async (_, { rejectWithValue }) => {
        try {
            const data = await fetchOrderAPI();
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orderData = action.payload.data;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            });
    },
});

export default orderSlice.reducer;