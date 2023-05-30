import "./MangaStatusMenu.css";
const MangaStatusMenu = ({ setViewedStatus }) => {
  return (
    <div className="status-menu">
      <h1 onClick={() => setViewedStatus("All")}>All</h1>
      <h1 onClick={() => setViewedStatus("Reading")}>Currently Reading</h1>
      <h1 onClick={() => setViewedStatus("Completed")}>Completed</h1>
      <h1 onClick={() => setViewedStatus("On Hold")}>On Hold</h1>
      <h1 onClick={() => setViewedStatus("Dropped")}>Dropped</h1>
      <h1 onClick={() => setViewedStatus("Plan to Read")}>Plan to Read</h1>
    </div>
  );
};
export default MangaStatusMenu;
