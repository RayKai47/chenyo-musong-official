import { buildSiteConfig } from "./shared.config";

/** 沐嵩：連 musong_db。之後確定要展示的內容（產品、案例…）再加專屬資料表 */
export const musongConfig = () =>
  buildSiteConfig({
    site: "musong",
    title: "沐嵩",
  });
