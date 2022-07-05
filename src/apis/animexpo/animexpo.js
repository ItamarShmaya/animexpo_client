import axios from "axios";

const animexpo = axios.create({
  baseURL: "http://localhost:5050",
});

export default animexpo;
