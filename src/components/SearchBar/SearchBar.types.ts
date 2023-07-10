import {
  ApiCoverImageType,
  ApiFuzzyDateType,
  ApiMediaFormatType,
  ApiNameType,
  ApiTitleType,
} from "../../apis/aniList/aniListTypes.types";
import { UserInfo } from "../../apis/animexpo/animexpo_updates.types";

export interface ApiMediaSearchResult {
  id: number;
  title: ApiTitleType;
  coverImage: ApiCoverImageType;
  averageScore: number;
  genres: string[];
  format: ApiMediaFormatType;
  startDate: ApiFuzzyDateType;
}

export interface ApiCharactersSearchResult {
  id: number;
  name: ApiNameType;
  image: ApiCoverImageType;
  favourites: number;
  media: {
    edges: {
      node: {
        title: ApiTitleType;
        popularity: number;
      };
    }[];
  };
}

export interface ApiStaffSearchResult {
  id: number;
  name: ApiNameType;
  image: ApiCoverImageType;
  dateOfBirth: ApiFuzzyDateType;
  age: number;
  primaryOccupations: string[];
}

export type SearchType = "anime" | "manga" | "character" | "staff" | "users";

export type SearchResultsType = (
  | ApiMediaSearchResult
  | ApiCharactersSearchResult
  | ApiStaffSearchResult
  | UserInfo
)[];
