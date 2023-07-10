import {
  ApiPageInfoType,
  ApiStaffCharacterMediaEdgesType,
} from "../../../apis/aniList/aniListTypes.types";
import { StaffRolesReducerAction } from "../../../reducers/staffRolesReducers";

export interface VARolesProps {
  rolesList: ApiStaffCharacterMediaEdgesType[];
  cardWidth?: number;
  cardHeight?: number;
  dispatch: React.Dispatch<StaffRolesReducerAction>;
  id: number;
  pageInfo: ApiPageInfoType;
  setPageInfo: React.Dispatch<React.SetStateAction<ApiPageInfoType>>;
}
