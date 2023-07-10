import { addToFavCharList } from "../../../../apis/animexpo/animexpo_updates";
import { LocalStorageLoggedUser } from "../../../../hooks/useLocalStorage.types";

export interface AddToFavoriteListButtonProps {
  id: number;
  name: string;
  image: string;
  setInFavorites: React.Dispatch<React.SetStateAction<boolean>>;
  addToList: typeof addToFavCharList;
  localStorageKey: keyof LocalStorageLoggedUser;
}
