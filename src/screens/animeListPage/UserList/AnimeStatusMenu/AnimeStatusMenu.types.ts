import { UserMediaEntry } from "../../../../apis/animexpo/animexpo_updates.types";
import { UserListReducerAction } from "../../../../reducers/userListReducer";

export interface AnimeStatusMenuProps {
  userList: UserMediaEntry[];
  setViewedStatus: React.Dispatch<React.SetStateAction<string>>;
  dispatch: React.Dispatch<UserListReducerAction>;
}
