import {
  ApiCoverImageType,
  ApiNameType,
  ApiTitleType,
} from "../../apis/aniList/aniListTypes.types";
import { SliderSettingsType } from "../ImageSlide/sliderSettingsTypes.types";

export interface CardListProps {
  list: GenericListType[];
  type: "anime" | "manga" | "character" | "staff";
  showRank: boolean;
  sliderSettings: SliderSettingsType;
  cardHeight?: number;
  cardWidth?: number;
  titleFontSize?: number;
}

export type GenericListType = {
  id: number;
  title?: ApiTitleType;
  name?: ApiNameType;
  image?: ApiCoverImageType;
  coverImage?: ApiCoverImageType;
};
