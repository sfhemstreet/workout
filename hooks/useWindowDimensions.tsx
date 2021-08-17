import { useEffect, useState } from "react";

/**
 * useWindowDimensions
 *
 * Returns window dimensions, width and height in px. 
 * Stays updated on window resize.
 */
export function useWindowDimensions() {
  const [dimensions, setDimensions] = useState({ x: 375, y: 800 });

  const handleResize = () => {
    if (typeof window === "undefined") return;

    setDimensions({
      x: window.innerWidth,
      y: window.innerHeight,
    });
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return {
    width: dimensions.x,
    height: dimensions.y,
  };
}
