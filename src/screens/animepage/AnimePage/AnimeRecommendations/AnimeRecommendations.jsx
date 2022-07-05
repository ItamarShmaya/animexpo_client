import "./AnimeRecommendations.css";
import CardsList from "../../../../components/CardsList/CardsList";
import { animePageRecommendationsSliderSettings } from "../../../../components/ImageSlide/sliderSettings";

const AnimeRecommendations = ({ recommendations }) => {
  return (
    <div className="recommendations-container">
      <h1>Anime Recommendations</h1>
      <CardsList
        list={recommendations}
        type="anime"
        sliderSettings={animePageRecommendationsSliderSettings}
        cardWidth={120}
        cardHeight={180}
      />
      ;
    </div>
  );
};
export default AnimeRecommendations;
