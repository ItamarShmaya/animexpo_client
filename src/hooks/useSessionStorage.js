import { useCallback } from "react";

export const useSessionStorage = () => {
  const setSessionStorage = useCallback((key, value) => {
    sessionStorage.setItem(key, JSON.stringify(value));
  }, []);

  const getSessionStorage = useCallback((key) => {
    const value = sessionStorage.getItem(key);
    if (value !== undefined) {
      return JSON.parse(value);
    }
    return "";
  }, []);

  const getEntryFromSessionStorage = useCallback(
    (key, id) => {
      const list = getSessionStorage(key);
      if (list?.length > 0) {
        const entry = list.find((entry) => +entry.id === +id);
        return entry;
      }
      return "";
    },
    [getSessionStorage]
  );

  const addToEntrySessionStorage = useCallback(
    (key, entry) => {
      const list = getSessionStorage(key);
      if (list) {
        if(list.length === 10) list.pop();
        list.unshift(entry);
        setSessionStorage(key, list);
        return;
      }
      setSessionStorage(key, [entry]);
    },
    [getSessionStorage, setSessionStorage]
  );

  return {
    getSessionStorage,
    setSessionStorage,
    getEntryFromSessionStorage,
    addToEntrySessionStorage,
  };
};
