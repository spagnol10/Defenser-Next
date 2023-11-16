import axios from "axios"
import Cookies from "universal-cookie"

const cookies = new Cookies()

export const axiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === "development" ||
    process.env.VERCEL_ENV === "preview"
      ? process.env.NEXT_PUBLIC_DEV_URL
      : process.env.NEXT_PUBLIC_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

axiosInstance.interceptors.request.use(
  function (config) {
    const token = cookies.get("defenserUserToken")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      cookies.remove("defenserUserToken")
      window.location.href = "/login"
      return
    }
    if (error.response.status === 403) {
      window.location.href = "/403"
      return
    } else {
      return Promise.reject(error)
    }
  }
)
