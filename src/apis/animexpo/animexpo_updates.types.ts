import { ApiMediaFormatType } from "../aniList/aniListTypes.types";

export interface UserMediaEntry {
  _id: string;
  id: number;
  title: string;
  image: string;
  format: ApiMediaFormatType;
  comment: string;
  status: UserMediaStatusType;
  score: number;
  progress: number;
  episodes?: number;
  volumes?: number;
}

export type UserMediaEntryBodyToAdd = Omit<UserMediaEntry, "_id">;

export interface UpdateMediaEntryBody {
  _id: string;
  progress?: number;
  comment?: string;
  status?: string;
  score?: number;
}

export interface UserAnimeEntry extends UserMediaEntry {
  episodes: number;
}

export interface UserMangaEntry extends UserMediaEntry {
  volumes: number;
}

export type UserMediaStatusType =
  | "Watching"
  | "Completed"
  | "Dropped"
  | "On Hold"
  | "Plan to Watch"
  | "Reading"
  | "Plan to Read";

export interface UserFavoriteMediaEntry {
  id: number;
  title: string;
  image: string;
}

export interface UserFavoriteNotMediaEntry {
  id: number;
  name: string;
  image: string;
}

export type UserInfo = {
  _id: string;
  username: string;
  email: string;
  avatar: {
    secure_url: string;
    public_id: string;
  };
};

export type UserAnimeList = {
  list: UserAnimeEntry[];
  owener: string;
};

export type UserMangaList = {
  list: UserMangaEntry[];
  owener: string;
};

export type UserProfileData = {
  personalInfo: {
    displayName: string;
    gender: string;
    birthday: string;
    joined: string;
    reviewsCount: number;
    avatar: {
      secure_url: string;
      public_id: string;
    };
  };
  owner: string;
  friendsList: UserFriendsList;
  favoriteCharacters: UserFavoriteNotMediaList;
  favoriteStaff: UserFavoriteNotMediaList;
  favoriteAnime: UserFavoriteMediaList;
  favoriteManga: UserFavoriteMediaList;
  animeList?: UserAnimeList;
  mangaList: UserMangaList;
};

export type UserFavoriteMediaList = {
  _id: string;
  owner: string;
  profile: string;
  list: UserFavoriteMediaEntry[];
};

export type UserFavoriteNotMediaList = {
  _id: string;
  owner: string;
  profile: string;
  list: UserFavoriteNotMediaEntry[];
};

export type UserFriendsList = {
  list: UserInfo[];
  owner: string;
  profile: string;
};

export type UserFriendRequests = {
  _id: string;
  requester: UserInfo;
  recipient: string;
  status: number;
  createdAt: string;
};
