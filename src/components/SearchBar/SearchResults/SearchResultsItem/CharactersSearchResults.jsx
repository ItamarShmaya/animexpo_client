import { numberWithCommas } from "../../../../helpers/helpers";
import "./SearchResultsItem.css";

const CharactersSearchResults = ({
  name,
  image,
  favourites,
  knownForTitle,
}) => {
  return (
    <div className="search-result-item">
      <div className="image">
        <img alt={name} src={image} />
      </div>
      <div className="search-item-info">
        <h3 className="search-item-title">{name}</h3>
        <div>
          <span className="underline">Favourites:</span>{" "}
          {numberWithCommas(favourites) || "N/A"}
        </div>
        <div>
          <span className="underline">Known for:</span> {knownForTitle || "N/A"}
        </div>
      </div>
    </div>
  );
};
export default CharactersSearchResults;
