import "./EntryPageHero.css";
import { useEffect, useRef, useState } from "react";
import DOMPurify from "dompurify";
import AddToFavorite from "../AddToFavorite/AddToFavorite";

const EntryPageHero = ({
  entry,
  inList,
  setInList,
  inFavList,
  setInFavList,
  AddButton,
  addToFavorite,
  removeFromFavorite,
  favoriteListName,
}) => {
  const {
    title,
    description,
    coverImage,
    averageScore,
    rankings,
    id,
    format,
    episodes,
    volumes,
  } = entry;

  const [rank, setRank] = useState();
  const [popularity, setPopularity] = useState();
  const [cleanDescription, setCleanDescription] = useState();
  const [textVisible, setTextVisible] = useState(true);
  const [hasOverflow, setHasOverflow] = useState(false);
  const aboutRef = useRef();

  useEffect(() => {
    if (aboutRef.current.clientHeight >= 380) {
      setHasOverflow(true);
      setTextVisible(false);
    }
  }, [cleanDescription]);

  const onOverFlowClick = () => {
    setTextVisible((prev) => !prev);
  };

  useEffect(() => {
    const cleanDes = DOMPurify.sanitize(description, {
      USE_PROFILES: { html: true },
    });
    setCleanDescription(cleanDes);
  }, [description]);

  useEffect(() => {
    const rankingTemp = rankings.find(
      (ranking) => ranking.allTime && ranking.type === "RATED"
    );
    rankingTemp ? setRank(rankingTemp.rank) : setRank(null);

    const popularityTemp = rankings.find(
      (ranking) => ranking.allTime && ranking.type === "POPULAR"
    );
    popularityTemp ? setPopularity(popularityTemp.rank) : setPopularity(null);
  }, [rankings]);

  return (
    <div className="about-entry" ref={aboutRef}>
      <div className="poster">
        <img
          alt={title.userPreferred || title.english}
          src={coverImage.extraLarge || coverImage.large}
        />
        <div className="add-to-list-container">
          <AddButton
            id={id}
            title={title.userPreferred || title.english}
            image={coverImage.extraLarge || coverImage.large}
            format={format}
            episodes={episodes}
            volumes={volumes}
            inList={inList}
            setInList={setInList}
          />
          <AddToFavorite
            id={id}
            title={title.userPreferred || title.english}
            image={coverImage.extraLarge || coverImage.large}
            addToFavorite={addToFavorite}
            removeFromFavorite={removeFromFavorite}
            inFavList={inFavList}
            setInFavList={setInFavList}
            favoriteListName={favoriteListName}
          />
        </div>
      </div>
      <div className="entry-info">
        <div className="entry-stats">
          <div className="entry-hero-score">
            Score: <br />
            <i className="fa-solid fa-star"></i>{" "}
            {!averageScore ? "N/A" : (averageScore / 10).toFixed(2)}
          </div>
          <div className="entry-hero-rank">
            Rank: <br /> <i className="fa-solid fa-trophy"></i> #
            {!rank ? "N/A" : rank}
          </div>
          <div className="entry-hero-popularity">
            Popularity: <br /> <i className="fa-solid fa-heart"></i> #
            {!popularity ? "N/A" : popularity}
          </div>
        </div>
        <div className="title-synopsis">
          <div className="entry-hero-title">{title.english}</div>
          <div className="entry-hero-synopsis">
            <p>Synopsis</p>
            <div
              className={textVisible ? "" : "entry-desc-overflow-hidden"}
              dangerouslySetInnerHTML={{ __html: cleanDescription }}
            ></div>
            {hasOverflow && (
              <div className="overflow-button" onClick={onOverFlowClick}>
                {textVisible ? "Show less" : "Show more"}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default EntryPageHero;
