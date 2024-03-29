import { useReducer, useState, useEffect, JSX } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./StaffPage.css";
import Spinner from "../../components/Spinner/Spinner";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useLoggedInUser } from "../../context/context_custom_hooks";
import obito from "../../components/Spinner/spinnerImages/indra.png";
import {
  aniListRequests,
  staffByIdQuery,
} from "../../apis/aniList/aniList.queries";
import { useSessionStorage } from "../../hooks/useSessionStorage";
import CharacterHero from "../characterPage/CharacterPage/CharacterHero/CharacterHero";
import CharacterBanner from "../characterPage/CharacterPage/CharacterBanner/CharacterBanner";
import {
  addToFavStaffList,
  removeFromFavStaffList,
} from "../../apis/animexpo/animexpo_updates";
import VARoles from "./VARoles/VARoles";
import { staffRolesReducer } from "../../reducers/staffRolesReducers";
import {
  ApiPageInfoType,
  ApiStaffEntryType,
} from "../../apis/aniList/aniListTypes.types";
import { StaffPageApiResponse } from "./StaffPage.types";

const StaffPage = (): JSX.Element => {
  const { id } = useParams() as { id: string };
  const [staff, setStaff] = useState<ApiStaffEntryType>();
  const { getLocalStorageUserData } = useLocalStorage();
  const { getEntryFromUserCache, addEntryToUserCache } = useSessionStorage();
  const { loggedInUser } = useLoggedInUser();
  const [inFavorites, setInFavorites] = useState<boolean>(false);
  const [pageInfo, setPageInfo] = useState<ApiPageInfoType>(
    {} as ApiPageInfoType
  );
  const navigate = useNavigate();
  const [vaRolesList, dispatch] = useReducer(staffRolesReducer, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (loggedInUser) {
      const favoriteStaffList = getLocalStorageUserData().favoriteStaff;
      if (favoriteStaffList.list.find((char) => char.id === +id)) {
        setInFavorites(true);
      } else {
        setInFavorites(false);
      }
    }
  }, [id, loggedInUser, getLocalStorageUserData]);

  useEffect(() => {
    const controller = new AbortController();
    const variables = { id };

    const getStaffById = async () => {
      try {
        const { data }: { data: StaffPageApiResponse } = await aniListRequests(
          staffByIdQuery,
          variables,
          controller.signal
        );
        if (data.Staff) {
          setStaff(data.Staff);
          dispatch({
            type: "update_list",
            list: data.Staff.characterMedia.edges,
          });
          addEntryToUserCache("staffList", data.Staff);
          setPageInfo(data.Staff.characterMedia.pageInfo);
        } else {
          throw new Error("Not Found");
        }
      } catch (e) {
        console.log(e);
        navigate("/");
      }
    };

    const staff = getEntryFromUserCache(
      "staffList",
      +id
    ) as Required<ApiStaffEntryType>;

    if (staff) {
      console.log(staff);
      setStaff(staff);
      setPageInfo(staff.characterMedia.pageInfo);
      dispatch({
        type: "update_list",
        list: staff.characterMedia.edges,
      });
      return;
    } else getStaffById();

    return () => {
      controller.abort();
    };
  }, [id, navigate, getEntryFromUserCache, addEntryToUserCache]);

  return (
    <div className="staff-page">
      {staff ? (
        <>
          <CharacterBanner />
          <div className="staff-content">
            <CharacterHero
              id={staff.id}
              name={staff.name.userPreferred}
              image={staff.image.large || (staff.image.medium as string)}
              description={staff.description}
              inFavorites={inFavorites}
              addToList={addToFavStaffList}
              setInFavorites={setInFavorites}
              removeFromList={removeFromFavStaffList}
              localStorageKey={"favoriteStaff"}
            />
            <VARoles
              id={+id}
              rolesList={vaRolesList}
              cardHeight={120}
              cardWidth={90}
              dispatch={dispatch}
              pageInfo={pageInfo}
              setPageInfo={setPageInfo}
            />
          </div>
        </>
      ) : (
        <Spinner image={obito} />
      )}
    </div>
  );
};
export default StaffPage;
