import { hexPoints, toPoints } from "@/shared/lib/hex";
import { SERVICE_FIELDS } from "@/shared/lib/services";

/** 服務蜂巢：中心「系統整合」+ 六個領域 */
const R = 96;

type Cell = { x: number; y: number; title: string; sub?: string; id?: string };
const CELLS: Cell[] = [
  { x: 0, y: 0, title: "系統整合", sub: "軟體、硬體、韌體" },
  ...SERVICE_FIELDS.map(({ id, title }, i) => {
    const a = (Math.PI / 3) * i + Math.PI / 6;
    return { x: Math.cos(a) * R * 1.732, y: Math.sin(a) * R * 1.732, title, id };
  }),
];

/** base：點格子時要跳去的頁面，首頁傳 "/services"，服務內容頁本身留空 */
export default function ServiceFlower({ base = "" }: { base?: string }) {
  return (
    <svg className="flower" viewBox="-260 -260 520 520" role="group" aria-label="服務領域">
      {CELLS.map(({ x, y, title, sub, id }, i) => {
        const p = toPoints(hexPoints(x, y, R - 3));
        const body = (
          <>
            <polygon className="hx" points={p} />
            <polygon className="ar" points={p} style={{ animationDelay: `${i * -0.8}s` }} />
            <text x={x} y={y + (sub ? -3 : 6)}>{title}</text>
            {sub && <text className="sub" x={x} y={y + 22}>{sub}</text>}
          </>
        );
        // 六個領域點了會捲到下方對應的服務項目
        return id ? (
          <a key={title} className="cell" href={`${base}#${id}`} aria-label={title}>{body}</a>
        ) : (
          <g key={title} className="cell core" role="img" aria-label={title}>{body}</g>
        );
      })}
    </svg>
  );
}
