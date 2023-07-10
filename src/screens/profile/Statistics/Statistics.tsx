import "./Statistics.css";
import ListStatistics from "./ListStatistics/ListStatistics";
import { JSX } from "react";
import { StatisticsProps } from "./Statistics.types";

const Statistics = ({
  viewedUserAnimeList,
  viewedUserMangaList,
}: StatisticsProps): JSX.Element => {
  return (
    <>
      <h1>Anime Stats</h1>
      {viewedUserAnimeList && (
        <ListStatistics
          listType={"anime"}
          viewedUserList={viewedUserAnimeList}
        />
      )}
      <h1>Manga Stats</h1>
      {viewedUserMangaList && (
        <ListStatistics
          listType={"manga"}
          viewedUserList={viewedUserMangaList}
        />
      )}
    </>
  );
};
export default Statistics;
