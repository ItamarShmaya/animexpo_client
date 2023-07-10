import {
  ApiMediaFormatType,
  ApiMediaSortType,
  ApiMediaType,
} from "../../apis/aniList/aniListTypes.types";

export interface RankedListPageProrps {
  mediaType: ApiMediaType;
  mediaSort: ApiMediaSortType;
  season?: string;
  seasonYear?: number;
  heading: string;
  mediaFormat?: ApiMediaFormatType;
}
