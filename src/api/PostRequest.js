import axios from "axios";
export const getTimeLinePosts = (id) => {
    return axios.get(import.meta.env.VITE_URI_POST + `/${id}/timeline`)
}
export const likePost = (id, userId) => axios.put(import.meta.env.VITE_URI_POST + `/${id}/like`, { currentUserId: userId })
export const commentPost = (id, data) => axios.post(import.meta.env.VITE_URI_POST + `/${id}/comment`, data)
export const getCommentsPost = (id) => axios.get(import.meta.env.VITE_URI_POST + `/${id}/comment`)