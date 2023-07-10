import {
  ApiCoverImageType,
  ApiMediaEntryType,
  ApiNameType,
  ApiTitleType,
} from "../../../apis/aniList/aniListTypes.types";
import { ApiAnimeCharacterType } from "../../animepage/AnimePage/AnimePage.types";

export interface MangaPageApiResponse {
  Media: MangaPageEntryType;
}

export interface MangaPageEntryType extends ApiMediaEntryType {
  recommendations: {
    edges: {
      node: {
        mediaRecommendation: {
          id: number;
          title: ApiTitleType;
          coverImage: ApiCoverImageType;
        };
      };
    }[];
  };

  characters: {
    edges: ApiMangaCharacterType[];
  };
}

export type ApiMangaCharacterType = Omit<ApiAnimeCharacterType, "voiceActors">;
