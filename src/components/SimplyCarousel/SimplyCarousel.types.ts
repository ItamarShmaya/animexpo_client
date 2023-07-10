import { JSX, ButtonHTMLAttributes } from "react";

export interface SimplyCarouselProps {
  children: JSX.Element[];
  itemsToShow: number;
  itemsToScroll: number;
  forwardBtnProps: NavButton;
  backwardBtnProps: NavButton;
  responsiveProps: SimplyCarouselresponsivePropsType[];
}

export type NavButton = ButtonHTMLAttributes<HTMLButtonElement>;

export type SimplyCarouselresponsivePropsType = {
  itemsToShow: number;
  itemsToScroll: number;
  maxWidth: number;
};
