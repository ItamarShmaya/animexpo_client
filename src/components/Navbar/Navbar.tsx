import "./Navbar.css";
import Logo from "../Logo/Logo";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef, JSX } from "react";
import LoginWindow from "../LoginWindow/LoginWindow";
import { useLoggedInUser } from "../../context/context_custom_hooks";
import {
  getUserNotifications,
  logoutUser,
} from "../../apis/animexpo/animexpo_requests";
import NotificationWindow from "./NotificationWindow/NotificationWindow";
import { updateNotificationsToRead } from "../../apis/animexpo/animexpo_updates";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import DropdownMenu from "./DropdownMenu/DropdownMenu";

const Navbar = (): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false);
  const [notifOpen, setNotifOpen] = useState<boolean>(false);
  const formWrapperRef = useRef<HTMLDivElement>(null);
  const loginRef = useRef<HTMLDivElement>(null);
  const dropdownMenuRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const {
    loggedInUser,
    setLoggedInUser,
    notifications,
    setNotifications,
    socket,
  } = useLoggedInUser();
  const { getLocalStorageUserData, saveToLoggedUser } = useLocalStorage();
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const [wasNotifWindowClosed, setWasNotifWindowClosed] =
    useState<boolean>(false);

  useEffect(() => {
    if (notifOpen === false) {
      setWasNotifWindowClosed(true);
    }
  }, [notifOpen]);

  useEffect(() => {
    if (loggedInUser) {
      socket?.on("new_notifications", ({ notifications }) => {
        setNotifications(notifications);
        setWasNotifWindowClosed(false);
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
      const onBodyClick = (e: MouseEvent): void => {
        const target = e.target as HTMLElement;
        if (
          formWrapperRef.current?.contains(target) ||
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
      const onBodyClick = (e: MouseEvent): void => {
        const target = e.target as HTMLElement;
        if (
          dropdownMenuRef.current?.contains(target) ||
          userMenuRef.current?.contains(target)
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
      const response = await logoutUser(loggedInUser.token);
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
    const updateNotifications = async (): Promise<void> => {
      try {
        const response = await updateNotificationsToRead(
          loggedInUser.username,
          loggedInUser.token
        );
        if (response.success) {
          setNotifications([]);
        }
      } catch (e) {
        console.log(e);
      }
    };

    if (wasNotifWindowClosed) {
      if (notifications.length > 0) {
        updateNotifications();
      }
    }
  }, [
    wasNotifWindowClosed,
    loggedInUser.username,
    loggedInUser.token,
    setNotifications,
    notifications.length,
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
          <NavLink
            to={"/search/anime"}
            className="nav-item"
            onMouseEnter={() => console.log("object")}
            onMouseLeave={() => console.log("object")}
          >
            Search
          </NavLink>
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
                      getLocalStorageUserData().profileData.personalInfo.avatar
                        .secure_url
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
