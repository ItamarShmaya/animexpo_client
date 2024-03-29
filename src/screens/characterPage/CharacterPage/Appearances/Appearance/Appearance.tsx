import "./Appearance.css";
import Card from "../../../../../components/Card/Card";
import {
  formatsStringRender,
  numberWithCommas,
  parseDateFromAniListApi,
} from "../../../../../helpers/helpers";
import SimplyCarousel from "../../../../../components/SimplyCarousel/SimplyCarousel";
import {
  characterPageCarouselResponsive,
  profileCarouselBackwardButton,
  profileCarouselForwardButton,
} from "../../../../../components/SimplyCarousel/carouselSettings";
import { JSX } from "react";
import {
  AppearanceEntryProps,
  AppearanceProps,
  AppearanceVAProps,
} from "./Appearance.types";
import { ApiCharcterMediaConnectionVoiceActors } from "../../../../../apis/aniList/aniListTypes.types";

const Appearance = ({ appearance, sortBy }: AppearanceProps): JSX.Element => {
  return (
    <div className="appearance">
      <AppearanceEntry
        type={appearance.node.type.toLowerCase() as "anime" | "manga"}
        id={appearance.node.id}
        showRank={false}
        title={
          appearance.node.title.userPreferred || appearance.node.title.english
        }
        image={
          appearance.node.coverImage.large || appearance.node.coverImage.medium
        }
        cardHeight={150}
        cardWidth={100}
        sortBy={sortBy}
        popularity={appearance.node.popularity}
        favourites={appearance.node.favourites}
        averageScore={appearance.node.averageScore}
        startDate={parseDateFromAniListApi(appearance.node.startDate)}
        format={appearance.node.format}
      />
      <hr />
      <AppearanceVA voiceActors={appearance.voiceActors} />
    </div>
  );
};

export default Appearance;

export const AppearanceEntry = ({
  type,
  id,
  showRank,
  title,
  image,
  cardHeight,
  cardWidth,
  sortBy,
  popularity,
  favourites,
  averageScore,
  startDate,
  format,
}: AppearanceEntryProps): JSX.Element => {
  return (
    <div className="appearance-entry">
      <Card
        type={type}
        id={id}
        showRank={showRank}
        title={title}
        image={image}
        cardHeight={cardHeight}
        cardWidth={cardWidth}
      />
      <div className="appearance-entry-info">
        <div className={sortBy === "Popularity" ? "sort-active" : ""}>
          <span>Popularity:</span>
          <span>{numberWithCommas(popularity)}</span>
        </div>
        <div className={sortBy === "Score" ? "sort-active" : ""}>
          <span>Score:</span>
          <span>{(averageScore / 10).toFixed(1)}</span>
        </div>
        <div className={sortBy === "Favourites" ? "sort-active" : ""}>
          <span>Favourites:</span>
          <span>{numberWithCommas(favourites)}</span>
        </div>
        <div
          className={
            sortBy === "Newest" || sortBy === "Oldest" ? "sort-active" : ""
          }
        >
          <span>Start date: </span>

          <span>{startDate}</span>
        </div>
        <div>
          <span>Format:</span>
          <span>{formatsStringRender(format)}</span>
        </div>
      </div>
    </div>
  );
};

export const AppearanceVA = ({
  voiceActors,
}: AppearanceVAProps): JSX.Element => {
  const rencerVoiceActors = (
    vaList: ApiCharcterMediaConnectionVoiceActors[]
  ) => {
    return vaList
      .sort((a, b) =>
        a.languageV2.toLowerCase().localeCompare(b.languageV2.toLowerCase())
      )
      .map((va, i) => {
        return (
          <div key={`${va.id}${i}`} className="voice-actor">
            <Card
              id={va.id}
              type={"staff"}
              showRank={false}
              title={va.name.userPreferred}
              image={va.image.large || va.image.medium}
              cardHeight={100}
              cardWidth={75}
            />
            <p>{va.languageV2}</p>
          </div>
        );
      });
  };
  return (
    <div className="appearance-va">
      <h4>Voice Actors</h4>
      <div className="voice-actors-list">
        {voiceActors.length > 0 && (
          <SimplyCarousel
            itemsToShow={12}
            itemsToScroll={1}
            forwardBtnProps={profileCarouselForwardButton}
            backwardBtnProps={profileCarouselBackwardButton}
            responsiveProps={characterPageCarouselResponsive}
          >
            {rencerVoiceActors(voiceActors)}
          </SimplyCarousel>
        )}
      </div>
    </div>
  );
};
