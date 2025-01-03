import axios from "axios";

const api = axios.create({
    baseURL: 'https://basic-real-time-text-collaborator-with.onrender.com/api'
})

export default api
