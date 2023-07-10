import "./EntryRecommendations.css";
import CardsList from "../../../../components/CardsList/CardsList";
import { useEffect, useState, JSX } from "react";
import { EntryRecommendationProps } from "./EntryRecommendations.types";
import {
  ApiCoverImageType,
  ApiTitleType,
} from "../../../../apis/aniList/aniListTypes.types";

const EntryRecommendations = ({
  recommendations,
  type,
  sliderSettings,
}: EntryRecommendationProps): JSX.Element => {
  const [recommendationsList, setRecommendationsList] = useState<
    { id: number; title: ApiTitleType; coverImage: ApiCoverImageType }[]
  >([]);

  useEffect(() => {
    const reco = recommendations.map((reco) => {
      return {
        id: reco?.node?.mediaRecommendation?.id,
        title: reco?.node?.mediaRecommendation?.title,
        coverImage: reco?.node?.mediaRecommendation?.coverImage,
      };
    });
    setRecommendationsList(reco);
  }, [recommendations]);

  return (
    <div className="recommendations-container">
      <h2>Anime Recommendations</h2>
      {recommendationsList.length > 0 && (
        <CardsList
          list={recommendationsList}
          type={type}
          showRank={false}
          sliderSettings={sliderSettings}
          cardWidth={120}
          cardHeight={180}
        />
      )}
      ;
    </div>
  );
};
export default EntryRecommendations;
