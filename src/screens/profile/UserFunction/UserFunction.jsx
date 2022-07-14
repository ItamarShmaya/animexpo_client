import "./UserFunction.css";
import { useState } from "react";
import { useLoggedInUser } from "../../../context/context_custom_hooks.js";
import { useParams } from "react-router-dom";
import { sendFriendRequest } from "../../../apis/animexpo/animexpo_updates.js";
import {
  checkWasFriendRequestSent,
  checkIsUserInFriendsList,
  removeFriend,
} from "../../../apis/animexpo/animexpo_requests.js";
import { useEffect } from "react";
import MustBeLoggedIn from "../../../components/MustBeLoggedIn/MustBeLoggedIn";
import { useLocalStorage } from "../../../hooks/useLocalStorage.js";

const UserFunction = ({ setViewedProfile }) => {
  const { loggedInUser, socket } = useLoggedInUser();
  const { username } = useParams();
  const [displayMessage, setDisplayMessage] = useState(false);
  const [isUserInFriendsList, setIsUserInFriendsList] = useState(null);
  const [sentFriendRequest, setSentFriendRequest] = useState(null);
  const { setLocalStorage } = useLocalStorage();

  useEffect(() => {
    socket?.on("updated_accepter_friendslist", ({ friendsList }) => {
      setLocalStorage("loggedInUserFriendsList", friendsList);
      setViewedProfile((prev) => ({ ...prev, friendsList }));
    });

    socket?.on(
      "updated_reciever_friendslist",
      ({ accepterFriendsList, recieverFriendsList }) => {
        setViewedProfile((prev) => ({
          ...prev,
          friendsList: accepterFriendsList,
        }));
        setLocalStorage("loggedInUserFriendsList", recieverFriendsList);
        setIsUserInFriendsList(true);
        setSentFriendRequest(false);
      }
    );

    socket?.on("updated_removed_friendslist", ({ friendsList }) => {
      setLocalStorage("loggedInUserFriendsList", friendsList);
      setViewedProfile((prev) => ({ ...prev, friendsList }));
    });

    socket?.on(
      "updated_remover_friendslist",
      ({ removedFriendsList, removerFriendsList }) => {
        setViewedProfile((prev) => ({
          ...prev,
          friendsList: removedFriendsList,
        }));
        setLocalStorage("loggedInUserFriendsList", removerFriendsList);
        setIsUserInFriendsList(false);
        setSentFriendRequest(false);
      }
    );
    // eslint-disable-next-line
  }, [socket, setViewedProfile]);

  useEffect(() => {
    if (loggedInUser && loggedInUser.username !== username) {
      const getUserFriendsList = async () => {
        try {
          const response = await checkIsUserInFriendsList(
            loggedInUser.username,
            loggedInUser.token,
            username
          );
          if (response) return setIsUserInFriendsList(response);

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
        socket?.emit("username_to_notify", { recipient: username });
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
        setLocalStorage("loggedInUserFriendsList", updatedFriendsList);
        setIsUserInFriendsList(false);
        setSentFriendRequest(false);
        socket?.emit("username_to_notify", { recipient: username });
        socket?.emit("remover_client_lists_updates", {
          remover: loggedInUser.username,
          removed: username,
        });
        socket?.emit("removed_client_lists_updates", {
          removed: username,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="user-function">
      {!loggedInUser && (
        <div
          className="friend-request abled"
          data-type="Send friend request"
          onClick={() => setDisplayMessage(true)}
        >
          {displayMessage && (
            <MustBeLoggedIn setDisplayMessage={setDisplayMessage} />
          )}
          <img
            src={
              "https://res.cloudinary.com/dhzbwclpj/image/upload/v1657534811/icon/add_cj2xaz.png"
            }
            alt="Friend request icon"
          />
        </div>
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
      {/* <div onClick={onSomethingClick}>something</div> */}
    </div>
  );
};
export default UserFunction;
