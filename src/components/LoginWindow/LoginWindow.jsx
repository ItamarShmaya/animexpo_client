import { useState, useEffect } from "react";
import "./LoginWindow.css";
import { NavLink } from "react-router-dom";
import { useLoggedInUser } from "../../context/context_custom_hooks";
import { useLocalStorage } from "../../hooks/useLocalStorage.js";
import { loginUser } from "../../apis/animexpo/animexpo_requests.js";
import InlineSpinner from "../Spinner/InlineSpinner";
import itachi from "../Spinner/spinnerImages/itachi.png";

const LoginWindow = ({ formWrapperRef, setOpen }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [credentialsError, setCredentialsError] = useState("");
  const { setLoggedInUser, socket } = useLoggedInUser();
  const { setLocalStorage, saveUserToLocalStorage } = useLocalStorage();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (credentialsError) setCredentialsError(false);
    // eslint-disable-next-line
  }, [username, password]);

  useEffect(() => {
    const closeLoginWindow = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeLoginWindow);
    return () => {
      window.removeEventListener("keydown", closeLoginWindow);
    };
  }, [setOpen]);

  const onLoginSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    try {
      setIsLoading(true);
      const credentials = { username, password };
      const user = await loginUser(credentials);
      if (user) {
        socket.auth = { username: user.user.username };
        socket.connect();
        socket.once("session", ({ sessionID }) => {
          setLocalStorage("sessionID", sessionID);

          setLoggedInUser({
            _id: user.user._id,
            username: user.user.username,
            email: user.user.email,
            token: user.token,
          });
          saveUserToLocalStorage(user);
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
              <InlineSpinner image={itachi} width={20} height={20} />
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
