import "./EntryPageHero.css";
import { useEffect, useRef, useState, JSX } from "react";
import DOMPurify from "dompurify";
import { EntryPageHeroProps } from "./EntryPageHero.types";
import AddToFavoriteMediaListButton from "../AddToFavoriteMediaListButton/AddToFavoriteMediaListButton";

const EntryPageHero = ({
  entry,
  inList,
  setInList,
  inFavList,
  setInFavList,
  AddToListButton,
  addToFavorite,
  removeFromFavorite,
  favoriteListName,
}: EntryPageHeroProps): JSX.Element => {
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

  const [rank, setRank] = useState<number | null>(null);
  const [popularity, setPopularity] = useState<number | null>(null);
  const [cleanDescription, setCleanDescription] = useState<string>("");
  const [textVisible, setTextVisible] = useState<boolean>(true);
  const [hasOverflow, setHasOverflow] = useState<boolean>(false);
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      aboutRef.current?.clientHeight &&
      aboutRef.current.clientHeight >= 380
    ) {
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
          src={coverImage?.extraLarge || coverImage.large}
        />
        <div className="add-to-list-container">
          <AddToListButton
            id={id}
            title={title.userPreferred || title.english || "Title"}
            image={coverImage.extraLarge || coverImage.large}
            format={format}
            episodes={episodes}
            volumes={volumes}
            inList={inList}
            setInList={setInList}
          />
          <AddToFavoriteMediaListButton
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
            {!averageScore ? "N/A" : (averageScore / 10).toFixed(1)}
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
          <div className="entry-hero-title">
            {title?.userPreferred || title?.english}
          </div>
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
