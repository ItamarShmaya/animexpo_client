import { useState, useEffect } from "react";
import "./LoginWindow.css";
import { NavLink } from "react-router-dom";
import { useLoggedInUser } from "../../context/context_custom_hooks";
import { useLocalStorage } from "../../hooks/useLocalStorage.js";
import { loginUser } from "../../apis/animexpo/animexpo_requests.js";

const LoginWindow = ({ formWrapperRef, setOpen }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [credentialsError, setCredentialsError] = useState("");
  const { setLoggedInUser, socket } = useLoggedInUser();
  const { setLocalStorage } = useLocalStorage();

  useEffect(() => {
    if (credentialsError) setCredentialsError(false);
    // eslint-disable-next-line
  }, [username, password]);

  const onLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const credentials = { username, password };
      const user = await loginUser(credentials);
      if (user) {
        socket.emit("new_user", { username: user.user.username });
        setLoggedInUser({
          _id: user.user._id,
          username: user.user.username,
          email: user.user.email,
          token: user.token,
        });
        setLocalStorage("loggedInUser", {
          _id: user.user._id,
          username: user.user.username,
          email: user.user.email,
          token: user.token,
        });
        setLocalStorage("loggedInUserAnimeList", user.user.animeList);
        setLocalStorage("loggedInUserMangaList", user.user.mangaList);
        setLocalStorage("loggedInUserProfileData", user.user.profileData);
        setLocalStorage(
          "loggedInUserFavCharsList",
          user.user.profileData.favoriteCharacters
        );
        setLocalStorage(
          "loggedInUserFavPeopleList",
          user.user.profileData.favoritePeople
        );
        setLocalStorage(
          "loggedInUserFriendsList",
          user.user.profileData.friendsList
        );

        setOpen(false);
      }
    } catch (e) {
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
          <button className="btn">Log In</button>
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
