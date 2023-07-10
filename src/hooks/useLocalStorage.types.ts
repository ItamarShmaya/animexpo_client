import {
  UserAnimeList,
  UserFavoriteMediaList,
  UserFavoriteNotMediaList,
  UserMangaList,
  UserProfileData,
  UserFriendsList,
} from "../apis/animexpo/animexpo_updates.types";
import { LoggedInUser } from "../context/LoggedInUser.types";

export interface LocalStorageLoggedUser {
  user: LoggedInUser;
  animeList: UserAnimeList;
  mangaList: UserMangaList;
  profileData: UserProfileData;
  friendsList: UserFriendsList;
  favoriteCharacters: UserFavoriteNotMediaList;
  favoriteStaff: UserFavoriteNotMediaList;
  favoriteAnime: UserFavoriteMediaList;
  favoriteManga: UserFavoriteMediaList;
}

export type getLocalStorageUserDataFuncType = () => LocalStorageLoggedUser;

export type saveToLoggedUserFuncType = <
  K extends keyof LocalStorageLoggedUser,
  V extends LocalStorageLoggedUser[K]
>(
  key: K,
  value: V
) => void;
