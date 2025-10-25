# 快速開始指南

## 5 分鐘內啟動您的旅行雜誌網站

### 1. 本地開發（2 分鐘）

```bash
# 安裝依賴
pnpm install

# 啟動開發伺服器
pnpm dev

# 打開 http://localhost:3000
```

### 2. 發布第一篇文章（3 分鐘）

#### 方法 A：使用後台管理介面（推薦）

1. 打開 `http://localhost:3000/admin.html`
2. 填寫文章信息：
   - **標題**：您的文章標題
   - **摘要**：簡短描述
   - **內容**：完整文章
   - **封面圖**：圖片 URL
   - **地點**：緯度和經度（可選）
3. 點擊「Publish Article」

#### 方法 B：直接編輯 posts-db.json

編輯 `client/public/posts-db.json`，添加：

```json
{
  "id": "my-first-article",
  "title": "我的第一篇旅行文章",
  "excerpt": "一個簡短的摘要",
  "content": "完整的文章內容",
  "coverImage": "https://example.com/image.jpg",
  "publishDate": "2024-10-20",
  "author": "您的名字",
  "category": "旅遊地點",
  "location": {
    "lat": 35.0116,
    "lng": 135.7681
  }
}
```

### 3. 部署到 GitHub Pages（5 分鐘）

```bash
# 1. 創建 GitHub 倉庫並推送代碼
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/travel-magazine-blog.git
git push -u origin main

# 2. 進入倉庫設定 → Pages
# 選擇 "GitHub Actions" 作為 Source

# 3. 完成！您的網站將在以下地址上線：
# https://YOUR_USERNAME.github.io/travel-magazine-blog/
```

## 常用命令

| 命令 | 說明 |
|------|------|
| `pnpm dev` | 啟動開發伺服器 |
| `pnpm build` | 構建生產版本 |
| `pnpm preview` | 預覽生產版本 |
| `pnpm type-check` | 檢查 TypeScript 類型 |

## 文件位置速查

| 功能 | 文件位置 |
|------|---------|
| 後台管理 | `client/public/admin.html` |
| 文章數據 | `client/public/posts-db.json` |
| 首頁 | `client/src/pages/Home.tsx` |
| 網站標題 | `client/src/const.ts` |
| 社群連結 | `client/src/components/Footer.tsx` |
| 色彩主題 | `client/src/index.css` |

## 自定義您的網站

### 更改網站標題

編輯 `client/src/const.ts`：
```typescript
export const APP_TITLE = "My Travel Blog";
```

### 更改社群媒體連結

編輯 `client/src/components/Footer.tsx` 中的 `socialLinks`

### 更改色彩

編輯 `client/src/index.css` 中的 CSS 變數

## 下一步

- 📖 閱讀 [完整部署指南](DEPLOYMENT_GUIDE.md)
- 🎨 自定義網站設計
- 📝 發布您的旅行故事
- 🗺️ 添加 GPX 軌跡地圖

## 需要幫助？

1. 檢查 [README.md](README.md) 了解更多信息
2. 查看 [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) 中的故障排除部分
3. 查看 GitHub Actions 日誌以了解部署錯誤

---

**祝您創作愉快！** 🌍✈️

