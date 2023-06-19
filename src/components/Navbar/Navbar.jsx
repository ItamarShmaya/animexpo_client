import "./Navbar.css";
import Logo from "../Logo/Logo";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import LoginWindow from "../LoginWindow/LoginWindow";
import { useLoggedInUser } from "../../context/context_custom_hooks";
import {
  getUserNotifications,
  logoutUser,
} from "../../apis/animexpo/animexpo_requests.js";
import NotificationWindow from "./NotificationWindow/NotificationWindow";
import { updateNotificationsToRead } from "../../apis/animexpo/animexpo_updates";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import DropdownMenu from "./DropdownMenu/DropdownMenu";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(null);
  const formWrapperRef = useRef();
  const loginRef = useRef();
  const dropdownMenuRef = useRef();
  const userMenuRef = useRef();
  const {
    loggedInUser,
    setLoggedInUser,
    notifications,
    setNotifications,
    socket,
  } = useLoggedInUser();
  const { getLocalStorage, saveToLoggedUser } = useLocalStorage();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedInUser) {
      socket?.on("new_notifications", ({ notifications }) => {
        setNotifications(notifications);
      });
      socket.on("updated_friendslist", ({ friendsList }) => {
        saveToLoggedUser("friendsList", friendsList);
      });
    }
  }, [socket, loggedInUser, saveToLoggedUser, setNotifications]);

  useEffect(() => {
    const getUserNotifs = async () => {
      try {
        const notifs = await getUserNotifications(
          loggedInUser.username,
          loggedInUser.token
        );
        if (notifs) setNotifications(notifs);
      } catch (e) {
        console.log(e);
      }
    };
    if (loggedInUser) getUserNotifs();
  }, [loggedInUser, setNotifications]);

  useEffect(() => {
    if (open) {
      const onBodyClick = ({ target }) => {
        if (
          formWrapperRef.current.contains(target) ||
          target === loginRef.current
        )
          return;
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

  useEffect(() => {
    if (dropdownOpen) {
      const onBodyClick = ({ target }) => {
        if (
          dropdownMenuRef.current.contains(target) ||
          userMenuRef.current.contains(target)
        )
          return;
        setDropdownOpen(false);
      };

      document.body.addEventListener("click", onBodyClick, { capture: true });

      return () => {
        document.body.removeEventListener("click", onBodyClick, {
          capture: true,
        });
      };
    }
  }, [dropdownOpen]);

  const onLogoutButtonClick = async () => {
    try {
      const response = await logoutUser(loggedInUser);
      if (response.status === 200) {
        setLoggedInUser(null);
        localStorage.removeItem("loggedUser");
        localStorage.removeItem("sessionID");
        socket?.emit("logout");
        socket?.disconnect();
        setDropdownOpen(false);
        navigate(`/`);
      }
    } catch (e) {
      console.log(e);
      navigate(`/`);
      window.location.reload();
    }
  };

  useEffect(() => {
    if (notifOpen === false) {
      setNotifications([]);
      setNotifOpen(null);
      if (notifications.length > 0) {
        updateNotificationsToRead(loggedInUser.username, loggedInUser.token);
      }
    }
  }, [
    notifOpen,
    loggedInUser?.username,
    loggedInUser?.token,
    notifications?.length,
    setNotifications,
  ]);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <NavLink className="nav-item" to="/">
            <Logo firstColor={"#EEEBDD"} secondColor={"#84A9AC"} />
          </NavLink>
        </div>
        <div className="navbar-right">
          {loggedInUser ? (
            <>
              <div className="notification-bell">
                <i
                  className="fa-solid fa-bell nav-item"
                  onClick={() => setNotifOpen((prev) => !prev)}
                ></i>
                {notifications.length > 0 && (
                  <span className="notification-badge">
                    {notifications.length < 100 ? notifications.length : `99+`}
                  </span>
                )}
                {notifOpen && (
                  <NotificationWindow
                    notifications={notifications}
                    setNotifOpen={setNotifOpen}
                  />
                )}
              </div>
              <div className="user-menu">
                <div
                  className="avatar-wrapper"
                  ref={userMenuRef}
                  onClick={() => setDropdownOpen((prev) => !prev)}
                >
                  <img
                    src={
                      getLocalStorage("loggedUser").profileData.personalInfo
                        .avatar.secure_url
                    }
                    alt="Avatar"
                  />
                  <span className="drop-down-arrow"></span>
                </div>
                {dropdownOpen && (
                  <DropdownMenu
                    username={loggedInUser.username}
                    setDropdownOpen={setDropdownOpen}
                    onLogoutButtonClick={onLogoutButtonClick}
                    dropdownMenuRef={dropdownMenuRef}
                  />
                )}
              </div>
            </>
          ) : (
            <>
              <div
                className="nav-item"
                ref={loginRef}
                onClick={() => setOpen((prev) => !prev)}
              >
                Login
              </div>
              <NavLink to={"/signup"} className="nav-item">
                Signup
              </NavLink>
            </>
          )}
        </div>
      </nav>
      {open && (
        <LoginWindow formWrapperRef={formWrapperRef} setOpen={setOpen} />
      )}
    </>
  );
};
export default Navbar;
