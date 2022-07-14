import { createContext, useState } from "react";
import io from "socket.io-client";

export const LoggedInUserContext = createContext({});

const LoggedInUserProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(
    JSON.parse(localStorage.getItem("loggedInUser")) || null
  );
  const [notifications, setNotifications] = useState([]);
  const [socket, setSocket] = useState(
    io("https://animexpo-server.herokuapp.com")
  );

  return (
    <LoggedInUserContext.Provider
      value={{
        loggedInUser,
        setLoggedInUser,
        notifications,
        setNotifications,
        socket,
        setSocket,
      }}
    >
      {children}
    </LoggedInUserContext.Provider>
  );
};

export default LoggedInUserProvider;
