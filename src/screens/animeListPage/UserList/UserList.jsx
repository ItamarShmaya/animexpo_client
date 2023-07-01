import { useReducer } from "react";
import { useState } from "react";
import { viewedListReducer } from "../../../reducers/animeListReducer";
import "./UserList.css";
import { useLoggedInUser } from "../../../context/context_custom_hooks";

const UserList = ({
  userList,
  username,
  setUserList,
  ListItem,
  StatusMenu,
}) => {
  const [, setScoreAsc] = useState(null);
  const [, setTitleAsc] = useState(null);
  const [viewedStatus, setViewedStatus] = useState("All");
  const [viewedList, dispatch] = useReducer(viewedListReducer, userList);
  const { loggedInUser } = useLoggedInUser();

  const renderList = (list) => {
    return list.map((item, i) => {
      return (
        <ListItem
          key={item.id}
          item={item}
          username={username}
          userList={userList}
          setUserList={setUserList}
          dispatch={dispatch}
          number={i + 1}
        />
      );
    });
  };

  const onTitleClick = () => {
    setTitleAsc((prev) => {
      prev === true
        ? dispatch({ type: "sort_titleDesc" })
        : dispatch({ type: "sort_titleAsc" });
      return !prev;
    });
  };

  const onScoreClick = () => {
    setScoreAsc((prev) => {
      prev === true
        ? dispatch({ type: "sort_scoreDesc" })
        : dispatch({ type: "sort_scoreAsc" });
      return !prev;
    });
  };

  return (
    <>
      <StatusMenu
        setViewedStatus={setViewedStatus}
        dispatch={dispatch}
        userList={userList}
      />
      <div className="list-page">
        <h1 className="viewed-status">{viewedStatus}</h1>
        <div className="mylist-container">
          <div
            id="list-header"
            className={`list-item ${
              loggedInUser?.username === username ? "nine-grid" : "eight-grid"
            }`}
          >
            <div className="mylist-item-number">#</div>
            <div className="mylist-item-img-container"></div>
            <div className="mylist-item-title sort" onClick={onTitleClick}>
              Title
            </div>
            <div className="mylist-item-type">Format</div>
            <div className="mylist-item-episodes">Progress</div>
            <div className="mylist-item-status">Status</div>
            <div className="mylist-item-score sort" onClick={onScoreClick}>
              Score
            </div>
            <div className="mylist-item-comment">Comment</div>
          </div>
          {renderList(viewedList)}
        </div>
      </div>
    </>
  );
};
export default UserList;
