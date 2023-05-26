import "./MobileMangaList.css";

const MobileMangaList = ({ userList, setUserList, ListItem }) => {
  const renderList = (animeList) => {
    return animeList.map((item) => {
      return (
        <ListItem
          key={item.mal_id}
          item={item}
          userList={userList}
          setUserList={setUserList}
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
export default MobileMangaList;
