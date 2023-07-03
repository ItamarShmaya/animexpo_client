import {
  ApiMediaType,
  ApiMediaEntryType,
} from "../../../apis/aniList/aniListTypes.types";

export type MediaSearchMenuProps = {
  setList: React.Dispatch<React.SetStateAction<ApiMediaEntryType[] | []>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  mediaType: ApiMediaType;
  formats: string[];
  showSeasonFilter: boolean;
};

export type SearchInputsType = {
  search: string;
  genres: string[];
  tags: string[];
  year: string;
  season: string;
  format: string[];
};

export type MultipleSelectOptionProps = {
  listName: string;
  isSelected: boolean;
  optionName: string;
  searchParams: URLSearchParams;
  setSearchParams: Function;
};
