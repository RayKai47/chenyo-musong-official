import type { Metadata } from "next";
import NestHexagons from "@/components/NestHexagons";

export const metadata: Metadata = { title: "關於我們" };

export default function About() {
  return (
    <div className="sub">
      <section className="cos" aria-label="品牌理念">
        <NestHexagons />
        <p className="big">
          一塊小小的電路板，
          <br />
          是一整個宇宙的縮影。
        </p>
        <p className="sm">我們設計的產品也許只有手掌大，內部卻是軟體、硬體、韌體交織而成的完整系統。</p>
      </section>
      <section className="sec">
        <div className="about">
          <h2>
            專業系統整合研發公司，
            <br />
            2012 年成立。
          </h2>
          <div>
            <p>辰銪科技股份有限公司專注於軟體、硬體、韌體的系統整合研發，現階段涉及工業控制設備、醫療美容儀器、車用電子產品等多項領域，並已有與大小型廠商合作的經驗。</p>
            <p>
              我們秉持「<b>優質設計服務、滿足客戶需求、創造雙贏的局面</b>」的理念，以「交貨準時、優良品質、服務貼心、價格合理、產品有價值」為目標。
            </p>
            <p>透過協調客戶、供應、生產三方，讓三方共創利益，達到永續經營的理想。</p>
          </div>
        </div>
      </section>
    </div>
  );
}
