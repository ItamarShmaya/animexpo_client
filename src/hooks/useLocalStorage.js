export const useLocalStorage = () => {
  const setLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const getLocalStorage = (key) => {
    const value = localStorage.getItem(key);
    if (!value) return "";
    return JSON.parse(value);
  };

  return { getLocalStorage, setLocalStorage };
};
