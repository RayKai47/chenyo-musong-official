import type { CollectionConfig } from "payload";
import { anyone, loggedIn } from "../access";

/** 圖片與檔案。staticDir 依公司分開（media/chenyo、media/musong），不進 git。 */
export const makeMedia = (staticDir: string): CollectionConfig => ({
  slug: "media",
  labels: { singular: "圖片檔案", plural: "圖片檔案" },
  access: { read: anyone, create: loggedIn, update: loggedIn, delete: loggedIn },
  upload: {
    staticDir,
    mimeTypes: ["image/*", "application/pdf"],
    imageSizes: [
      { name: "thumbnail", width: 400 },
      { name: "card", width: 768 },
      { name: "hero", width: 1920 },
    ],
    adminThumbnail: "thumbnail",
  },
  fields: [{ name: "alt", label: "替代文字（圖片說明）", type: "text", required: true }],
});
