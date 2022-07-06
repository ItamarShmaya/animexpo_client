import "./CharactersSearchResults.css";

const CharactersSearchResults = ({ character }) => {
  const { name, images } = character;
  return (
    <div className="search-result-item">
      <div className="image">
        <img alt={name} src={images.jpg.image_url} />
      </div>
      <div className="search-item-info">
        <div className="search-item-title">{name}</div>
      </div>
    </div>
  );
};
export default CharactersSearchResults;
