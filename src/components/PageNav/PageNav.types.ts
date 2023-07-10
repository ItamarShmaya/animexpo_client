export interface PageNavProps {
  pageNumber: number | undefined;
  onPrevClick: (e: React.MouseEvent) => void;
  onNextClick: (e: React.MouseEvent) => void;
  mid?: boolean;
  left?: boolean;
  hasNextPage: boolean | undefined;
}
