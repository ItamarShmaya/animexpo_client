import "./MangaInformation.css";

const AnimeInformation = ({ manga }) => {
  const { status, type, genres, themes, volumes, authors, chapters } = manga;

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
        <span className="sub-header">Status:</span>
        <span className="content">{status}</span>
      </div>
      <div className="info-item">
        <span className="sub-header">Volumes:</span>
        <span className="content">{volumes || "N/A"}</span>
      </div>
      <div className="info-item">
        <span className="sub-header">Chapters:</span>
        <span className="content">{chapters || "N/A"}</span>
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
        <span className="sub-header">Authors:</span>
        <span className="content">{renderList(authors)}</span>
      </div>
    </div>
  );
};
export default AnimeInformation;
