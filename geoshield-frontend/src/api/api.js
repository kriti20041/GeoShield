import axios from "axios";

const api = axios.create({
  baseURL: "  https://uninflective-emely-fustier.ngrok-free.dev",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;