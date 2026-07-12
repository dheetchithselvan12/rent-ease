import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

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