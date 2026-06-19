import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

export const fetchOrderAPI = async () => {
    const response = await API.get("/orders");
    return response.data;
};