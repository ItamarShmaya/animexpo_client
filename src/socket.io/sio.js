import io from "socket.io-client";

const URL =
  process.env.NODE_ENV === "production"
    ? "https://animexposerver.onrender.com"
    : "http://localhost:5050";
const socket = io(URL, { autoConnect: false });

export default socket;
