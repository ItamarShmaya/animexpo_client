import "./Arrow.css";
const NextArrow = ({ className, style, onClick }) => {
  return (
    <div
      className={className}
      style={{ ...style, right: "0px", zIndex: "2" }}
      onClick={onClick}
    />
  );
};
export default NextArrow;
