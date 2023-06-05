import { createContext, useEffect, useState } from "react";
import socket from "../socket.io/sio";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const LoggedInUserContext = createContext({});

const LoggedInUserProvider = ({ children }) => {
  const { getLocalStorage, setLocalStorage } = useLocalStorage();
  const [loggedInUser, setLoggedInUser] = useState(
    getLocalStorage("loggedInUser") || null
  );
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (loggedInUser) {
      const sessionID = getLocalStorage("sessionID");
      socket.auth = { sessionID, username: loggedInUser.username };
      socket.connect();
      socket.on("session", ({ sessionID }) => {
        setLocalStorage("sessionID", sessionID);
      });
    }

    return () => {
      socket.disconnect();
    };

    // eslint-disable-next-line
  }, [loggedInUser]);

  return (
    <LoggedInUserContext.Provider
      value={{
        loggedInUser,
        setLoggedInUser,
        notifications,
        setNotifications,
        socket,
      }}
    >
      {children}
    </LoggedInUserContext.Provider>
  );
};

export default LoggedInUserProvider;
