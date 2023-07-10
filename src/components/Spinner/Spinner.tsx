import "./Spinner.css";
import { SpinnerProps } from "./Spinner.types";
import { JSX } from "react";

const Spinner = ({
  image,
  spinnerHeight = 50,
  spinnerWidth = 50,
  topOffset,
}: SpinnerProps): JSX.Element => {
  return (
    <div
      className="spinner-wrapper"
      style={{
        height: topOffset
          ? window.visualViewport?.height &&
            window.visualViewport?.height - topOffset
          : window.visualViewport?.height,
      }}
    >
      <div
        className="spinner"
        style={{ width: `${spinnerWidth}px`, height: `${spinnerHeight}px` }}
      >
        <img alt="sharingan" src={image} />
      </div>
    </div>
  );
};
export default Spinner;
