import animexpo from "./animexpo";
import {
  UserAnimeList,
  UserFavoriteMediaList,
  UserFavoriteNotMediaList,
  UserFriendsList,
  UserProfileData,
  UpdateMediaEntryBody,
  UserAnimeEntry,
  UserFavoriteMediaEntry,
  UserFavoriteNotMediaEntry,
  UserMangaEntry,
  UserMediaEntryBodyToAdd,
  UserFriendRequests,
  UserMangaList,
} from "./animexpo_updates.types";

export const addToAnimeList = async (
  username: string,
  token: string,
  animeEntry: UserMediaEntryBodyToAdd
): Promise<UserAnimeList> => {
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

export const removeFromAnimeList = async (
  username: string,
  token: string,
  id: number
): Promise<UserAnimeList> => {
  try {
    const { data: updatedAnimeList } = await animexpo.patch(
      `/user/${username}/removeFromAnimeList`,
      { id },
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

export const updateFieldInAnimeListEntry = async (
  username: string,
  token: string,
  body: UpdateMediaEntryBody
): Promise<UserAnimeEntry> => {
  try {
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

export const addToMangaList = async (
  username: string,
  token: string,
  mangaEntry: UserMediaEntryBodyToAdd
): Promise<UserMangaList> => {
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

export const removeFromMangaList = async (
  username: string,
  token: string,
  id: number
): Promise<UserMangaList> => {
  try {
    const { data: mangaList } = await animexpo.patch(
      `/user/${username}/removeFromMangaList`,
      { id },
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

export const updateFieldInMangaListEntry = async (
  username: string,
  token: string,
  body: UpdateMediaEntryBody
): Promise<UserMangaEntry> => {
  try {
    const { data: updatedMangaListEntry } = await animexpo.patch(
      `user/${username}/updateMangaEntry`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return updatedMangaListEntry;
  } catch (e) {
    throw e;
  }
};

export const addToFavAnimeList = async (
  username: string,
  token: string,
  animeEntry: UserFavoriteMediaEntry
): Promise<UserFavoriteMediaList> => {
  try {
    const { data: updatedFavAnimeList } = await animexpo.patch(
      `/user/${username}/addToFavAnimeList`,
      animeEntry,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return updatedFavAnimeList;
  } catch (e) {
    throw e;
  }
};
export const removeFromFavAnimeList = async (
  username: string,
  token: string,
  id: number
): Promise<UserFavoriteMediaList> => {
  try {
    const { data: updatedFavAnimeList } = await animexpo.patch(
      `/user/${username}/removeFromFavAnimeList`,
      { id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return updatedFavAnimeList;
  } catch (e) {
    throw e;
  }
};
export const addToFavMangaList = async (
  username: string,
  token: string,
  mangaEntry: UserFavoriteMediaEntry
): Promise<UserFavoriteMediaList> => {
  try {
    const { data: updatedFavMangaList } = await animexpo.patch(
      `/user/${username}/addToFavMangaList`,
      mangaEntry,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return updatedFavMangaList;
  } catch (e) {
    throw e;
  }
};
export const removeFromFavMangaList = async (
  username: string,
  token: string,
  id: number
): Promise<UserFavoriteMediaList> => {
  try {
    const { data: updatedFavMangaList } = await animexpo.patch(
      `/user/${username}/removeFromFavMangaList`,
      { id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return updatedFavMangaList;
  } catch (e) {
    throw e;
  }
};
export const addToFavCharList = async (
  username: string,
  token: string,
  charEntry: UserFavoriteNotMediaEntry
): Promise<UserFavoriteNotMediaList> => {
  try {
    const { data: updatedFavCharacterList } = await animexpo.patch(
      `/user/${username}/addToFavCharList`,
      charEntry,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return updatedFavCharacterList;
  } catch (e) {
    throw e;
  }
};

export const removeFromFavCharList = async (
  username: string,
  token: string,
  id: number
): Promise<UserFavoriteNotMediaList> => {
  try {
    const { data: updatedFavCharacterList } = await animexpo.patch(
      `/user/${username}/removeFromFavCharList`,
      { id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return updatedFavCharacterList;
  } catch (e) {
    throw e;
  }
};

export const addToFavStaffList = async (
  username: string,
  token: string,
  staffEntry: UserFavoriteNotMediaEntry
): Promise<UserFavoriteNotMediaList> => {
  try {
    const { data: updatedFavStaffList } = await animexpo.patch(
      `/user/${username}/addToFavStaffList`,
      staffEntry,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return updatedFavStaffList;
  } catch (e) {
    throw e;
  }
};

export const removeFromFavStaffList = async (
  username: string,
  token: string,
  id: number
): Promise<UserFavoriteNotMediaList> => {
  try {
    const { data: updatedFavStaffList } = await animexpo.patch(
      `/user/${username}/removeFromFavStaffList`,
      { id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return updatedFavStaffList;
  } catch (e) {
    throw e;
  }
};

export const changeAvatar = async (
  username: string,
  token: string,
  file: FormData
): Promise<UserProfileData> => {
  try {
    const { data: updatedProfileData } = await animexpo.post(
      `/user/${username}/changeAvatar`,
      file,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return updatedProfileData;
  } catch (e) {
    throw e;
  }
};

// export const updateProfileData = async (
//   username: string,
//   token: string,
//   body: any
// ) => {
//   try {
//     const response = await animexpo.patch(
//       `/user/${username}/updateProfileData`,
//       body,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     const response = await animexpo({
//       method: "patch",
//       url: `/user/${username}/updateProfileData`,
//       data: body,
//       headers: {
//         "Content-Type": `multipart/form-data`,
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     const response = await animexpo.post(
//       `/user/${username}/updateProfileData`,
//       body,
//       { headers: { "Content-Type": "multipart/form-data" } }
//     );
//     return response;
//   } catch (e) {
//     throw e;
//   }
// };

export const sendFriendRequest = async (
  token: string,
  fromUsername: string,
  toUsername: string
): Promise<UserFriendsList> => {
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

export const acceptFriendRequest = async (
  token: string,
  username: string,
  _id: string
): Promise<{
  updatedFriendsList: UserFriendsList;
  updatedFriendRequestsList: UserFriendRequests[];
}> => {
  try {
    const { data: updatedLists } = await animexpo.post(
      `/user/${username}/acceptFriendRequest`,
      { _id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return updatedLists;
  } catch (e) {
    throw e;
  }
};

export const rejectFriendRequest = async (
  token: string,
  username: string,
  _id: string
): Promise<UserFriendRequests[]> => {
  try {
    const { data: updatedFriendRequestsList } = await animexpo.post(
      `/user/${username}/rejectFriendRequest`,
      { _id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return updatedFriendRequestsList;
  } catch (e) {
    throw e;
  }
};

export const updateNotificationsToRead = async (
  username: string,
  token: string
): Promise<{ success: boolean; e?: typeof Error }> => {
  try {
    const { data } = await animexpo.post(
      `/user/${username}/new-notifications`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const deleteUser = async (
  username: string,
  token: string
): Promise<{ delete: "success" | "failed"; code: 200 | 500 }> => {
  try {
    const { data } = await animexpo.delete(`/user/${username}/deleteUser`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (e) {
    console.log(e);
    throw e;
  }
};
