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
    throw e;
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
    throw e;
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
    throw e;
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
    throw e;
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
    throw e;
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
    throw e;
  }
};

export const addToFavCharList = async (username, token, charEntry) => {
  try {
    const { data: characterList } = await animexpo.patch(
      `/user/${username}/addToFavCharList`,
      charEntry,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return characterList;
  } catch (e) {
    throw e;
  }
};

export const removeFromFavCharList = async (username, token, mal_id) => {
  try {
    const { data: characterList } = await animexpo.patch(
      `/user/${username}/removeFromFavCharList`,
      { mal_id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return characterList;
  } catch (e) {
    throw e;
  }
};

export const addToFavPeopleList = async (username, token, personEntry) => {
  try {
    const { data: peopleList } = await animexpo.patch(
      `/user/${username}/addToFavPeopleList`,
      personEntry,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return peopleList;
  } catch (e) {
    throw e;
  }
};

export const removeFromFavPeopleList = async (username, token, mal_id) => {
  try {
    const { data: peopleList } = await animexpo.patch(
      `/user/${username}/removeFromFavPeopleList`,
      { mal_id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return peopleList;
  } catch (e) {
    throw e;
  }
};

export const changeAvatar = async (username, token, file) => {
  try {
    const { data } = await animexpo.post(
      `/user/${username}/changeAvatar`,
      file,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (e) {
    throw e;
  }
};

export const updateProfileData = async (username, token, body) => {
  try {
    // const response = await animexpo.patch(
    //   `/user/${username}/updateProfileData`,
    //   body,
    //   {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   }
    // );
    // const response = await animexpo({
    //   method: "patch",
    //   url: `/user/${username}/updateProfileData`,
    //   data: body,
    //   headers: {
    //     "Content-Type": `multipart/form-data`,
    //     Authorization: `Bearer ${token}`,
    //   },
    // });
    const response = await animexpo.post(
      `/user/${username}/updateProfileData`,
      body,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    return response;
  } catch (e) {
    throw e;
  }
};
