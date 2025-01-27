import { ApiMediaFormatType, ApiMediaStatusType, ApiNextAiringEpisodeType, ApiStudiotype } from "../../apis/aniList/aniListTypes.types";

export interface CardProps {
  type: "anime" | "manga" | "character" | "staff";
  id: number;
  title: string | undefined;
  image: string | undefined;
  rank?: number;
  showRank: boolean;
  cardHeight?: number;
  cardWidth?: number;
  titleFontSize?: number;
  description?: string;
  season?: string;
  seasonYear?: number;
  studios?: ApiStudiotype[];
  genres?: string[];
  format?: ApiMediaFormatType;
  status?: ApiMediaStatusType;
  episodes?: number;
  duration?: number;
  averageScore?: number;
  nextAiringEpisode?: ApiNextAiringEpisodeType;
  hoverEffect?: boolean;
  cardListRef?: React.RefObject<HTMLDivElement>
}
