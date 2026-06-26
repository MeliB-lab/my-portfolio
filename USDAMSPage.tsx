import { useEffect, useState, useMemo } from "react";
import { motion, useScroll, useTransform } from "motion/react";

// Builds the full-page thread path proportionally to actual page height.
// x is fixed in a 1440px-wide coordinate space.
// y is expressed as 0-1 fraction of total page height.
function buildPath(h: number): string {
  const y = (v: number) => (v * h).toFixed(1);
  return [
    // Exit yarn ball (top-right hero)
    `M 1060 ${y(0.103)}`,
    `C 930 ${y(0.121)}, 780 ${y(0.139)}, 640 ${y(0.160)}`,
    // Bottom of hero, sweep far left
    `C 500 ${y(0.180)}, 350 ${y(0.196)}, 240 ${y(0.212)}`,
    // About section — enter from left
    `C 155 ${y(0.236)}, 110 ${y(0.256)}, 108 ${y(0.282)}`,
    // Down About left side with slight wave
    `C 106 ${y(0.308)}, 125 ${y(0.330)}, 162 ${y(0.355)}`,
    // Sweep right through About content
    `C 215 ${y(0.375)}, 370 ${y(0.394)}, 545 ${y(0.410)}`,
    `C 700 ${y(0.423)}, 840 ${y(0.432)}, 960 ${y(0.447)}`,
    // Peak right, turn back — midpoint of About
    `C 1055 ${y(0.458)}, 1090 ${y(0.471)}, 1082 ${y(0.495)}`,
    // Work section entry — sweep left
    `C 1074 ${y(0.519)}, 1012 ${y(0.538)}, 872 ${y(0.553)}`,
    `C 730 ${y(0.567)}, 580 ${y(0.582)}, 440 ${y(0.603)}`,
    // Continue left, first row of work cards
    `C 300 ${y(0.625)}, 190 ${y(0.648)}, 155 ${y(0.675)}`,
    // Hit left margin, start looping right
    `C 130 ${y(0.702)}, 152 ${y(0.727)}, 208 ${y(0.752)}`,
    // Sweep right — second row
    `C 295 ${y(0.776)}, 460 ${y(0.798)}, 645 ${y(0.815)}`,
    `C 808 ${y(0.830)}, 950 ${y(0.843)}, 1048 ${y(0.858)}`,
    // Contact section entry — curve back left
    `C 1094 ${y(0.870)}, 1094 ${y(0.886)}, 1042 ${y(0.906)}`,
    `C 990 ${y(0.924)}, 865 ${y(0.940)}, 720 ${y(0.954)}`,
    // Through Contact, dissolve toward bottom
    `C 600 ${y(0.967)}, 448 ${y(0.979)}, 325 ${y(0.990)}`,
    `C 228 ${y(0.997)}, 172 ${y(0.999)}, 160 ${y(1.000)}`,
  ].join(" ");
}

export function YarnThread() {
  const [pageHeight, setPageHeight] = useState(4200);

  useEffect(() => {
    const measure = () => {
      // Small delay so layout settles
      setTimeout(() => {
        setPageHeight(Math.max(document.documentElement.scrollHeight, 2000));
      }, 200);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const pathData = useMemo(() => buildPath(pageHeight), [pageHeight]);

  const { scrollYProgress } = useScroll();
  const pathLength = useTransform(scrollYProgress, [0, 0.96], [0, 1]);

  return (
    <svg
      aria-hidden="true"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: pageHeight,
        pointerEvents: "none",
        zIndex: 1,
        overflow: "visible",
      }}
      viewBox={`0 0 1440 ${pageHeight}`}
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Ghost path — always visible, very faint, shows where the thread will go */}
      <path
        d={pathData}
        stroke="rgba(184,104,64,0.09)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Animated thread — draws in as user scrolls */}
      <motion.path
        d={pathData}
        stroke="#B86840"
        strokeWidth="2.2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ pathLength }}
      />
    </svg>
  );
}
