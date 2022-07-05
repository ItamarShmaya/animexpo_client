import "./Navbar.css";
import Logo from "../Logo/Logo";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import LoginWindow from "../LoginWindow/LoginWindow";
import { useLoggedInUser } from "../../context/context_custom_hooks";
import { logoutUser } from "../../apis/animexpo/animexpo_requests.js";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const formWrapperRef = useRef();
  const { loggedInUser, setLoggedInUser } = useLoggedInUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      const onBodyClick = ({ target }) => {
        if (formWrapperRef.current.contains(target)) return;
        setOpen(false);
      };

      document.body.addEventListener("click", onBodyClick, { capture: true });

      return () => {
        document.body.removeEventListener("click", onBodyClick, {
          capture: true,
        });
      };
    }
  }, [open]);

  const onLogoutButtonClick = async () => {
    try {
      const response = await logoutUser(loggedInUser);
      if (response.status === 200) {
        setLoggedInUser(null);
        localStorage.removeItem("loggedInUser");
        localStorage.removeItem("loggedInUserAnimeList");
        localStorage.removeItem("loggedInUserFavCharsList");
        localStorage.removeItem("loggedInUserFavPeopleList");
        localStorage.removeItem("loggedInUserMangaList");
        localStorage.removeItem("loggedInUserProfileData");
        navigate(`/`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const renderLoginOrLogout = () => {
    if (loggedInUser) {
      return (
        <div className="navbar-right nav-item" onClick={onLogoutButtonClick}>
          Logout
        </div>
      );
    } else {
      return (
        <div
          className="navbar-right nav-item"
          onClick={() => setOpen((prev) => !prev)}
        >
          Login
        </div>
      );
    }
  };

  const renderLoginWindow = () => {
    if (open) {
      return <LoginWindow formWrapperRef={formWrapperRef} setOpen={setOpen} />;
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <NavLink className="nav-item" to="/">
            <Logo firstColor={"#EEEBDD"} secondColor={"#84A9AC"} />
          </NavLink>
          <NavLink className="nav-item" to="/">
            Home
          </NavLink>
          {loggedInUser && (
            <NavLink
              className="nav-item"
              to={`/profile/${loggedInUser.username}`}
            >
              My Profle
            </NavLink>
          )}
        </div>
        {renderLoginOrLogout()}
      </nav>
      {renderLoginWindow()}
    </>
  );
};
export default Navbar;
