const Allpays_URL = import.meta.env.VITE_API_BASE_URL;
import axios from "axios";

const allPaysAPI = axios.create({
  baseURL: Allpays_URL,
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default allPaysAPI;
