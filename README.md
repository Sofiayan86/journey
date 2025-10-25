# 互動式旅行雜誌部落格 (Travel Magazine Blog)

一個風格簡約、排版如同高端旅行雜誌的個人網站。網站核心為圖文並茂的旅行文章，並透過互動式地圖與 GPX 軌跡，為讀者提供沉浸式的閱讀體驗。

## 核心特性

### 技術架構
- **前端**：完全使用原生 HTML, CSS, JavaScript（React + Tailwind CSS）
- **後端**：基於 GitHub Actions 的「Git-based CMS」
- **託管**：GitHub Pages（免費、穩定、與 Git 原生整合）
- **理念**：完全的程式碼掌控權、數據自主權、零營運成本

### 視覺設計
- 簡約、乾淨、現代的設計風格
- 大量留白，強調內容本身
- 非對稱的網格佈局，類似於《Kinfolk》或《Cereal》等生活風格雜誌
- 黑、白、灰為主色調，搭配低飽和度的點綴色
- 細膩、不干擾閱讀的過渡動畫

### 核心功能
1. **首頁** - 展示最新文章和網站簡介
2. **文章列表** - 瀏覽所有已發布的旅行故事
3. **文章詳細頁** - 支援圖文混排的完整文章內容
4. **互動地圖** - 全域探索地圖，標示所有文章的地理位置
5. **GPX 軌跡** - 在文章內嵌入 GPX 軌跡地圖（支援 Leaflet.js）
6. **後台管理** - 本地 admin.html 頁面，透過 GitHub Actions 發布文章
7. **響應式設計** - 完美支援桌面、平板和行動裝置

## 快速開始

### 開發環境

```bash
# 安裝依賴
pnpm install

# 啟動開發伺服器
pnpm dev

# 構建生產版本
pnpm build
```

開發伺服器將在 `http://localhost:3000` 啟動。

### 文件結構

```
travel-magazine-blog/
├── client/
│   ├── public/
│   │   ├── admin.html           # 後台管理介面
│   │   └── posts-db.json        # 文章數據庫
│   └── src/
│       ├── pages/
│       │   ├── Home.tsx         # 首頁
│       │   ├── Articles.tsx     # 文章列表
│       │   ├── Article.tsx      # 文章詳細頁
│       │   ├── Map.tsx          # 互動地圖
│       │   ├── About.tsx        # 關於頁面
│       │   └── NotFound.tsx     # 404 頁面
│       ├── components/
│       │   ├── Header.tsx       # 導覽列
│       │   ├── Footer.tsx       # 頁尾
│       │   └── ArticleCard.tsx  # 文章卡片
│       ├── App.tsx              # 應用程式主文件
│       └── index.css            # 全局樣式
├── .github/workflows/
│   ├── publish-article.yml      # 文章發布工作流程
│   └── deploy.yml               # GitHub Pages 部署工作流程
└── README.md
```

## 使用指南

### 發布新文章

1. **訪問後台管理介面**
   - 打開 `https://yourdomain.com/admin.html`

2. **填寫文章信息**
   - 標題、摘要、內容（必填）
   - 作者、分類、發布日期
   - 封面圖片 URL
   - 地理位置（經緯度）
   - GPX 軌跡文件路徑（可選）

3. **配置 GitHub 認證**
   - 在 [GitHub Settings](https://github.com/settings/tokens) 創建 Personal Access Token
   - 選擇 `repo` 和 `workflow` 權限
   - 在後台管理介面輸入 Token 和倉庫名稱

4. **發布文章**
   - 點擊「Publish Article」按鈕
   - GitHub Actions 將自動更新文章數據庫
   - 文章將在幾秒鐘內出現在網站上

### 文章數據格式

`posts-db.json` 中的文章對象結構：

```json
{
  "id": "unique-article-id",
  "title": "Article Title",
  "excerpt": "Brief summary of the article",
  "content": "Full article content",
  "coverImage": "https://example.com/image.jpg",
  "publishDate": "2024-10-15",
  "author": "Author Name",
  "category": "Travel Category",
  "gpxFile": "/gpx/route.gpx",
  "location": {
    "lat": 35.0116,
    "lng": 135.7681
  }
}
```

### 自定義配置

#### 網站標題和 Logo
編輯環境變數或 `client/src/const.ts`：
```typescript
export const APP_TITLE = "Travel Magazine";
export const APP_LOGO = "https://example.com/logo.png";
```

#### 社群媒體連結
編輯 `client/src/components/Footer.tsx` 中的 `socialLinks` 配置。

#### 色彩主題
編輯 `client/src/index.css` 中的 CSS 變數。

## 部署指南

### 部署到 GitHub Pages

1. **推送代碼到 GitHub**
   ```bash
   git push origin main
   ```

2. **配置 GitHub Pages**
   - 進入倉庫設定 → Pages
   - Source 選擇 "GitHub Actions"
   - 保存設定

3. **自動部署**
   - 每次推送到 `main` 分支時，`deploy.yml` 工作流程將自動執行
   - 網站將在幾分鐘內部署完成

4. **訪問網站**
   - `https://username.github.io/travel-magazine-blog`
   - 或使用自定義域名（在 GitHub Pages 設定中配置）

## 進階功能

### 集成 Leaflet.js 進行互動地圖

在 `client/src/pages/Map.tsx` 中集成 Leaflet.js：

```bash
pnpm add leaflet leaflet-gpx
```

### 支援 Markdown 內容

在文章發布時使用 Markdown 格式，並在頁面渲染時轉換為 HTML。

### 圖片優化

使用圖片 CDN 或 GitHub Pages 靜態資源託管優化加載速度。

## 驗收標準

- [x] 網站版面符合簡約、雜誌風格的設計要求
- [x] 能夠透過 admin.html 成功發布新文章至網站
- [x] 頁尾的社群連結可以正確導向指定的個人頁面
- [ ] 包含 GPX 檔案的文章能夠正確顯示互動軌跡地圖
- [ ] 全域探索地圖能夠顯示所有文章的標記，且點擊後可連結至對應文章
- [x] 網站在桌面與行動裝置上皆有良好的響應式瀏覽體驗

## 故障排除

### GitHub Actions 工作流程未觸發
- 確認 Personal Access Token 有效且未過期
- 檢查 Token 是否具有 `repo` 和 `workflow` 權限
- 驗證倉庫名稱格式正確（owner/repo）

### 文章未出現在網站上
- 檢查 `posts-db.json` 是否正確更新
- 確認 GitHub Pages 部署已完成
- 清除瀏覽器快取並重新加載

### 樣式未正確應用
- 運行 `pnpm build` 重新構建項目
- 檢查 Tailwind CSS 配置是否正確

## 許可證

MIT License

## 貢獻

歡迎提交 Issue 和 Pull Request！

## 聯繫方式

如有問題或建議，請通過以下方式聯繫：
- Email: hello@example.com
- GitHub: [@username](https://github.com/username)

---

**Built with ❤️ for travel storytelling**

