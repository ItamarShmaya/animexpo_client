import { renderArrayOfStringWithCommas } from "../../../../helpers/helpers";
import "./SearchResultsItem.css";
import { JSX } from "react";

const StaffSearchResults = ({
  name,
  image,
  age,
  dateOfBirth,
  primaryOccupations,
}: {
  name: string | undefined;
  image: string | undefined;
  age: number | undefined;
  dateOfBirth: string | undefined;
  primaryOccupations: string[] | undefined;
}): JSX.Element => {
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
        <div className="search-item-list">
          <span className="underline">Primary Occupations:</span>{" "}
          <div className="list-container">
            {(primaryOccupations &&
              renderArrayOfStringWithCommas(primaryOccupations)) ||
              "N/A"}
          </div>
        </div>
      </div>
    </div>
  );
};
export default StaffSearchResults;
