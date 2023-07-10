import "./SearchResultsItem.css";
import { JSX } from "react";

const UsersSearchResults = ({
  username,
  image,
}: {
  username: string | undefined;
  image: string | undefined;
}): JSX.Element => {
  return (
    <div className="search-result-item">
      <div className="image">
        <img alt={username} src={image} />
      </div>
      <div className="search-item-info">
        <h3 className="search-item-title">{username}</h3>
      </div>
    </div>
  );
};
export default UsersSearchResults;
