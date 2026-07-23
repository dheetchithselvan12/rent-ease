import axios from "axios";
import { API_BASE_URL } from "../../config/api";

const API = axios.create({ baseURL: `${API_BASE_URL}/users` });

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
    return response.data;
}
