import type { Metadata } from "next";
import { CONTACT } from "@/shared/lib/site";

export const metadata: Metadata = { title: "聯絡我們" };

export default function Contact() {
  return (
    <div className="sub">
      <section className="sec contact">
        <h2>聯絡我們</h2>
        <dl>
          <dt>電話</dt>
          <dd>{CONTACT.tel}</dd>
          <dt>傳真</dt>
          <dd>{CONTACT.fax}</dd>
          <dt>E-mail</dt>
          <dd>
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          </dd>
          <dt>地址</dt>
          <dd>
            <a href={CONTACT.map} target="_blank" rel="noopener">
              {CONTACT.address}
            </a>
          </dd>
        </dl>
        <a className="btn" href={`mailto:${CONTACT.email}`}>
          寄信給我們
        </a>
      </section>
    </div>
  );
}
