import { UserMediaEntry } from "../../../../apis/animexpo/animexpo_updates.types";
import { UpdateEntryFuncType } from "../../userListUtils";

export interface MobileEditWindowProps {
  item: UserMediaEntry;
  isEdit: boolean;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  userList: UserMediaEntry[];
  setUserList: React.Dispatch<React.SetStateAction<UserMediaEntry[]>>;
  updateEntry: UpdateEntryFuncType;
}
