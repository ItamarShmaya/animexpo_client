import "./MangaStatusMenu.css";
const MangaStatusMenu = ({ userList, setViewedStatus, dispatch }) => {
  const onAllClick = () => {
    setViewedStatus("All");
    dispatch({ type: "filter_all", list: userList });
  };
  const onCurrentlyReadingClick = () => {
    setViewedStatus("Reading");
    dispatch({ type: "filter_reading", list: userList });
  };
  const onCompletedClick = () => {
    setViewedStatus("Completed");
    dispatch({ type: "filter_completed", list: userList });
  };
  const onDroppedClick = () => {
    setViewedStatus("Dropped");
    dispatch({ type: "filter_dropped", list: userList });
  };
  const onOnHoldClick = () => {
    setViewedStatus("On Hold");
    dispatch({ type: "filter_onhold", list: userList });
  };
  const onPlanToReadClick = () => {
    setViewedStatus("Plan to Read");
    dispatch({ type: "filter_plantoread", list: userList });
  };

  return (
    <div className="status-menu">
      <h1 onClick={onAllClick}>All</h1>
      <h1 onClick={onCurrentlyReadingClick}>Currently Reading</h1>
      <h1 onClick={onCompletedClick}>Completed</h1>
      <h1 onClick={onDroppedClick}>Dropped</h1>
      <h1 onClick={onOnHoldClick}>On Hold</h1>
      <h1 onClick={onPlanToReadClick}>Plan to Read</h1>
    </div>
  );
};
export default MangaStatusMenu;
