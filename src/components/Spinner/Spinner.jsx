import "./Spinner.css";
import sharingan from "./sharingan.png";

const Spinner = () => {
  return (
    <div className="spinner-wrapper">
      <div className="spinner">
        <img alt="sharingan" src={sharingan} />
      </div>
    </div>
  );
};
export default Spinner;
