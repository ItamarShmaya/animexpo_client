import { UserMediaEntry } from "../../../apis/animexpo/animexpo_updates.types";
import { AnimeListItemProps } from "./AnimeListItem/AnimeListItem.types";
import { AnimeStatusMenuProps } from "./AnimeStatusMenu/AnimeStatusMenu.types";

export interface UserListPorps {
  userList: UserMediaEntry[];
  username: string;
  setUserList: React.Dispatch<React.SetStateAction<UserMediaEntry[]>>;
  ListItem: React.FunctionComponent<AnimeListItemProps>;
  StatusMenu: React.FunctionComponent<AnimeStatusMenuProps>;
}
