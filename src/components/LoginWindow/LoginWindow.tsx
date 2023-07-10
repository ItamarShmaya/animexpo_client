import { useState, useEffect, JSX } from "react";
import "./LoginWindow.css";
import { NavLink } from "react-router-dom";
import { useLoggedInUser } from "../../context/context_custom_hooks";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { loginUser } from "../../apis/animexpo/animexpo_requests";
import InlineSpinner from "../Spinner/InlineSpinner";
import itachi from "../Spinner/spinnerImages/itachi.png";
import { LoginWindowProps } from "./LoginWindow.types";

const LoginWindow = ({
  formWrapperRef,
  setOpen,
}: LoginWindowProps): JSX.Element => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [credentialsError, setCredentialsError] = useState<boolean>(false);
  const { setLoggedInUser, socket } = useLoggedInUser();
  const { setLocalStorage, saveUserToLocalStorage } = useLocalStorage();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (credentialsError) setCredentialsError(false);
    // eslint-disable-next-line
  }, [username, password]);

  useEffect(() => {
    const closeLoginWindow = (e: KeyboardEvent): void => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeLoginWindow);
    return () => {
      window.removeEventListener("keydown", closeLoginWindow);
    };
  }, [setOpen]);

  const onLoginSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (isLoading) return;
    try {
      setIsLoading(true);
      const credentials = { username, password };
      const userData = await loginUser(credentials);
      if (userData) {
        socket.auth = { username: userData.user.username };
        socket.connect();
        socket.once("session", ({ sessionID }: { sessionID: string }) => {
          setLocalStorage("sessionID", sessionID);

          setLoggedInUser({
            _id: userData.user._id,
            username: userData.user.username,
            email: userData.user.email,
            token: userData.token,
          });
          saveUserToLocalStorage(userData);
          setOpen(false);
        });
      }
    } catch (e) {
      setIsLoading(false);
      if (e === "IncorrectCredentials") {
        setCredentialsError(true);
      }
    }
  };

  return (
    <div className="login-window">
      <div ref={formWrapperRef} className="form-wrapper">
        <form className="login-form" onSubmit={onLoginSubmit}>
          <h1>Sign In</h1>
          {credentialsError && (
            <span className="wrong-info-alert">
              Username or password is incorrect
            </span>
          )}
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button className="btn">
            {isLoading ? (
              <InlineSpinner
                image={itachi}
                spinnerWidth={20}
                spinnerHeight={20}
              />
            ) : (
              "Log In"
            )}
          </button>
          <div>Need an account?</div>
          <NavLink to="/signup" onClick={() => setOpen(false)}>
            Sign Up
          </NavLink>
        </form>
      </div>
    </div>
  );
};
export default LoginWindow;
