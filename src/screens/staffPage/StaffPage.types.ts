import { ApiStaffEntryType } from "../../apis/aniList/aniListTypes.types";

export interface StaffPageApiResponse {
  Staff: StaffPageEntryType;
}

export type StaffPageEntryType = Required<ApiStaffEntryType>;
