import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

// Terracotta/rust orange — visible on both light and dark elements
const CURSOR_COLOR = "#B86840";

export function CustomCursor() {
  const [visible, setVisible] = useState(false);

  const rawX = useMotionValue(-200);
  const rawY = useMotionValue(-200);

  const dotX = useTransform(rawX, (v) => v - 4);
  const dotY = useTransform(rawY, (v) => v - 4);

  const springX = useSpring(rawX, { stiffness: 110, damping: 20, restDelta: 0.01 });
  const springY = useSpring(rawY, { stiffness: 110, damping: 20, restDelta: 0.01 });
  const circleX = useTransform(springX, (v) => v - 18);
  const circleY = useTransform(springY, (v) => v - 18);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!visible) setVisible(true);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [visible, rawX, rawY]);

  if (typeof window !== "undefined" && window.matchMedia("(hover: none)").matches) return null;

  return (
    <>
      {/* Lagging outer ring — catches up */}
      <motion.div
        style={{
          position: "fixed", left: 0, top: 0,
          x: circleX, y: circleY,
          width: 36, height: 36, borderRadius: "50%",
          border: `1.5px solid ${CURSOR_COLOR}`,
          opacity: visible ? 0.5 : 0,
          zIndex: 9998, pointerEvents: "none",
          transition: "opacity 0.3s",
        }}
      />
      {/* Precise dot */}
      <motion.div
        style={{
          position: "fixed", left: 0, top: 0,
          x: dotX, y: dotY,
          width: 8, height: 8, borderRadius: "50%",
          background: CURSOR_COLOR,
          opacity: visible ? 1 : 0,
          zIndex: 9999, pointerEvents: "none",
          transition: "opacity 0.3s",
        }}
      />
    </>
  );
}
