# 互動式旅行雜誌部落格 - 部署與使用指南

## 專案概述

本專案是一個風格簡約、排版如同高端旅行雜誌的個人網站。網站核心為圖文並茂的旅行文章，並透過互動式地圖與 GPX 軌跡，為讀者提供沉浸式的閱讀體驗。

### 核心技術棧

| 層級 | 技術 | 說明 |
|------|------|------|
| **前端** | React 19 + Tailwind CSS 4 | 現代化的前端框架與樣式系統 |
| **後端** | GitHub Actions | 無伺服器的 Git-based CMS |
| **託管** | GitHub Pages | 免費、穩定、與 Git 原生整合 |
| **地圖** | Leaflet.js | 輕量級互動地圖庫 |
| **路由** | Wouter | 輕量級客戶端路由 |

## 快速開始

### 本地開發

```bash
# 1. 安裝依賴
pnpm install

# 2. 啟動開發伺服器
pnpm dev

# 3. 打開瀏覽器訪問
# http://localhost:3000
```

### 構建生產版本

```bash
# 構建項目
pnpm build

# 預覽生產版本
pnpm preview
```

## 部署到 GitHub Pages

### 第 1 步：準備 GitHub 倉庫

1. 在 GitHub 上創建一個新的倉庫，命名為 `travel-magazine-blog`
2. 克隆倉庫到本地：
   ```bash
   git clone https://github.com/your-username/travel-magazine-blog.git
   cd travel-magazine-blog
   ```

### 第 2 步：推送代碼

```bash
# 添加遠程倉庫
git remote add origin https://github.com/your-username/travel-magazine-blog.git

# 推送代碼到 main 分支
git push -u origin main
```

### 第 3 步：配置 GitHub Pages

1. 進入倉庫設定 → **Pages**
2. 在 **Build and deployment** 部分：
   - **Source** 選擇 "GitHub Actions"
   - 保存設定
3. GitHub Actions 將自動構建並部署您的網站

### 第 4 步：訪問您的網站

- **項目倉庫**：`https://your-username.github.io/travel-magazine-blog/`
- **用戶/組織頁面**：`https://your-username.github.io/`

> **注意**：如果部署到項目倉庫，需要在 `vite.config.ts` 中設置 `base: '/travel-magazine-blog/'`

## 發布新文章

### 方法 1：使用後台管理介面（推薦）

1. **訪問管理頁面**
   - 打開 `https://your-domain.com/admin.html`

