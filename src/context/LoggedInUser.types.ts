import { Socket } from "socket.io-client";

export interface LoggedInUser {
  _id: string;
  username: string;
  email: string;
  token: string;
}

export interface Notification {
  _id: string;
  read: boolean;
  requester: {
    username: string;
    avatar: {
      secure_url: string;
      public_id: string;
    };
  };
  type: number;
  createdAt: string;
}

export interface LoggedInUserContextType {
  loggedInUser: LoggedInUser;
  setLoggedInUser: React.Dispatch<React.SetStateAction<LoggedInUser | null>>;
  notifications: Notification[];
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
  socket: Socket;
}
