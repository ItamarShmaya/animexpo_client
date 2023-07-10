import { CharacterAppearanceReducerAction } from "../../../../../reducers/charAppearancesReducer";
import { StaffRolesReducerAction } from "../../../../../reducers/staffRolesReducers";

export interface SortByDropDownProps {
  dispatch:
    | React.Dispatch<CharacterAppearanceReducerAction>
    | React.Dispatch<StaffRolesReducerAction>;
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  sortByPopularityDesc?: boolean;
  sortByFavouritesDesc?: boolean;
  sortByScoreDesc?: boolean;
  sortByDateDesc?: boolean;
  sortByDateAsc?: boolean;
  sortByTitleAsc?: boolean;
  sortByNameAsc?: boolean;
}
