import axios from "axios";

const isLocalhost = window.location.hostname === "localhost";

const api = axios.create({
  baseURL: isLocalhost
    ? "http://localhost:5000/api"
    : "https://n8nproject-9t83.onrender.com/api",
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error("API error:", err?.response || err?.message);
    throw err;
  }
);

export const signupRequest = (payload) =>
  api.post("/auth/register", payload).then((res) => res.data);

export const loginRequest = (payload) =>
  api.post("/auth/login", payload).then((res) => res.data);

export const getMe = () => api.get("/auth/me").then((res) => res.data);