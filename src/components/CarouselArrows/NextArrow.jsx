import "./Arrow.css";
const NextArrow = ({ className, style, onClick }) => {
  return (
    <div
      className={className}
      style={{ ...style, right: "0px" }}
      onClick={onClick}
    >
      <i className="fa-solid fa-caret-right"></i>
      {/* <i class="fa-solid fa-chevron-right"></i> */}
    </div>
  );
};
export default NextArrow;
