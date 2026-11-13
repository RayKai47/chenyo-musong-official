import type { CollectionConfig } from "payload";
import { anyone, loggedIn } from "../access";
import { slugField } from "../fields/slug";

/** 辰銪的服務領域（六大領域），每個領域底下有多個服務項目。 */
export const Services: CollectionConfig = {
  slug: "services",
  labels: { singular: "服務領域", plural: "服務領域" },
  admin: { useAsTitle: "title", defaultColumns: ["title", "slug", "order"] },
  defaultSort: "order",
  access: { read: anyone, create: loggedIn, update: loggedIn, delete: loggedIn },
  fields: [
    { name: "title", label: "領域名稱", type: "text", required: true },
    slugField("英文代稱，例如 industrial（前台網址與圖片檔名會用到）"),
    { name: "order", label: "排序", type: "number", defaultValue: 0, admin: { position: "sidebar", description: "數字小的排前面" } },
    { name: "intro", label: "簡介", type: "textarea" },
    { name: "image", label: "代表圖片", type: "upload", relationTo: "media" },
    {
      name: "items",
      label: "服務項目",
      type: "array",
      labels: { singular: "項目", plural: "項目" },
      admin: { initCollapsed: true },
      fields: [
        { name: "name", label: "名稱", type: "text", required: true },
        { name: "desc", label: "說明", type: "textarea" },
        {
          name: "examples",
          label: "應用例",
          type: "array",
          labels: { singular: "應用例", plural: "應用例" },
          fields: [{ name: "text", label: "內容", type: "text", required: true }],
        },
      ],
    },
  ],
};
