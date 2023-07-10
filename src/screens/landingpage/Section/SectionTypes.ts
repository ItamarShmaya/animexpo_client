import {
  ApiCharacterEntryType,
  ApiMediaEntryType,
} from "../../../apis/aniList/aniListTypes.types";
import { SliderSettingsType } from "../../../components/ImageSlide/sliderSettingsTypes.types";

export interface SectionProps {
  list: ApiMediaEntryType[] | ApiCharacterEntryType[];
  heading: string;
  type: "anime" | "manga" | "character";
  showRank: boolean;
  sliderSettings: SliderSettingsType;
  titleFontSize: number;
  category: string;
  cardHeight: number;
  cardWidth: number;
}