2. **配置 GitHub 認證**
   - 在 [GitHub Settings → Tokens](https://github.com/settings/tokens) 創建 Personal Access Token
   - 選擇以下權限：
     - `repo` - 完整的倉庫訪問權限
     - `workflow` - GitHub Actions 工作流程權限
   - 複製 Token 到後台管理介面

3. **填寫文章信息**
   ```json
   {
     "title": "文章標題",
     "excerpt": "文章摘要",
     "content": "完整文章內容",
     "coverImage": "https://example.com/image.jpg",
     "category": "旅遊地點",
     "author": "作者名稱",
     "publishDate": "2024-10-20",
     "location": {
       "lat": 35.0116,
       "lng": 135.7681
     },
     "gpxFile": "/gpx/route.gpx"  // 可選
   }
   ```

4. **發布文章**
   - 點擊「Publish Article」按鈕
   - GitHub Actions 將自動更新 `posts-db.json`
   - 文章將在幾秒鐘內出現在網站上

### 方法 2：手動編輯 posts-db.json

1. 編輯 `client/public/posts-db.json`
2. 添加新的文章對象到 `posts` 陣列
3. 提交並推送到 GitHub
4. GitHub Actions 將自動部署更新

## 文章數據格式

### 完整的文章對象結構

```json
{
  "id": "unique-article-id",
  "title": "文章標題",
  "excerpt": "簡短的文章摘要，用於列表頁面顯示",
  "content": "完整的文章內容，支援 HTML 標籤",
  "coverImage": "https://example.com/cover-image.jpg",
  "publishDate": "2024-10-20",
  "author": "作者名稱",
  "category": "旅遊地點或分類",
  "location": {
    "lat": 35.0116,
    "lng": 135.7681
  },
  "gpxFile": "/gpx/route.gpx"
}
```

### 字段說明

| 字段 | 類型 | 必填 | 說明 |
|------|------|------|------|
| `id` | string | ✓ | 唯一標識符，用於路由和引用 |
| `title` | string | ✓ | 文章標題 |
| `excerpt` | string | ✓ | 文章摘要，顯示在列表和首頁 |
| `content` | string | ✓ | 完整文章內容 |
| `coverImage` | string | ✓ | 封面圖片 URL |
| `publishDate` | string | ✓ | 發布日期（YYYY-MM-DD 格式） |
| `author` | string | ✗ | 作者名稱 |
| `category` | string | ✗ | 文章分類或地點 |
| `location` | object | ✗ | 地理位置（用於地圖標記） |
| `location.lat` | number | ✗ | 緯度 |
| `location.lng` | number | ✗ | 經度 |
| `gpxFile` | string | ✗ | GPX 軌跡文件路徑 |

## 自定義配置

### 網站標題和 Logo

編輯 `client/src/const.ts`：

```typescript
export const APP_TITLE = "Journeys & Discoveries";
export const APP_LOGO = "https://example.com/logo.png";
```

### 社群媒體連結

編輯 `client/src/components/Footer.tsx` 中的 `socialLinks` 配置：

```typescript
const socialLinks = [
  { icon: Mail, href: "mailto:hello@example.com", label: "Email" },
  { icon: Github, href: "https://github.com/your-username", label: "GitHub" },
  { icon: Instagram, href: "https://instagram.com/your-username", label: "Instagram" },
  { icon: Linkedin, href: "https://linkedin.com/in/your-username", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com/your-username", label: "Twitter" },
];
```

### 色彩主題

編輯 `client/src/index.css` 中的 CSS 變數：

```css
:root {
  --primary: oklch(0.235 0.015 65);        /* 主色調 */
  --background: oklch(1 0 0);              /* 背景色 */
  --foreground: oklch(0.235 0.015 65);     /* 文字色 */
  --accent: oklch(0.35 0.08 45);           /* 強調色 */
  /* ... 其他顏色變數 ... */
}
```

## 添加 GPX 軌跡地圖

### 準備 GPX 文件

1. 使用 GPS 設備或應用程式（如 Strava、AllTrails）記錄您的路線
2. 導出為 GPX 格式
3. 將文件上傳到 `client/public/gpx/` 目錄

### 在文章中引用 GPX

在 `posts-db.json` 中添加 `gpxFile` 字段：

```json
{
  "id": "hiking-trail",
  "title": "登山步道",
  "gpxFile": "/gpx/hiking-trail.gpx",
  "location": {
    "lat": 35.0116,
    "lng": 135.7681
  }
}
```

## 故障排除

### GitHub Actions 工作流程未觸發

**問題**：提交代碼後，GitHub Actions 未自動執行

**解決方案**：
1. 檢查 `.github/workflows/` 目錄中的工作流程文件
2. 確認工作流程文件名正確（`deploy.yml` 和 `publish-article.yml`）
3. 在倉庫的 **Actions** 標籤中查看工作流程日誌

### 文章未出現在網站上

**問題**：發布文章後，網站上沒有顯示新文章

**解決方案**：
1. 檢查 `posts-db.json` 是否正確更新
   ```bash
   git log --oneline -- client/public/posts-db.json
   ```
2. 確認 GitHub Pages 部署已完成
   - 進入倉庫 → **Actions** → 查看最新的部署日誌
3. 清除瀏覽器快取並重新加載
   - 使用 `Ctrl+Shift+Delete`（Windows）或 `Cmd+Shift+Delete`（Mac）

### 樣式未正確應用

**問題**：頁面顯示但樣式混亂或缺失

**解決方案**：
1. 重新構建項目：
   ```bash
   pnpm build
   ```
2. 檢查 Tailwind CSS 配置：
   ```bash
   cat tailwind.config.ts
   ```
3. 清除 `.next` 或 `dist` 目錄並重新構建

### 地圖未加載

**問題**：地圖頁面顯示為空白

**解決方案**：
1. 檢查瀏覽器控制台是否有錯誤信息
2. 確認 Leaflet.js 和相關依賴已安裝：
   ```bash
   pnpm add leaflet leaflet-gpx
   ```
3. 檢查 `client/src/components/LeafletMap.tsx` 中的地圖初始化代碼

## 性能優化

### 圖片優化

1. **使用圖片 CDN**：
   - 使用 Cloudinary、Imgix 或其他 CDN 服務
   - 在 `posts-db.json` 中使用 CDN URL

2. **本地圖片託管**：
   - 將圖片放在 `client/public/images/` 目錄
   - 使用相對路徑引用

### 構建優化

```bash
# 分析構建大小
pnpm build --analyze

# 啟用生產優化
pnpm build --mode production
```

## 安全建議

1. **Personal Access Token**
   - 定期更新 Token
   - 使用最小必要的權限
   - 不要在代碼中硬編碼 Token

2. **數據隱私**
   - 不要在文章中發布敏感信息
   - 定期備份 `posts-db.json`

3. **備份策略**
   - 定期備份 GitHub 倉庫
   - 使用 Git 分支進行版本控制

## 常見問題

### Q: 如何更改網站域名？

A: 在 GitHub Pages 設定中配置自定義域名：
1. 進入倉庫設定 → **Pages**
2. 在 **Custom domain** 中輸入您的域名
3. 在域名提供商處配置 DNS 記錄

### Q: 如何添加自定義 CSS？

A: 編輯 `client/src/index.css` 並添加自定義樣式：
```css
@layer components {
  .custom-class {
    /* 您的樣式 */
  }
}
```

### Q: 如何支援多語言？

A: 當前版本使用繁體中文。要添加多語言支援：
1. 在 `client/src/contexts/` 中創建語言上下文
2. 在頁面中使用語言切換器
3. 在 `posts-db.json` 中為每篇文章添加多語言版本

## 技術支援

如遇到問題，請：

1. 檢查 GitHub Issues 是否有相同問題
2. 查看 GitHub Actions 日誌以了解部署錯誤
3. 在瀏覽器控制台檢查 JavaScript 錯誤
4. 提交新的 Issue 並提供詳細信息

## 許可證

本專案採用 MIT License。詳見 [LICENSE](LICENSE) 文件。

---

**祝您創作愉快！** 🌍✈️📸

