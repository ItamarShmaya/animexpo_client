import { useLoggedInUser } from "../../../../context/context_custom_hooks.js";
import {
  acceptFriendRequest,
  rejectFriendRequest,
} from "../../../../apis/animexpo/animexpo_updates.js";
import "./NewFriendRequest.css";
import { useLocalStorage } from "../../../../hooks/useLocalStorage.js";

const NewFriendRequest = ({ friendRequest, setFriendRequests }) => {
  const { createdAt, requester } = friendRequest;
  const { loggedInUser, socket } = useLoggedInUser();
  const { setLocalStorage } = useLocalStorage();

  const onAcceptClick = async () => {
    try {
      const updatedLists = await acceptFriendRequest(
        loggedInUser.token,
        loggedInUser.username,
        requester
      );

      setFriendRequests(updatedLists.updatedFriendRequestsList);
      setLocalStorage(
        "loggedInUserFriendsList",
        updatedLists.updatedFriendsList
      );

      socket?.emit("online_users");
      socket?.once("online_users", ({ users }) => {
        console.log("accept online_users");
        const from = users.filter(
          (user) => user.username === requester.username
        );
        if (from) {
          socket?.emit("accept_friend_req", { from });
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  const onRejectClick = async () => {
    try {
      const updatedFriendRequestsList = await rejectFriendRequest(
        loggedInUser.token,
        loggedInUser.username,
        requester
      );
      setFriendRequests(updatedFriendRequestsList);
      socket?.once("online_users", ({ users }) => {
        console.log("reject online_users");
        const from = users.filter(
          (user) => user.username === requester.username
        );
        if (from) {
          socket?.emit("reject_friend_req", { from });
        }
      });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="new-friend-req">
      <div className="req-heading">
        <h2>Friend Request</h2>
        <p>{new Date(createdAt).toUTCString()}</p>
      </div>
      <div className="">
        <div>
          <img src={requester.avatar.secure_url} alt="" />
        </div>
        <div className="asd">
          <p>{`${requester.username} sent you a friend request`}</p>
          <div className="actions">
            <div className="accept-req" onClick={onAcceptClick}>
              Accept
            </div>
            <div className="reject-req" onClick={onRejectClick}>
              Reject
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NewFriendRequest;
