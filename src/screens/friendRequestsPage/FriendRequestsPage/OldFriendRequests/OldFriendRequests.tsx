import { UserFriendRequests } from "../../../../apis/animexpo/animexpo_updates.types";
import "./OldFriendRequests.css";
import {JSX} from "react"

const OldFriendRequests = ({ friendRequest }: {friendRequest: UserFriendRequests}): JSX.Element => {
  const { createdAt, requester } = friendRequest;
  return (
    <div className="old-friend-req">
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
          <div className="bbb">
            <p className={friendRequest.status === 2 ? "accepted" : "rejected"}>
              {friendRequest.status === 2 ? "Accepted" : "Rejected"}
            </p>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
};
export default OldFriendRequests;
