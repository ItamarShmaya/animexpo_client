import io from "socket.io-client";

const URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5050"
    : "https://animexposerver.onrender.com";
console.log(URL);
const socket = io(URL, { autoConnect: false });

export default socket;
