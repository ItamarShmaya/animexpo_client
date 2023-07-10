import { useEffect, JSX } from "react";
import "./MustBeLoggedIn.css";

const MustBeLoggedIn = ({
  setDisplayMessage,
}: {
  setDisplayMessage: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element => {
  useEffect(() => {
    const closeMessageWindow = (e: KeyboardEvent): void => {
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
