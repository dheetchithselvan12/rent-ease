import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchOrderAPI, fetchActiveAPI } from "./orderAPI.js";

const initialState = {
    orderData: null,
    loading: false,
    error: null,
    activeSubscriptions: [],
    activeSubscriptionsLoading: false,
    activeSubscriptionsError: null,
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

export const fetchActiveSubscriptions = createAsyncThunk(
    "orders/fetchActiveSubscriptions",
    async (_, { rejectWithValue }) => {
        try {
            const data = await fetchActiveAPI();
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
            })
            .addCase(fetchActiveSubscriptions.pending, (state) => {
                state.activeSubscriptionsLoading = true;
                state.activeSubscriptionsError = null;
            })
            .addCase(fetchActiveSubscriptions.fulfilled, (state, action) => {
                state.activeSubscriptionsLoading = false;
                state.activeSubscriptions = action.payload.data;
            })
            .addCase(fetchActiveSubscriptions.rejected, (state, action) => {
                state.activeSubscriptionsLoading = false;
                state.activeSubscriptionsError = action.payload || action.error.message;
            });
    },
});

export default orderSlice.reducer;