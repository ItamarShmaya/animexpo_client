import animexpo from "./animexpo";

export const addToAnimeList = async (username, token, animeEntry) => {
  try {
    const { data: animeList } = await animexpo.patch(
      `/user/${username}/addToAnimelist`,
      animeEntry,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return animeList;
  } catch (e) {
    console.log(e);
  }
};

export const removeFromAnimeList = async (username, token, mal_id) => {
  try {
    const { data: animeList } = await animexpo.patch(
      `/user/${username}/removeFromAnimeList`,
      { mal_id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return animeList;
  } catch (e) {
    console.log(e);
  }
};

export const updateFieldInAnimeListEntry = async (username, token, body) => {
  try {
    const { data: animeList } = await animexpo.patch(
      `user/${username}/updateAnimeEntry`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return animeList;
  } catch (e) {
    console.log(e);
  }
};

export const addToMangaList = async (username, token, mangaEntry) => {
  try {
    const { data: mangaList } = await animexpo.patch(
      `/user/${username}/addToMangalist`,
      mangaEntry,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return mangaList;
  } catch (e) {
    console.log(e);
  }
};

export const removeFromMangaList = async (username, token, mal_id) => {
  try {
    const { data: mangaList } = await animexpo.patch(
      `/user/${username}/removeFromMangaList`,
      { mal_id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return mangaList;
  } catch (e) {
    console.log(e);
  }
};

export const updateFieldInMangaListEntry = async (username, token, body) => {
  try {
    const { data: mangaList } = await animexpo.patch(
      `user/${username}/updateMangaEntry`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return mangaList;
  } catch (e) {
    console.log(e);
  }
};
