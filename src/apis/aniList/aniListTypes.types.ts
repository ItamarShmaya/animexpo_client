export interface ApiMediaEntryType {
  id: number;
  title: ApiTitleType;
  description: string;
  coverImage: ApiCoverImageType;
  bannerImage: string;
  type: ApiMediaType;
  startDate: ApiFuzzyDateType;
  endDate: ApiFuzzyDateType;
  season?: string;
  seasonYear?: number;
  format: ApiMediaFormatType;
  status: ApiMediaStatusType;
  episodes?: number;
  duration?: number;
  chapters?: number;
  volumes?: number;
  genres: string[];
  tags?: ApiMediaTagObjectType[];
  averageScore: number;
  popularity: number;
  favourites: number;
  trending?: number;
  source?: ApiSourceType;
  countryOfOrigin?: number;
  nextAiringEpisode?: ApiNextAiringEpisodeType;
  trailer?: { id: string };
  studios?: ApiStudiotype[];
  rankings: ApiMediaRankings[];
}

export interface ApiCharacterEntryType {
  id: number;
  name: ApiNameType;
  image: ApiCoverImageType;
  description: string;
  gender?: string;
  dateOfBirth?: ApiFuzzyDateType;
  age?: number;
  bloodType?: string;
  media?: ApiCharacterMediaConnectionType;
}

export type ApiCharacterMediaConnectionType = {
  edges: ApiCharacterMediaEdgesType[];
  pageInfo: ApiPageInfoType;
};

export type ApiCharacterMediaEdgesType = {
  characterRole: string;
  node: ApiMediaEntryType;
  voiceActors: ApiCharcterMediaConnectionVoiceActors[];
};

export type ApiCharcterMediaConnectionVoiceActors = {
  id: number;
  languageV2: string;
  name: ApiNameType;
  image: ApiCoverImageType;
};

export interface ApiStaffEntryType {
  id: number;
  name: ApiNameType;
  description: string;
  bloodType: string;
  homeTown: string;
  age: number;
  gender: string;
  dateOfBirth: ApiFuzzyDateType;
  dateOfDeath: ApiFuzzyDateType;
  image: ApiCoverImageType;
  characterMedia: ApiStafCharacterMediaConntectionType;
}

export type ApiStafCharacterMediaConntectionType = {
  edges: ApiStaffCharacterMediaEdgesType[];
  pageInfo: ApiPageInfoType;
};

export type ApiStaffCharacterMediaEdgesType = {
  characterRole: string;
  node: ApiStaffCharacterMediaNodeType;
  characters: ApiStaffCharacterMediaCharactersType[];
};

export type ApiStaffCharacterMediaNodeType = {
  id: number;
  title: ApiTitleType;
  format: ApiMediaFormatType;
  favourites: number;
  popularity: number;
  averageScore: number;
  startDate: ApiFuzzyDateType;
  coverImage: ApiCoverImageType;
};

export type ApiStaffCharacterMediaCharactersType = {
  id: number;
  name: ApiNameType;
  image: ApiCoverImageType;
};

export type ApiMediaType = "ANIME" | "MANGA";

export type ApiMediaSeasonType = "WINTER" | "SPRING" | "SUMMER" | "FALL";

export type ApiMediaFormatType =
  | "TV"
  | "TV_SHORT"
  | "MOVIE"
  | "SPECIAL"
  | "OVA"
  | "ONA"
  | "MUSIC"
  | "MANGA"
  | "NOVEL"
  | "ONE_SHOT";

export type ApiMediaStatusType =
  | "FINISHED"
  | "RELEASING"
  | "NOT_YET_RELEASED"
  | "CANCELLED"
  | "HIATUS";

export type ApiTitleType = {
  romaji?: string;
  english?: string;
  native?: string;
  userPreferred: string;
};

export type ApiCoverImageType = {
  extraLarge?: string;
  large: string;
  medium?: string;
  color?: string;
};

export type ApiFuzzyDateType = {
  year: number;
  month: number;
  day: number;
};

export type ApiNextAiringEpisodeType = {
  airingAt: number | null;
  timeUntilAiring: number | null;
  episode: number | null;
};

export type ApiMediaTagObjectType = {
  id?: number;
  name: string;
  description?: string;
  category?: string;
  rank?: number;
  isGeneralSpolier?: boolean;
  isMediaSpoler?: boolean;
  isAdult?: boolean;
};

export type ApiSourceType =
  | "ORIGINAL"
  | "MANGA"
  | "LIGHT_NOVEL"
  | "VISUAL_NOVEL"
  | "VIDEO_GAME"
  | "OTHER"
  | "NOVEL"
  | "DOUJINSHI"
  | "ANIME"
  | "WEB_NOVEL"
  | "LIVE_ACTION"
  | "GAME"
  | "COMIC"
  | "MULTIMEDIA_PROJECT"
  | "PICTURE_BOOK";

export type ApiTrailerType = {
  id: string;
  site?: string;
  thumbnail?: string;
};

export type ApiMediaSortType =
  | "ID"
  | "ID_DESC"
  | "TITLE_ROMAJI"
  | "TITLE_ROMAJI_DESC"
  | "TITLE_ENGLISH"
  | "TITLE_ENGLISH_DESC"
  | "TITLE_NATIVE"
  | "TITLE_NATIVE_DESC"
  | "TYPE"
  | "TYPE_DESC"
  | "FORMAT"
  | "FORMAT_DESC"
  | "START_DATE"
  | "START_DATE_DESC"
  | "END_DATE"
  | "END_DATE_DESC"
  | "SCORE"
  | "SCORE_DESC"
  | "POPULARITY"
  | "POPULARITY_DESC"
  | "TRENDING"
  | "TRENDING_DESC"
  | "EPISODES"
  | "EPISODES_DESC"
  | "DURATION"
  | "DURATION_DESC"
  | "STATUS_DESC"
  | "CHAPTERS"
  | "CHAPTERS_DESC"
  | "VOLUMES"
  | "VOLUMES_DESC"
  | "UPDATED_AT"
  | "UPDATED_AT_DESC"
  | "SEARCH_MATCH"
  | "FAVOURITES"
  | "FAVOURITES_DESC";

export type ApiPageInfoType = {
  total?: number;
  perPage: number;
  currentPage: number;
  lastPage?: number;
  hasNextPage: boolean;
};

export type ApiCharacterSortType =
  | "ID"
  | "ID_DESC"
  | "ROLE"
  | "ROLE_DESC"
  | "SEARCH_MATCH"
  | "FAVOURITES"
  | "FAVOURITES_DESC"
  | "RELEVANCE";

export type ApiStaffSortType =
  | "ID"
  | "ID_DESC"
  | "LANGUAGE"
  | "LANGUAGE_DESC"
  | "SEARCH_MATCH"
  | "FAVOURITES"
  | "FAVOURITES_DESC"
  | "RELEVANCE";

export type ApiNameType = {
  native?: string;
  userPreferred: string;
};

export type ApiStudiotype = {
  id: string;
  name: string;
  isAnimationStudio?: boolean;
  siteUrl?: string;
  favourites?: string;
  media?: {
    edges: {
      node: ApiMediaEntryType[];
    };
  };
};

export type ApiMediaRankings = {
  rank: number;
  type: "RATED" | "POPULAR";
  allTime: boolean;
};
