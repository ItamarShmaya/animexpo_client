import "./Spinner.css";

const InlineSpinner = ({ image, width = 50, height = 50 }) => {
  return (
    <div className="inline-spinner-wrapper">
      <div
        className="spinner"
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        <img className="spinner-img" src={image} alt="Spinnig Eye" />
      </div>
    </div>
  );
};

export default InlineSpinner;
