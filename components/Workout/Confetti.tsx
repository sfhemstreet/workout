import React from "react";
import ReactCanvasConfetti from "react-canvas-confetti";

const canvasStyles = {
  position: "fixed",
  pointerEvents: "none",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
};

type ConfettiProps = {
  isFiring: boolean;
};

/**
 * Confetti
 * 
 * Shoots confetti all over screen.
 * 
 * @param isFiring set to `true` to fire confetti
 */
export const Confetti = ({ isFiring }: ConfettiProps) => (
  <ReactCanvasConfetti
    fire={isFiring}
    startVelocity={145}
    particleCount={2000}
    spread={360}
    gravity={0.5}
    decay={0.8}
    style={{ ...(canvasStyles as React.CSSProperties) }}
    useWorker={true}
    ticks={600}
    drift={0}
  />
);
