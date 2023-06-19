import io from "socket.io-client";

const URL = !process.env.NODE_ENV
  ? "http://localhost:5050"
  : "https://animexposerver.onrender.com";

const socket = io(URL, { autoConnect: false, reconnection: false });

export default socket;
