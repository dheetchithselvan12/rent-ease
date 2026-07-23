import axios from "axios";
import { API_BASE_URL } from "../../config/api";

const API = axios.create({ baseURL: API_BASE_URL });

const getAuthHeaders = () => {
    const token = window.localStorage.getItem("authToken");

    return token ? { authorization: `Bearer ${token}` } : {};
};

export const fetchOrderAPI = async () => {
    const response = await API.get("/orders", { headers: getAuthHeaders() });
    return response.data;
};

export const fetchOrderByIdAPI = async (orderId) => {
    const response = await API.get(`/orders/${orderId}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
};


export const fetchActiveAPI = async () => {
    const response = await API.get("/orders/active", {
      headers: getAuthHeaders(),
    });
    console.log("response from order api : ", response);
    
    return response.data;
  };
