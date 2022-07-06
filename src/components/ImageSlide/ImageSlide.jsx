import "./ImageSlide.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImageSlide = ({ settings, children }) => {
  settings.infinite = settings.slidesToShow < children.length;
  return <Slider {...settings}>{children}</Slider>;
};
export default ImageSlide;
