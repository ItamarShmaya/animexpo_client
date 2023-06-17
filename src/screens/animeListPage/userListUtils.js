import { updateFieldInAnimeListEntry, updateFieldInMangaListEntry } from "../../apis/animexpo/animexpo_updates";

export const updateAnimeEntry = async (
  loggedInUser,
  getLocalStorage,
  setLocalStorage,
  id,
  userList,
  setUserList,
  body
) => {
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
    const animeList = getLocalStorage("loggedInUserAnimeList");
    animeList.list = [...updatedUserList];
    setLocalStorage("loggedInUserAnimeList", animeList);
  } catch (e) {
    console.log(e);
  }
};

export const updateMangaEntry = async (
  loggedInUser,
  getLocalStorage,
  setLocalStorage,
  id,
  userList,
  setUserList,
  body
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
    const mangaList = getLocalStorage("loggedInUserMangaList");
    mangaList.list = [...updatedUserList];
    setLocalStorage("loggedInUserMangaList", mangaList);
  } catch (e) {
    console.log(e);
  }
};
