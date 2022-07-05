import { useEffect, useState } from "react";
import "./CharacterBanner.css";

const CharacterBanner = ({ charPictures, images }) => {
  const [bannerBg, setBannerBg] = useState(null);

  useEffect(() => {
    setBannerPicture();
  });

  const setBannerPicture = () => {
    for (let i = 0; i < charPictures.length; i++) {
      if (charPictures[i].jpg.image_url !== images.jpg.image_url) {
        setBannerBg(charPictures[i].jpg.image_url);
        break;
      }
      if (i === charPictures.length - 1) {
        setBannerBg(charPictures[0].jpg.image_url);
      }
    }
  };
  return (
    <div
      className="banner"
      style={{
        backgroundImage: `url(${bannerBg || images.jpg.image_url})`,
        backgroundPositionX: "center",
        backgroundPositionY: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    ></div>
  );
};
export default CharacterBanner;
