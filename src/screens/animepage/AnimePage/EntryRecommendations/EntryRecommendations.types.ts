import { SliderSettingsType } from "../../../../components/ImageSlide/sliderSettingsTypes.types";
import { ApiMediaEntryRecommendationType } from "../AnimePage.types";

export interface EntryRecommendationProps {
  recommendations: ApiMediaEntryRecommendationType[];
  type: "anime" | "manga";
  sliderSettings: SliderSettingsType;
}
