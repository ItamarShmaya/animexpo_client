import "./Profile.css";
import { useEffect, useState } from "react";
import SideMenu from "./SideMenu/SideMenu";
import UserInfo from "./UserInfo/UserInfo";
import { useParams, useNavigate } from "react-router-dom";
import { getUserProfileData } from "../../apis/animexpo/animexpo_requests.js";
import { useLocalStorage } from "../../hooks/useLocalStorage.js";
import { useLoggedInUser } from "../../context/context_custom_hooks.js";

const Profile = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [viewedProfile, setViewedProfile] = useState(null);
  const { getLocalStorage } = useLocalStorage();
  const { loggedInUser } = useLoggedInUser();

  useEffect(() => {
    const getUserProfile = async () => {
      if (username === loggedInUser?.username) {
        const profileData = getLocalStorage("loggedInUserProfileData");
        setViewedProfile(profileData);
      } else {
        try {
          const profileData = await getUserProfileData(username);
          if (profileData) {
            setViewedProfile(profileData);
          }
        } catch (e) {
          if (e === "UserNotFound") {
            navigate("/notfound");
          }
        }
      }
    };
    getUserProfile();
    // eslint-disable-next-line
  }, [loggedInUser?.username, username, navigate]);

  return (
    <div className="profile-page">
      {viewedProfile && (
        <>
          <SideMenu username={username} />
          <main className="main-profile-content">
            <div className="user-info">
              <UserInfo user={viewedProfile} />
            </div>
            <div className="profile-content">
              <h1 className="profile-heading">{username}</h1>
              <div className="about-me">
                {viewedProfile.personalInfo.aboutMe}
              </div>
            </div>
          </main>
        </>
      )}
    </div>
  );
};
export default Profile;
