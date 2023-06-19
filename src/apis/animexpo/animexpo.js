import axios from "axios";

const baseURL = !process.env.NODE_ENV
  ? "http://localhost:5050"
  : "https://animexposerver.onrender.com";

const animexpo = axios.create({ baseURL });

export default animexpo;
