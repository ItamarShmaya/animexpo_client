import "./EntrySideInformation.css";
import {
  MONTHS,
  capitalizeSnakeCase,
  capitalizeWord,
  formatsStringRender,
} from "../../../../helpers/helpers.js";

const EntrySideInformation = ({ entry }) => {
  const {
    duration,
    status,
    format,
    startDate,
    endDate,
    episodes,
    volumes,
    chapters,
    season,
    genres,
    source,
    studios,
    title,
  } = entry;

  const renderStudios = () => {
    return studios.edges.map((edge) => {
      return <span key={edge.node.id}>{edge.node.name}</span>;
    });
  };

  const renderList = (list) => {
    return list.map((item, i) => {
      return <span key={item}>{item}</span>;
    });
  };

  return (
    <div className="entry-information">
      <h3>Information</h3>
      {format && (
        <div className="info-item">
          <span className="sub-header">Format:</span>
          <span className="content">{formatsStringRender(format)}</span>
        </div>
      )}
      {episodes && (
        <div className="info-item">
          <span className="sub-header">Episodes:</span>
          <span className="content">{episodes}</span>
        </div>
      )}
      {volumes && (
        <div className="info-item">
          <span className="sub-header">Volumes:</span>
          <span className="content">{volumes}</span>
        </div>
      )}
      {chapters && (
        <div className="info-item">
          <span className="sub-header">Chapters:</span>
          <span className="content">{chapters}</span>
        </div>
      )}
      {duration && (
        <div className="info-item">
          <span className="sub-header">Episodes Duration:</span>
          <span className="content">{duration} mins</span>
        </div>
      )}
      {status && (
        <div className="info-item">
          <span className="sub-header">Status:</span>
          <span className="content">
            {status.includes("_")
              ? capitalizeSnakeCase(status)
              : capitalizeWord(status)}
          </span>
        </div>
      )}
      {startDate && startDate.day && startDate.month && startDate.year && (
        <div className="info-item">
          <span className="sub-header">Start Date:</span>
          <span className="content">{`${MONTHS[startDate.month]} ${
            startDate.day
          }, ${startDate.year}`}</span>
        </div>
      )}
      {endDate && endDate.day && endDate.month && endDate.year && (
        <div className="info-item">
          <span className="sub-header">End Date:</span>
          <span className="content">{`${MONTHS[endDate.month]} ${
            endDate.day
          }, ${endDate.year}`}</span>
        </div>
      )}
      {season && (
        <div className="info-item">
          <span className="sub-header">Season:</span>
          <span className="content">
            {season[0] + season.substring(1).toLowerCase()}
          </span>
        </div>
      )}
      {studios && studios.length && (
        <div className="info-item">
          <span className="sub-header">Studios:</span>
          <span className="content flex-col">{renderStudios()}</span>
        </div>
      )}
      {source && (
        <div className="info-item">
          <span className="sub-header">Source:</span>
          <span className="content">
            {source[0] + source.substring(1).toLowerCase()}
          </span>
        </div>
      )}
      {genres && genres.length > 0 && (
        <div className="info-item">
          <span className="sub-header">Genres:</span>
          <span className="content flex-col">{renderList(genres)}</span>
        </div>
      )}
      {title.romaji && (
        <div className="info-item">
          <span className="sub-header">Romanji:</span>
          <span className="content">{title.romaji}</span>
        </div>
      )}
      {title.english && (
        <div className="info-item">
          <span className="sub-header">English:</span>
          <span className="content">{title.english}</span>
        </div>
      )}
      {title.native && (
        <div className="info-item">
          <span className="sub-header">Native:</span>
          <span className="content">{title.native}</span>
        </div>
      )}
    </div>
  );
};
export default EntrySideInformation;
