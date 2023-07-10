import { ApiMediaEntryType } from "../../../../apis/aniList/aniListTypes.types";
import {
  addToFavAnimeList,
  removeFromFavAnimeList,
} from "../../../../apis/animexpo/animexpo_updates";
import { AddToMangaListButtonProps } from "../../../mangaPage/MangaPage/AddToMangaListButton/AddToMangaListButton.types";
import { AddToAnimeListButtonProps } from "../AddToAnimeListButton/AddToAnimeListButton.types";

export interface EntryPageHeroProps {
  entry: ApiMediaEntryType;
  inList: boolean;
  setInList: React.Dispatch<React.SetStateAction<boolean>>;
  inFavList: boolean;
  setInFavList: React.Dispatch<React.SetStateAction<boolean>>;
  AddToListButton:
    | React.FunctionComponent<AddToAnimeListButtonProps>
    | React.FunctionComponent<AddToMangaListButtonProps>;
  addToFavorite: typeof addToFavAnimeList;
  removeFromFavorite: typeof removeFromFavAnimeList;
  favoriteListName: "favoriteAnime" | "favoriteManga";
}
