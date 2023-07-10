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
}
