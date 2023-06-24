import { useRef } from "react";
import ball from "/ball.png";

const BouncingBall = () => {
  const ballRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-full flex flex-col items-center justify-center my-4">
      <div
        className={`relative w-12 h-12 rounded-full bg-center bg-cover animate-bounce`}
        style={{ backgroundImage: `url(${ball})` }}
        ref={ballRef}
      />
    </div>
  );
};

export default BouncingBall;
