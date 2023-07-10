import { ApiMangaCharacterType } from "../../../mangaPage/MangaPage/MangaPage.types";
import { ApiAnimeCharacterType } from "../AnimePage.types";

export interface CharactersProps {
  characters:
    | { edges: ApiAnimeCharacterType[] }
    | { edges: ApiMangaCharacterType[] };
  vaLang?: string;
  setVaLang?: React.Dispatch<React.SetStateAction<string>>;
}

export interface VALanguageDropDownProps {
  characters: ApiAnimeCharacterType[];
  vaLang: string;
  setVaLang: React.Dispatch<React.SetStateAction<string>>;
}
