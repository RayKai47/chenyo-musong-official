import type { Metadata, Viewport } from "next";
import { Noto_Sans_TC } from "next/font/google";
import Nav from "@/shared/components/Nav";
import Footer from "@/shared/components/Footer";
import { COMPANY } from "@/shared/lib/site";
import "@/shared/styles/chenyo.css";

const noto = Noto_Sans_TC({ weight: ["300", "400", "700"], subsets: ["latin"], display: "swap", variable: "--font-noto" });

export const metadata: Metadata = {
  title: { default: COMPANY, template: `%s｜${COMPANY}` },
  description: "辰銪科技有限公司：專業軟體、硬體、韌體系統整合研發，提供客製化研發與生產服務。",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#f4f7f9",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant" className={noto.variable}>
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
