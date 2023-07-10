import "./CharacterBanner.css";

const CharacterBanner = ({
  bannerImage = "https://res.cloudinary.com/dhzbwclpj/image/upload/v1686666032/backgrounds/default_banner_background.jpg",
}: {
  bannerImage?: string;
}) => {
  return (
    <div
      className="character-banner"
      style={{
        backgroundImage: `url(${bannerImage})`,
        backgroundPositionX: "center",
        backgroundPositionY: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    ></div>
  );
};
export default CharacterBanner;
