import Link from "next/link";
import Hero from "@/shared/components/Hero";
import NestHexagons from "@/shared/components/NestHexagons";
import ServiceFlower from "@/shared/components/ServiceFlower";

/** 首頁：開場 hero，往下滾動是各分頁的重點摘要，細節再由連結進入各分頁 */
export default function Home() {
  return (
    <>
      <Hero />

      <section id="intro" className="cos" aria-label="品牌理念">
        <NestHexagons />
        <p className="big">
          一塊小小的電路板，
          <br />
          是一整個宇宙的縮影。
        </p>
        <p className="sm">我們設計的產品也許只有手掌大，內部卻是軟體、硬體、韌體交織而成的完整系統。</p>
      </section>

      <section className="sec">
        <div className="sol">
          <div>
            <h2>以系統整合為核心</h2>
            <p className="mut">辰銪科技 2012 年成立，專注於軟體、硬體、韌體的系統整合研發，提供客製化研發與生產服務，涵蓋六大應用領域，並已有與大小型廠商合作的經驗。</p>
            <p className="more">
              <Link href="/services">查看服務項目</Link>
              <Link href="/about">認識辰銪科技</Link>
            </p>
          </div>
          <ServiceFlower base="/services" />
        </div>
      </section>

      <section className="sec cta">
        <h2>從想法到樣品完成</h2>
        <p className="mut">從洽談、POC 驗證、規格與時程，到研發設計與 EVT、DVT 驗證，陪您把想法做成可靠的產品。</p>
        <Link className="btn" href="/contact">
          與我們聯絡
        </Link>
      </section>
    </>
  );
}
