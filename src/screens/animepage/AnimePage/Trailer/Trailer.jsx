import "./Trailer.css";

const Trailer = ({ trailer }) => {
  return (
    <div className="trailer-container">
      <h1>Trailer</h1>
      <iframe
        src={`${trailer.embed_url}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};
export default Trailer;
