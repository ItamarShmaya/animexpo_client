import { useEffect, useState } from "react";
import "./MobileAnimeListItem.css";
import MobileEditWindow from "../MobileEditWindow/MobileEditWindow";
import { useLoggedInUser } from "../../../../context/context_custom_hooks";
import { NavLink, useParams } from "react-router-dom";

const MobileAnimeListItem = ({ item, userList, setUserList }) => {
  const [isEdit, setIsEdit] = useState(false);
  const { image, title, episodes, progress, score, mal_id } = item;
  const { loggedInUser } = useLoggedInUser();
  const [isloggedInUserList, setIsLoggedInUserList] = useState(false);
  const { username } = useParams();

  useEffect(() => {
    if (loggedInUser?.username === username) setIsLoggedInUserList(true);
  }, [loggedInUser?.username, username]);

  const renderEditWindow = () => {
    return (
      <MobileEditWindow
        item={item}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        userList={userList}
        setUserList={setUserList}
      />
    );
  };

  return (
    <div
      className="mobile-list-item-container"
      style={{
        backgroundImage: `url(${image})`,
        backgroundRepeat: "no-repeat",
        backgroundPositionX: "center",
        backgroundPositionY: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="mobile-list-item-wrapper">
        <div className="mobile-list-item-edit">
          {isloggedInUserList && (
            <i
              className="fa-solid fa-pen-to-square fa-2x mobile-list-edit-icon"
              onClick={() => setIsEdit((prev) => !prev)}
            ></i>
          )}
        </div>
        <NavLink
          to={`/anime/${mal_id}`}
          className="mobile-list-item-background"
        ></NavLink>
        <div className="mobile-list-item-info">
          <div className="mobile-list-item-info-left-side">
            <div className="mobile-list-item-title">{title}</div>
            <div className="mobile-list-item-watched">
              <span>{"Watched: "}</span>
              <span>
                {progress}/{episodes}
              </span>
            </div>
          </div>
          <div className="mobile-list-item-info-right-side">
            <i className="fa-solid fa-star"></i> {score}
          </div>
        </div>
      </div>
      {isEdit && renderEditWindow()}
    </div>
  );
};

export default MobileAnimeListItem;