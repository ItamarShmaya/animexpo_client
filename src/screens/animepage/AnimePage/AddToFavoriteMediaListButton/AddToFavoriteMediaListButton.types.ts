import {
  addToFavAnimeList,
  addToFavMangaList,
  removeFromFavAnimeList,
  removeFromFavMangaList,
} from "../../../../apis/animexpo/animexpo_updates";

export interface AddToFavoriteMediaListButtonProps {
  id: number;
  title: string | undefined;
  image: string | undefined;
  inFavList: boolean;
  setInFavList: React.Dispatch<React.SetStateAction<boolean>>;
  addToFavorite: typeof addToFavAnimeList | typeof addToFavMangaList;
  removeFromFavorite:
    | typeof removeFromFavAnimeList
    | typeof removeFromFavMangaList;
  favoriteListName: "favoriteAnime" | "favoriteManga";
}
