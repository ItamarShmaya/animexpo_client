const PrevArrow = ({ className, style, onClick }) => {
  return (
    <div
      className={className}
      style={{ ...style, left: "0px", zIndex: "2" }}
      onClick={onClick}
    />
  );
};
export default PrevArrow;
