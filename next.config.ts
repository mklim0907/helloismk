/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',          // 導出靜態檔案
  basePath: '/helloismk',    // 必須與你的 Repository 名稱一致
  images: {
    unoptimized: true,       // 靜態部署不支援圖片優化伺服器
  },
};

export default nextConfig;