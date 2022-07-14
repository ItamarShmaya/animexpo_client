import axios from "axios";

const animexpo = axios.create({
  baseURL: " https://animexpo-server.herokuapp.com",
});

export default animexpo;
