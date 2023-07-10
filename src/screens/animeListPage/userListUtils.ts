import {
  UserAnimeEntry,
  UserMangaEntry,
  UserMediaEntry,
  UpdateMediaEntryBody,
} from "../../apis/animexpo/animexpo_updates.types";
import {
  updateFieldInAnimeListEntry,
  updateFieldInMangaListEntry,
} from "../../apis/animexpo/animexpo_updates";
import { LoggedInUser } from "../../context/LoggedInUser.types";
import {
  getLocalStorageUserDataFuncType,
  saveToLoggedUserFuncType,
} from "../../hooks/useLocalStorage.types";

export type UpdateEntryFuncType = (
  loggedInUser: LoggedInUser,
  getLocalStorageUserData: getLocalStorageUserDataFuncType,
  saveToLoggedUser: saveToLoggedUserFuncType,
  id: number,
  userList: UserMediaEntry[],
  setUserList: React.Dispatch<React.SetStateAction<UserMediaEntry[]>>,
  body: UpdateMediaEntryBody
) => Promise<void>;

export const updateAnimeEntry = async (
  loggedInUser: LoggedInUser,
  getLocalStorageUserData: getLocalStorageUserDataFuncType,
  saveToLoggedUser: saveToLoggedUserFuncType,
  id: number,
  userList: UserMediaEntry[],
  setUserList: React.Dispatch<React.SetStateAction<UserMediaEntry[]>>,
  body: UpdateMediaEntryBody
): Promise<void> => {
  try {
    const updatedAnimeListEntry = await updateFieldInAnimeListEntry(
      loggedInUser.username,
      loggedInUser.token,
      body
    );

    const index = userList.findIndex((item) => item.id === id);
    const updatedUserList = [...userList];
    updatedUserList[index] = updatedAnimeListEntry;
    setUserList(updatedUserList);
    const animeList = getLocalStorageUserData().animeList;
    animeList.list = [...updatedUserList] as UserAnimeEntry[];
    saveToLoggedUser("animeList", animeList);
  } catch (e) {
    console.log(e);
  }
};

export const updateMangaEntry = async (
  loggedInUser: LoggedInUser,
  getLocalStorageUserData: getLocalStorageUserDataFuncType,
  saveToLoggedUser: saveToLoggedUserFuncType,
  id: number,
  userList: UserMediaEntry[],
  setUserList: React.Dispatch<React.SetStateAction<UserMediaEntry[]>>,
  body: UpdateMediaEntryBody
) => {
  try {
    const updatedMangaListEntry = await updateFieldInMangaListEntry(
      loggedInUser.username,
      loggedInUser.token,
      body
    );

    const index = userList.findIndex((item) => item.id === id);
    const updatedUserList = [...userList];
    updatedUserList[index] = updatedMangaListEntry;
    setUserList(updatedUserList);
    const mangaList = getLocalStorageUserData().mangaList;
    mangaList.list = [...updatedUserList] as UserMangaEntry[];
    saveToLoggedUser("mangaList", mangaList);
  } catch (e) {
    console.log(e);
  }
};
