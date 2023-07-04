import { JSX } from "react";

export interface SliderSettingsType {
  infinite: boolean;
  slidesToShow: number;
  slidesToScroll: number;
  lazyLoad: boolean;
  nextArrow: JSX.Element;
  prevArrow: JSX.Element;
  responsive?: SliderResponsiveSettings[];
}

export interface SliderResponsiveSettings {
  breakpoint: number;
  settings: {
    slidesToShow: number;
    slidesToScroll: number;
  };
}
