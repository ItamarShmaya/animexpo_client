import { useEffect, useRef, useState } from "react";
import "./CharacterHero.css";
import DOMPurify from "dompurify";
import RemoveFromFavoriteButton from "../RemoveFromFavoriteButton/RemoveFromFavoriteButton";
import AddToFavoriteListButton from "../AddToFavoriteListButton/AddToFavoriteListButton";

const CharacterHero = ({
  id,
  name,
  image,
  description,
  inFavorites,
  setInFavorites,
  addToList,
  removeFromList,
  localStorageKey,
}) => {
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

  return (
    <div className="about-character" ref={aboutRef}>
      <div className="poster">
        <img alt={name} src={image} />
        <div className="add-to-list-container">
          {inFavorites ? (
            <RemoveFromFavoriteButton
              id={id}
              setInFavorites={setInFavorites}
              removeFromList={removeFromList}
              localStorageKey={localStorageKey}
            />
          ) : (
            <AddToFavoriteListButton
              id={id}
              name={name}
              image={image}
              addToList={addToList}
              setInFavorites={setInFavorites}
              localStorageKey={localStorageKey}
            />
          )}
        </div>
      </div>
      <div className="character-info display-linebreak">
        <h1>{name}</h1>
        <hr />
        <div className="character-description">
          <div
            className={textVisible ? "" : "des-overflow-hidden"}
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
  );
};

export default CharacterHero;
