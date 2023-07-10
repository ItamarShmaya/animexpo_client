import { UserMediaEntry } from "../../../apis/animexpo/animexpo_updates.types";
import { UpdateEntryFuncType } from "../userListUtils";
import { MobileUserListItemProps } from "./MobileAnimeListItem/MobileUserListItem.types";

export interface MobileUserListProps {
  userList: UserMediaEntry[];
  setUserList: React.Dispatch<React.SetStateAction<UserMediaEntry[]>>;
  ListItem: React.FunctionComponent<MobileUserListItemProps>;
  username: string;
  updateEntry: UpdateEntryFuncType;
  mediaType: "anime" | "manga";
}
