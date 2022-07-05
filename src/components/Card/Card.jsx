import "./Card.css";

const Card = ({
  listItem,
  index,
  isReco,
  cardHeight = 225,
  cardWidth = 150,
}) => {
  const { title, images, rank, name } = listItem;
  return (
    <div
      className="card-container"
      style={{
        backgroundImage: `url(${images.jpg.image_url})`,
        backgroundRepeat: "no-repeat",
        backgroundPositionX: "center",
        backgroundPositionY: "center",
        backgroundSize: "cover",
        width: `${cardWidth}px`,
        height: `${cardHeight}px`,
      }}
    >
      <div className="card-content-wrapper">
        <div className="card-top">
          {!isReco && <div className="card-rank">#{rank || index + 1}</div>}
        </div>
        <div className="card-bottom">
          <h2>{title || name}</h2>
        </div>
      </div>
    </div>
  );
};
export default Card;
