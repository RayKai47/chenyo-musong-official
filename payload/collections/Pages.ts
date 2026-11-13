import type { CollectionConfig } from "payload";
import { loggedIn, publishedOrLoggedIn } from "../access";
import { slugField } from "../fields/slug";

/** 一般頁面（關於我們、隱私權政策…）。有草稿與發布兩種狀態。 */
export const Pages: CollectionConfig = {
  slug: "pages",
  labels: { singular: "頁面", plural: "頁面" },
  admin: { useAsTitle: "title", defaultColumns: ["title", "slug", "_status", "updatedAt"] },
  versions: { drafts: true },
  access: { read: publishedOrLoggedIn, create: loggedIn, update: loggedIn, delete: loggedIn },
  fields: [
    { name: "title", label: "標題", type: "text", required: true },
    slugField(),
    { name: "content", label: "內文", type: "richText" },
    {
      name: "meta",
      label: "SEO",
      type: "group",
      fields: [
        { name: "title", label: "搜尋結果標題", type: "text" },
        { name: "description", label: "搜尋結果描述", type: "textarea" },
        { name: "image", label: "分享圖片", type: "upload", relationTo: "media" },
      ],
    },
  ],
};
