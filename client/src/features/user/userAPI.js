import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api/users" });

const getAuthHeaders = () => {
    const token = window.localStorage.getItem("authToken");

    return token ? { authorization: `Bearer ${token}` } : {};
  };

export const updateUserAPI = async (formData) => {
    const response = await API.put("/profile",formData, {headers: getAuthHeaders()});
    return response.data;
}

export const updateUserAddressAPI = async (formData) => {
    const response = await API.put("/address", formData, { headers: getAuthHeaders()});
    console.log("response : ", response.data);
    
    return response.data;
}