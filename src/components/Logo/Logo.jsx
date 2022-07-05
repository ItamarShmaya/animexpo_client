import "./Logo.css";
const Logo = ({ firstColor, secondColor, fontSize }) => {
  return (
    <div className="logo">
      <span className="anim" style={{ color: firstColor, fontSize }}>
        ANIME
      </span>
      <span className="exe" style={{ color: secondColor, fontSize }}>
        XP
      </span>
    </div>
  );
};
export default Logo;
