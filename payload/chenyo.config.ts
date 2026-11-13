import { buildSiteConfig } from "./shared.config";
import { Services } from "./collections/Services";

/** 辰銪科技：連 chenyo_ofc，多一個「服務領域」資料表 */
export const chenyoConfig = () =>
  buildSiteConfig({
    site: "chenyo",
    title: "辰銪科技",
    collections: [Services],
  });
