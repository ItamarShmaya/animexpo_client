import { ApiMediaTagObjectType } from "../apis/aniList/aniListTypes.types";
import { UserProfileData } from "../apis/animexpo/animexpo_updates.types";
import { SearchResultsType } from "../components/SearchBar/SearchBar.types";
import { AnimePageEntryType } from "../screens/animepage/AnimePage/AnimePage.types";
import { CharacterPageEntryType } from "../screens/characterPage/CharacterPage/CharacterPage.types";
import { landingPageData } from "../screens/landingpage/LandingPageTypes";
import { MangaPageEntryType } from "../screens/mangaPage/MangaPage/MangaPage.types";
import { StaffPageEntryType } from "../screens/staffPage/StaffPage.types";

export interface UserChacheType {
  animeList: AnimePageEntryType[];
  mangaList: MangaPageEntryType[];
  charsList: CharacterPageEntryType[];
  staffList: StaffPageEntryType[];
  landingPageData: landingPageData;
  genres: string[];
  tags: ApiMediaTagObjectType[];
  search: UserCacheSearchType;
  profilesList: UserProfileData[];
}

export interface UserCacheSearchType {
  anime: Map<any, any> | [string, SearchResultsType][];
  manga: Map<any, any> | [string, SearchResultsType][];
  character: Map<any, any> | [string, SearchResultsType][];
  staff: Map<any, any> | [string, SearchResultsType][];
  users: Map<any, any> | [string, SearchResultsType][];
}
