import { hexPoints, toPoints } from "@/lib/hex";

/** 由小到大的六角形：從一個細胞放大到宇宙 */
export default function NestHexagons() {
  return (
    <svg viewBox="-400 -300 800 600" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      {Array.from({ length: 8 }, (_, i) => (
        <polygon
          key={i}
          points={toPoints(hexPoints(0, 0, 16 * 1.55 ** i))}
          fill={i ? "none" : "#ef960d"}
          stroke={i ? "#00afcc" : "#ef960d"}
          strokeOpacity={(0.75 - i * 0.09).toFixed(2)}
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}
