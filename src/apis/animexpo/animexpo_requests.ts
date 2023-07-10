import { AxiosResponse } from "axios";
import animexpo from "./animexpo.js";
import {
  CreaterUserBody,
  LoginUserBody,
  PostReviewBody,
  ReviewType,
  UserData,
} from "./animexpo_requests.types.js";
import {
  UserAnimeList,
  UserFriendRequests,
  UserFriendsList,
  UserInfo,
  UserMangaList,
  UserProfileData,
} from "./animexpo_updates.types.js";
import { Notification } from "../../context/LoggedInUser.types.js";

export const createUser = async (body: CreaterUserBody): Promise<UserData> => {
  try {
    const { data: user } = await animexpo.post("/users/register", body);
    return user;
  } catch (e: any) {
    const error = e.response.data;
    throw error;
  }
};

export const loginUser = async (body: LoginUserBody): Promise<UserData> => {
  try {
    const { data: user } = await animexpo.post("/user/login", body);
    return user;
  } catch (e: any) {
    const error = e.response.data;
    throw error;
  }
};

export const logoutUser = async (token: string): Promise<AxiosResponse> => {
  try {
    const response = await animexpo.post(
      "/user/logout",
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
    throw e;
  }
};

export const getUserProfileData = async (
  username: string
): Promise<UserProfileData> => {
  try {
    const { data: profileData } = await animexpo.get(`/profile/${username}`);
    return profileData;
  } catch (e: any) {
    const error = e.response.data;
    throw error;
  }
};

export const authinticateUser = async (
  token: string,
  username: string
): Promise<boolean> => {
  try {
    const { data } = await animexpo.post(
      "/user/authinticate",
      {
        token,
        username,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data.auth;
  } catch (e: any) {
    throw e.response.data.auth;
  }
};

export const getUserAnimeList = async (
  username: string
): Promise<UserAnimeList> => {
  try {
    const { data: animeList } = await animexpo.get(
      `/user/${username}/animelist`
    );
    return animeList;
  } catch (e: any) {
    throw e.response.data;
  }
};

export const getUserMangaList = async (
  username: string
): Promise<UserMangaList> => {
  try {
    const { data: mangaList } = await animexpo.get(
      `/user/${username}/mangalist`
    );
    return mangaList;
  } catch (e: any) {
    throw e.response.data;
  }
};

export const getUsersBySearch = async (query: string): Promise<UserInfo[]> => {
  try {
    const { data: users } = await animexpo.get(`/users?username=${query}`);
    return users;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const postReview = async (
  token: string,
  body: PostReviewBody
): Promise<ReviewType[]> => {
  try {
    const { data: updatedReviewList } = await animexpo.post(
      `/user/reviews`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return updatedReviewList;
  } catch (e) {
    throw e;
  }
};

export const getEntryReviews = async (
  id: number,
  limit: number
): Promise<ReviewType[]> => {
  try {
    const { data: reviewsList } = await animexpo.get(
      `/reviews/${id}?limit=${limit}`
    );
    return reviewsList;
  } catch (e) {
    throw e;
  }
};

export const getUserReviews = async (
  username: string
): Promise<ReviewType[]> => {
  try {
    const { data: userReviewsList } = await animexpo.get(
      `/user/${username}/reviews`
    );
    return userReviewsList;
  } catch (e) {
    throw e;
  }
};

export const getUserNotifications = async (
  username: string,
  token: string
): Promise<Notification[]> => {
  try {
    const { data: notificationsList } = await animexpo.get(
      `/user/${username}/notifications`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return notificationsList;
  } catch (e) {
    throw e;
  }
};

export const getUserFriendRequests = async (
  token: string,
  username: string
): Promise<UserFriendRequests[]> => {
  try {
    const { data: friendRequests } = await animexpo.get(
      `/user/${username}/friendRequests`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return friendRequests;
  } catch (e) {
    throw e;
  }
};

export const getUserFullFriendsList = async (
  username: string,
  token: string
): Promise<UserFriendsList> => {
  try {
    const { data: friendsList } = await animexpo.get(
      `/user/${username}/friends`,
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

export const checkIsUserInFriendsList = async (
  username: string,
  token: string,
  friendUsername: string
): Promise<boolean> => {
  try {
    const { data: isUserInFriendsList } = await animexpo.post(
      `/user/${username}/isUserInFriendsList`,
      { friendUsername },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return isUserInFriendsList;
  } catch (e) {
    throw e;
  }
};

export const checkWasFriendRequestSent = async (
  username: string,
  token: string,
  friendUsername: string
): Promise<boolean> => {
  try {
    const { data: wasFriendRequestSent } = await animexpo.post(
      `/user/${username}/wasFriendRequestSent`,
      { friendUsername },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return wasFriendRequestSent;
  } catch (e) {
    throw e;
  }
};

export const removeFriend = async (
  username: string,
  token: string,
  friendUsername: string
): Promise<UserFriendsList> => {
  try {
    const { data: updatedFriendsList } = await animexpo.post(
      `/user/${username}/removeFriend`,
      { friendUsername },
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
