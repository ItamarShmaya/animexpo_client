import { ApiMediaType } from "../../../apis/aniList/aniListTypes.types";

export type MediaAdvancedSearchProps = {
  mediaType: ApiMediaType;
  showSeasonFilter: boolean;
  formats: string[];
};
