import "./MustBeLoggedIn.css";

const MustBeLoggedIn = ({ setDisplayMessage }) => {
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
