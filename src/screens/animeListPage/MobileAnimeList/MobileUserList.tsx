import { UserMediaEntry } from "../../../apis/animexpo/animexpo_updates.types";
import "./MobileUserList.css";
import { MobileUserListProps } from "./MobileUserList.types";
import { JSX } from "react";

const MobileUserList = ({
  userList,
  setUserList,
  ListItem,
  username,
  updateEntry,
  mediaType
}: MobileUserListProps): JSX.Element => {
  const renderList = (list: UserMediaEntry[]) => {
    return list.map((item) => {
      return (
        <ListItem
          key={item.id}
          item={item}
          username={username}
          userList={userList}
          setUserList={setUserList}
          updateEntry={updateEntry}
          mediaType={mediaType}
        />
      );
    });
  };

  return (
    <div className="mobile-list-wrapper">
      <div className="mobile-list-container">{renderList(userList)}</div>
    </div>
  );
};
export default MobileUserList;
