import axios from "axios";

console.log(process.env.NODE_ENV);
const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5050"
    : "https://animexposerver.onrender.com";
const animexpo = axios.create({ baseURL });

export default animexpo;
