import "./EntryPageBanner.css";

const EntryPageBanner = ({ bannerImage }) => {
  return (
    <div
      className="banner"
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
export default EntryPageBanner;
