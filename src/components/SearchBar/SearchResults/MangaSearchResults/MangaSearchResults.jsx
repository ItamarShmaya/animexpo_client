import "./MangaSearchResults.css";

const MangaSearchResults = ({ manga }) => {
  const { title, images, genres, type, score } = manga;

  const renderGenres = (genres) => {
    return genres.map((genre) => {
      return <span key={genre.name}>{genre.name}</span>;
    });
  };

  return (
    <div className="search-result-item">
      <div className="image">
        <img alt={title} src={images.jpg.small_image_url} />
      </div>
      <div className="search-item-info">
        <div className="search-item-title">{title}</div>
        <div className="search-item-genre">
          <span className="underline">Genres:</span> {renderGenres(genres)}
        </div>
        <div className="search-item-type">
          <span className="underline">Type:</span> {type}
        </div>
        <div className="search-item-score">
          <span className="underline">Score:</span> {score || "N/A"}
        </div>
      </div>
    </div>
  );
};
export default MangaSearchResults;
