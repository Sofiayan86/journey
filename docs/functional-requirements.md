# 互動式旅行雜誌部落格 — 功能需求文件 v1.0

## 1. 專案願景與目標
建立一個風格簡約、排版如同高端旅行雜誌的個人網站。網站核心為圖文並茂的旅行文章，並透過互動式地圖與 GPX 軌跡，為讀者提供沉浸式的閱讀體驗。本專案強調：高度個人化、不受第三方平台限制、永久自主控制、零營運成本。

## 2. 核心技術與理念
- 前端：純原生 HTML / CSS / JavaScript（不使用 React/Vue 等大型框架）。
- 後端：Git-based CMS（透過 GitHub Actions + `workflow_dispatch` 進行無伺服器發布）。
- 託管：GitHub Pages（免費、與 Git 原生整合）。
- 理念：程式碼掌控、數據自主、低成本運營。

## 3. 視覺與使用者體驗（UX）
- 整體風格：簡約、乾淨、現代，大量留白，強調內容。
- 排版：非對稱網格佈局，仿高端生活風格雜誌（如 Kinfolk / Cereal）。
- 字體：標題建議襯線（Noto Serif TC），內文建議無襯線（Inter 或 Noto Sans TC）。
- 色票：黑 / 白 / 灰為主色，搭配 1-2 個低飽和點綴色。
- 動畫：滾動與載入時使用細膩、不影響閱讀的過渡效果。

## 4. 功能分解
### 4.1 核心部落格系統（既有規劃）
- 首頁（index.html）
  - 以卡片或列表顯示最新文章（標題、摘要、封面圖）。
- 文章頁（posts/<slug>.html）
  - 頂部展示高品質橫幅 (Hero Image)、標題、發布日期，支援圖文混排、圖片燈箱等。 
- 後端管理（admin.html）
  - 本地管理介面，輸入文章內容、metadata（title、date、tags、gpxFile、location）及 GitHub PAT。
  - 前端以 fetch 呼叫 GitHub REST API（workflow_dispatch）觸發 action 完成文章建立與發布。

### 4.2 頁面通用元件
- Header：Logo/站名、導覽連結（首頁、所有文章、關於我、地圖）。
- Footer：社群圖示連結（Instagram、Facebook、Twitter、GitHub 等）、版權與簡介。

### 4.3 互動地圖（新增功能）
#### 4.3.1 文章內 GPX 軌跡地圖
- 需求：在特定文章中嵌入互動地圖以顯示 GPX 軌跡。
- 實作細節：
  - `posts-db.json` 的文章物件新增可選屬性 `gpxFile`（例如 `/gpx/taiwan-hike-01.gpx`）。
  - 文章頁的 JavaScript 檢查 `gpxFile`，若存在則載入 Leaflet.js 與 leaflet-gpx 插件，並渲染軌跡。
  - 地圖支援縮放、平移；在地圖或側欄顯示海拔／距離等資訊（可透過 leaflet-gpx 或自行計算）。
  - GPX 檔案應放在 repository 的 `/gpx/` 目錄並透過 GitHub Pages 提供靜態資源。

#### 4.3.2 全域探索地圖（Map Overview）
- 需求：提供一個地圖頁（/map.html 或在首頁顯著區塊），標示所有文章的地理位置。
- 實作細節：
  - `posts-db.json` 的文章物件包含 `location: { lat, lng }`。
  - 前端載入 `posts-db.json`，使用 Leaflet 建立地圖並對每篇文章新增 Marker。
  - 點擊 Marker 顯示 Popup：文章標題、封面縮圖與連結（點連結可開啟該篇文章）。

## 5. posts-db.json Schema（建議）
示例欄位：
{
  "id": "2025-10-taipei-trip",
  "title": "台北一日小旅行",
  "date": "2025-10-16",
  "slug": "taipei-day-2025-10",
  "summary": "簡短摘要...",
  "coverImage": "/images/taipei-hero.jpg",
  "gpxFile": "/gpx/taipei-hike-01.gpx",   // optional
  "location": { "lat": 25.0330, "lng": 121.5654 }, // optional
  "tags": ["台灣","城市漫步"]
}

## 6. 驗收標準（Acceptance Criteria）
- 網站版面符合簡約、雜誌風格。
- 能透過 `admin.html` 成功發布新文章（觸發 GitHub Action 並將檔案推上 repo）。
- Footer 的社群連結能正確導向指定頁面。
- 包含 `gpxFile` 的文章能在文章頁顯示互動軌跡地圖。
- 全域探索地圖能顯示所有文章標記，並能連回該篇文章。
- 網站在桌機與行動裝置上具良好響應式顯示。

## 7. 開發契約（Contract）
- 輸入：`posts-db.json`（含文章 metadata 與位置/G PX 路徑）、文章靜態頁面（HTML）、GPX 檔案。
- 輸出：靜態網站（HTML/CSS/JS）、Leaflet 地圖可互動顯示軌跡與標記、GitHub Actions 可自動建立文章並更新 `posts-db.json`。
- 錯誤模式：若 GPX 檔案不存在，顯示友善訊息並隱藏地圖；若 GitHub Action 觸發失敗，回傳明確錯誤並提示檢查 PAT 權限。

## 8. 邊界情況與風險
- GPX 檔案過大導致載入緩慢：採取延遲載入（lazy load）與簡化軌跡（若必要）策略。
- 地點缺失：文章若無 `location`，於全域地圖不建立 Marker。
- PAT 權限與安全：建議使用最小 scope（repo:contents、workflow），並在文件中強調不要在公開電腦輸入 PAT。

## 9. 測試計畫（最小驗證集）
1. 建立含 `gpxFile` 與 `location` 的範例文章，確認文章頁能載入並呈現軌跡與海拔/距離資訊。
2. 建立不含 `gpxFile` 的文章，確認頁面不顯示地圖且無錯誤。
3. 在 `map.html` 載入 `posts-db.json`，確認所有有 `location` 的文章在地圖上有 Marker，且 Popup 可連到文章。
4. 測試 `admin.html` 觸發 workflow_dispatch、Action 建立文章並更新 `posts-db.json`（可在測試分支上進行）。

## 10. 建議的下一步實作計劃（短期）
- 建立 `docs/`（完成）與 `posts-db.json` 範例。
- 實作 `admin.html` 原型並驗證 workflow dispatch。
- 實作文章範本與 Leaflet + leaflet-gpx 整合（先做單篇測試）。

---

> 若要我直接在 repository 中開始實作（例如新增 `posts-db.json` 範例、`admin.html` 原型或 Leaflet 的程式碼），請告訴我你想先完成哪一項，我會接著實作並在 repo 中提交變更。