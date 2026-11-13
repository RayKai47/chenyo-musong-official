# 辰銪科技 ＋ 沐嵩 官方網站

一份 Next.js（App Router）＋ Payload CMS 3 專案，同時負責兩家公司的網站與後台。

同一份程式會**啟動兩次**，一次給一家公司：

| | 辰銪 | 沐嵩 |
| --- | --- | --- |
| 啟動 | `yarn dev:chenyo` | `yarn dev:musong` |
| 網站 | http://chenyo.localhost:3000 | http://musong.localhost:3001 |
| 後台 | http://chenyo.localhost:3000/admin | http://musong.localhost:3001/admin |
| 資料庫 | `chenyo_db` | `musong_db` |

為什麼要啟動兩次：Payload 3 在同一個執行中的程式裡只能有一份設定（後台固定使用同一個快取的 Payload）。
分成兩個程式，兩家的資料庫、帳號、上傳的圖片就完全分開。

## 第一次在 Mac 上設定

需要：Node 24（nvm）、Yarn 4（corepack）、PostgreSQL 18（Homebrew）。

1. 建立兩個資料庫與帳號（只要做一次）。先進入 PostgreSQL：

   ```zsh
   psql postgres
   ```

   再貼上（密碼自己換掉）：

   ```sql
   CREATE ROLE chenyo_user WITH LOGIN PASSWORD '自訂密碼';
   CREATE DATABASE chenyo_db OWNER chenyo_user;
   CREATE ROLE musong_user WITH LOGIN PASSWORD '另一組密碼';
   CREATE DATABASE musong_db OWNER musong_user;
   \q
   ```

2. 設定環境變數：複製 `.env.example` 成 `.env`，填入上一步的密碼，以及兩串隨機文字當 `PAYLOAD_SECRET`。
   隨機文字可以用 `openssl rand -hex 32` 產生。

3. 安裝套件、建立資料表、寫入初始資料：

   ```zsh
   yarn install
   yarn migrate:chenyo
   yarn migrate:musong
   yarn seed:chenyo
   yarn seed:musong
   ```

4. 啟動（兩個終端機視窗各開一個，或只開需要的那一家）：

   ```zsh
   yarn dev:chenyo
   ```

   ```zsh
   yarn dev:musong
   ```

   第一次打開 `/admin` 會要求建立帳號，第一個帳號自動是「管理員」。

`*.localhost` 在 Mac 上會自動指向本機，不用改 hosts 檔。

## 常用指令

| 指令 | 做什麼 |
| --- | --- |
| `yarn dev:chenyo` / `yarn dev:musong` | 開發模式啟動 |
| `yarn build:chenyo` / `yarn start:chenyo` | 正式建置 / 執行建置結果（沐嵩同理） |
| `yarn migrate:create:chenyo 名稱` | 改了資料表定義後，產生一個 migration 檔 |
| `yarn migrate:chenyo` | 套用尚未執行的 migration |
| `yarn migrate:status:chenyo` | 查看 migration 執行狀況 |
| `yarn seed:chenyo` | 寫入初始資料（可重複執行） |
| `yarn generate:types` | 重新產生 `payload/types/` 的 TypeScript 型別 |
| `yarn generate:importmap` | 加了自訂後台元件後，重新產生後台的 import map |

## 資料表變更（migration）流程

1. 本機開發：修改 `payload/collections/` 的定義，`yarn dev:*` 會自動同步本機資料表（push 模式），不用手動處理。
2. 準備上線：`yarn migrate:create:chenyo 這次改了什麼`，產生的檔案在 `payload/migrations/chenyo/`，和程式碼一起 commit。
3. 正式站：更新程式後執行 `yarn migrate:chenyo`。正式站不使用 push 模式。

兩家的 migration 檔分開放，改辰銪的資料表不會動到沐嵩。

本機資料庫用過 push 模式後，再執行 `yarn migrate:*` 時 Payload 可能會問要不要繼續（因為資料表已經被自動同步過），本機回答 y 即可。

## 結構

```
app/
  (frontend)/
    chenyo/            辰銪的頁面（首頁、services、about、contact）與 layout
    musong/            沐嵩的頁面（目前是暫時首頁）
  (payload)/           後台 /admin 與 API /api（Payload 產生，兩家共用）
payload/
  payload.config.ts    進入點：依 SITE 載入下面其中一份
  chenyo.config.ts     辰銪：共用資料表 + Services
  musong.config.ts     沐嵩：共用資料表
  shared.config.ts     兩家共用的設定（資料庫連線、後台語言、編輯器…）
  site.ts              讀取 SITE 與 CHENYO_ / MUSONG_ 開頭的環境變數
  access.ts            權限規則（誰能讀、誰能改）
  collections/         Users、Media、Pages、Services
  globals/             SiteSettings（公司資訊）
  fields/              共用欄位（網址代稱）
  migrations/<site>/   各家的 migration 檔
  seed/<site>.ts       各家的初始資料
  types/<site>.ts      自動產生的型別（不要手動修改）
shared/
  components/          元件（Nav、Footer、Hero、Logo…）
  lib/                 公司資訊、六大服務、六角形工具
  styles/              樣式（chenyo.css）
public/
  chenyo/  musong/     各家的 logo、圖片
media/<site>/          後台上傳的圖片（不進 git）
proxy.ts               網址分流：/about → app/(frontend)/<SITE>/about
```

### 網址分流

`proxy.ts`（Next 16 把舊的 middleware.ts 改名為 proxy.ts）會把訪客的網址在內部加上公司前綴：
辰銪的程式收到 `/about`，實際拿的是 `app/(frontend)/chenyo/about`。`/admin`、`/api`、`/_next` 與帶副檔名的檔案不轉。
因此辰銪的程式打不開沐嵩的頁面，反之亦然。頁面裡的連結照常寫 `/about` 即可。

兩個程式的建置檔分別放在 `.next-chenyo/`、`.next-musong/`，可以同時啟動。

## 備註

- 前端頁面目前仍讀 `shared/lib/` 的固定資料；視覺定案後再改成讀 Payload（Services、SiteSettings）。
- 首頁 intro 每次開啟網站只播放一次。系統設定「減少動態效果」時直接顯示完成畫面。
- 網站圖示（favicon）是 `app/(frontend)/chenyo/icon.svg`。
- 請不要混用 npm，以免產生 package-lock.json。
