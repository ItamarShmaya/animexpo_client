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

  const saveUserToLocalStorage = (user) => {
    setLocalStorage("loggedInUser", {
      _id: user.user._id,
      username: user.user.username,
      email: user.user.email,
      token: user.token,
    });
    setLocalStorage("loggedInUserAnimeList", user.user.animeList);
    setLocalStorage("loggedInUserMangaList", user.user.mangaList);
    setLocalStorage("loggedInUserProfileData", user.user.profileData);
    setLocalStorage(
      "loggedInUserFavCharsList",
      user.user.profileData.favoriteCharacters
    );
    setLocalStorage(
      "loggedInUserFavStaffList",
      user.user.profileData.favoriteStaff
    );
    setLocalStorage(
      "loggedInUserFriendsList",
      user.user.profileData.friendsList
    );
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("loggedInUserAnimeList");
    localStorage.removeItem("loggedInUserFavCharsList");
    localStorage.removeItem("loggedInUserFavStaffList");
    localStorage.removeItem("loggedInUserMangaList");
    localStorage.removeItem("loggedInUserProfileData");
    localStorage.removeItem("loggedInUserFriendsList");
    localStorage.removeItem("sessionID");
  };

  return {
    getLocalStorage,
    setLocalStorage,
    saveUserToLocalStorage,
    removeUserFromLocalStorage,
  };
};
