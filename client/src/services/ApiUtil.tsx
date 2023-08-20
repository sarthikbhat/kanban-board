import axios from "axios";
import toast from "react-hot-toast";

export async function POST<T>(url: string, payload: T) {
  try {
    const response = await axios.post(url, payload);
    return response.data;
  } catch (error: any) {
    toast.error(error.response.data);
  }
}
