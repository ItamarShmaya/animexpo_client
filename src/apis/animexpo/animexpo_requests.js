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
    const { data } = await animexpo.get(`/user/${username}/animelist`);
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
