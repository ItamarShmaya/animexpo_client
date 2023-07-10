import { ApiMediaFormatType } from "../../../../apis/aniList/aniListTypes.types";

export interface AddToAnimeListButtonProps {
  id: number;
  title: string;
  image: string;
  format: ApiMediaFormatType;
  episodes: number | undefined;
  inList: boolean;
  setInList: React.Dispatch<React.SetStateAction<boolean>>;
}
