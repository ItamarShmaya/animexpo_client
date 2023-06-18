import { renderArrayOfStringWithCommas } from "../../../../helpers/helpers";
import "./SearchResultsItem.css";

const MediaSearchResultsItem = ({
  image,
  title,
  genres,
  format,
  score,
  starDate,
}) => {
  return (
    <div className="search-result-item">
      <div className="image">
        <img alt={title} src={image} />
      </div>
      <div className="search-item-info">
        <h3>{title}</h3>
        <div className="search-item-list">
          <span className="underline">Genres:</span>{" "}
          <div className="list-container">
            {renderArrayOfStringWithCommas(genres)}
          </div>
        </div>
        <div>
          <span className="underline">Format:</span> {format || "N/A"}
        </div>

        <div>
          <span className="underline">Score:</span> {score || "N/A"}
        </div>

        <div>
          <span className="underline">Start date:</span> {starDate || "N/A"}
        </div>
      </div>
    </div>
  );
};

export default MediaSearchResultsItem;
