import { useCallback } from "react";

export const useSessionStorage = () => {
  const setUserSessionStorage = useCallback((listName, value) => {
    let userCache = JSON.parse(sessionStorage.getItem("userCache"));
    if (!userCache) userCache = {};
    userCache[listName] = value;
    sessionStorage.setItem("userCache", JSON.stringify(userCache));
  }, []);

  const getUserSessionStorage = useCallback(() => {
    const userCache = sessionStorage.getItem("userCache");
    if (userCache !== undefined) {
      return JSON.parse(userCache);
    }
    return "";
  }, []);

  const getEntryFromUserCache = useCallback(
    (listName, id) => {
      const userCache = getUserSessionStorage();
      if (!userCache) return;
      if (!userCache[listName]?.length > 0) return;

      return userCache[listName].find((entry) => +entry.id === +id);
    },
    [getUserSessionStorage]
  );

  const addEntryToUserCache = useCallback(
    (listName, entry) => {
      let userCache = getUserSessionStorage();
      if (!userCache) userCache = {};

      if (userCache[listName]) {
        if (userCache[listName].length === 10) userCache[listName].pop();
        userCache[listName].unshift(entry);
        setUserSessionStorage(listName, userCache[listName]);
        return;
      }
      setUserSessionStorage(listName, [entry]);
    },
    [getUserSessionStorage, setUserSessionStorage]
  );

  const addToSearchResultsChache = useCallback(
    (searchType, searchInput, searchResults) => {
      let userCache = getUserSessionStorage();
      if (!userCache) userCache = {};

      if (!userCache.search) {
        const search = {};
        search[searchType] = new Map();
        search[searchType].set(searchInput, searchResults);
        // maps cant be stored in storage
        search[searchType] = Array.from(search[searchType]);
        setUserSessionStorage("search", search);
        return;
      }

      if (!userCache.search[searchType]) {
        userCache.search[searchType] = new Map();
        userCache.search[searchType].set(searchInput, searchResults);
        userCache.search[searchType] = Array.from(userCache.search[searchType]);
        setUserSessionStorage("search", userCache.search);
        return;
      }

      userCache.search[searchType] = new Map(userCache.search[searchType]);
      if (userCache.search[searchType].size === 5) {
        const firstKeyInMap = Array.from(userCache.search[searchType])[0][0];
        userCache.search[searchType].delete(firstKeyInMap);
      }
      userCache.search[searchType].set(searchInput, searchResults);
      userCache.search[searchType] = Array.from(userCache.search[searchType]);
      setUserSessionStorage("search", userCache.search);
      return;
    },
    [getUserSessionStorage, setUserSessionStorage]
  );

  const getFromSearchResultsChache = useCallback(
    (searchType, searchInput) => {
      const userCache = getUserSessionStorage();
      if (!userCache) return;
      if (!userCache.search) return;
      if (!userCache.search[searchType]) return;
      if (!new Map(userCache.search[searchType]).get(searchInput)) return;
      return new Map(userCache.search[searchType]).get(searchInput);
    },
    [getUserSessionStorage]
  );

  const getFromProfilesCache = useCallback(
    (username) => {
      const userCache = getUserSessionStorage();
      if (!userCache) return;
      if (!userCache.profilesList?.length > 0) return;

      return userCache.profilesList.find(
        (profile) => profile.personalInfo.displayName.toLowerCase() === username
      );
    },
    [getUserSessionStorage]
  );

  return {
    getUserSessionStorage,
    setUserSessionStorage,
    getEntryFromUserCache,
    addEntryToUserCache,
    addToSearchResultsChache,
    getFromSearchResultsChache,
    getFromProfilesCache,
  };
};
