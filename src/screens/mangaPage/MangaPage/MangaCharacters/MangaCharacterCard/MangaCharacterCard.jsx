import "./MangaCharacterCard.css";

const MangaCharacterCard = ({ character }) => {
  const { role } = character;
  const { images, mal_id, name } = character.character;

  return (
    <div className="character-actor-card">
      <div className="character block">
        <img alt={mal_id} src={images.jpg.image_url} />
        <div className="some-info">
          <span className="name">{name}</span>
          <span className="role">{role}</span>
        </div>
      </div>
      <div></div>
    </div>
  );
};
export default MangaCharacterCard;
