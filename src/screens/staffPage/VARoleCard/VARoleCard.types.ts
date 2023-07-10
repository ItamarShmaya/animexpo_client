import {
  ApiFuzzyDateType,
  ApiMediaFormatType,
} from "../../../apis/aniList/aniListTypes.types";

export interface VARoleCardProps {
  role: string;
  animeId: number;
  animeImage: string;
  animeTitle: string;
  characterId: number;
  characterName: string;
  characterImage: string;
  sortBy: string;
  animePopularity: number;
  animeFavourites: number;
  animeAverageScore: number;
  animeStartDate: ApiFuzzyDateType;
  animeFormat: ApiMediaFormatType;
  cardHeight?: number;
  cardWidth?: number;
}
