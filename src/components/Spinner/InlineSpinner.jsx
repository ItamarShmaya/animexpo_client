import "./Spinner.css";

const InlineSpinner = ({ image }) => {
  return (
    <div className="inline-spinner-wrapper">
      <div className="spinner ">
        <img className="spinner-img" src={image} alt="Spinnig Eye" />
      </div>
    </div>
  );
};

export default InlineSpinner;
