import { Notification } from "../../../context/LoggedInUser.types";

export interface NotificationWindowProps {
  notifications: Notification[];
  setNotifOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
