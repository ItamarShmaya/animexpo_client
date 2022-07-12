import { useContext } from "react";
import { LoggedInUserContext } from "./LoggedInUserProvider";

export const useLoggedInUser = () => {
  const {
    loggedInUser,
    setLoggedInUser,
    notifications,
    setNotifications,
    socket,
    setSocket,
  } = useContext(LoggedInUserContext);
  return {
    loggedInUser,
    setLoggedInUser,
    notifications,
    setNotifications,
    socket,
    setSocket,
  };
};
