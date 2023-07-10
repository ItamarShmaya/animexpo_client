import {
  ApiCharacterMediaEdgesType,
  ApiCharcterMediaConnectionVoiceActors,
  ApiMediaFormatType,
} from "../../../../../apis/aniList/aniListTypes.types";

export interface AppearanceProps {
  appearance: ApiCharacterMediaEdgesType;
  sortBy: string;
}

export interface AppearanceEntryProps {
  type: "anime" | "manga";
  id: number;
  showRank: boolean;
  title: string | undefined;
  image: string | undefined;
  cardHeight: number | undefined;
  cardWidth: number | undefined;
  sortBy: string;
  popularity: number;
  favourites: number;
  averageScore: number;
  startDate: string;
  format: ApiMediaFormatType;
}

export interface AppearanceVAProps {
  voiceActors: ApiCharcterMediaConnectionVoiceActors[]
}