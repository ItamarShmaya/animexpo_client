import { useEffect, useState, JSX } from "react";
import "./ScrollUp.css";

const ScrollUp = (): JSX.Element => {
  const windowHeight = document.documentElement.clientHeight;
  const [opacity, setOpacity] = useState<number>(0);

  useEffect(() => {
    let timeOutId: ReturnType<typeof setTimeout>;
    const changeOpacity = () => {
      clearTimeout(timeOutId);
      setOpacity(1);
      timeOutId = setTimeout(() => {
        setOpacity(0);
      }, 500);
    };
    window.addEventListener("scroll", changeOpacity);
    return () => {
      window.removeEventListener("scroll", changeOpacity);
    };
  }, []);

  return (
    <div
      className="scroll-box"
      style={{ top: `${windowHeight - 80}px`, opacity }}
    >
      <div className="scroll top" onClick={() => window.scrollTo(0, 0)}>
        <i className="fa-solid fa-arrow-up"></i>
      </div>
      <div
        className="scroll bottom"
        onClick={() => window.scrollTo(0, document.body.scrollHeight)}
      >
        <i className="fa-solid fa-arrow-down"></i>
      </div>
    </div>
  );
};

export default ScrollUp;
