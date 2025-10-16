# Journey

Journey 是一個輕量的靜態旅遊雜誌範例專案，示範如何用純靜態檔案與 GitHub Actions 建立一個可發佈的文章工作流程，並支援 GPX 軌跡地圖與雜誌風的縮圖產生。

此專案採用 Git-based CMS 的思路：作者可在瀏覽器中撰寫或貼上 Markdown、在本地預覽，並透過 admin 介面觸發 GitHub Actions（workflow_dispatch）來建立最終的靜態 HTML、更新 `posts-db.json`，並產生雜誌式縮圖。

## 主要功能

- 純靜態站（無前端框架），以雜誌風格的樣板呈現文章。
- 內文 GPX 支援：使用 Leaflet 與 leaflet-gpx 繪製軌跡，顯示起訖標記與基本統計（距離、爬升）。
- 管理介面 `admin.html`：能在頁面內（iframe）預覽文章，並透過 `workflow_dispatch` 發佈文章。
- 發佈工作流程：`.github/workflows/publish-article.yml` 支援可選的 Markdown→HTML 轉換、建立 `posts/<slug>.html`、更新 `posts-db.json`、並產生縮圖（Puppeteer + Pillow fallback）。

## 本機快速預覽

在專案根目錄啟動一個靜態伺服器即可預覽：

```bash
python3 -m http.server 8000
# 然後在瀏覽器開啟 http://localhost:8000/
```

- 首頁：`index.html`
- 管理介面：`admin.html`

## 管理介面（撰寫與預覽）

- 以瀏覽器開啟 `admin.html`（確保正在啟動靜態伺服器）。
- 填寫欄位：標題（Title）、日期（Date）、slug、摘要（Summary）、封面圖片路徑（或留空使用預設 placeholder）、可選的 GPX 檔案路徑，以及主要內容（Content）。
- 若貼入 Markdown，請勾選「Content is Markdown」；發佈時工作流程會將 Markdown 轉為 HTML（目前 iframe 預覽會直接輸出內容文字，若需 client-side Markdown 即時渲染可加入 marked.js）。
- 點選 Preview 會在頁面內嵌的 iframe 中呈現產生的 HTML（避免在 Codespaces 或容器環境中遇到彈窗被封鎖的問題）。
- 點選 Publish 會發送 `workflow_dispatch` 至指定的 workflow；需在 admin 介面提供一個 GitHub Personal Access Token（PAT）來執行遠端 dispatch（請注意安全性與權限範圍）。

注意：發佈會觸發工作流程並在 repo 中建立檔案與 commit，建議在測試用的分支或測試 repo 上操作。

## 發佈工作流程

發佈流程位於 `.github/workflows/publish-article.yml`，其要點如下：

- 接收來自 `workflow_dispatch` 的 `post` JSON 輸入（由 admin 介面送出）。
- 若需要則將 Markdown 轉為 HTML，建立 `posts/<slug>.html`，更新 `posts-db.json`。
- 使用 Puppeteer 的 `.github/scripts/render-thumb.js` 產生雜誌風縮圖；遇到問題時會使用 Python Pillow 做為 fallback。
- 將變更 commit 並 push 回 repository。

由於工作流程會對 repo 做出變更，請務必審視 token 權限與工作流程內容，並使用最小權限原則。

## GPX / 地圖支援

- 單篇文章頁面會載入 Leaflet 與 `leaflet-gpx`，範例 GPX 檔案放在 `gpx/taipei-hike-01.gpx`，範例文章 `posts/taipei-day-2025-10.html` 示範如何整合地圖與軌跡。
- `scripts/post.js` 會讀取 `posts-db.json`，初始化地圖、載入 GPX，並計算簡單統計（距離、海拔變化等）。

## 縮圖產生

- 使用 Puppeteer（`.github/scripts/render-thumb.js`）以雜誌風樣板渲染並截圖產生多尺寸縮圖（例如社群分享的 1200×630）。
- 若執行環境無法使用 Puppeteer，工作流程會退回使用 Python Pillow 作為備援。

## 專案結構（重點檔案）

- `index.html` — 首頁，從 `posts-db.json` 讀取並渲染卡片。
- `admin.html` — 管理介面（撰寫、預覽、發佈觸發）。
- `posts/` — 工作流程會在此建立靜態文章頁面。
- `posts-db.json` — 文章 metadata 索引，供首頁與文章頁讀取。
- `scripts/main.js` — 首頁 JS（載入並呈現 `posts-db.json`）。
- `scripts/post.js` — 文章頁 JS（Leaflet + GPX）。
- `scripts/admin.js` — 管理介面 JS（建立發佈 payload、iframe 預覽、觸發 workflow_dispatch）。
- `gpx/` — 範例 GPX 檔案。
- `images/` — 封面圖與由工作流程產生的縮圖。
- `.github/workflows/publish-article.yml` — 發佈 workflow。
- `.github/scripts/render-thumb.js` — Puppeteer 縮圖產生器。

## 開發備註

- Codespaces：admin 預覽已改為 iframe，以避免彈窗被擋；若要在 iframe 中完整預覽包含地圖的文章，請確保靜態資源路徑在預覽環境中可正確讀取。
- 本機測試預覽不需要任何 token；但若要測試發佈流程（呼叫 workflow），需要 PAT 或在 GitHub 環境中以手動 dispatch 執行。請避免將 PAT 提交到版本控制。

## 安全性建議

- 切勿將個人存取權杖（PAT）提交到 repository。若在 admin 介面使用 PAT，請僅在本地或瀏覽器中臨時使用並在使用後撤銷或更換。
- 工作流程應只授予最小權限（例如寫入 repository contents），並定期檢查與輪換 token。

## 未來改進建議

- 在 admin iframe 預覽加入 client-side Markdown 轉換（例如 `marked.js`），讓即時預覽能更貼近最終 HTML。
- 在 iframe 預覽中載入 Leaflet 與 `leaflet-gpx`，使 GPX 軌跡可在預覽時顯示。
- 新增小型測試或驗證腳本（如 slug 檢查、metadata schema 驗證）以避免發佈時的錯誤。

## 授權

請參閱 repository 中的 `LICENSE` 檔案。

