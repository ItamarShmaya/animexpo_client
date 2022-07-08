import "./UsersSearchResults.css";

const UsersSearchResults = ({ user }) => {
  console.log(user);
  return (
    <div className="search-result-item">
      <div className="image">
        <img alt={user.username} src={user.image} />
      </div>
      <div className="search-item-info">
        <div className="search-item-title">{user.username}</div>
      </div>
    </div>
  );
};
export default UsersSearchResults;
