import "./UserInfo.css";
import Avatar from "../Avatar/Avatar";
import UserFunction from "../UserFunction/UserFunction";
import ProfileFriends from "../ProfileFriends/ProfileFriends";
import PersonnalInfo from "../personnalInfo/PersonnalInfo";
import { UserProfileData } from "../../../apis/animexpo/animexpo_updates.types";
import { JSX } from "react";

const UserInfo = ({
  viewedProfile,
  username,
  setViewedProfile,
}: {
  viewedProfile: UserProfileData;
  username: string;
  setViewedProfile: React.Dispatch<React.SetStateAction<UserProfileData>>;
}): JSX.Element => {
  const { gender, birthday, joined, avatar, reviewsCount } =
    viewedProfile.personalInfo;

  return (
    <>
      <Avatar image={avatar.secure_url} />
      <UserFunction />
      <hr />
      <PersonnalInfo
        username={username}
        gender={gender}
        birthday={birthday}
        joined={joined}
        reviewsCount={reviewsCount}
      />
      <hr />
      <ProfileFriends friendsList={viewedProfile.friendsList.list} />
    </>
  );
};
export default UserInfo;
