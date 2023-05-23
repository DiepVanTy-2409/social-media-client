import axios from "axios";
export const getUser = (userId) => {
    return axios.get(import.meta.env.VITE_URI_USER + `/${userId}`)
}
export const updateUser = (data, userId) => {
    return axios.put(import.meta.env.VITE_URI_USER + `/${userId}`, data)
}
export const followUser = (userId, userData) => {
    return axios.put(import.meta.env.VITE_URI_USER + `/${userId}/follow`, userData)
}

export const getAllUsers = () => {
    return axios.get(import.meta.env.VITE_URI_USER)
}

export const findUsers = (key) => {
    return axios.get(import.meta.env.VITE_URI_USER + `/search/${key}`)
}