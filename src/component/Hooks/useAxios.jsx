import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://paw-mart-server-mu.vercel.app",
});

const useAxios = () => {
  return axiosInstance;
};
export default useAxios;
