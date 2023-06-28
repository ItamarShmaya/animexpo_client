import "./Spinner.css";

const Spinner = ({
  image,
  spinnerHeight = 50,
  spinnerWidth = 50,
  parentElementRect,
}) => {
  return (
    <div
      className="spinner-wrapper"
      style={{
        height: parentElementRect?.top
          ? window.visualViewport.height - parentElementRect?.top
          : window.visualViewport.height,
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
