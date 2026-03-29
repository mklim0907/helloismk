import Link from 'next/link'

export default function Home() {
  return (
    // 使用 h-screen 確保佔滿整個螢幕，flex 進行完美對齊
    <main className="h-screen bg-[#0a0a0a] flex flex-col justify-center items-center text-white font-mono selection:bg-white selection:text-black">
      
      {/* 頂部極簡標籤 */}
      <div className="absolute top-12 text-[10px] tracking-[0.5em] opacity-30 uppercase">
        LMK / Visual Archive / v1.0
      </div>

      {/* 核心雙按鈕入口 */}
      <div className="flex flex-col md:flex-row gap-20 md:gap-40 items-center">
        
        {/* HIGHLIGHT 入口 */}
        <Link href="/highlight" className="group flex flex-col items-center">
          <h1 className="text-5xl md:text-8xl font-extralight tracking-tighter transition-all duration-700 group-hover:italic group-hover:tracking-normal">
            HIGHLIGHT
          </h1>
          <p className="mt-4 text-[10px] text-gray-500 tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-all">
            [ 精選作品集 ]
          </p>
        </Link>

        {/* 垂直分割線 */}
        <div className="hidden md:block w-[1px] h-32 bg-white/10" />

        {/* ABOUT ME 入口 */}
        <Link href="/about" className="group flex flex-col items-center">
          <h1 className="text-5xl md:text-8xl font-extralight tracking-tighter transition-all duration-700 group-hover:italic group-hover:tracking-normal">
            ABOUT ME
          </h1>
          <p className="mt-4 text-[10px] text-gray-500 tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-all">
            [ 個人簡介與器材 ]
          </p>
        </Link>

      </div>

      {/* 底部邊緣小字 */}
      <footer className="absolute bottom-12 text-[10px] text-gray-600 tracking-widest uppercase">
        Focusing on Optics, Interaction, and Precision.
      </footer>
    </main>
  )
}