import { renderArrayOfStringWithCommas } from "../../../../helpers/helpers";
import "./SearchResultsItem.css";

const PeopleSearchResults = ({
  name,
  image,
  age,
  dateOfBirth,
  primaryOccupations,
}) => {
  return (
    <div className="search-result-item">
      <div className="image">
        <img alt={name} src={image} />
      </div>
      <div className="search-item-info">
        <h3 className="search-item-title">{name}</h3>
        <div>
          <span className="underline">Date of brith:</span>{" "}
          {dateOfBirth || "N/A"}
        </div>
        <div>
          <span className="underline">Age:</span> {age || "N/A"}
        </div>
        <div>
          <span className="underline">Primary Occupations:</span>{" "}
          {renderArrayOfStringWithCommas(primaryOccupations) || "N/A"}
        </div>
      </div>
    </div>
  );
};
export default PeopleSearchResults;
