import "./ImageSlide.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImageSlide = ({ settings, children }) => {
  return <Slider {...settings}>{children}</Slider>;
};
export default ImageSlide;
