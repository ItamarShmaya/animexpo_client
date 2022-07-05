import { createContext, useState } from "react";

export const LoggedInUserContext = createContext({});

const LoggedInUserProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(
    JSON.parse(localStorage.getItem("loggedInUser")) || null
  );

  return (
    <LoggedInUserContext.Provider
      value={{
        loggedInUser,
        setLoggedInUser,
      }}
    >
      {children}
    </LoggedInUserContext.Provider>
  );
};

export default LoggedInUserProvider;
