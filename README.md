# 辰銪科技股份有限公司 官方網站

Next.js（App Router）+ TypeScript。由 2026/10/7 第二版設計稿（單一 HTML 預覽）轉成正式的多頁專案。

## 開始

套件管理用 Yarn 4，安裝方式是一般的 `node_modules`（`.yarnrc.yml` 設定 `nodeLinker: node-modules`，不使用 PnP）。

```bash
corepack enable  # 第一次使用時執行，會依 package.json 的 packageManager 自動使用 Yarn 4
yarn install
yarn dev         # http://localhost:3000
yarn build       # 正式建置
yarn start       # 執行建置後的網站
```

需要 Node.js 20 以上。請不要混用 npm，以免產生 package-lock.json。

## 結構

```
app/
  layout.tsx          共用版面：字型、logo 定義、導覽列、頁尾
  globals.css         全站樣式（配色變數在 :root）
  page.tsx            首頁（hero intro 動畫）
  services/page.tsx   服務內容（系統整合蜂巢 + 開發流程）
  about/page.tsx      關於我們（宇宙縮影 + 公司介紹）
  contact/page.tsx    聯絡我們
components/
  Hero.tsx            首頁 canvas 動畫：一道光穿過蜂巢縫隙，順線點亮 logo 與公司名稱
  ServiceFlower.tsx   七格服務蜂巢
  NestHexagons.tsx    由小到大的六角形背景
  Nav.tsx / Footer.tsx
  Logo.tsx            公司註冊商標（public/logo.svg、logo-mark.svg）
  FieldArt.tsx        服務項目沒有照片時的電路板插圖
lib/
  site.ts             公司名稱、導覽項目、聯絡資訊
  hex.ts              六角形座標工具
docs/
  首頁構想參考圖.png    首頁構想參考圖（設計參考，不會上線）
public/
  logo.svg            註冊商標原始檔（圖形 + CHEN-YO TECHNOLOGY CO.,LTD.）
  logo-mark.svg       只有圖形的版本（導覽列用）
  circuit.svg         背景的電路板走線
  images/services/    服務項目照片，檔名說明見該資料夾的 README
```

## 備註

- 首頁 intro 每次開啟網站只播放一次，在站內切換分頁後回首頁不會重播。系統設定「減少動態效果」時直接顯示完成畫面。
- 聯絡資訊集中在 `lib/site.ts`，修改一處即可。
- 網站圖示（favicon）是 `app/icon.svg`，由商標圖形裁切而成。
# chenyo-official
