import Link from 'next/link';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f9f9f9] text-[#1a1a1a] font-mono selection:bg-black selection:text-white p-8 md:p-24">
      {/* 頂部導航 */}
      <Link href="/" className="text-[10px] tracking-widest hover:line-through transition-all uppercase">
        ← ENTRY_LOG
      </Link>

      <div className="mt-20 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-20">
        
        {/* 左側：個人 Profile */}
        <div className="md:col-span-1">
          {/* 頭像區域：已整合 me.jpeg */}
          <div className="aspect-square mb-10 overflow-hidden rounded-full grayscale hover:grayscale-0 border border-gray-100 transition-all duration-500 shadow-inner bg-white relative">
            <Image 
              src="/helloismk/images/me.jpeg" 
              alt="LIM Ming Kang"
              fill
              className="object-cover"
              priority
            />
          </div>
          
          <h1 className="text-4xl font-extralight tracking-tighter mb-4 leading-tight">
            LIM Ming Kang <br /> 林明康
          </h1>
          <p className="text-xs text-gray-400 uppercase tracking-widest leading-relaxed">
            Student X Photographer <br />
            MY in TW <br />
            Based in Hsinchu / 新竹
          </p>
        </div>

        {/* 右側：詳細資訊與連結 */}
        <div className="md:col-span-2 space-y-20">
          
          {/* 目標敘述 */}
          <section>
            <h3 className="text-[10px] text-gray-300 uppercase tracking-[0.4em] mb-6 font-bold">// MISSION_STATEMENT</h3>
            <p className="text-xl leading-relaxed text-gray-600 font-light">
              紀錄美好生活。
            </p>
          </section>

          {/* 器材清單 */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 border-y border-gray-100 py-12">
            <div>
              <h4 className="text-[10px] text-gray-300 uppercase tracking-widest mb-4">Core Gear</h4>
              <ul className="text-sm space-y-2 text-gray-600">
                <li><span className="text-gray-300">Body //</span> Nikon D750</li>
                <li><span className="text-gray-300">Lens //</span> Tamron 70-200mm f/2.8 G2</li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] text-gray-300 uppercase tracking-widest mb-4">Interest</h4>
              <ul className="text-sm space-y-2 font-bold text-gray-700">
                <li>Landscape</li>
                <li>Travel</li>
                <li>Portrait</li>
                <li>Events</li>
                <li>Sports</li>
              </ul>
            </div>
          </section>

          {/* 外部驅動與連結 */}
          <section className="space-y-8">
            <div className="flex items-center gap-4">
              <h3 className="text-[10px] text-gray-400 uppercase tracking-[0.4em] font-bold">// CONNECT & LINK</h3>
              <div className="h-[1px] flex-1 bg-gray-100"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Instagram 連結 */}
              <a 
                href="https://www.instagram.com/mk_photobo0k/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group p-8 border border-gray-200 hover:border-black transition-all bg-white flex flex-col justify-between h-44"
              >
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-mono text-gray-400">01_SOCIAL_FEED</span>
                  <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                </div>
                <div>
                  <h4 className="text-xl font-light tracking-tight">Instagram Archive</h4>
                  <p className="text-[10px] text-gray-400 mt-2 font-mono">@mk_photobo0k / MOMENTS </p>
                </div>
              </a>

              {/* Highlight Drive 連結 */}
              <a 
                href="https://drive.google.com/drive/folders/1VCcUfUF6lWL-3kLS9kHXs6ay0GIQLDfy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group p-8 border border-gray-200 hover:border-black transition-all bg-white flex flex-col justify-between h-44"
              >
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-mono text-gray-400">02_CLOUD_DATABASE</span>
                  <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                </div>
                <div>
                  <h4 className="text-xl font-light tracking-tight text-blue-600">Drive: Highlight</h4>
                  <p className="text-[10px] text-gray-400 mt-2 font-mono">SELECTED_IMG</p>
                </div>
              </a>

              {/* 交圖 Drive 連結 */}
              <a 
                href="https://drive.google.com/drive/folders/1V2Tk7z0kePPO-WkjNA_vDAtt5P-QSH3T" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group p-8 border border-gray-200 hover:border-black transition-all bg-white flex flex-col justify-between h-44 col-span-1 md:col-span-2"
              >
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-mono text-gray-400">03_DELIVERY</span>
                  <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                </div>
                <div>
                  <h4 className="text-xl font-light tracking-tight">Client Access Portal</h4>
                  <p className="text-[10px] text-gray-400 mt-2 font-mono">DELIVERY_SYSTEM // 完成品</p>
                </div>
              </a>
            </div>
          </section>
        </div>
      </div>

      <footer className="mt-40 pb-12 text-[10px] text-gray-300 font-mono text-center tracking-[0.5em] uppercase">
        SYSTEM_STATUS: ONLINE / ALL_SYSTEMS_OPERATIONAL
      </footer>
    </main>
  );
}