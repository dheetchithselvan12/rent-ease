import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import { fetchProductAPI } from "./productAPI.js";

// Async thunk (API handler)
export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async (params, {rejectWithValue}) => {
        try{
            const data = await fetchProductAPI(params);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const productSlice = createSlice({
    name: "products",
    initialState: {
        items: [],
        meta: {},
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // loading
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            // success
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.data;
                state.meta = action.payload.meta
            })
            // error
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default productSlice.reducer