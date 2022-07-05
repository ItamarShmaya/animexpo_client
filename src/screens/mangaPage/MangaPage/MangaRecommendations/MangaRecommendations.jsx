import "./MangaRecommendations.css";
import CardsList from "../../../../components/CardsList/CardsList";
import { animePageRecommendationsSliderSettings } from "../../../../components/ImageSlide/sliderSettings";

const MangaRecommendations = ({ recommendations }) => {
  return (
    <div className="recommendations-container">
      <h1>Manga Recommendations</h1>
      <CardsList
        list={recommendations}
        type="manga"
        sliderSettings={animePageRecommendationsSliderSettings}
        cardWidth={120}
        cardHeight={180}
      />
      ;
    </div>
  );
};
export default MangaRecommendations;
