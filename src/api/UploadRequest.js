import axios from "axios";
export const uploadImage = (data) => {
    return axios.post(import.meta.env.VITE_URI_UPLOAD, data)
}
export const uploadPost = (data) => {
    return axios.post(import.meta.env.VITE_URI_POST + `/create`, data)
}