export const useLocalStorage = () => {
  const setLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const getLocalStorage = (key) => {
    const value = localStorage.getItem(key);
    if (value !== undefined) {
      return JSON.parse(value);
    }
    return "";
  };

  return { getLocalStorage, setLocalStorage };
};
