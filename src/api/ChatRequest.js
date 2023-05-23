import axios from "axios";
export const userChats = (id) => axios.get(import.meta.env.VITE_URI_CHAT + `/${id}`)
export const createChat = (data) => axios.post(import.meta.env.VITE_URI_CHAT, data)
export const getMessages = (id) => axios.get(import.meta.env.VITE_URI_MESSAGE + `/${id}`)
export const sendMessage = (data) => axios.post(import.meta.env.VITE_URI_MESSAGE, data)