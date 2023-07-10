import "./Avatar.css";
import { JSX } from "react";

const Avatar = ({
  image,
  width = 175,
  height = 200,
}: {
  image: string;
  width?: number;
  height?: number;
}): JSX.Element => {
  return (
    <div className="avatar-wrapper">
      <div
        className="avatar"
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        <img alt={image} src={image} />
      </div>
    </div>
  );
};
export default Avatar;
