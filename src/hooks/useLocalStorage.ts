import { useCallback } from "react";
import { LocalStorageLoggedUser } from "./useLocalStorage.types";
import { UserData } from "../apis/animexpo/animexpo_requests.types";

export const useLocalStorage = () => {
  const setLocalStorage = useCallback((key: string, value: any): void => {
    localStorage.setItem(key, JSON.stringify(value));
  }, []);

  const getLocalStorage = useCallback((key: string): any => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : "";
  }, []);

  const getLocalStorageUserData = useCallback((): LocalStorageLoggedUser => {
    const value = localStorage.getItem("loggedUser");
    return value ? JSON.parse(value) : "";
  }, []);

  const saveUserToLocalStorage = useCallback(
    (userData: UserData): void => {
      const loggedUser = {} as LocalStorageLoggedUser;
      loggedUser.user = {
        _id: userData.user._id,
        username: userData.user.username,
        email: userData.user.email,
        token: userData.token,
      };
      loggedUser.animeList = userData.user.animeList;
      loggedUser.mangaList = userData.user.mangaList;
      loggedUser.profileData = userData.user.profileData;
      loggedUser.friendsList = userData.user.profileData.friendsList;
      loggedUser.favoriteCharacters =
        userData.user.profileData.favoriteCharacters;
      loggedUser.favoriteStaff = userData.user.profileData.favoriteStaff;
      loggedUser.favoriteAnime = userData.user.profileData.favoriteAnime;
      loggedUser.favoriteManga = userData.user.profileData.favoriteManga;

      setLocalStorage("loggedUser", loggedUser);
    },
    [setLocalStorage]
  );

  const saveToLoggedUser = useCallback(
    <
      K extends keyof LocalStorageLoggedUser,
      V extends LocalStorageLoggedUser[K]
    >(
      key: K,
      value: V
    ): void => {
      const user = getLocalStorageUserData();
      if (user) {
        user[key] = value;
        setLocalStorage("loggedUser", user);
      }
    },
    [getLocalStorageUserData, setLocalStorage]
  );

  return {
    getLocalStorage,
    setLocalStorage,
    saveUserToLocalStorage,
    saveToLoggedUser,
    getLocalStorageUserData,
  };
};
