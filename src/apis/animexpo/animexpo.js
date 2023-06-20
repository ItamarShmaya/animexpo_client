import axios from "axios";

console.log(process.env.NODE_ENV);
const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://animexposerver.onrender.com"
    : "http://localhost:5050";
const animexpo = axios.create({ baseURL });

export default animexpo;
