import "./AdvancedSearchPage.css";
import AnimeAdvancedSearch from "./AnimeAdvancedSearch/AnimeAdvancedSearch";

const AdvancedSearchPage = ({ type, catagory }) => {
  return (
    <div className="search-page">
      {type === "anime" && <AnimeAdvancedSearch catagory={catagory} />}
      {type === "manga" && <div>Manga Search</div>}
      {type === "characters" && <div>Characters Search</div>}
      {type === "staff" && <div>Staff Search</div>}
    </div>
  );
};

export default AdvancedSearchPage;
