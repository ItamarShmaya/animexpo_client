import "./FriendRequestsPage.css";
import { useLoggedInUser } from "../../../context/context_custom_hooks.js";
import { useEffect, useState } from "react";
import { getUserFriendRequests } from "../../../apis/animexpo/animexpo_requests.js";
import NewFriendRequest from "./NewFriendRequest/NewFriendRequest";
import OldFriendRequests from "./OldFriendRequests/OldFriendRequests";

const FriendRequestsPage = () => {
  const { loggedInUser } = useLoggedInUser();

  const [friendRequests, setFriendRequests] = useState([]);
  const [newFR, setNewFR] = useState([]);
  const [oldFR, setOldFR] = useState([]);

  useEffect(() => {
    const getFriendRequests = async () => {
      try {
        const friendRequests = await getUserFriendRequests(
          loggedInUser.token,
          loggedInUser._id
        );
        setFriendRequests(friendRequests);
      } catch (e) {
        console.log(e);
      }
    };
    getFriendRequests();
  }, [loggedInUser.token, loggedInUser._id]);

  useEffect(() => {
    const newFr = [];
    const oldFr = [];
    friendRequests.forEach((fr) => {
      fr.status === 1 ? newFr.push(fr) : oldFr.push(fr);
    });
    setNewFR(newFr);
    setOldFR(oldFr);
  }, [friendRequests]);

  const renderNewFriendRequests = (friendRequests) => {
    return friendRequests.map((friendRequest) => {
      return (
        <NewFriendRequest
          key={friendRequest._id}
          friendRequest={friendRequest}
          setFriendRequests={setFriendRequests}
        />
      );
    });
  };

  const renderOldFriendRequests = (friendRequests) => {
    return friendRequests.map((friendRequest) => {
      return (
        <OldFriendRequests
          key={friendRequest._id}
          friendRequest={friendRequest}
          setFriendRequests={setFriendRequests}
        />
      );
    });
  };
  return (
    <div className="friend-req-page">
      <div className="new-friend-req-container">
        <h1>New</h1>
        {newFR.length > 0
          ? renderNewFriendRequests(newFR)
          : "No new friend requests"}
      </div>

      {oldFR.length > 0 && (
        <>
          <div className="old-friend-req-container">
            <h1>Old</h1>
            {renderOldFriendRequests(oldFR)}
          </div>
        </>
      )}
    </div>
  );
};
export default FriendRequestsPage;
