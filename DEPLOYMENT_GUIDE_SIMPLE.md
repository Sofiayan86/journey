# 🌍 互動式旅行雜誌部落格 - 完整部署指南

**給完全不懂程式碼的人的簡單指南**

---

## 📋 目錄

1. [第一步：本地端設置](#第一步本地端設置)
2. [第二步：在本地測試網站](#第二步在本地測試網站)
3. [第三步：設置 GitHub 帳戶](#第三步設置-github-帳戶)
4. [第四步：部署到 GitHub Pages](#第四步部署到-github-pages)
5. [第五步：發布您的第一篇文章](#第五步發布您的第一篇文章)
6. [常見問題解決](#常見問題解決)

---

## 第一步：本地端設置

### 1.1 安裝必要的軟體

您需要安裝以下軟體（都是免費的）：

#### **Node.js**（包含 npm）

1. 訪問 https://nodejs.org/
2. 下載 **LTS（長期支持）版本**
3. 按照安裝嚮導完成安裝
4. 安裝完成後，打開命令行（Windows 用戶按 `Win+R` 輸入 `cmd`，Mac 用戶打開 Terminal）
5. 輸入以下命令驗證安裝：
   ```
   node --version
   npm --version
   ```
   如果顯示版本號，說明安裝成功 ✅

#### **Git**

1. 訪問 https://git-scm.com/
2. 下載適合您系統的版本
3. 按照安裝嚮導完成安裝
4. 驗證安裝：
   ```
   git --version
   ```

#### **代碼編輯器（推薦 VS Code）**

1. 訪問 https://code.visualstudio.com/
2. 下載並安裝
3. 安裝完成後打開

### 1.2 獲取專案文件

您有兩種方式獲取專案：

**方式 A：從我提供的文件（推薦新手）**

1. 我會為您提供一個 ZIP 文件
2. 解壓到您想要的位置（例如 `C:\Users\YourName\Documents\travel-blog`）
3. 記住這個文件夾的位置

**方式 B：從 GitHub 克隆（進階）**

1. 打開命令行
2. 進入您想要的文件夾
3. 輸入：
   ```
   git clone https://github.com/your-username/travel-magazine-blog.git
   cd travel-magazine-blog
   ```

### 1.3 安裝依賴

1. 打開命令行
2. 進入專案文件夾：
   ```
   cd 您的文件夾路徑
   ```
   例如：`cd C:\Users\YourName\Documents\travel-blog`

3. 輸入以下命令安裝依賴：
   ```
   npm install
   ```
   
   ⏳ 這可能需要 2-5 分鐘，請耐心等待。您會看到很多文字滾動，這是正常的。

4. 完成後，您應該看到類似的訊息：
   ```
   added XXX packages
   ```

---

## 第二步：在本地測試網站

### 2.1 啟動開發伺服器

1. 打開命令行，進入專案文件夾
2. 輸入以下命令：
   ```
   npm run dev
   ```

3. 您應該看到類似的訊息：
   ```
   ➜  Local:   http://localhost:3000/
   ➜  Network: http://169.254.0.21:3000/
   ```

4. 複製 `http://localhost:3000/` 這個地址

### 2.2 在瀏覽器中查看

1. 打開您的網頁瀏覽器（Chrome、Firefox、Safari 等）
2. 在地址欄貼上 `http://localhost:3000/`
3. 按 Enter
4. 您應該看到您的部落格首頁！ 🎉

### 2.3 測試各個頁面

點擊導覽列中的以下連結進行測試：

- **首頁** - 顯示最新的 3 篇文章
- **所有文章** - 顯示所有文章，支援按國家篩選
- **地圖** - 顯示所有文章的位置
- **關於我** - 關於頁面
- **後台管理** - 點擊導覽列中的「後台管理」連結

### 2.4 停止開發伺服器

按 `Ctrl+C`（Windows）或 `Cmd+C`（Mac）停止伺服器。

---

## 第三步：設置 GitHub 帳戶

### 3.1 創建 GitHub 帳戶

1. 訪問 https://github.com/
2. 點擊「Sign up」（註冊）
3. 填寫以下信息：
   - **Username**（用戶名）- 例如 `sofia-yan`
   - **Email**（郵箱）- 使用您的真實郵箱
   - **Password**（密碼）- 設置一個強密碼
4. 完成驗證和設置

### 3.2 創建新倉庫

1. 登入 GitHub
2. 點擊右上角的 **+** 圖標
3. 選擇 **New repository**（新建倉庫）
4. 填寫以下信息：
   - **Repository name**（倉庫名稱）：`travel-magazine-blog`
   - **Description**（描述）：`My personal travel magazine blog`
   - **Public**（公開）- 選擇此選項，這樣網站才能被公開訪問
5. 點擊 **Create repository**

### 3.3 生成 Personal Access Token

這是讓您的電腦能夠上傳文件到 GitHub 的密鑰。

1. 登入 GitHub
2. 點擊右上角的頭像
3. 選擇 **Settings**（設置）
4. 在左側邊欄選擇 **Developer settings**（開發者設置）
5. 選擇 **Personal access tokens** → **Tokens (classic)**
6. 點擊 **Generate new token** → **Generate new token (classic)**
7. 填寫以下信息：
   - **Note**（備註）：`Travel Blog Deployment`
   - **Expiration**（過期時間）：選擇 **90 days**（90 天）
8. 在 **Select scopes** 中勾選：
   - ✅ `repo`（完整倉庫訪問）
   - ✅ `workflow`（工作流程）
9. 點擊 **Generate token**
10. **重要**：複製顯示的 Token，保存到安全的地方（例如記事本）
    - ⚠️ 這個 Token 只會顯示一次，如果丟失需要重新生成

---

## 第四步：部署到 GitHub Pages

### 4.1 上傳專案到 GitHub

1. 打開命令行，進入專案文件夾
2. 輸入以下命令（逐行輸入）：

```bash
# 初始化 Git（如果還沒有的話）
git init

# 添加所有文件
git add .

# 提交更改
git commit -m "Initial commit: Travel magazine blog"

# 添加遠程倉庫（替換 YOUR_USERNAME）
git remote add origin https://github.com/YOUR_USERNAME/travel-magazine-blog.git

# 推送到 GitHub（首次需要輸入 GitHub 用戶名和 Token）
git branch -M main
git push -u origin main
```

**輸入認證信息：**
- **Username**：輸入您的 GitHub 用戶名
- **Password**：輸入您之前生成的 Personal Access Token（不是您的 GitHub 密碼！）

### 4.2 配置 GitHub Pages

1. 登入 GitHub
2. 進入您的倉庫（`travel-magazine-blog`）
3. 點擊 **Settings**（設置）
4. 在左側邊欄選擇 **Pages**
5. 在 **Source** 下拉菜單中選擇 **GitHub Actions**
6. 頁面會自動重新加載

### 4.3 等待部署完成

1. 點擊倉庫頂部的 **Actions**（操作）標籤
2. 您應該看到一個正在運行的工作流程
3. 等待它完成（通常需要 2-5 分鐘）
4. 完成後，您會看到一個綠色的 ✅ 標記

### 4.4 訪問您的網站

1. 回到 **Settings** → **Pages**
2. 您應該看到類似的訊息：
   ```
   Your site is published at https://your-username.github.io/travel-magazine-blog/
   ```
3. 點擊這個連結訪問您的網站！ 🎉

---

## 第五步：發布您的第一篇文章

### 5.1 訪問後台管理介面

1. 在您的網站上，點擊導覽列中的 **後台管理**
2. 或直接訪問：
   ```
   https://your-username.github.io/travel-magazine-blog/admin.html
   ```

### 5.2 設置管理員密碼

首次訪問時：

1. 輸入您想要的密碼（至少 6 個字符）
2. 點擊 **Login**
3. 密碼已設置！

### 5.3 填寫文章信息

在後台管理介面中，填寫以下信息：

**GitHub 配置**
- **GitHub Personal Access Token**：粘貼您之前生成的 Token
- **Repository**：`your-username/travel-magazine-blog`

**文章信息**
- **Article Title**：文章標題，例如「京都的隱藏寺廟」
- **Country**：選擇文章涉及的國家
- **Excerpt**：文章摘要（簡短描述）
- **Article Content**：文章內容
  - 使用 **Bold** 按鈕製作粗體
  - 使用 **Italic** 按鈕製作斜體
  - 使用 **Link** 按鈕添加超連結
- **Author**：自動填寫為 "Sofia Yan"（唯讀）
- **Publish Date**：選擇發布日期

**位置與媒體**
- **Latitude**：文章地點的緯度（例如 35.0116）
- **Longitude**：文章地點的經度（例如 135.7681）
  - 💡 提示：訪問 https://www.google.com/maps，搜索地點，右鍵點擊，複製坐標
- **Cover Image URL**：封面圖片的完整 URL
  - 可以使用免費圖片網站如 Unsplash、Pexels 等
- **GPX File Path**（可選）：如果有 GPX 軌跡文件，填寫路徑

### 5.4 發布文章

1. 檢查所有信息是否正確
2. 點擊 **Publish Article** 按鈕
3. 稍等片刻，您應該看到成功訊息
4. GitHub Actions 會自動：
   - 更新文章數據庫
   - 部署新版本網站
   - 在地圖上添加新標記

### 5.5 查看發布結果

1. 等待 GitHub Actions 完成（通常 2-5 分鐘）
2. 訪問您的網站首頁
3. 您應該看到新發布的文章！ 🎉

---

## 常見問題解決

### Q1：我忘記了管理員密碼怎麼辦？

**A：** 清除瀏覽器本地存儲：

1. 在 admin.html 頁面按 `F12` 打開開發者工具
2. 進入 **Application** 標籤
3. 點擊 **Local Storage**
4. 找到您的網站並刪除
5. 刷新頁面，重新設置密碼

### Q2：文章發布後沒有出現在網站上

**A：** 請檢查以下幾點：

1. 檢查 GitHub Actions 是否完成（進入倉庫 → Actions 標籤）
2. 確保 Personal Access Token 有效且有正確的權限
3. 檢查 Repository 名稱是否正確（格式：`username/travel-magazine-blog`）
4. 刷新網站頁面（按 `Ctrl+F5` 強制刷新）

### Q3：地圖上沒有顯示我的文章位置

**A：** 確保您在發布文章時填寫了：

- ✅ **Latitude**（緯度）
- ✅ **Longitude**（經度）

這兩個字段是必需的，地圖才能顯示您的文章位置。

### Q4：如何修改已發布的文章？

**A：** 目前需要通過以下方式：

1. 進入 GitHub 倉庫
2. 進入 `client/public` 文件夾
3. 打開 `posts-db.json` 文件
4. 找到您的文章並編輯
5. 提交更改（GitHub 會自動部署）

### Q5：如何添加自定義域名？

**A：** 例如將 `yourblog.com` 指向您的 GitHub Pages：

1. 進入倉庫 **Settings** → **Pages**
2. 在 **Custom domain** 中輸入您的域名
3. 按照 GitHub 的指示配置 DNS 設置

### Q6：我的網站速度很慢怎麼辦？

**A：** 可能是以下原因：

- 使用了過大的圖片（建議 < 1MB）
- 圖片 URL 來自慢速伺服器
- 使用了太多 GPX 軌跡文件

**解決方案：**
- 壓縮圖片（使用 TinyPNG 等工具）
- 使用 CDN 圖片服務（如 Cloudinary）
- 限制每頁加載的 GPX 文件數量

### Q7：如何備份我的文章？

**A：** 您的所有文章都保存在 GitHub 倉庫中：

1. 進入您的 GitHub 倉庫
2. 點擊 **Code** → **Download ZIP**
3. 保存到您的電腦

---

## 📱 後續步驟

### 自定義您的網站

編輯以下文件來自定義您的網站：

**1. 修改網站標題和描述**
- 文件：`client/src/pages/Home.tsx`
- 修改：`<h1>` 和 `<p>` 標籤中的文本

**2. 修改頁尾社群連結**
- 文件：`client/src/components/Footer.tsx`
- 修改：社群媒體連結

**3. 修改顏色和字體**
- 文件：`client/src/index.css`
- 修改：CSS 變數

### 添加 GPX 軌跡文件

1. 將您的 `.gpx` 文件放在 `client/public/gpx/` 文件夾中
2. 在發布文章時，填寫 **GPX File Path**：`/gpx/your-file.gpx`
3. 文章頁面會自動顯示互動式軌跡地圖

### 定期更新

1. 定期發布新文章
2. 定期備份您的倉庫
3. 定期檢查 GitHub 的安全警告

---

## 🎉 恭喜！

您已經成功部署了您的個人旅行雜誌部落格！

**下一步：**
- 📝 發布您的第一篇旅行文章
- 🗺️ 在地圖上標記您去過的地方
- 📸 添加精美的旅行照片
- 🌍 分享您的故事給世界

祝您創作愉快！✈️🌍📸

---

## 📞 需要幫助？

如果遇到問題：

1. 檢查本指南的「常見問題解決」部分
2. 查看 GitHub 倉庫的 README.md 文件
3. 在 GitHub Issues 中提出問題

---

**最後更新：2025 年 10 月 22 日**

