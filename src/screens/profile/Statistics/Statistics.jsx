import "./Statistics.css";
import AnimeStatistics from "./AnimeStatistics/AnimeStatistics";

const Statistics = ({ viewedUserAnimeList, viewedUserMangaList }) => {
  return (
    <>
      <h1>Anime Stats</h1>
      {viewedUserAnimeList && (
        <AnimeStatistics viewedUserAnimeList={viewedUserAnimeList} />
      )}
    </>
  );
};
export default Statistics;
