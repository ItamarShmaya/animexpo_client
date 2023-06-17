import "./EntryPageHero.css";
import { useLoggedInUser } from "../../../../context/context_custom_hooks";
import { useEffect, useRef, useState } from "react";
import DOMPurify from "dompurify";

const EntryPageHero = ({ entry, inList, setInList, AddButton }) => {
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

  const { loggedInUser } = useLoggedInUser();
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

  const renderAddToButton = () => {
    if (loggedInUser) {
      if (inList) {
        return <div>In List</div>;
      }
    }
    return (
      <AddButton
        id={id}
        title={title.english}
        image={coverImage.extraLarge}
        format={format}
        episodes={episodes}
        volumes={volumes}
        setInList={setInList}
      />
    );
  };

  return (
    <div className="about-entry" ref={aboutRef}>
      <div className="poster">
        <img alt={title.english} src={coverImage.extraLarge} />
        <div className="add-to-list-container">{renderAddToButton()}</div>
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
