import axios from "axios";
import { API_BASE_URL } from "../../config/api";

const API = axios.create({
    baseURL: API_BASE_URL,
});

export const fetchProductAPI = async (params = {}) => {
    const response = await API.get("/products", { params });

    return response.data;
};

export const deleteProductAPI = async (productId) => {
    const response = await API.delete(`/products/${productId}`);

    return response.data;
};

export const updateProductAPI = async (productId, data) => {
    const response = await API.put(`/products/${productId}`, data);

    console.log("product update : ", response);
    
    
    return response.data;
};

export const createProductAPI = async (data) => {
    const response = await API.post("/products", data);
    
    console.log("product create : ", response);
    return response.data;
};
