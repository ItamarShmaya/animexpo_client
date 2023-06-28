import "./AdvancedSearchPage.css";
import AnimeAdvancedSearch from "./AnimeAdvancedSearch/AnimeAdvancedSearch";

const AdvancedSearchPage = ({ type }) => {
  return (
    <div className="search-page">
      {type === "anime" && <AnimeAdvancedSearch type={type} />}
      {type === "manga" && <div>Manga Search</div>}
      {type === "staff" && <div>Staff Search</div>}
    </div>
  );
};

export default AdvancedSearchPage;
