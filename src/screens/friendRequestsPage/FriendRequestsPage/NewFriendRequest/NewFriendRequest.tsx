import { useLoggedInUser } from "../../../../context/context_custom_hooks";
import {
  acceptFriendRequest,
  rejectFriendRequest,
} from "../../../../apis/animexpo/animexpo_updates";
import "./NewFriendRequest.css";
import { useLocalStorage } from "../../../../hooks/useLocalStorage";
import { UserFriendRequests } from "../../../../apis/animexpo/animexpo_updates.types";
import { JSX } from "react";
import { OnlineUser } from "../../../../socket.io/socket.io.tpyes";

const NewFriendRequest = ({
  friendRequest,
  setFriendRequests,
}: {
  friendRequest: UserFriendRequests;
  setFriendRequests: React.Dispatch<React.SetStateAction<UserFriendRequests[]>>;
}): JSX.Element => {
  const { createdAt, requester } = friendRequest;
  const { loggedInUser, socket } = useLoggedInUser();
  const { getLocalStorage, saveToLoggedUser } = useLocalStorage();

  const onAcceptClick = async (): Promise<void> => {
    console.log("object");
    try {
      const updatedLists = await acceptFriendRequest(
        loggedInUser.token,
        loggedInUser.username,
        requester._id
      );
      console.log(updatedLists);
      if (updatedLists) {
        setFriendRequests(updatedLists.updatedFriendRequestsList);
        saveToLoggedUser("friendsList", updatedLists.updatedFriendsList);

        const sessionID = getLocalStorage("sessionID");
        socket.auth = { sessionID, username: loggedInUser.username };
        socket?.emit("online_users");
        socket?.once("online_users", ({ users }: { users: OnlineUser[] }) => {
          console.log("accept online_users");
          const from = users.filter(
            (user) => user.username === requester.username
          );
          if (from) {
            socket?.emit("accept_friend_req", { from });
          }
        });
      } else throw new Error();
    } catch (e) {
      console.log(e);
    }
  };

  const onRejectClick = async (): Promise<void> => {
    try {
      const updatedFriendRequestsList = await rejectFriendRequest(
        loggedInUser.token,
        loggedInUser.username,
        requester._id
      );
      setFriendRequests(updatedFriendRequestsList);

      const sessionID = getLocalStorage("sessionID");
      socket.auth = { sessionID, username: loggedInUser.username };
      socket?.once("online_users", ({ users }: { users: OnlineUser[] }) => {
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
