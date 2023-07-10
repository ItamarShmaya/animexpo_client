import { authinticateUser } from "../../apis/animexpo/animexpo_requests";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, JSX } from "react";

const PrivateRoute = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}): JSX.Element => {
  const { getLocalStorageUserData } = useLocalStorage();
  const [auth, setAuth] = useState<boolean>(false);
  const { username } = useParams() as { username: string };
  const navigate = useNavigate();
  const token = getLocalStorageUserData().user.token;
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
