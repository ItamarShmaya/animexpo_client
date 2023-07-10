import { removeFromFavCharList } from "../../../../apis/animexpo/animexpo_updates";
import { LocalStorageLoggedUser } from "../../../../hooks/useLocalStorage.types";

export interface RemoveFromFavoriteButtonProps {
  id: number;
  setInFavorites: React.Dispatch<React.SetStateAction<boolean>>;
  removeFromList: typeof removeFromFavCharList;
  localStorageKey: keyof LocalStorageLoggedUser;
}
