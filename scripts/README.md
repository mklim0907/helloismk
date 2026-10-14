# Highlights 相簿匯入

照片來源為 Google Drive 的 Highlight 資料夾。網站使用本機 WebP 圖片；訪客瀏覽時不需要登入 Drive，也不會呼叫 Drive API。

- `highlight-source.json`：相簿名稱、分類、資料夾 ID 與照片清單。
- `import-highlight.mjs`：匯入圖片、產生 640px 縮圖與最長邊 1800px 的放大圖片。
- `app/lib/albums.json`：匯入完成後產生的相簿與圖片尺寸資料。
- `public/images/highlight/`：網站使用的圖片，保留原始長寬比例。

Drive 原檔不會被移動、修改或刪除。圖片處理使用目前 Next.js 依賴中的 Sharp，不保留原始 EXIF。

## 更新相簿

這是一次性匯入，不會即時同步。需要更新時，可請 Codex 使用 Google Drive 技能重新讀取指定相簿，更新來源清單，再執行匯入。

匯入工具從 stdin 逐行接收短效下載參照陣列，每筆包含 `id` 和 `url`；最後輸入 `{"done":true}` 開始處理。短效下載 URL 僅經 stdin 傳入，不要存入檔案、Git 或網站程式碼。

工具會重用已存在的 WebP 圖片；若 Drive 替換了同 ID 照片，需要先移除該照片對應的 WebP 和縮圖再匯入。單次匯入有下載重試，全部成功後才更新相簿資料。

新增相簿會在下次 `npm run build` 時產生靜態頁面。GitHub Pages 上的版本仍需要完成 commit、push 與部署。
