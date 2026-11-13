import Link from "next/link";
import type { Metadata } from "next";
import ServiceFlower from "@/shared/components/ServiceFlower";
import fs from "node:fs";
import path from "node:path";
import FieldArt from "@/shared/components/FieldArt";
import { SERVICE_FIELDS } from "@/shared/lib/services";

/** 建置時找 public/images/services/<id>.(jpg|png|webp)，有照片就用照片 */
function photoFor(id: string) {
  for (const ext of ["jpg", "png", "webp"]) {
    const rel = `/chenyo/images/services/${id}.${ext}`;
    if (fs.existsSync(path.join(process.cwd(), "public", rel))) return rel;
  }
  return null;
}

export const metadata: Metadata = { title: "服務內容" };

const STEPS = [
  ["洽談與討論", "依客戶的想法和需求，當下提出適合的解決方案雛形。"],
  ["研發討論與 POC", "研發團隊討論並進行 POC 驗證。"],
  ["規格書、時程與費用", "向客戶提出具體的規格書、預計工作時程與相應費用。"],
  ["研發與設計", "研發專案正式成立後，團隊依工作時程進入研發與設計階段。"],
  ["EVT、DVT 驗證", "透過 EVT 與 DVT，確保樣品的可用性及可靠性。"],
  ["客戶確認並結案", "客戶確認樣品完成且符合需求，專案完結。"],
];

export default function Services() {
  return (
    <div className="sub">
      <section className="sec">
        <div className="sol">
          <div>
            <h2>服務內容</h2>
            <p className="mut">我們以系統整合為核心，提供客製化研發與生產服務，涵蓋六大應用領域。</p>
            <p className="mut">點選蜂巢中的領域，可查看該領域的服務項目。</p>
          </div>
          <ServiceFlower />
        </div>

        <h2 style={{ marginTop: "clamp(72px,10vw,120px)" }}>服務項目</h2>
        <div className="fields">
          {SERVICE_FIELDS.map((f, i) => (
            <article key={f.id} id={f.id} className="field">
              {(() => {
                const src = photoFor(f.id);
                // eslint-disable-next-line @next/next/no-img-element
                return src ? <img className="pic" src={src} alt={f.title} loading="lazy" /> : <FieldArt seed={i} />;
              })()}
              <div className="body">
              <h3>{f.title}</h3>
              <p className="mut">{f.intro}</p>
              <ul>
                {f.items.map((it) => (
                  <li key={it.name}>
                    <h4>{it.name}</h4>
                    <p>{it.desc}</p>
                    {it.examples && (
                      <p className="ex">
                        {it.examples.map((e) => (
                          <span key={e}>{e}</span>
                        ))}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
              </div>
            </article>
          ))}
        </div>
        <p className="mut" style={{ marginTop: 40 }}>
          相關種類頗多，無法一一列舉。如有任何疑惑或問題，歡迎<Link href="/contact">來電或來信詢問</Link>。
        </p>

        <h2 style={{ marginTop: "clamp(72px,10vw,120px)" }}>從想法到樣品完成</h2>
        <ol className="steps">
          {STEPS.map(([title, text]) => (
            <li key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
