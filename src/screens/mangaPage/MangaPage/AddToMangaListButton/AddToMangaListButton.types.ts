import { ApiMediaFormatType } from "../../../../apis/aniList/aniListTypes.types";

export interface AddToMangaListButtonProps {
  id: number;
  title: string;
  image: string;
  format: ApiMediaFormatType;
  volumes: number | undefined;
  inList: boolean;
  setInList: React.Dispatch<React.SetStateAction<boolean>>;
}
