import { authinticateUser } from "../../apis/animexpo/animexpo_requests.js";
import { useLocalStorage } from "../../hooks/useLocalStorage.js";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const PrivateRoute = ({ children }) => {
  const { getLocalStorage } = useLocalStorage();
  const [auth, setAuth] = useState(false);
  const { username } = useParams();
  const navigate = useNavigate();
  const token = getLocalStorage("loggedInUser").token;
  useEffect(() => {
    const auth = async () => {
      try {
        const response = await authinticateUser(token, username);
        setAuth(response);
      } catch (e) {
        setAuth(false);
        navigate("/");
      }
    };
    auth();
  }, [navigate, token, username]);

  return <>{auth && children}</>;
};

export default PrivateRoute;
