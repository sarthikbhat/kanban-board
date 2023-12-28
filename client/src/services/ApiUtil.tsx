import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";


const AUTH_INTERCEPTOR = axios.create({
  baseURL: "http://localhost:8080",
})

function navigate() {
  const router = useRouter()
  router.push("/login")
  console.log("sdf");
  
}



AUTH_INTERCEPTOR.interceptors.request.use((config) => {

  if (!config.url?.includes("/auth/") && (typeof window !== "undefined")) {
    config.headers.Authorization = window.localStorage.getItem("token")
  }
  return config
})

AUTH_INTERCEPTOR.interceptors.response.use((response) => {

  return response
}, (error: AxiosError) => {
  if (error.response?.status === 401 || error.response?.data === "jwt expired") {
    toast.error(error.response?.data as string)
  }
  else toast.error(error.response?.data as string)
  // return error
  return Promise.reject(error);

})


export default AUTH_INTERCEPTOR;