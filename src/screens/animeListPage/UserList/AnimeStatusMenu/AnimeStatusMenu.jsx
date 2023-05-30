import "./AnimeStatusMenu.css";
const AnimeStatusMenu = ({ userList, setViewedStatus, dispatch }) => {
  const onAllClick = () => {
    setViewedStatus("All");
    dispatch({ type: "filter_all", list: userList });
  };
  const onCurrentlyWatchingClick = () => {
    setViewedStatus("Watching");
    dispatch({ type: "filter_watching", list: userList });
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
  const onPlanToWatchClick = () => {
    setViewedStatus("Plan to Watch");
    dispatch({ type: "filter_plantowatch", list: userList });
  };

  return (
    <div className="status-menu">
      <h1 onClick={onAllClick}>All</h1>
      <h1 onClick={onCurrentlyWatchingClick}>Currently Watching</h1>
      <h1 onClick={onCompletedClick}>Completed</h1>
      <h1 onClick={onDroppedClick}>Dropped</h1>
      <h1 onClick={onOnHoldClick}>On Hold</h1>
      <h1 onClick={onPlanToWatchClick}>Plan to Watch</h1>
    </div>
  );
};
export default AnimeStatusMenu;
