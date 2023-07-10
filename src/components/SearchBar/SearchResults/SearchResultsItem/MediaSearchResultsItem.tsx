import { ApiMediaFormatType } from "../../../../apis/aniList/aniListTypes.types";
import { renderArrayOfStringWithCommas } from "../../../../helpers/helpers";
import { JSX } from "react";
import "./SearchResultsItem.css";

const MediaSearchResultsItem = ({
  image,
  title,
  genres,
  format,
  score,
  startDate,
}: {
  image: string | undefined;
  title: string | undefined;
  genres: string[] | undefined;
  format: ApiMediaFormatType | undefined;
  score: number | undefined;
  startDate: string | undefined;
}): JSX.Element => {
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
            {genres && renderArrayOfStringWithCommas(genres)}
          </div>
        </div>
        <div>
          <span className="underline">Format:</span> {format || "N/A"}
        </div>

        <div>
          <span className="underline">Score:</span> {score || "N/A"}
        </div>

        <div>
          <span className="underline">Start date:</span> {startDate || "N/A"}
        </div>
      </div>
    </div>
  );
};

export default MediaSearchResultsItem;
