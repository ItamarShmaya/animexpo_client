const PrevArrow = ({ className, style, onClick }) => {
  return (
    <div
      className={className}
      style={{ ...style, left: "0px", zIndex: "2" }}
      onClick={onClick}
    >
      <i className="fa-solid fa-caret-left"></i>
      {/* <i class="fa-solid fa-chevron-right"></i> */}
    </div>
  );
};
export default PrevArrow;
