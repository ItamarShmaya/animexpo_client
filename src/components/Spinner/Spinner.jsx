import "./Spinner.css";

const Spinner = ({image}) => {
  return (
    <div className="spinner-wrapper">
      <div className="spinner">
        <img alt="sharingan" src={image} />
      </div>
    </div>
  );
};
export default Spinner;
