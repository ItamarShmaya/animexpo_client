import "./FriendRequestsPage.css";
import { useLoggedInUser } from "../../../context/context_custom_hooks";
import { useEffect, useState, JSX } from "react";
import { getUserFriendRequests } from "../../../apis/animexpo/animexpo_requests";
import NewFriendRequest from "./NewFriendRequest/NewFriendRequest";
import OldFriendRequests from "./OldFriendRequests/OldFriendRequests";
import { UserFriendRequests } from "../../../apis/animexpo/animexpo_updates.types";

const FriendRequestsPage = (): JSX.Element => {
  const { loggedInUser } = useLoggedInUser();
  const [friendRequests, setFriendRequests] = useState<UserFriendRequests[]>(
    []
  );
  const [newFR, setNewFR] = useState<UserFriendRequests[]>([]);
  const [oldFR, setOldFR] = useState<UserFriendRequests[]>([]);

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
    const newFr: UserFriendRequests[] = [];
    const oldFr: UserFriendRequests[] = [];
    friendRequests.forEach((fr) => {
      fr.status === 1 ? newFr.push(fr) : oldFr.push(fr);
    });
    setNewFR(newFr);
    setOldFR(oldFr);
  }, [friendRequests]);

  const renderNewFriendRequests = (friendRequests: UserFriendRequests[]) => {
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

  const renderOldFriendRequests = (friendRequests: UserFriendRequests[]) => {
    return friendRequests.map((friendRequest) => {
      return (
        <OldFriendRequests
          key={friendRequest._id}
          friendRequest={friendRequest}
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
