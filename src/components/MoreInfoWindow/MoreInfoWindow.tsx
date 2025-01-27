import { useEffect, useState } from "react";
import "./MoreInfoWindow.css";
import DOMPurify from "dompurify";
import { capitalizeSentence, capitalizeWord } from "../../helpers/helpers";

const MoreInfoWindow = ({
  cardWidth,
  title,
  description,
  season,
  seasonYear,
  studios,
  genres,
  format,
  averageScore,
  right,
}: any): JSX.Element => {
  const [cleanDescription, setCleanDescription] = useState<string>("");

  useEffect(() => {
    const cleanDes = DOMPurify.sanitize(description, {
      USE_PROFILES: { html: true },
    });
    setCleanDescription(cleanDes);
  }, [description]);

  const renderGenres = () => {
    if (!genres) return;
    return genres.map((genre: any) => {
      return (
        <div key={genre} className="genre">
          {genre}
        </div>
      );
    });
  };

  return (
    <div
      className={`info-window ${
        right ? "info-window-right" : "info-window-left"
      }`}
      style={
        right
          ? { right: `${cardWidth + 10}px` }
          : { left: `${cardWidth + 10}px` }
      }
    >
      <div className="info-window-title">{capitalizeSentence(title)}</div>
      <div className="info-window-flex">
        <div className="info-window-score">
          <i className="fa-solid fa-star"></i>{" "}
          {!averageScore ? "N/A" : (averageScore / 10).toFixed(1)}
        </div>
        <div className="info-window-format">{format}</div>
      </div>
      <div className="info-window-release">
        <span>{capitalizeWord(season) + " "}</span>
        <span>{seasonYear}</span>
      </div>
      <div
        className="info-window-desc"
        dangerouslySetInnerHTML={{ __html: cleanDescription }}
      ></div>
      <div className="info-window-genres">{renderGenres()}</div>
    </div>
  );
};

export default MoreInfoWindow;
