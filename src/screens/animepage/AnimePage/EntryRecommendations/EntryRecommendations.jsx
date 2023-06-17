import "./EntryRecommendations.css";
import CardsList from "../../../../components/CardsList/CardsList";
import { useEffect, useState } from "react";

const EntryRecommendations = ({ recommendations, type, sliderSettings }) => {
  const [recoList, setRecoList] = useState(null);

  useEffect(() => {
    const reco = recommendations.map((reco) => {
      return {
        id: reco.node.mediaRecommendation.id,
        title: reco.node.mediaRecommendation.title,
        coverImage: reco.node.mediaRecommendation.coverImage,
      };
    });
    setRecoList(reco);
  }, [recommendations]);

  return (
    <div className="recommendations-container">
      <h2>Anime Recommendations</h2>
      {recoList && (
        <CardsList
          list={recoList}
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
