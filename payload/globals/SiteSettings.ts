import type { GlobalConfig } from "payload";
import { anyone, loggedIn } from "../access";

/** 公司資訊（只有一筆）。頁尾、聯絡我們頁會讀這裡。 */
export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "公司資訊",
  access: { read: anyone, update: loggedIn },
  fields: [
    { name: "companyName", label: "公司名稱", type: "text", required: true },
    { name: "companyNameEn", label: "英文名稱", type: "text" },
    { name: "foundedYear", label: "成立年份（西元）", type: "number" },
    { name: "tel", label: "電話", type: "text" },
    { name: "fax", label: "傳真", type: "text" },
    { name: "email", label: "Email", type: "email" },
    { name: "address", label: "地址", type: "text" },
    { name: "mapUrl", label: "地圖連結", type: "text" },
  ],
};
