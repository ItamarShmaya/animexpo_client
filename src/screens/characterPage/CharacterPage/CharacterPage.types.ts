import { ApiCharacterEntryType } from "../../../apis/aniList/aniListTypes.types";

export interface CharacterPageApiResponse {
  Character?: CharacterPageEntryType;
}

export type CharacterPageEntryType = Required<ApiCharacterEntryType>;
