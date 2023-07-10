import {
  addToFavCharList,
  removeFromFavCharList,
} from "../../../../apis/animexpo/animexpo_updates";
import { LocalStorageLoggedUser } from "../../../../hooks/useLocalStorage.types";

export interface CharacterHeroProps {
  id: number;
  name: string;
  image: string;
  description: string;
  age?: number;
  bloodType?: string;
  gender?: string;
  birthday?: string;
  inFavorites: boolean;
  setInFavorites: React.Dispatch<React.SetStateAction<boolean>>;
  addToList: typeof addToFavCharList;
  removeFromList: typeof removeFromFavCharList;
  localStorageKey: keyof LocalStorageLoggedUser;
}
