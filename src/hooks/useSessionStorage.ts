import { useCallback } from "react";
import { UserCacheSearchType, UserChacheType } from "./useSessionStorage.types";
import { AnimePageEntryType } from "../screens/animepage/AnimePage/AnimePage.types";
import { MangaPageEntryType } from "../screens/mangaPage/MangaPage/MangaPage.types";
import { CharacterPageEntryType } from "../screens/characterPage/CharacterPage/CharacterPage.types";
import { StaffPageEntryType } from "../screens/staffPage/StaffPage.types";
import { UserProfileData } from "../apis/animexpo/animexpo_updates.types";
import {
  SearchResultsType,
  SearchType,
} from "../components/SearchBar/SearchBar.types";

export const useSessionStorage = () => {
  const getUserSessionStorage = useCallback((): UserChacheType | null => {
    const userCache: string | null = sessionStorage.getItem("userCache");
    if (userCache !== null) {
      return JSON.parse(userCache) as UserChacheType;
    }
    return null;
  }, []);
  
  const setUserSessionStorage = useCallback(
    <K extends keyof UserChacheType, V extends UserChacheType[K]>(
      keyName: K,
      value: V
    ): void => {
      let userCache = getUserSessionStorage();
      if (!userCache) userCache = {} as UserChacheType;
      userCache[keyName] = value;
      sessionStorage.setItem("userCache", JSON.stringify(userCache));
    },
    [getUserSessionStorage]
  );


  const getEntryFromUserCache = useCallback(
    <
      K extends keyof Omit<
        UserChacheType,
        "genres" | "tags" | "landingPageData" | "search" | "profilesList"
      >
    >(
      keyName: K,
      id: number
    ):
      | AnimePageEntryType
      | MangaPageEntryType
      | CharacterPageEntryType
      | StaffPageEntryType
      | null => {
      const userCache = getUserSessionStorage();
      if (!userCache) return null;
      if (!userCache[keyName]) return null;
      if (userCache[keyName].length <= 0) return null;

      const entry = [...userCache[keyName]].find((entry) => +entry.id === +id);
      return entry ? entry : null;
    },
    [getUserSessionStorage]
  );

  const addEntryToUserCache = useCallback(
    <
      K extends keyof Omit<
        UserChacheType,
        "genres" | "tags" | "landingPageData" | "search"
      >
    >(
      listName: K,
      entry:
        | AnimePageEntryType
        | MangaPageEntryType
        | CharacterPageEntryType
        | StaffPageEntryType
        | UserProfileData
    ): void => {
      let userCache = getUserSessionStorage();
      if (!userCache) userCache = {} as UserChacheType;

      if (userCache[listName]) {
        if (userCache[listName].length === 10) userCache[listName].pop();
        if (listName === "animeList")
          (userCache[listName] as AnimePageEntryType[]).unshift(
            entry as AnimePageEntryType
          );
        else if (listName === "mangaList")
          (userCache[listName] as MangaPageEntryType[]).unshift(
            entry as MangaPageEntryType
          );
        else if (listName === "charsList")
          (userCache[listName] as CharacterPageEntryType[]).unshift(
            entry as CharacterPageEntryType
          );
        else if (listName === "staffList")
          (userCache[listName] as StaffPageEntryType[]).unshift(
            entry as StaffPageEntryType
          );
        else if (listName === "profilesList")
          (userCache[listName] as UserProfileData[]).unshift(
            entry as UserProfileData
          );

        setUserSessionStorage(listName, userCache[listName]);
      } else {
        if (listName === "animeList")
          setUserSessionStorage(
            listName as "animeList",
            [entry] as AnimePageEntryType[]
          );
        else if (listName === "mangaList")
          setUserSessionStorage(
            listName as "mangaList",
            [entry] as MangaPageEntryType[]
          );
        else if (listName === "charsList")
          setUserSessionStorage(
            listName as "charsList",
            [entry] as CharacterPageEntryType[]
          );
        else if (listName === "staffList")
          setUserSessionStorage(
            listName as "staffList",
            [entry] as StaffPageEntryType[]
          );
        else if (listName === "profilesList")
          setUserSessionStorage(
            listName as "profilesList",
            [entry] as UserProfileData[]
          );
      }
    },
    [getUserSessionStorage, setUserSessionStorage]
  );

  const addToSearchResultsChache = useCallback(
    (
      searchType: SearchType,
      searchInput: string,
      searchResults: SearchResultsType
    ): void => {
      let userCache = getUserSessionStorage();
      if (!userCache) userCache = {} as UserChacheType;

      if (!userCache.search) {
        const search = {} as UserCacheSearchType;
        search[searchType] = new Map();
        (search[searchType] as Map<any, any>).set(searchInput, searchResults);
        // maps cant be stored in storage
        search[searchType] = Array.from(search[searchType]);
        setUserSessionStorage("search", search);
        return;
      }

      if (!userCache.search[searchType]) {
        userCache.search[searchType] = new Map();
        (userCache.search[searchType] as Map<any, any>).set(
          searchInput,
          searchResults
        );
        userCache.search[searchType] = Array.from(userCache.search[searchType]);
        setUserSessionStorage("search", userCache.search);
        return;
      }

      userCache.search[searchType] = new Map(userCache.search[searchType]);
      if ((userCache.search[searchType] as Map<any, any>).size === 5) {
        const firstKeyInMap = Array.from(userCache.search[searchType])[0][0];
        (userCache.search[searchType] as Map<any, any>).delete(firstKeyInMap);
      }
      (userCache.search[searchType] as Map<any, any>).set(
        searchInput,
        searchResults
      );
      userCache.search[searchType] = Array.from(userCache.search[searchType]);
      setUserSessionStorage("search", userCache.search);
      return;
    },
    [getUserSessionStorage, setUserSessionStorage]
  );

  const getFromSearchResultsChache = useCallback(
    (searchType: SearchType, searchInput: string): SearchResultsType | void => {
      const userCache = getUserSessionStorage();
      if (!userCache) return;
      if (!userCache.search) return;
      if (!userCache.search[searchType]) return;
      if (!new Map(userCache.search[searchType]).get(searchInput)) return;
      return new Map(userCache.search[searchType]).get(searchInput);
    },
    [getUserSessionStorage]
  );

  const getFromProfilesCache = useCallback(
    (username: string): UserProfileData | void => {
      const userCache = getUserSessionStorage();
      if (!userCache) return;
      if (!userCache.profilesList) return;
      if (userCache.profilesList.length <= 0) return;

      return userCache.profilesList.find(
        (profile) => profile.personalInfo.displayName.toLowerCase() === username
      );
    },
    [getUserSessionStorage]
  );

  return {
    getUserSessionStorage,
    setUserSessionStorage,
    getEntryFromUserCache,
    addEntryToUserCache,
    addToSearchResultsChache,
    getFromSearchResultsChache,
    getFromProfilesCache,
  };
};
