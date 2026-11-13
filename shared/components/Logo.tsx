/**
 * 公司註冊商標。
 * full：圖形 + CHEN-YO TECHNOLOGY CO.,LTD.（public/chenyo/logo.svg，原始商標檔）
 * reverse：英文字反白，用在鮮藍底上（首頁 hero）
 * mark：只有圖形（public/chenyo/logo-mark.svg），用在導覽列等小尺寸處
 */
export default function Logo({ variant = "full", className, alt = "" }: { variant?: "full" | "reverse" | "mark"; className?: string; alt?: string }) {
  const src = { full: "/chenyo/logo.svg", reverse: "/chenyo/logo-reverse.svg", mark: "/chenyo/logo-mark.svg" }[variant];
  const [w, h] = variant === "mark" ? [60, 41] : [60, 50.75];
  // eslint-disable-next-line @next/next/no-img-element -- SVG 商標不需要經過圖片最佳化
  return <img className={className} src={src} width={w} height={h} alt={alt} />;
}
