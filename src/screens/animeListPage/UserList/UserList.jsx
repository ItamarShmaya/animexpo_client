import "./UserList.css";

const UserList = ({ userList, username, setUserList, ListItem }) => {
  const renderList = (list) => {
    console.log(list);
    const sortedList = [...list].sort((item1, item2) => {
      return item1.title.toLowerCase().localeCompare(item2.title.toLowerCase());
    });
    return sortedList.map((item, i) => {
      return (
        <ListItem
          key={item.mal_id}
          item={item}
          username={username}
          setUserList={setUserList}
          number={i + 1}
        />
      );
    });
  };
  return (
    <div className="mylist-container">
      <div className="mobile-list-header">List</div>
      <div id="list-header" className="list-item">
        <div className="mylist-item-number">#</div>
        <div className="mylist-item-img-container"></div>
        <div className="mylist-item-title">Title</div>
        <div className="mylist-item-type">Type</div>
        <div className="mylist-item-episodes">Progress</div>
        <div className="mylist-item-status">Status</div>
        <div className="mylist-item-score">Score</div>
        <div className="mylist-item-comment">Comment</div>
      </div>
      {renderList(userList)}
    </div>
  );
};
export default UserList;
