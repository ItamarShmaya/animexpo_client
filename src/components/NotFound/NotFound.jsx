import "./NotFound.css";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const onGoHomeButtonClick = () => {
    navigate("/");
  };

  return (
    <div className="notfound">
      <h1>Not Found</h1>
      <button onClick={onGoHomeButtonClick}>Go Home</button>
    </div>
  );
};
export default NotFound;
