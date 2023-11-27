import axios from "axios";

// base url
const BASES_URL = "https://react-mini-projects-api.classbon.com";

// httpService
export const httpService = axios.create({
    baseURL: BASES_URL,
})

// httpInterceptedService
export const httpInterceptedService = axios.create({
    baseURL: BASES_URL,
})

httpInterceptedService.interceptors.request.use(
    async(config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers = {
                authorization: `Bearer ${token}`,
            }
        }
        return config
    },

    // ???
    (error) => Promise.reject(error)
)

httpInterceptedService.interceptors.response.use(
    // takes two parameters
    // first one when the response status is 200
    (response) => response,

    // second one when the response status is 401
    async (error) => {
        if (error.response.status === 401) {
            window.location.href = "/login"
        }

        // ???
        return Promise.reject(error)
    }
)