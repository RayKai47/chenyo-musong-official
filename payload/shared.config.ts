import path from "path";
import { fileURLToPath } from "url";
import { buildConfig, type CollectionConfig, type GlobalConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { zhTw } from "@payloadcms/translations/languages/zhTw";
import sharp from "sharp";

import { siteEnv, type Site } from "./site";
import { Users } from "./collections/Users";
import { makeMedia } from "./collections/Media";
import { Pages } from "./collections/Pages";
import { SiteSettings } from "./globals/SiteSettings";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(dirname, "..");

type Options = {
  site: Site;
  /** 後台標題後綴，例如「辰銪科技」 */
  title: string;
  /** 這家公司專屬的資料表（共用的 Users、Media、Pages 會自動加上） */
  collections?: CollectionConfig[];
  globals?: GlobalConfig[];
};

/**
 * 兩家公司共用的 Payload 設定。
 * chenyo.config.ts、musong.config.ts 各呼叫一次，只差在連哪個資料庫、多了哪些專屬資料表。
 */
export function buildSiteConfig({ site, title, collections = [], globals = [] }: Options) {
  return buildConfig({
    serverURL: siteEnv(site, "SERVER_URL"),
    secret: siteEnv(site, "PAYLOAD_SECRET"),
    admin: {
      user: Users.slug,
      meta: { titleSuffix: `｜${title} 後台` },
      importMap: { baseDir: root },
    },
    collections: [Users, makeMedia(path.resolve(root, "media", site)), Pages, ...collections],
    globals: [SiteSettings, ...globals],
    i18n: {
      supportedLanguages: { "zh-TW": zhTw },
      fallbackLanguage: "zh-TW",
    },
    editor: lexicalEditor(),
    typescript: {
      outputFile: path.resolve(dirname, "types", `${site}.ts`),
      // 兩家各有一份型別檔，不要互相覆蓋全域型別
      declare: false,
    },
    db: postgresAdapter({
      pool: { connectionString: siteEnv(site, "DATABASE_URL") },
      // 兩家的 migration 檔分開放
      migrationDir: path.resolve(dirname, "migrations", site),
    }),
    sharp,
  });
}
