import { useEffect } from "react";
import { useState } from "react";
import "./UserList.css";

const UserList = ({ userList, username, setUserList, ListItem }) => {
  const [scoreAsc, setScoreAsc] = useState(null);
  const [titleAsc, setTitleAsc] = useState(null);
  const [viewedList, setViewedList] = useState(userList);
  const [viewedStatus, setViewedStatus] = useState("All");

  useEffect(() => {
    if (scoreAsc === false) sortListByScoreDesc();
    if (scoreAsc === true) sortListByScoreAsc();
    // eslint-disable-next-line
  }, [scoreAsc]);
  useEffect(() => {
    if (titleAsc === false) sortListByTitleDesc();
    if (titleAsc === true) sortListByTitleAsc();
    // eslint-disable-next-line
  }, [titleAsc]);

  const renderList = (list) => {
    return list.map((item, i) => {
      return (
        <ListItem
          key={item.mal_id}
          item={item}
          username={username}
          userList={userList}
          setUserList={setUserList}
          viewedList={viewedList}
          setViewedList={setViewedList}
          number={i + 1}
        />
      );
    });
  };

  const sortListByScoreDesc = () => {
    const sortedList = [...userList];
    sortedList.sort((item1, item2) => {
      return item2.score - item1.score;
    });
    setViewedList(sortedList);
  };

  const sortListByScoreAsc = () => {
    const sortedList = [...userList];
    sortedList.sort((item1, item2) => {
      return item1.score - item2.score;
    });
    setViewedList(sortedList);
  };

  const sortListByTitleDesc = () => {
    const sortedList = [...userList];
    sortedList.sort((item1, item2) => {
      return item2.title.toLowerCase().localeCompare(item1.title.toLowerCase());
    });
    setViewedList(sortedList);
  };

  const sortListByTitleAsc = () => {
    const sortedList = [...userList];
    sortedList.sort((item1, item2) => {
      return item1.title.toLowerCase().localeCompare(item2.title.toLowerCase());
    });
    setViewedList(sortedList);
  };

  useEffect(() => {
    if (viewedStatus === "All") {
      setViewedList(userList);
      return;
    }
    const filteredList = userList.filter((entry) => {
      return entry.status === viewedStatus;
    });
    setViewedList(filteredList);
  }, [viewedStatus, userList]);

  return (
    <>
      <div className="status-menu">
        <h1 onClick={() => setViewedStatus("All")}>All</h1>
        <h1 onClick={() => setViewedStatus("Watching")}>Currently Watching</h1>
        <h1 onClick={() => setViewedStatus("Completed")}>Completed</h1>
        <h1 onClick={() => setViewedStatus("On Hold")}>On Hold</h1>
        <h1 onClick={() => setViewedStatus("Dropped")}>Dropped</h1>
        <h1 onClick={() => setViewedStatus("Plan to Watch")}>Plan to Watch</h1>
      </div>
      <h1 className="viewed-status">{viewedStatus}</h1>
      <div className="mylist-container">
        <div id="list-header" className="list-item">
          <div className="mylist-item-number">#</div>
          <div className="mylist-item-img-container"></div>
          <div
            className="mylist-item-title sort"
            onClick={() => setTitleAsc((prev) => !prev)}
          >
            Title
          </div>
          <div className="mylist-item-type">Type</div>
          <div className="mylist-item-episodes">Progress</div>
          <div className="mylist-item-status">Status</div>
          <div
            className="mylist-item-score sort"
            onClick={() => setScoreAsc((prev) => !prev)}
          >
            Score
          </div>
          <div className="mylist-item-comment">Comment</div>
        </div>
        {renderList(viewedList)}
      </div>
    </>
  );
};
export default UserList;
