import "./Spinner.css";
import { SpinnerProps } from "./Spinner.types";

const InlineSpinner = ({
  image,
  spinnerWidth = 50,
  spinnerHeight = 50,
}: SpinnerProps) => {
  return (
    <div className="inline-spinner-wrapper">
      <div
        className="spinner"
        style={{ width: `${spinnerWidth}px`, height: `${spinnerHeight}px` }}
      >
        <img className="spinner-img" src={image} alt="Spinnig Eye" />
      </div>
    </div>
  );
};

export default InlineSpinner;
