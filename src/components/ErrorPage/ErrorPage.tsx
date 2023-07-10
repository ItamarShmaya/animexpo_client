import { JSX } from "react";
import "./ErrorPage.css";
import { useNavigate } from "react-router-dom";

const ErrorPage = (): JSX.Element => {
  const navigate = useNavigate();

  const onGoHomeClick = (): void => {
    navigate("/");
    window.location.reload();
  };
  return (
    <div className="error-boundary">
      <h1>Something went wrong.</h1>
      <button onClick={onGoHomeClick}>Go Home</button>
    </div>
  );
};
export default ErrorPage;
