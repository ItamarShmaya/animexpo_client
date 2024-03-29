import { ApiStaffCharacterMediaEdgesType } from "../apis/aniList/aniListTypes.types";

export type StaffRolesReducerAction =
  | {
      type: "update_list";
      list: ApiStaffCharacterMediaEdgesType[];
    }
  | {
      type:
        | "sort_popularity_asc"
        | "sort_popularity_desc"
        | "sort_favourites_asc"
        | "sort_favourites_desc"
        | "sort_averageScore_asc"
        | "sort_averageScore_desc"
        | "sort_newest"
        | "sort_oldest"
        | "sort_title_asc"
        | "sort_name_asc"
        | "sort_trending_desc"
    };

export function staffRolesReducer(
  viewedList: ApiStaffCharacterMediaEdgesType[],
  action: StaffRolesReducerAction
) {
  switch (action.type) {
    case "update_list": {
      return [...viewedList].concat(action.list);
    }

    case "sort_popularity_asc": {
      return [...viewedList].sort((entry1, entry2) => {
        return entry1.node.popularity - entry2.node.popularity;
      });
    }

    case "sort_popularity_desc": {
      return [...viewedList].sort((entry1, entry2) => {
        return entry2.node.popularity - entry1.node.popularity;
      });
    }

    case "sort_favourites_asc": {
      return [...viewedList].sort((entry1, entry2) => {
        return entry1.node.favourites - entry2.node.favourites;
      });
    }

    case "sort_favourites_desc": {
      return [...viewedList].sort((entry1, entry2) => {
        return entry2.node.favourites - entry1.node.favourites;
      });
    }

    case "sort_averageScore_asc": {
      return [...viewedList].sort((entry1, entry2) => {
        return entry1.node.averageScore - entry2.node.averageScore;
      });
    }

    case "sort_averageScore_desc": {
      return [...viewedList].sort((entry1, entry2) => {
        return entry2.node.averageScore - entry1.node.averageScore;
      });
    }

    case "sort_newest": {
      return [...viewedList].sort((entry1, entry2) => {
        if (entry1.node.startDate.year > entry2.node.startDate.year) return -1;
        if (entry1.node.startDate.year < entry2.node.startDate.year) return 1;
        if (entry1.node.startDate.month > entry2.node.startDate.month)
          return -1;
        if (entry1.node.startDate.month < entry2.node.startDate.month) return 1;
        if (entry1.node.startDate.day > entry2.node.startDate.day) return -1;
        if (entry1.node.startDate.day < entry2.node.startDate.day) return 1;
        return 0;
      });
    }

    case "sort_oldest": {
      return [...viewedList].sort((entry1, entry2) => {
        if (entry1.node.startDate.year > entry2.node.startDate.year) return 1;
        if (entry1.node.startDate.year < entry2.node.startDate.year) return -1;
        if (entry1.node.startDate.month > entry2.node.startDate.month) return 1;
        if (entry1.node.startDate.month < entry2.node.startDate.month)
          return -1;
        if (entry1.node.startDate.day > entry2.node.startDate.day) return 1;
        if (entry1.node.startDate.day < entry2.node.startDate.day) return -1;
        return 0;
      });
    }

    case "sort_title_asc": {
      return [...viewedList].sort((entry1, entry2) => {
        const entry1Title =
          entry1.node.title.userPreferred || entry1.node.title.english;
        const entry2Title =
          entry2.node.title.userPreferred || entry2.node.title.english;

        if (entry1Title && entry2Title) {
          return entry1Title
            .toLowerCase()
            .localeCompare(entry2Title.toLowerCase());
        }
        return 0;
      });
    }

    case "sort_name_asc": {
      return [...viewedList].sort((entry1, entry2) => {
        const entry1Name = entry1.characters[0].name.userPreferred;
        const entry2Name = entry2.characters[0].name.userPreferred;
        return entry1Name.toLowerCase().localeCompare(entry2Name.toLowerCase());
      });
    }

    default: {
      throw Error(`Unknown action`);
    }
  }
}
