import { NextResponse, type NextRequest } from "next/server";

/**
 * 網址分流（Next 16 的 proxy，舊名 middleware）。
 *
 * 同一份程式會啟動兩次：SITE=chenyo 與 SITE=musong（見 package.json 的 dev:chenyo / dev:musong）。
 * 訪客看到的網址是 /about，這裡在內部改成 /chenyo/about，去拿 app/(frontend)/chenyo/about 的頁面。
 * 所以辰銪的程式打不開沐嵩的頁面，反之亦然。
 */
const SITE = process.env.SITE;

export function proxy(request: NextRequest) {
  if (!SITE) return new NextResponse("缺少 SITE 環境變數，請用 yarn dev:chenyo 或 yarn dev:musong 啟動", { status: 500 });
  const url = request.nextUrl.clone();
  url.pathname = `/${SITE}${url.pathname === "/" ? "" : url.pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // 不轉：後台 /admin、API /api、Next 內部檔案 /_next、以及所有帶副檔名的檔案（圖片、svg、favicon…）
  matcher: ["/((?!admin|api|_next|.*\\.[^/]+$).*)"],
};
