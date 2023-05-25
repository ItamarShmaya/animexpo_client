import animexpo from "./animexpo";

export const addToAnimeList = async (username, token, animeEntry) => {
  try {
    const { data: updatedAnimeList } = await animexpo.patch(
      `/user/${username}/addToAnimelist`,
      animeEntry,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return updatedAnimeList;
  } catch (e) {
    throw e;
  }
};

export const removeFromAnimeList = async (username, token, mal_id) => {
  try {
    const { data: updatedAnimeList } = await animexpo.patch(
      `/user/${username}/removeFromAnimeList`,
      { mal_id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return updatedAnimeList;
  } catch (e) {
    throw e;
  }
};

export const updateFieldInAnimeListEntry = async (username, token, body) => {
  try {
    // const { data: updatedAnimeList } = await animexpo.patch(
    const { data: updatedAnimeListEntry } = await animexpo.patch(
      `user/${username}/updateAnimeEntry`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return updatedAnimeListEntry;
  } catch (e) {
    throw e;
  }
};

export const addToMangaList = async (username, token, mangaEntry) => {
  try {
    const { data: updatedMangaList } = await animexpo.patch(
      `/user/${username}/addToMangalist`,
      mangaEntry,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return updatedMangaList;
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
    const { data: updatedMangaList } = await animexpo.patch(
      `user/${username}/updateMangaEntry`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return updatedMangaList;
  } catch (e) {
    throw e;
  }
};

export const addToFavCharList = async (username, token, charEntry) => {
  try {
    const { data: updatedCharacterList } = await animexpo.patch(
      `/user/${username}/addToFavCharList`,
      charEntry,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return updatedCharacterList;
  } catch (e) {
    throw e;
  }
};

export const removeFromFavCharList = async (username, token, mal_id) => {
  try {
    const { data: updatedCharacterList } = await animexpo.patch(
      `/user/${username}/removeFromFavCharList`,
      { mal_id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return updatedCharacterList;
  } catch (e) {
    throw e;
  }
};

export const addToFavPeopleList = async (username, token, personEntry) => {
  try {
    const { data: updatedPeopleList } = await animexpo.patch(
      `/user/${username}/addToFavPeopleList`,
      personEntry,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return updatedPeopleList;
  } catch (e) {
    throw e;
  }
};

export const removeFromFavPeopleList = async (username, token, mal_id) => {
  try {
    const { data: updatedPeopleList } = await animexpo.patch(
      `/user/${username}/removeFromFavPeopleList`,
      { mal_id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return updatedPeopleList;
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

export const sendFriendRequest = async (token, fromUsername, toUsername) => {
  try {
    const { data: friendsList } = await animexpo.post(
      `/user/${fromUsername}/sendFriendRequest`,
      { toUsername },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return friendsList;
  } catch (e) {
    throw e;
  }
};

export const acceptFriendRequest = async (token, username, id) => {
  try {
    const { data } = await animexpo.post(
      `/user/${username}/acceptFriendRequest`,
      { id },
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

export const rejectFriendRequest = async (token, username, id) => {
  try {
    const { data: updatedFriendsList } = await animexpo.post(
      `/user/${username}/rejectFriendRequest`,
      { id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return updatedFriendsList;
  } catch (e) {
    throw e;
  }
};

export const updateNotificationsToRead = async (username, token) => {
  try {
    const response = await animexpo.post(
      `/user/${username}/notifications`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const deleteUser = async (username, token) => {
  try {
    const response = await animexpo.delete(`/user/${username}/deleteUser`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (e) {
    console.log(e);
  }
};
