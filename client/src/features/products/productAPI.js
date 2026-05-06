import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api",
});

export const fetchProductAPI = async (params = {}) => {
    const response = await API.get("/products", {params});
    
    return response.data;
};