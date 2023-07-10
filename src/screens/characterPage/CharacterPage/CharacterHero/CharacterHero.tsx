import { useCallback, useEffect, useRef, useState, JSX } from "react";
import "./CharacterHero.css";
import DOMPurify from "dompurify";
import RemoveFromFavoriteButton from "../RemoveFromFavoriteButton/RemoveFromFavoriteButton";
import AddToFavoriteListButton from "../AddToFavoriteListButton/AddToFavoriteListButton";
import { markdownParser } from "../../../../helpers/helpers";
import { CharacterHeroProps } from "./CharacterHero.types";

const CharacterHero = ({
  id,
  name,
  image,
  description,
  age,
  bloodType,
  gender,
  birthday,
  inFavorites,
  setInFavorites,
  addToList,
  removeFromList,
  localStorageKey,
}: CharacterHeroProps): JSX.Element => {
  const [cleanDescription, setCleanDescription] = useState<string>("");
  const [textVisible, setTextVisible] = useState<boolean>(true);
  const [hasOverflow, setHasOverflow] = useState<boolean>(false);
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (aboutRef.current && aboutRef.current?.clientHeight >= 380) {
      setHasOverflow(true);
      setTextVisible(false);
    }
  }, [cleanDescription]);

  const onOverFlowClick = () => {
    setTextVisible((prev) => !prev);
  };

  useEffect(() => {
    if (description) {
      let cleanDes = markdownParser(DOMPurify.sanitize(description));
      setCleanDescription(cleanDes);
    }
  }, [description]);

  const onShowSpoilerClick = useCallback(
    (e: MouseEvent): void => {
      const target = e.currentTarget as HTMLElement;
      const child1 = target.parentElement?.children[0] as HTMLElement;
      const child2 = target.parentElement?.children[1] as HTMLElement;
      const child3 = target.parentElement?.children[2] as HTMLElement;
      child1.style.display = "none";
      child2.style.display = "inline";
      child3.style.display = "block";
      if (
        aboutRef.current &&
        aboutRef.current.clientHeight >= 380 &&
        !hasOverflow &&
        !textVisible
      ) {
        setHasOverflow(true);
        setTextVisible(false);
      }
    },
    [hasOverflow, textVisible]
  );

  const onHideSpoilerClick = useCallback(
    (e: MouseEvent): void => {
      const target = e.currentTarget as HTMLElement;
      const child1 = target.parentElement?.children[0] as HTMLElement;
      const child2 = target.parentElement?.children[1] as HTMLElement;
      const child3 = target.parentElement?.children[2] as HTMLElement;
      child1.style.display = "inline";
      child2.style.display = "none";
      child3.style.display = "none";
      if (
        aboutRef.current &&
        aboutRef.current.clientHeight >= 380 &&
        !hasOverflow &&
        !textVisible
      ) {
        setHasOverflow(true);
        setTextVisible(false);
      }
    },
    [hasOverflow, textVisible]
  );

  useEffect(() => {
    const showSpoilerList =
      document.querySelectorAll<HTMLElement>(".show-spoiler");
    const hideSpoilerList =
      document.querySelectorAll<HTMLElement>(".hide-spoiler");
    if (showSpoilerList.length > 0) {
      showSpoilerList.forEach((showSpoiler) => {
        showSpoiler.addEventListener("click", onShowSpoilerClick);
      });
    }
    if (hideSpoilerList.length > 0) {
      hideSpoilerList.forEach((hideSpoiler) => {
        hideSpoiler.addEventListener("click", onHideSpoilerClick);
      });
    }

    return () => {
      if (showSpoilerList.length > 0) {
        showSpoilerList.forEach((showSpoiler) => {
          showSpoiler.removeEventListener("click", onShowSpoilerClick);
        });
      }
      if (hideSpoilerList.length > 0) {
        hideSpoilerList.forEach((hideSpoiler) => {
          hideSpoiler.removeEventListener("click", onHideSpoilerClick);
        });
      }
    };
  }, [cleanDescription, onShowSpoilerClick, onHideSpoilerClick]);
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
          {birthday && (
            <p className="info-point">
              <span>Birthday:</span> {birthday}
            </p>
          )}
          {age && (
            <p className="info-point">
              <span>Age:</span> {age}
            </p>
          )}
          {gender && (
            <p className="info-point">
              <span>Gender:</span> {gender}
            </p>
          )}
          {bloodType && (
            <p className="info-point">
              <span>Bloodtype:</span> {bloodType}
            </p>
          )}
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
