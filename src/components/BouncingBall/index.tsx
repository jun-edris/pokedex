import { useRef } from "react";
import ball from "/ball.png";
import "./styles.css";

const BouncingBall = () => {
  const ballRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-full flex flex-col items-center justify-center mb-24">
      <div id="ground" className="h-12">
        <div
          className={`relative w-12 h-12 rounded-full bg-center bg-cover ball`}
          style={{ backgroundImage: `url(${ball})` }}
          ref={ballRef}
        />
      </div>
    </div>
  );
};

export default BouncingBall;
