import "./UserFunction.css";
import { useState } from "react";
import { useLoggedInUser } from "../../../context/context_custom_hooks";
import { useParams } from "react-router-dom";
import { sendFriendRequest } from "../../../apis/animexpo/animexpo_updates";
import {
  checkWasFriendRequestSent,
  checkIsUserInFriendsList,
  removeFriend,
} from "../../../apis/animexpo/animexpo_requests";
import { useEffect, JSX } from "react";
import MustBeLoggedIn from "../../../components/MustBeLoggedIn/MustBeLoggedIn";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { OnlineUser } from "../../../socket.io/socket.io.tpyes";

const UserFunction = (): JSX.Element => {
  const { loggedInUser, socket } = useLoggedInUser();
  const { username } = useParams() as { username: string };
  const [displayMessage, setDisplayMessage] = useState<boolean>(false);
  const [isUserInFriendsList, setIsUserInFriendsList] =
    useState<boolean>(false);
  const [sentFriendRequest, setSentFriendRequest] = useState<boolean>(false);
  const { getLocalStorage, saveToLoggedUser } = useLocalStorage();

  useEffect(() => {
    if (loggedInUser && loggedInUser.username !== username) {
      const getUserFriendsList = async () => {
        try {
          const response = await checkIsUserInFriendsList(
            loggedInUser.username,
            loggedInUser.token,
            username
          );
          if (response) {
            setIsUserInFriendsList(response);
            setSentFriendRequest(false);
            return;
          }

          setIsUserInFriendsList(false);

          const response1 = await checkWasFriendRequestSent(
            loggedInUser.username,
            loggedInUser.token,
            username
          );
          if (response1) return setSentFriendRequest(response1);
        } catch (e) {
          console.log(e);
        }
      };
      getUserFriendsList();
    }
  }, [loggedInUser, loggedInUser?.username, username]);

  const onAddFriendClick = async () => {
    try {
      const friendRequest = await sendFriendRequest(
        loggedInUser.token,
        loggedInUser.username,
        username
      );
      if (friendRequest) {
        setSentFriendRequest(true);
        setIsUserInFriendsList(false);

        const sessionID = getLocalStorage("sessionID");
        socket.auth = { sessionID, username: loggedInUser.username };
        socket.emit("online_users");
        socket.once(
          "online_users",
          async ({ users }: { users: OnlineUser[] }) => {
            const to = users.filter((user) => user.username === username);
            if (to) socket.emit("friend_req", { to });
          }
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onRemoveFriendClick = async () => {
    try {
      const updatedFriendsList = await removeFriend(
        loggedInUser.username,
        loggedInUser.token,
        username
      );
      if (updatedFriendsList) {
        saveToLoggedUser("friendsList", updatedFriendsList);
        setIsUserInFriendsList(false);
        setSentFriendRequest(false);

        const sessionID = getLocalStorage("sessionID");
        socket.auth = { sessionID, username: loggedInUser.username };
        socket.emit("online_users");
        socket.once(
          "online_users",
          async ({ users }: { users: OnlineUser[] }) => {
            const to = users.filter((user) => user.username === username);
            if (to) socket.emit("remove_friend", { to });
          }
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="user-function">
      {!loggedInUser && (
        <>
          <div
            className="friend-request abled"
            data-type="Send friend request"
            onClick={() => setDisplayMessage(true)}
          >
            <img
              src={
                "https://res.cloudinary.com/dhzbwclpj/image/upload/v1657534811/icon/add_cj2xaz.png"
              }
              alt="Friend request icon"
            />
          </div>
          {displayMessage && (
            <MustBeLoggedIn setDisplayMessage={setDisplayMessage} />
          )}
        </>
      )}
      {loggedInUser && loggedInUser.username === username && (
        <div className="friend-request disabled">
          <img
            src={
              "https://res.cloudinary.com/dhzbwclpj/image/upload/v1657534899/icon/add_disabled_txfj1b.png"
            }
            alt="Friend request icon"
          />
        </div>
      )}
      {isUserInFriendsList && loggedInUser.username !== username && (
        <div
          className="friend-request abled"
          data-type="Remove friend"
          onClick={onRemoveFriendClick}
        >
          <img
            src={
              "https://res.cloudinary.com/dhzbwclpj/image/upload/v1657534916/icon/remove_jd6tpw.png"
            }
            alt="Friend request icon"
          />
        </div>
      )}
      {sentFriendRequest && loggedInUser.username !== username && (
        <div
          className="friend-request req-sent disabled"
          data-type="Request sent"
        >
          <img
            src={
              "https://res.cloudinary.com/dhzbwclpj/image/upload/v1657534899/icon/add_disabled_txfj1b.png"
            }
            alt="Friend request icon"
          />
        </div>
      )}
      {loggedInUser &&
        loggedInUser.username !== username &&
        !isUserInFriendsList &&
        !sentFriendRequest && (
          <div
            className="friend-request abled"
            data-type="Send friend request"
            onClick={onAddFriendClick}
          >
            <img
              src={
                "https://res.cloudinary.com/dhzbwclpj/image/upload/v1657534811/icon/add_cj2xaz.png"
              }
              alt="Friend request icon"
            />
          </div>
        )}
    </div>
  );
};
export default UserFunction;
