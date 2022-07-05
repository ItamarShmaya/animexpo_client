import "./AnimeInformation.css";

const AnimeInformation = ({ anime }) => {
  const {
    duration,
    status,
    type,
    year,
    episodes,
    genres,
    rating,
    source,
    studios,
    themes,
  } = anime;

  const renderList = (list) => {
    return list.map((item, i) => {
      return (
        <span key={item.name}>
          {item.name}
          {i !== list.length - 1 ? ", " : ""}
        </span>
      );
    });
  };
  return (
    <div className="anime-information">
      <h1>Information</h1>
      <div className="info-item">
        <span className="sub-header">Type:</span>
        <span className="content">{type}</span>
      </div>
      <div className="info-item">
        <span className="sub-header">Year:</span>
        <span className="content">{year}</span>
      </div>
      <div className="info-item">
        <span className="sub-header">Episodes:</span>
        <span className="content">{episodes}</span>
      </div>
      <div className="info-item">
        <span className="sub-header">Duration:</span>
        <span className="content">{duration}</span>
      </div>
      <div className="info-item">
        <span className="sub-header">Status:</span>
        <span className="content">{status}</span>
      </div>
      <div className="info-item">
        <span className="sub-header">Studio:</span>
        <span className="content">{renderList(studios)}</span>
      </div>
      <div className="info-item">
        <span className="sub-header">Source:</span>
        <span className="content">{source}</span>
      </div>
      <div className="info-item">
        <span className="sub-header">Genres:</span>
        <span className="content">{renderList(genres)}</span>
      </div>
      <div className="info-item">
        <span className="sub-header">Themes:</span>
        <span className="content">{renderList(themes)}</span>
      </div>
      <div className="info-item">
        <span className="sub-header">Rating:</span>
        <span className="content">{rating}</span>
      </div>
    </div>
  );
};
export default AnimeInformation;
