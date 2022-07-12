import animexpo from "./animexpo.js";

export const createUser = async (body) => {
  try {
    const { data: user } = await animexpo.post("/users/register", body);
    return user;
  } catch (e) {
    const error = e.response.data;
    throw error;
  }
};

export const loginUser = async (body) => {
  try {
    const { data: user } = await animexpo.post("/user/login", body);
    return user;
  } catch (e) {
    const error = e.response.data;
    throw error;
  }
};

export const logoutUser = async (user) => {
  try {
    const response = await animexpo.post(
      "/user/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    return response;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const getUserProfileData = async (username) => {
  try {
    const { data: profileData } = await animexpo.get(`/profile/${username}`);
    return profileData;
  } catch (e) {
    const error = e.response.data;
    throw error;
  }
};

export const authinticateUser = async (token, username) => {
  try {
    const response = await animexpo.post(
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
    return response.data.auth;
  } catch (e) {
    throw e.response.data.auth;
  }
};

export const getUserAnimeList = async (username) => {
  try {
    const { data } = await animexpo.get(`/user/${username}/animelist`);
    return data;
  } catch (e) {
    throw e.response.data;
  }
};

export const getUserMangaList = async (username) => {
  try {
    const { data } = await animexpo.get(`/user/${username}/mangalist`);
    return data;
  } catch (e) {
    throw e.response.data;
  }
};

export const getUsersBySearch = async (query) => {
  try {
    const { data: users } = await animexpo.get(`/users?username=${query}`);
    return users;
  } catch (e) {
    console.log(e);
  }
};

export const postReview = async (token, body) => {
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

export const getEntryReviews = async (mal_id, limit) => {
  try {
    const { data: reviewsList } = await animexpo.get(
      `/reviews/${mal_id}?limit=${limit}`
    );
    return reviewsList;
  } catch (e) {
    throw e;
  }
};

export const getUserReviews = async (username) => {
  try {
    const { data: userReviewsList } = await animexpo.get(
      `/user/${username}/reviews`
    );
    return userReviewsList;
  } catch (e) {
    throw e;
  }
};

export const getUserNotifications = async (username, token) => {
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

export const getUserFriendRequests = async (token, username) => {
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

export const getUserFullFriendsList = async (username, token) => {
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
  username,
  token,
  friendUsername
) => {
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
  username,
  token,
  friendUsername
) => {
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

export const removeFriend = async (username, token, friendUsername) => {
  try {
    const { data: friendsList } = await animexpo.post(
      `/user/${username}/removeFriend`,
      { friendUsername },
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
