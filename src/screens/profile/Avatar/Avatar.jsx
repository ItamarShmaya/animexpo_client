import "./Avatar.css";

const Avatar = ({ image, width = 175, height = 200 }) => {
  return (
    <div className="avatar-wrapper">
      <div className="avatar" style={{width: `${width}px`, height: `${height}px`}}>
        <img alt={image} src={image} />
      </div>
    </div>
  );
};
export default Avatar;
