import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "https://portfolio-cms-backend-2.onrender.com/api",

  headers: {
    "Content-Type": "application/json",
  },
});

export default api;