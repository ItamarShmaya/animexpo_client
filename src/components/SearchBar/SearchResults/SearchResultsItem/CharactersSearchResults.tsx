import { numberWithCommas } from "../../../../helpers/helpers";
import { JSX } from "react";
import "./SearchResultsItem.css";

const CharactersSearchResults = ({
  name,
  image,
  favourites,
  knownForTitle,
}: {
  name: string | undefined;
  image: string | undefined;
  favourites: number | undefined;
  knownForTitle: string | undefined;
}): JSX.Element => {
  return (
    <div className="search-result-item">
      <div className="image">
        <img alt={name} src={image} />
      </div>
      <div className="search-item-info">
        <h3 className="search-item-title">{name}</h3>
        <div>
          <span className="underline">Favourites:</span>{" "}
          {(favourites && numberWithCommas(favourites)) || "N/A"}
        </div>
        <div>
          <span className="underline">Known for:</span> {knownForTitle || "N/A"}
        </div>
      </div>
    </div>
  );
};
export default CharactersSearchResults;
