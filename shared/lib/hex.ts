export type Pt = [number, number];

/** 以 (cx, cy) 為中心、半徑 r 的六角形頂點 */
export const hexPoints = (cx: number, cy: number, r: number): Pt[] =>
  [0, 1, 2, 3, 4, 5].map((i) => [cx + r * Math.cos((Math.PI / 3) * i), cy + r * Math.sin((Math.PI / 3) * i)]);

/** 轉成 SVG polygon 的 points 字串 */
export const toPoints = (a: Pt[]) => a.map((q) => q[0].toFixed(1) + "," + q[1].toFixed(1)).join(" ");
