import "./Spinner.css";

const Spinner = ({ image, spinnerHeight = 50, spinnerWidth = 50 }) => {
  return (
    <div
      className="spinner-wrapper"
      style={{
        height: window.visualViewport.height,
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
