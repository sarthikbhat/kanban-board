import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useRef } from "react";
import toast from "react-hot-toast";

export const LoadingContext = createContext({
  isLoading: true,
  setIsLoading: (loading: boolean) => { }
});

const API_UTIL = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
})

function AUTHINTERCEPTOR({ children }: any) {
  const { setIsLoading } = useContext(LoadingContext);

  const router = useRouter();

  // const isScreenMounted = useRef(true)
  // useEffect(() => {
  //   return () => { isScreenMounted.current = false }
  // }, [])


  // API_UTIL.interceptors.

  API_UTIL.interceptors.request.use((config) => {
    setIsLoading(true);
    if (!config.url?.includes("/auth/") && (typeof window !== "undefined")) {
      config.headers.Authorization = window.localStorage.getItem("token")
    }
    return config
  })

  API_UTIL.interceptors.response.use((response) => {
    // console.log(isScreenMounted);
    
     setIsLoading(false)
    return response
  }, (error: AxiosError) => {
     setIsLoading(false)
    if (error.response?.status === 401 || error.response?.data === "jwt expired") {
      router.push("/login");
      toast.error(error.response?.data as string)
    }
    else toast.error(error.response?.data as string)
    return Promise.reject(error);

  })


  return children;
}

export default API_UTIL;
export { AUTHINTERCEPTOR }