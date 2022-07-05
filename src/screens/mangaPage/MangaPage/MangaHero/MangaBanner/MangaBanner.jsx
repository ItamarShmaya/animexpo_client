import { useEffect, useState } from "react";
import "../../../../animepage/AnimePage/AnimeHero/AnimeBanner/AnimeBanner.css";

const MangaBanner = ({ pictures, images }) => {
  const [bannerBg, setBannerBg] = useState(null);

  useEffect(() => {
    setBannerPicture();
  });

  const setBannerPicture = () => {
    for (let i = 0; i < pictures.length; i++) {
      if (pictures[i].jpg.image_url !== images.jpg.image_url) {
        setBannerBg(pictures[i].jpg.image_url);
        break;
      }
      if (i === pictures.length - 1) {
        setBannerBg(pictures[0].jpg.image_url);
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
export default MangaBanner;
