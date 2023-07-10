import { ArrowProps } from "./Arrow.types";
import { JSX } from "react";

const PrevArrow = ({ className, style, onClick }: ArrowProps): JSX.Element => {
  return (
    <div
      className={className}
      style={{ ...style, left: "0px", zIndex: "2" }}
      onClick={onClick}
    >
      <i className="fa-solid fa-caret-left"></i>
      {/* <i class="fa-solid fa-chevron-left"></i> */}
    </div>
  );
};
export default PrevArrow;
