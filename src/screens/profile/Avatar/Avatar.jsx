import "./Avatar.css";

const Avatar = ({ image }) => {
  return (
    <div className="avatar-wrapper">
      <div className="avatar">
        <img alt={image} src={image} />
      </div>
    </div>
  );
};
export default Avatar;
