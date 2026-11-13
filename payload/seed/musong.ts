/**
 * 沐嵩的初始資料：公司資訊（先放名稱，其他欄位到後台填）。
 * 執行：yarn seed:musong
 */
import { getPayload } from "payload";
import config from "@payload-config";

const payload = await getPayload({ config });

await payload.updateGlobal({
  slug: "site-settings",
  data: { companyName: "沐嵩" },
});
payload.logger.info("完成");
process.exit(0);
