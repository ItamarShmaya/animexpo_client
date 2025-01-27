import {
  ApiCoverImageType,
  ApiMediaFormatType,
  ApiMediaStatusType,
  ApiNameType,
  ApiNextAiringEpisodeType,
  ApiStudiotype,
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
  cardHoverEffect?: boolean;
}

export type GenericListType = {
  id: number;
  title?: ApiTitleType;
  name?: ApiNameType;
  image?: ApiCoverImageType;
  coverImage?: ApiCoverImageType;
  description?: string;
  season?: string;
  seasonYear?: number;
  studios?: ApiStudiotype[];
  genres?: string[];
  format?: ApiMediaFormatType;
  status?: ApiMediaStatusType;
  episodes?: number;
  duration?: number;
  averageScore?: number;
  nextAiringEpisode?: ApiNextAiringEpisodeType

};
