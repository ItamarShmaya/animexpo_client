import { useState, JSX } from "react";
import ReactSimplyCarousel from "react-simply-carousel";
import { SimplyCarouselProps } from "./SimplyCarousel.types";

const SimplyCarousel = ({
  children,
  itemsToShow,
  itemsToScroll,
  forwardBtnProps,
  backwardBtnProps,
  responsiveProps,
}: SimplyCarouselProps): JSX.Element => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  return (
    <ReactSimplyCarousel
      activeSlideIndex={activeSlideIndex}
      onRequestChange={setActiveSlideIndex}
      itemsToShow={itemsToShow}
      forwardBtnProps={forwardBtnProps}
      itemsToScroll={itemsToScroll}
      backwardBtnProps={backwardBtnProps}
      responsiveProps={responsiveProps}
      speed={400}
      easing="linear"
    >
      {children}
    </ReactSimplyCarousel>
  );
};
export default SimplyCarousel;
