import { UserMediaEntry } from "../../../../apis/animexpo/animexpo_updates.types";
import { UserListReducerAction } from "../../../../reducers/userListReducer";

export interface AnimeListItemProps {
  item: UserMediaEntry;
  username: string;
  userList: UserMediaEntry[];
  setUserList: React.Dispatch<React.SetStateAction<UserMediaEntry[]>>;
  itemPosition: number;
  dispatch: React.Dispatch<UserListReducerAction>;
}
