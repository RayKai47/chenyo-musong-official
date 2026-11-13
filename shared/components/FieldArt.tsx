import { hexPoints, toPoints } from "@/shared/lib/hex";

/** 沒有照片時的插圖：細的電路走線接到一組小蜂巢 */
export default function FieldArt({ seed }: { seed: number }) {
  const cx = 400 + ((seed * 97) % 160) - 80;
  const r = 22, h = Math.sqrt(3) * r;
  const cells: [number, number][] = [[0, 0], [1.5 * r, h / 2], [1.5 * r, -h / 2], [-1.5 * r, h / 2], [-1.5 * r, -h / 2], [0, h], [0, -h]];
  const lit = seed % cells.length;
  const traces = [
    `M0 ${60 + seed * 7} H${cx - 140} L${cx - 110} 120 H${cx - 52}`,
    `M800 ${200 - seed * 9} H${cx + 150} L${cx + 120} 150 H${cx + 52}`,
    `M${cx + 90} 0 V40 L${cx + 60} 70`,
    `M${cx - 60} 250 V220 L${cx - 40} 190`,
  ];
  return (
    <svg className="pic" viewBox="0 0 800 250" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="800" height="250" fill="#eef4f7" />
      <g fill="none" stroke="#0b5a7a" strokeOpacity=".28" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        {traces.map((d) => <path key={d} d={d} />)}
      </g>
      <g transform={`translate(${cx} 125)`}>
        {cells.map(([x, y], i) => (
          <polygon key={i} points={toPoints(hexPoints(x, y, r - 1.5))} fill={i === lit ? "rgba(224,138,11,.12)" : "#fff"} stroke={i === lit ? "#e08a0b" : "#0097b2"} strokeOpacity={i === lit ? 0.8 : 0.45} />
        ))}
      </g>
    </svg>
  );
}
