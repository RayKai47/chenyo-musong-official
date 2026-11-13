import { currentSite } from "./site";
import { chenyoConfig } from "./chenyo.config";
import { musongConfig } from "./musong.config";

/**
 * Payload 的進入點（tsconfig 的 @payload-config 指到這裡）。
 * 依 SITE 決定這次載入哪一家的設定。一個執行中的程式只會有一份設定。
 */
export default currentSite() === "musong" ? musongConfig() : chenyoConfig();
