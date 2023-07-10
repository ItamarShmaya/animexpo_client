import { createContext, useEffect, useState, JSX } from "react";
import socket from "../socket.io/sio";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LoggedInUser, LoggedInUserContextType } from "./LoggedInUser.types";

export const LoggedInUserContext = createContext<LoggedInUserContextType | {}>(
  {}
);

const LoggedInUserProvider = ({
  children,
}: {
  children: JSX.Element[];
}): JSX.Element => {
  const { getLocalStorage, setLocalStorage } = useLocalStorage();
  const [loggedInUser, setLoggedInUser] = useState<LoggedInUser | null>(
    getLocalStorage("loggedUser")?.user || null
  );
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (loggedInUser) {
      const sessionID = getLocalStorage("sessionID");
      socket.auth = { sessionID, username: loggedInUser.username };
      socket.connect();
      socket.on("session", ({ sessionID }) => {
        setLocalStorage("sessionID", sessionID);
      });
    }
  }, [loggedInUser, getLocalStorage, setLocalStorage]);

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
