import {
  ApiCoverImageType,
  ApiMediaEntryType,
  ApiNameType,
  ApiTitleType,
} from "../../../apis/aniList/aniListTypes.types";

export interface AnimePageApiResponse {
  Media: AnimePageEntryType;
}

export interface AnimePageEntryType extends ApiMediaEntryType {
  recommendations: {
    edges: ApiMediaEntryRecommendationType[];
  };
  characters: {
    edges: ApiAnimeCharacterType[];
  };
}

export type ApiMediaEntryRecommendationType = {
  node: {
    mediaRecommendation: {
      id: number;
      title: ApiTitleType;
      coverImage: ApiCoverImageType;
    };
  };
};

export type ApiAnimeCharacterType = {
  role: string;
  voiceActors: ApiVoiceActorType[];
  node: {
    id: number;
    name: ApiNameType;
    image: ApiCoverImageType;
  };
};

export type ApiVoiceActorType = {
  id: number;
  languageV2: string;
  name: ApiNameType;
  image: ApiCoverImageType;
};
