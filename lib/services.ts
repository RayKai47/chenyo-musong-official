/**
 * 六大服務領域與各自的服務項目。
 * 內容整理自現行官網 https://chenyo-tech.com/solution.html 的文字。
 */
export type ServiceItem = { name: string; desc: string; examples?: string[] };
export type ServiceField = { id: string; title: string; intro: string; items: ServiceItem[] };

export const SERVICE_FIELDS: ServiceField[] = [
  {
    id: "industrial",
    title: "工業控制相關",
    intro: "從感測元件、人機介面到控制板與測試設備，提供工業設備所需的客製化軟硬體。",
    items: [
      { name: "近接開關（電感、電容、光電）", desc: "偵測到物體接近時送出訊號給 PLC，作為設備自動化的感測元件。" },
      { name: "電容式近接開關", desc: "不需接觸即可偵測金屬、非金屬、液體與粉粒狀物料。" },
      { name: "人機介面（HMI）", desc: "讓使用者操作工業機台，並即時顯示設備狀態。" },
      { name: "工業控制板", desc: "客製化 PLC 控制板與 LCD 控制模組。" },
      { name: "伺服器可靠度測試機（客製化）", desc: "自動執行測試循環，確認伺服器資訊與周邊裝置相符。" },
    ],
  },
  {
    id: "automotive",
    title: "車用電子相關",
    intro: "依原廠規格開發車用電子產品，並符合更嚴格的 EMI、EMC、EMS 要求。",
    items: [
      { name: "客製化車用電子產品", desc: "中控、車內裝置等產品，提供與原廠相容的改裝設計。", examples: ["中控系統", "車內裝置"] },
      { name: "RX300 電動窗升降裝置", desc: "分析原廠訊號（非 CAN BUS）開發，增加原廠沒有的功能，同時符合車規標準。" },
    ],
  },
  {
    id: "beauty",
    title: "醫美儀器相關",
    intro: "客製化醫療美容儀器的研發與生產。",
    items: [
      { name: "客製化醫療美容儀器", desc: "依客戶需求開發各類醫美儀器。", examples: ["導入導出儀器", "去角質儀器", "電波拉提", "射頻（RF）"] },
      { name: "導入導出儀", desc: "以電波打開毛孔，幫助保養品吸收或帶出髒污。" },
      { name: "深層清潔儀", desc: "以物理方式去除老廢角質，並以真空吸引帶出毛孔髒污。" },
    ],
  },
  {
    id: "iot",
    title: "物聯網與無線裝置",
    intro: "讓產品連上網路或彼此連線，涵蓋 Wi-Fi、藍牙、2.4G 與 RFID。",
    items: [
      { name: "Wi-Fi 與藍牙", desc: "依 802.11 等標準設計，讓產品連上網際網路或其他裝置。" },
      { name: "2.4G Wireless", desc: "採用 LoRa、FLRC、(G)FSK，距離長、抗干擾、低功耗，適合可攜式與鈕扣電池產品。" },
      { name: "Bluetooth / Wi-Fi / RFID 無線通訊控制設備", desc: "各類無線控制設備的研發。", examples: ["門禁系統", "車道控制", "資料庫傳輸"] },
    ],
  },
  {
    id: "reverse",
    title: "逆向工程",
    intro: "分析既有成品，修改尺寸或解析晶片程式碼，解決相容性問題。",
    items: [
      { name: "逆向工程", desc: "針對既有產品進行分析與重新設計。", examples: ["感應卡", "WII 改機", "墨水匣破解晶片（EPSON、HP 等）"] },
    ],
  },
  {
    id: "software",
    title: "軟體控制",
    intro: "為設備與伺服器開發測試與控制軟體。",
    items: [
      { name: "工業設備與儀器測試 GUI 軟體", desc: "測試工業設備與儀器的可用性及可靠性，支援 Windows、Linux、Android。" },
      { name: "伺服器可靠性測試軟體", desc: "在受測伺服器上持續收發資料，驗證資料傳輸是否可靠。" },
    ],
  },
];
