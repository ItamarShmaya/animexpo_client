import { useCallback } from "react";

export const useLocalStorage = () => {
  const setLocalStorage = useCallback((key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  }, []);

  const getLocalStorage = useCallback((key) => {
    const value = localStorage.getItem(key);
    if (value !== undefined) {
      return JSON.parse(value);
    }
    return "";
  }, []);

  const saveUserToLocalStorage = useCallback(
    (user) => {
      const loggedUser = {};
      loggedUser.user = {
        _id: user.user._id,
        username: user.user.username,
        email: user.user.email,
        token: user.token,
      };
      loggedUser.animeList = user.user.animeList;
      loggedUser.mangaList = user.user.mangaList;
      loggedUser.profileData = user.user.profileData;
      loggedUser.friendsList = user.user.profileData.friendsList;
      loggedUser.favoriteCharacters = user.user.profileData.favoriteCharacters;
      loggedUser.favoriteStaff = user.user.profileData.favoriteStaff;
      loggedUser.favoriteAnime = user.user.profileData.favoriteAnime;
      loggedUser.favoriteManga = user.user.profileData.favoriteManga;

      setLocalStorage("loggedUser", loggedUser);
    },
    [setLocalStorage]
  );

  const saveToLoggedUser = useCallback(
    (key, value) => {
      const user = getLocalStorage("loggedUser");
      if (user) {
        user[key] = value;
        setLocalStorage("loggedUser", user);
      }
    },
    [getLocalStorage, setLocalStorage]
  );

  return {
    getLocalStorage,
    setLocalStorage,
    saveUserToLocalStorage,
    saveToLoggedUser,
  };
};
