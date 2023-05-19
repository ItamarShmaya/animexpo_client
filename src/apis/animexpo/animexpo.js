import axios from "axios";

const animexpo = axios.create({
  baseURL: "https://animexposerver.onrender.com",
});

export default animexpo;
