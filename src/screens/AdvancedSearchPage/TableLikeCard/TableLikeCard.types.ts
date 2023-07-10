import { ApiNextAiringEpisodeType } from "../../../apis/aniList/aniListTypes.types";

export type TableLikeCardProps = {
  type?: string;
  id?: number;
  title?: string;
  image?: string;
  genres?: string[];
  averageScore?: number;
  popularity?: number;
  format?: string;
  episodes?: number;
  duration?: number;
  status?: string;
  nextAiringEpisode?: ApiNextAiringEpisodeType;
  season?: string;
  seasonYear?: number;
  showRank: boolean;
  rank?: number;
  startYear?: number;
  endYear?: number;
  chapters?: number;
  volumes?: number;
};
