import { animeFormats, mangaFormats } from "../../helpers/helpers";
import "./AdvancedSearchPage.css";
import MediaAdvancedSearch from "./MediaAdvancedSearch/MediaAdvancedSearch";

const AdvancedSearchPage = ({ type }) => {
  return (
    <div className="search-page">
      {type === "anime" && (
        <MediaAdvancedSearch type={type} formats={animeFormats} />
      )}
      {type === "manga" && (
        <MediaAdvancedSearch
          type={type}
          formats={mangaFormats}
          showSeasonFilter={false}
        />
      )}
      {type === "staff" && <div>Staff Search</div>}
    </div>
  );
};

export default AdvancedSearchPage;
