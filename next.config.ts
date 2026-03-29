/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',      // 強制導出為靜態 HTML/CSS/JS
  images: {
    unoptimized: true,   // GitHub Pages 不支援預設的圖片優化，必須關閉
  },
  // 如果你的 Repo 名字不是 <username>.github.io 而是 mk-web
  // 請取消下面這行的註解，並將路徑改為你的 Repo 名稱
  // basePath: '/mk-web', 
};

export default nextConfig;