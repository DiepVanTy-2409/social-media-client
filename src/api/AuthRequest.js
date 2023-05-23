import axios from "axios";
// const API = axios.create({ baseURL: import.meta.env.BASE_URL })
export const logIn = async (formData) => {
    return await axios.post(import.meta.env.VITE_URI_LOGIN, formData)
}
export const register = async (formData) => {
    return await axios.post(import.meta.env.VITE_URI_REGISTER, formData)
}