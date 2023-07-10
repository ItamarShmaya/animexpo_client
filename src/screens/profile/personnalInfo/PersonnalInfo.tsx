import "./PersonnalInfo.css";
import { NavLink } from "react-router-dom";
import { JSX } from "react";

export interface PersonnalInfoProps {
  username: string;
  gender: string | undefined;
  birthday: string;
  joined: string;
  reviewsCount: number;
}

const PersonnalInfo = ({
  username,
  gender,
  birthday,
  joined,
  reviewsCount,
}: PersonnalInfoProps): JSX.Element => {
  return (
    <div className="personnal-info">
      {gender && <div>Gender: {gender}</div>}
      <div>Birthday: {new Date(birthday).toDateString().slice(3)}</div>
      <div>Joined: {new Date(joined).toDateString().slice(3)}</div>
      <NavLink to={`/profile/${username}/reviews`}>
        <div>
          <span className="left">Reviews: </span>
          <span className="mid"></span>
          <span className="right">{reviewsCount}</span>
        </div>
      </NavLink>
    </div>
  );
};

export default PersonnalInfo;
