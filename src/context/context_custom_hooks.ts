import { useContext } from "react";
import { LoggedInUserContext } from "./LoggedInUserProvider";
import { LoggedInUserContextType } from "./LoggedInUser.types";

export const useLoggedInUser = () => {
  const {
    loggedInUser,
    setLoggedInUser,
    notifications,
    setNotifications,
    socket,
  } = useContext(LoggedInUserContext) as LoggedInUserContextType;
  return {
    loggedInUser,
    setLoggedInUser,
    notifications,
    setNotifications,
    socket,
  };
};
