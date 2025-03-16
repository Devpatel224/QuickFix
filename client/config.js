// const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";


// export default API_BASE_URL;

const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:3000" // Local backend
    : "https://quickfix-wot5.onrender.com"; // Production backend

export default API_URL;

