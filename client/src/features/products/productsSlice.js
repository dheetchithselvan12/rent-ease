import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createProductAPI, deleteProductAPI, fetchProductAPI, updateProductAPI } from "./productAPI.js";

export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async (params, { rejectWithValue }) => {
        try {
            const data = await fetchProductAPI(params);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const createProduct = createAsyncThunk(
    "products/createProduct",
    async (data, { rejectWithValue }) => {
        try {
            const response = await createProductAPI(data);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const deleteProduct = createAsyncThunk(
    "products/deleteProduct",
    async (productId, { rejectWithValue }) => {
        try {
            const data = await deleteProductAPI(productId);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const updateProduct = createAsyncThunk(
    "products/updateProduct",
    async ({ productId, data }, { rejectWithValue }) => {
        try {
            const response = await updateProductAPI(productId, data);
            console.log("updateProductAPI : ", response);
            
            return response;
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
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                if (action.meta.arg?.append) {
                    state.items = [...state.items, ...action.payload.data];
                } else {
                    state.items = action.payload.data;
                }
                state.meta = action.payload.meta;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.items = [action.payload.data, ...state.items];
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.items = state.items.filter((item) => item._id !== action.payload.data._id);
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.items = state.items.map((item) => (
                    item._id === action.payload.data._id ? action.payload.data : item
                ));
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default productSlice.reducer