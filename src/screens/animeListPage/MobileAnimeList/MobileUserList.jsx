import "./MobileUserList.css";

const MobileUserList = ({
  userList,
  setUserList,
  ListItem,
  username,
  updateEntry,
}) => {
  const renderList = (animeList) => {
    return animeList.map((item) => {
      return (
        <ListItem
          key={item.id}
          item={item}
          username={username}
          userList={userList}
          setUserList={setUserList}
          updateEntry={updateEntry}
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
