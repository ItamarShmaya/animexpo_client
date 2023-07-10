import {
  UserAnimeList,
  UserInfo,
  UserMangaList,
  UserMediaStatusType,
  UserProfileData,
} from "./animexpo_updates.types";

export interface CreaterUserBody {
  username: string;
  email: string;
  password: string;
  birthday: string;
}

export interface LoginUserBody {
  username: string;
  password: string;
}

export interface UserData {
  user: {
    _id: string;
    username: string;
    email: string;
    avatar: {
      secure_url: string;
      public_id: string;
    };
    animeList: UserAnimeList;
    mangaList: UserMangaList;
    profileData: UserProfileData;
  };
  token: string;
}

export interface PostReviewBody {
  author: string;
  text: string;
  id: number;
  title: string;
  image: string;
  score: number;
  progress: number;
  status: UserMediaStatusType;
  episodes: number;
  type: "anime" | "manga";
}

export interface ReviewType {
  _id: string;
  id: string;
  title: string;
  image: string;
  score: number;
  status: UserMediaStatusType;
  progress: number;
  episodes: number;
  type: "anime" | "manga";
  author: Omit<UserInfo, "email" & "_id">;
  text: string;
  createdAt: string;
}
