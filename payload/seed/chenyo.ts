/**
 * 辰銪的初始資料：公司資訊 + 六大服務領域（來源：shared/lib/services.ts）。
 * 執行：yarn seed:chenyo
 * 可以重複執行：已存在的服務領域（依網址代稱）會更新，不會重複新增。
 */
import { getPayload } from "payload";
import config from "@payload-config";
import { SERVICE_FIELDS } from "../../shared/lib/services";
import { CONTACT } from "../../shared/lib/site";

const payload = await getPayload({ config });

await payload.updateGlobal({
  slug: "site-settings",
  data: {
    companyName: "辰銪科技有限公司",
    companyNameEn: "CHEN-YO TECHNOLOGY CO.,LTD.",
    foundedYear: 2012,
    tel: CONTACT.tel,
    fax: CONTACT.fax,
    email: CONTACT.email,
    address: CONTACT.address,
    mapUrl: CONTACT.map,
  },
});
payload.logger.info("公司資訊已寫入");

for (const [i, field] of SERVICE_FIELDS.entries()) {
  const data = {
    title: field.title,
    slug: field.id,
    order: (i + 1) * 10,
    intro: field.intro,
    items: field.items.map((it) => ({
      name: it.name,
      desc: it.desc,
      examples: (it.examples ?? []).map((text) => ({ text })),
    })),
  };
  const { docs } = await payload.find({ collection: "services", where: { slug: { equals: field.id } }, limit: 1 });
  if (docs[0]) {
    await payload.update({ collection: "services", id: docs[0].id, data });
    payload.logger.info(`更新：${field.title}`);
  } else {
    await payload.create({ collection: "services", data });
    payload.logger.info(`新增：${field.title}`);
  }
}

payload.logger.info("完成");
process.exit(0);
