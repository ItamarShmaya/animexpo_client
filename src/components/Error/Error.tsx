import { useNavigate } from "react-router-dom";
import { JSX } from "react";
import "./Error.css";

const Error = (): JSX.Element => {
  const navigate = useNavigate();

  const onGoHomeButtonClick = () => {
    navigate("/");
  };

  return (
    <div className="error">
      <h1>Something went wrong</h1>
      <i className="fa-solid fa-face-sad-cry fa-3x"></i>
      <button onClick={onGoHomeButtonClick}>Go Home</button>
    </div>
  );
};
export default Error;
