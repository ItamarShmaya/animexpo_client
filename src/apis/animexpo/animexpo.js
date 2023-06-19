import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5050"
    : "https://animexposerver.onrender.com";
console.log(baseURL);
const animexpo = axios.create({ baseURL });

export default animexpo;
