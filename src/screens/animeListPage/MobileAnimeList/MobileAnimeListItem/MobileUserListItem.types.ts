import { UserMediaEntry } from "../../../../apis/animexpo/animexpo_updates.types";
import { UpdateEntryFuncType } from "../../userListUtils";

export interface MobileUserListItemProps {
  item: UserMediaEntry;
  userList: UserMediaEntry[];
  setUserList: React.Dispatch<React.SetStateAction<UserMediaEntry[]>>;
  username: string;
  updateEntry: UpdateEntryFuncType;
  mediaType: "anime" | "manga";
}
