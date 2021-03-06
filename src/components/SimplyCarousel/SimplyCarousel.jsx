import { useState } from "react";
import ReactSimplyCarousel from "react-simply-carousel";

const SimplyCarousel = ({
  children,
  itemsToShow,
  itemsToScroll,
  forwardBtnProps,
  backwardBtnProps,
  responsiveProps,
  containerProps,
}) => {
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
      containerProps={containerProps}
      speed={400}
      easing="linear"
    >
      {children}
    </ReactSimplyCarousel>
  );
};
export default SimplyCarousel;
