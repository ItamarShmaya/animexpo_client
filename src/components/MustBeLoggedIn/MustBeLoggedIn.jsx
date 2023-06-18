import { useEffect } from "react";
import "./MustBeLoggedIn.css";

const MustBeLoggedIn = ({ setDisplayMessage }) => {
  useEffect(() => {
    const closeMessageWindow = (e) => {
      if (e.key === "Escape") setDisplayMessage(false);
    };
    window.addEventListener("keydown", closeMessageWindow);
    return () => {
      window.removeEventListener("keydown", closeMessageWindow);
    };
  }, [setDisplayMessage]);
  
  return (
    <div className="must-be-logged">
      <p>Must log in first</p>
      <button className="btn" onClick={() => setDisplayMessage(false)}>
        Close
      </button>
    </div>
  );
};
export default MustBeLoggedIn;
