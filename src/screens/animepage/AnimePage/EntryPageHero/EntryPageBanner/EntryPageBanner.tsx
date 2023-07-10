import "./EntryPageBanner.css";
import { JSX } from "react";

const EntryPageBanner = ({
  bannerImage = "https://res.cloudinary.com/dhzbwclpj/image/upload/v1686666032/backgrounds/default_banner_background.jpg",
}: {
  bannerImage: string | undefined;
}): JSX.Element => {
  return (
    <div
      className="banner"
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
export default EntryPageBanner;
