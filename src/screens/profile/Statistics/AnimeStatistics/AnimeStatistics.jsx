import { useEffect, useState } from "react";
import ChartDisplay from "./ChartDisplay/ChartDisplay";
import "./AnimeStatistics.css";

const AnimeStatistics = ({ viewedUserAnimeList }) => {
  const [watching, setWatching] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [dropped, setDropped] = useState(0);
  const [onHold, setOnHold] = useState(0);
  const [planToWatch, setPlanToWatch] = useState(0);
  const [meanScore, setMeanScore] = useState(0);
  const [animeList, setAnimeList] = useState(viewedUserAnimeList);
  const [chartType, setChartType] = useState("bar");

  useEffect(() => {
    setAnimeList(viewedUserAnimeList);
  }, [viewedUserAnimeList]);

  useEffect(() => {
    let watchingCounter = 0;
    let completedCounter = 0;
    let droppedCounter = 0;
    let onHoldCounter = 0;
    let planToWatchCounter = 0;
    let totalScore = 0;

    animeList.list.forEach((entry) => {
      totalScore += entry.score;
      if (entry.status === "Watching") return (watchingCounter += 1);
      if (entry.status === "Completed") return (completedCounter += 1);
      if (entry.status === "Dropped") return (droppedCounter += 1);
      if (entry.status === "On Hold") return (onHoldCounter += 1);
      if (entry.status === "Plan to Watch") return (planToWatchCounter += 1);
    });

    setWatching(watchingCounter);
    setCompleted(completedCounter);
    setDropped(droppedCounter);
    setOnHold(onHoldCounter);
    setPlanToWatch(planToWatchCounter);
    if (animeList.list.length < 1) return setMeanScore(0);
    setMeanScore((totalScore / animeList.list.length).toFixed(2));
  }, [
    animeList,
    watching,
    completed,
    dropped,
    onHold,
    planToWatch,
  ]);

  return (
    <>
      <div className="profile-anime-stats">
        <div className="stats-data">
          <p className="watching">
            Watching: <span>{watching}</span>
          </p>
          <p className="completed">
            Completed: <span>{completed}</span>
          </p>
          <p className="dropped">
            Dropped: <span>{dropped}</span>
          </p>
          <p className="on-hold">
            On Hold: <span>{onHold}</span>
          </p>
          <p className="plan-to-watch">
            Plan to Watch: <span>{planToWatch}</span>
          </p>
          <p>
            Total Entries: <span>{animeList.list.length}</span>
          </p>
          <p>
            Mean Score: <span>{meanScore}</span>
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
              type={chartType}
              watching={watching}
              completed={completed}
              dropped={dropped}
              onHold={onHold}
              planToWatch={planToWatch}
              totalEntries={animeList.list.length}
            />
          }
        </div>
      </div>
    </>
  );
};
export default AnimeStatistics;
