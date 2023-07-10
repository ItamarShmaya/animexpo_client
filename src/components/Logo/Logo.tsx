import "./Logo.css";
import { JSX } from "react";

export interface LogoProps {
  firstColor?: string;
  secondColor?: string;
  fontSize?: string;
}

const Logo = ({
  firstColor,
  secondColor,
  fontSize,
}: LogoProps): JSX.Element => {
  return (
    <div className="logo">
      <span className="anim" style={{ color: firstColor, fontSize }}>
        ANIME
      </span>
      <span className="exe" style={{ color: secondColor, fontSize }}>
        XP
      </span>
    </div>
  );
};
export default Logo;
