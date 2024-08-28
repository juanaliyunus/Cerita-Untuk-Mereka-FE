import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://10.10.102.142:8080",
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
});

export default axiosInstance;