"use client";

import { useEffect, useRef } from "react";
import { hexPoints, type Pt } from "@/shared/lib/hex";

/** intro 每次開啟網站只播放一次；在站內切換分頁後回首頁不重播 */
let introPlayed = false;

/**
 * 首頁：一道光穿過蜂巢縫隙 → 沿線點亮文字與 logo → 縫隙緩慢發光
 */
export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const hero = heroRef.current!, cv = canvasRef.current!, brand = brandRef.current!, h1 = h1Ref.current!;
    const x = cv.getContext("2d")!;
    const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = 0, H = 0, D = 1, r = 0, SP = 0, LEN = 0;
    let V: Pt[] = [], E: [number, number][] = [], adj: [number, number][][] = [];
    // 每個蜂巢格：中心、頂點、亮度（光經過時亮起，之後慢慢退去）、呼吸相位
    let C: { c: Pt; p: Pt[]; heat: number; ph: number }[] = [];
    let ph = new Float32Array(0), route: number[] = [], LP: Pt[] = [], LL: number[] = [];
    let trail: [number, number, number][] = [];
    let state = 0, tStart = 0, d = 0, drawn = 0, t2 = 0, last = 0, raf = 0, alive = true;

    function bfs(a: number, b: number) {
      const pv = new Map<number, number>([[a, -1]]), q = [a];
      while (q.length) {
        const u = q.shift()!;
        if (u === b) break;
        for (const n of adj[u]) if (!pv.has(n[0])) { pv.set(n[0], u); q.push(n[0]); }
      }
      const p: number[] = [];
      for (let u = b; u !== -1; u = pv.get(u)!) p.push(u);
      return p.reverse();
    }

    function build() {
      const b0 = hero.getBoundingClientRect();
      W = b0.width; H = b0.height; D = Math.min(devicePixelRatio || 1, 2);
      cv.width = W * D; cv.height = H * D;
      const m = W < 980;
      r = m ? W / 30 : Math.min(W, H * 1.3) / 34;
      SP = Math.max(m ? 560 : 400, r * 20);
      const cx = m ? W * 0.5 : W * 0.73, cy = m ? H * 0.3 : H * 0.44, h = Math.sqrt(3) * r;
      const mp = new Map<string, number>(), em = new Set<string>();
      V = []; E = []; adj = []; C = [];
      const vid = (p: Pt) => {
        const k = Math.round(p[0] * 10) + "," + Math.round(p[1] * 10);
        let i = mp.get(k);
        if (i == null) { i = V.length; mp.set(k, i); V.push(p); adj.push([]); }
        return i;
      };
      /* 蜂巢外形：以原本的橢圓排列為底，每一欄的上緣、下緣各自多或少 1～2 格，
         右側再多一小段、左下少幾格，讓上下左右不對稱；數值固定，每次開啟形狀一致 */
      const TOP = [0, 0, 0, 0, 1, 1, 0, 0, -1, -1, 0, 1, 1, 1, 0, 0, -1, 0, 0, 0, 0];
      const BOT = [0, 0, 0, 0, -1, -1, 0, 0, 0, 1, 1, 1, 0, 0, -1, -1, 0, 1, 1, 0, 0];
      // 桌機：只在標題文字那幾列讓出空間
      const hb1 = brand.getBoundingClientRect();
      const keep = { x: h1.getBoundingClientRect().right - b0.left + r * 1.2, top: hb1.top - b0.top - r * 2, bottom: hb1.bottom - b0.top + r * 2 };
      const ex = m ? 12.4 * r : 11 * r, ey = 8.4 * r;
      const picked: Pt[] = [];
      let maxC = -99;
      for (let c = -10; c <= 10; c++) {
        const off = c & 1 ? 0.5 : 0, inside: number[] = [];
        for (let q = -10; q <= 10; q++) {
          const px = cx + c * 1.5 * r, py = cy + (q + off) * h;
          if (((px - cx) / ex) ** 2 + ((py - cy) / ey) ** 2 < 1) inside.push(q);
        }
        if (!inside.length) continue;
        maxC = c;
        let q0 = inside[0] - TOP[c + 10], q1 = inside[inside.length - 1] + BOT[c + 10];
        if (c < 0 && c >= -3) q1 -= 1; // 左下少幾格
        for (let q = q0; q <= q1; q++) picked.push([cx + c * 1.5 * r, cy + (q + off) * h]);
      }
      // 右側多出一小段
      for (let q = -3; q <= -1; q++) picked.push([cx + (maxC + 1) * 1.5 * r, cy + (q + ((maxC + 1) & 1 ? 0.5 : 0)) * h]);
      for (let i = picked.length - 1; i >= 0; i--) {
        const [px, py] = picked[i];
        if ((!m && px - r <= keep.x && py >= keep.top && py <= keep.bottom) || py - h / 2 < 64) picked.splice(i, 1);
      }
      // 只保留最大的一塊相連區域，避免邊緣出現孤立的小格
      const seen = new Array(picked.length).fill(-1);
      let best: number[] = [];
      for (let i = 0; i < picked.length; i++) {
        if (seen[i] >= 0) continue;
        const comp = [i], st = [i]; seen[i] = i;
        while (st.length) {
          const u = st.pop()!;
          for (let j = 0; j < picked.length; j++)
            if (seen[j] < 0 && Math.hypot(picked[u][0] - picked[j][0], picked[u][1] - picked[j][1]) < h * 1.05) { seen[j] = i; comp.push(j); st.push(j); }
        }
        if (comp.length > best.length) best = comp;
      }
      for (const [px, py] of best.map((i) => picked[i])) {
        {
          const hp = hexPoints(px, py, r);
          C.push({ c: [px, py], p: hp, heat: 0, ph: px * 0.004 + py * 0.003 + Math.random() * 1.5 });
          const v = hp.map(vid);
          for (let i = 0; i < 6; i++) {
            const a = v[i], b = v[(i + 1) % 6], k = a < b ? a + "_" + b : b + "_" + a;
            if (!em.has(k)) { em.add(k); E.push([a, b]); adj[a].push([b, E.length - 1]); adj[b].push([a, E.length - 1]); }
          }
        }
      }
      ph = new Float32Array(E.length);
      E.forEach((e, i) => { ph[i] = V[e[0]][0] * 0.004 + V[e[0]][1] * 0.003 + Math.random() * 1.2; });
      let ai = 0, st = 0;
      V.forEach((p, i) => {
        const b = V[ai];
        if (p[0] < b[0] - 1 || (Math.abs(p[0] - b[0]) < 1 && p[1] > b[1])) ai = i;
        if (p[0] > V[st][0]) st = i;
      });
      const A = V[ai], hb = h1.getBoundingClientRect(), py0 = hb.bottom - b0.top + 14, px0 = hb.left - b0.left;
      if (m) LP = [A, [10, A[1]], [10, py0], [W - 24, py0]];
      else {
        const dd = Math.max(0, Math.min(Math.abs(py0 - A[1]), A[0] - 40 - px0 - 30));
        LP = [A, [A[0] - 40, A[1]], [A[0] - 40 - dd, py0], [px0, py0]];
      }
      LL = LP.slice(1).map((p, i) => Math.hypot(p[0] - LP[i][0], p[1] - LP[i][1]));
      LEN = LL.reduce((a, b) => a + b, 0);
      /* 光的路線：從蜂巢右側出發，慢慢穿過縫隙，最後走到左側接線處 */
      const used = new Set<number>();
      let c0 = st, pv = -1;
      route = [c0];
      for (let k = 0; k < 5; k++) {
        let o = adj[c0].filter((n) => n[0] !== pv);
        const f = o.filter((n) => !used.has(n[1]));
        if (f.length) o = f;
        if (!o.length) o = adj[c0];
        const n = o[Math.floor(Math.random() * o.length)];
        used.add(n[1]); pv = c0; c0 = n[0]; route.push(c0);
      }
      route = route.concat(bfs(c0, ai).slice(1));
    }

    function ptAt(s: number): Pt {
      let a = 0;
      for (let i = 0; i < LL.length; i++) {
        const b = a + LL[i];
        if (s <= b || i === LL.length - 1) {
          const f = Math.min(1, (s - a) / LL[i]);
          return [LP[i][0] + (LP[i + 1][0] - LP[i][0]) * f, LP[i][1] + (LP[i + 1][1] - LP[i][1]) * f];
        }
        a = b;
      }
      return LP[LP.length - 1];
    }

    function seg(s0: number, s1: number) {
      let a = 0;
      x.beginPath();
      for (let i = 0; i < LL.length; i++) {
        const b = a + LL[i];
        if (b >= s0 && a <= s1) {
          const f = (t: number): Pt => [LP[i][0] + ((LP[i + 1][0] - LP[i][0]) * (t - a)) / LL[i], LP[i][1] + ((LP[i + 1][1] - LP[i][1]) * (t - a)) / LL[i]];
          const u = f(Math.max(s0, a)), v = f(Math.min(s1, b));
          x.moveTo(u[0], u[1]); x.lineTo(v[0], v[1]);
        }
        a = b;
      }
      x.stroke();
    }

    function frame(t: number) {
      if (!alive) return;
      const dt = Math.min(t - last || 16, 50);
      last = t;
      x.setTransform(D, 0, 0, D, 0, 0);
      x.clearRect(0, 0, W, H);
      if (state === 0 && t >= tStart) { state = 1; d = 0; }
      let hd: Pt | null = null;
      if (state === 1) {
        d += (SP * dt) / 1000;
        const n = route.length - 1, dr = n * r;
        if (d <= dr) {
          const i = Math.min(Math.floor(d / r), n - 1), f = (d - i * r) / r, a = V[route[i]], b = V[route[i + 1]];
          hd = [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f];
        } else {
          const s = Math.min(d - dr, LEN);
          drawn = s; hd = ptAt(s);
          if (s >= LEN) { state = 2; t2 = t; brand.classList.add("lit"); introPlayed = true; }
        }
        trail.push([hd[0], hd[1], t]);
      }
      /* 蜂巢格子：光經過的格子短暫亮起；點亮 logo 後，格子緩慢呼吸般明暗 */
      const fade = Math.exp(-dt / 900);
      for (const cell of C) {
        if (hd && Math.hypot(hd[0] - cell.c[0], hd[1] - cell.c[1]) < r * 1.05) cell.heat = 1;
        else cell.heat *= fade;
        const breathe = state === 2 ? Math.pow(Math.max(0, Math.sin((t / 12000) * 6.283 + cell.ph)), 2) * Math.min((t - t2) / 3500, 1) : 0;
        const k = Math.max(cell.heat, breathe * 0.45);
        x.beginPath();
        cell.p.forEach((q, i) => (i ? x.lineTo(q[0], q[1]) : x.moveTo(q[0], q[1])));
        x.closePath();
        x.fillStyle = `rgba(255,255,255,${0.035 + 0.13 * k})`;
        x.fill();
        if (k > 0.05) { x.lineWidth = 1.3; x.strokeStyle = `rgba(255,255,255,${0.75 * k})`; x.stroke(); }
      }
      /* 蜂巢縫隙：平時只有淡淡的線，點亮後有光影緩慢流過 */
      const a = state === 2 ? Math.min((t - t2) / 3500, 1) : 0;
      x.lineCap = "round";
      for (let i = 0; i < E.length; i++) {
        const p = V[E[i][0]], q = V[E[i][1]];
        x.shadowBlur = 0; x.lineWidth = 1.1; x.strokeStyle = "rgba(255,255,255,.4)";
        x.beginPath(); x.moveTo(p[0], p[1]); x.lineTo(q[0], q[1]); x.stroke();
        if (a > 0) {
          const v = Math.pow(Math.max(0, Math.sin((t / 10000) * 6.283 + ph[i])), 3) * a;
          if (v > 0.04) {
            x.lineWidth = 1.6; x.strokeStyle = `rgba(235,250,255,${0.85 * v})`;
            if (v > 0.25) { x.shadowBlur = 8 * v; x.shadowColor = "rgba(150,225,255,.7)"; }
            x.beginPath(); x.moveTo(p[0], p[1]); x.lineTo(q[0], q[1]); x.stroke();
          }
        }
      }
      /* 連接線 */
      x.shadowBlur = 0; x.lineWidth = 1.2;
      x.strokeStyle = state === 2 ? "rgba(255,255,255,.5)" : "rgba(255,255,255,.22)";
      if (drawn > 0) seg(0, drawn);
      /* 那一道光與它短短的尾巴 */
      while (trail.length && t - trail[0][2] > 600) trail.shift();
      for (let i = 1; i < trail.length; i++) {
        const al = Math.pow(1 - (t - trail[i][2]) / 600, 1.5);
        if (al <= 0) continue;
        x.strokeStyle = `rgba(255,255,255,${al})`; x.lineWidth = 0.8 + 1.4 * al;
        x.shadowBlur = 10 * al; x.shadowColor = "rgba(160,230,255,.9)";
        x.beginPath(); x.moveTo(trail[i - 1][0], trail[i - 1][1]); x.lineTo(trail[i][0], trail[i][1]); x.stroke();
      }
      if (hd) {
        x.fillStyle = "#fff"; x.shadowBlur = 12; x.shadowColor = "rgba(160,230,255,.9)";
        x.beginPath(); x.arc(hd[0], hd[1], 2.2, 0, 7); x.fill();
      }
      x.shadowBlur = 0;
      if (!RM) raf = requestAnimationFrame(frame);
    }

    let rt: ReturnType<typeof setTimeout> | undefined;
    const onResize = () => {
      clearTimeout(rt);
      rt = setTimeout(() => {
        build();
        if (state < 2) { state = 0; tStart = performance.now() + 300; trail = []; drawn = 0; }
        else drawn = LEN;
      }, 150);
    };

    // 等字型載入後再量 h1 的位置，連接線才會對準標題
    (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => {
      if (!alive) return;
      build();
      if (!introPlayed && !RM) {
        state = 0; tStart = performance.now() + 300; trail = []; drawn = 0;
      } else {
        introPlayed = true; state = 2; t2 = -1e9; drawn = LEN;
        brand.classList.add("lit", "inst");
      }
      last = 0;
      raf = requestAnimationFrame(frame);
      addEventListener("resize", onResize);
    });

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      clearTimeout(rt);
      removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <header className="hero" ref={heroRef}>
      <canvas ref={canvasRef} aria-hidden="true" />
      <div className="brand" ref={brandRef}>
        <h1 ref={h1Ref}>
          <span>辰銪科技</span>
          <span className="ind">有限公司</span>
        </h1>
        <p className="tag">
          Let us achieve your idea.
          <br />
          擁有豐富實務專案經驗的創意設計團隊。
        </p>
      </div>
      <a className="scroll-hint" href="#intro">往下瀏覽</a>
    </header>
  );
}
