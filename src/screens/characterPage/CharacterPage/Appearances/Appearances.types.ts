import {
  ApiCharacterMediaEdgesType,
  ApiPageInfoType,
} from "../../../../apis/aniList/aniListTypes.types";
import { CharacterAppearanceReducerAction } from "../../../../reducers/charAppearancesReducer";

export interface AppearancesProps {
  id: number;
  appearancesList: ApiCharacterMediaEdgesType[];
  pageInfo: ApiPageInfoType | undefined;
  setPageInfo: React.Dispatch<
    React.SetStateAction<ApiPageInfoType | undefined>
  >;
  dispatch: React.Dispatch<CharacterAppearanceReducerAction>;
}
