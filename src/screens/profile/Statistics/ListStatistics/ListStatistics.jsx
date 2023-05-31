import { useEffect, useState } from "react";
import ChartDisplay from "./ChartDisplay/ChartDisplay";
import "./ListStatistics.css";

const ListStatistics = ({ listType, viewedUserList }) => {
  const [currentlyEngaging, setCurrentlyEngaging] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [dropped, setDropped] = useState(0);
  const [onHold, setOnHold] = useState(0);
  const [planTo, setPlanTo] = useState(0);
  const [meanScore, setMeanScore] = useState(0);
  const [chartType, setChartType] = useState("bar");
  const [chartLabels, setChartLabels] = useState([]);

  useEffect(() => {
    let currentlyEngaging = 0;
    let completedCounter = 0;
    let droppedCounter = 0;
    let onHoldCounter = 0;
    let planToCounter = 0;
    let totalScore = 0;

    viewedUserList.list.forEach((entry) => {
      totalScore += entry.score;
      if (listType === "anime") {
        setChartLabels([
          "Watching",
          "Completed",
          "Dropped",
          "On Hold",
          "Plan to Watch",
        ]);
        if (entry.status === "Watching") return (currentlyEngaging += 1);
        if (entry.status === "Plan to Watch") return (planToCounter += 1);
      } else if (listType === "manga") {
        setChartLabels([
          "Reading",
          "Completed",
          "Dropped",
          "On Hold",
          "Plan to Read",
        ]);
        if (entry.status === "Reading") return (currentlyEngaging += 1);
        if (entry.status === "Plan to Read") return (planToCounter += 1);
      }
      if (entry.status === "Completed") return (completedCounter += 1);
      if (entry.status === "Dropped") return (droppedCounter += 1);
      if (entry.status === "On Hold") return (onHoldCounter += 1);
    });

    setCurrentlyEngaging(currentlyEngaging);
    setCompleted(completedCounter);
    setDropped(droppedCounter);
    setOnHold(onHoldCounter);
    setPlanTo(planToCounter);
    if (viewedUserList.list.length < 1) return setMeanScore(0);
    setMeanScore((totalScore / viewedUserList.list.length).toFixed(2));
  }, [
    viewedUserList,
    currentlyEngaging,
    completed,
    dropped,
    onHold,
    planTo,
    listType,
  ]);

  return (
    <>
      <div className="profile-stats">
        <div className="stats-data">
          <p className="watching">
            <span className="right">
              {listType === "anime" && "Watching: "}
              {listType === "manga" && "Reading: "}
            </span>
            <span className="mid"></span>
            <span className="left">{currentlyEngaging}</span>
          </p>
          <p className="completed">
            <span className="right">Completed: </span>
            <span className="mid"></span>
            <span className="left">{completed}</span>
          </p>
          <p className="dropped">
            <span className="right">Dropped: </span>
            <span className="mid"></span>
            <span className="left">{dropped}</span>
          </p>
          <p className="on-hold">
            <span className="right">On Hold: </span>
            <span className="mid"></span>
            <span className="left">{onHold}</span>
          </p>
          <p className="plan-to-watch">
            <span className="right">
              {listType === "anime" && "Plan to Watch: "}
              {listType === "manga" && "Plan to Read: "}
            </span>
            <span className="mid"></span>
            <span className="left">{planTo}</span>
          </p>
          <p>
            <span className="right">Total Entries: </span>
            <span className="mid"></span>
            <span className="left">{viewedUserList.list.length}</span>
          </p>
          <p>
            <span className="right">Mean Score: </span>
            <span className="mid"></span>
            <span className="left">{meanScore}</span>
          </p>
        </div>
        <div className="chart">
          <div className="chart-icon">
            {chartType === "bar" && (
              <i
                className="fa-solid fa-chart-pie fa-2x"
                onClick={() => {
                  setChartType("pie");
                }}
              ></i>
            )}
            {chartType === "pie" && (
              <i
                className="fa-solid fa-chart-simple fa-2x"
                onClick={() => setChartType("bar")}
              ></i>
            )}
          </div>
          {
            <ChartDisplay
              labels={chartLabels}
              chartType={chartType}
              currentlyEngaging={currentlyEngaging}
              completed={completed}
              dropped={dropped}
              onHold={onHold}
              planTo={planTo}
              totalEntries={viewedUserList.list.length}
            />
          }
        </div>
      </div>
      <hr />
    </>
  );
};
export default ListStatistics;
