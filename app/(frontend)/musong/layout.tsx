import type { Metadata } from "next";

/** 沐嵩的版面。視覺定案後再換成正式的導覽列、頁尾與樣式。 */
export const metadata: Metadata = {
  title: { default: "沐嵩", template: "%s｜沐嵩" },
};

export default function MusongLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant">
      <body style={{ margin: 0, fontFamily: '"PingFang TC","Microsoft JhengHei",sans-serif' }}>
        <main>{children}</main>
      </body>
    </html>
  );
}
