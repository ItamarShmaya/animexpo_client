import {
  UserAnimeList,
  UserMangaList,
} from "../../../apis/animexpo/animexpo_updates.types";

export interface StatisticsProps {
  viewedUserAnimeList: UserAnimeList;
  viewedUserMangaList: UserMangaList;
}

export interface ListStatisticsProps {
  listType: "anime" | "manga";
  viewedUserList: UserAnimeList | UserMangaList;
}

export interface ChartDisplayProps {
  labels: string[];
  chartType: "bar" | "pie";
  currentlyEngaging: number;
  completed: number;
  dropped: number;
  onHold: number;
  planTo: number;
  totalEntries: number;
}
