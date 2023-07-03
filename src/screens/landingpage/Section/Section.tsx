import { NavLink } from "react-router-dom";
import CardsList from "../../../components/CardsList/CardsList";
import "./Section.css";
import { SectionProps } from "./SectionTypes";

const Section = ({
  list,
  heading,
  type,
  showRank,
  sliderSettings,
  titleFontSize,
  category,
  cardHeight,
  cardWidth,
}: SectionProps): JSX.Element => {
  return (
    <section className="landing-page-section">
      <div className="heading">
        <h1>{heading}</h1>
      </div>
      <NavLink to={`/search/${type}/${category}`} className="view-all">
        View All
      </NavLink>
      <CardsList
        titleFontSize={titleFontSize}
        list={list}
        type={type}
        showRank={showRank}
        sliderSettings={sliderSettings}
        cardHeight={cardHeight}
        cardWidth={cardWidth}
      />
    </section>
  );
};

export default Section;
