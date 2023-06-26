import { NavLink } from "react-router-dom";
import CardsList from "../../../components/CardsList/CardsList";
import "./Section.css";

const Section = ({
  list,
  heading,
  type,
  showRank,
  sliderSettings,
  titleFontSize,
  category,
}) => {
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
      />
    </section>
  );
};

export default Section;
