import {
  ApiCharacterEntryType,
  ApiMediaEntryType,
} from "../../apis/aniList/aniListTypes.types";

export interface landingPageData {
  trending: { media: ApiMediaEntryType[] };
  thisSeason: { media: ApiMediaEntryType[] };
  nextSeason: { media: ApiMediaEntryType[] };
  popular: { media: ApiMediaEntryType[] };
  top: { media: ApiMediaEntryType[] };
  topManga: { media: ApiMediaEntryType[] };
  topCharacters: { characters: ApiCharacterEntryType[] };
}
