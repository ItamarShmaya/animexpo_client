import "./CharacterBanner.css";

const CharacterBanner = ({ bannerImage }) => {
  return (
    <div
      className="character-banner"
      style={{
        backgroundImage: `url(${
          bannerImage ||
          "https://res.cloudinary.com/dhzbwclpj/image/upload/v1686666032/backgrounds/default_banner_background.jpg"
        })`,
        backgroundPositionX: "center",
        backgroundPositionY: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    ></div>
  );
};
export default CharacterBanner;
