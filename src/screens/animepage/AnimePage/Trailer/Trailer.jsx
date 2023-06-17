import "./Trailer.css";

const Trailer = ({ trailer }) => {
  return (
    <div className="trailer-container">
      <h2>Trailer</h2>
      <iframe
        src={`https://www.youtube.com/embed/${trailer.id}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};
export default Trailer;
