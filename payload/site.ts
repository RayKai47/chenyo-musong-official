/** 目前這個程式是哪一家公司。由啟動指令帶入（yarn dev:chenyo → SITE=chenyo）。 */
export const SITES = ["chenyo", "musong"] as const;
export type Site = (typeof SITES)[number];

export function currentSite(): Site {
  const site = process.env.SITE;
  if (site === "chenyo" || site === "musong") return site;
  throw new Error(`SITE 環境變數必須是 chenyo 或 musong，目前是「${site ?? "(未設定)"}」。請用 yarn dev:chenyo 或 yarn dev:musong 啟動。`);
}

/** 讀取這家公司的環境變數，例如 env("chenyo", "DATABASE_URL") → CHENYO_DATABASE_URL */
export function siteEnv(site: Site, name: string): string {
  const key = `${site.toUpperCase()}_${name}`;
  const value = process.env[key];
  if (!value) throw new Error(`.env 缺少 ${key}，請參考 .env.example`);
  return value;
}
