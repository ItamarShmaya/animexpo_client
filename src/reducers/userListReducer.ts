import { UserMediaEntry } from "../apis/animexpo/animexpo_updates.types";

export type UserListReducerAction =
  | {
      type:
        | "sort_titleDesc"
        | "sort_titleAsc"
        | "sort_scoreDesc"
        | "sort_scoreAsc";
    }
  | {
      type:
        | "filter_all"
        | "filter_watching"
        | "filter_completed"
        | "filter_onhold"
        | "filter_dropped"
        | "filter_plantowatch"
        | "filter_reading"
        | "filter_plantoread";
      list: UserMediaEntry[];
    }
  | {
      type: "update_entry";
      updatedListEntry: UserMediaEntry;
      id: number;
    }
  | {
      type: "remove_entry";
      id: number;
    };

export function viewedListReducer(
  viewedList: UserMediaEntry[],
  action: UserListReducerAction
): UserMediaEntry[] {
  switch (action.type) {
    case "filter_all": {
      return action.list;
    }

    case "filter_watching": {
      return [...action.list].filter((entry) => {
        return entry.status === "Watching";
      });
    }

    case "filter_completed": {
      return [...action.list].filter((entry) => {
        return entry.status === "Completed";
      });
    }

    case "filter_onhold": {
      return [...action.list].filter((entry) => {
        return entry.status === "On Hold";
      });
    }

    case "filter_dropped": {
      return [...action.list].filter((entry) => {
        return entry.status === "Dropped";
      });
    }

    case "filter_plantowatch": {
      return [...action.list].filter((entry) => {
        return entry.status === "Plan to Watch";
      });
    }

    case "filter_reading": {
      return [...action.list].filter((entry) => {
        return entry.status === "Reading";
      });
    }

    case "filter_plantoread": {
      return [...action.list].filter((entry) => {
        return entry.status === "Plan to Read";
      });
    }

    case "sort_titleDesc": {
      return [...viewedList].sort((entry1, entry2) => {
        return entry2.title
          .toLowerCase()
          .localeCompare(entry1.title.toLowerCase());
      });
    }

    case "sort_titleAsc": {
      return [...viewedList].sort((entry1, entry2) => {
        return entry1.title
          .toLowerCase()
          .localeCompare(entry2.title.toLowerCase());
      });
    }

    case "sort_scoreDesc": {
      return [...viewedList].sort((entry1, entry2) => {
        return entry2.score - entry1.score;
      });
    }

    case "sort_scoreAsc": {
      return [...viewedList].sort((entry1, entry2) => {
        return entry1.score - entry2.score;
      });
    }

    case "update_entry": {
      const updatedList = [...viewedList];
      const index = updatedList.findIndex((entry) => entry.id === action.id);
      updatedList[index] = action.updatedListEntry;
      return updatedList;
    }

    case "remove_entry": {
      const updatedList = [...viewedList];
      const index = updatedList.findIndex((entry) => entry.id === action.id);
      updatedList.splice(index, 1);
      return updatedList;
    }

    default: {
      throw Error(`Unknown action`);
    }
  }
}
