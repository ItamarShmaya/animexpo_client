import { useContext } from "react";
import { LoggedInUserContext } from "./LoggedInUserProvider";

export const useLoggedInUser = () => {
  const { loggedInUser, setLoggedInUser } = useContext(LoggedInUserContext);
  return { loggedInUser, setLoggedInUser };
};
