import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f9f9f9] text-[#1a1a1a] font-mono selection:bg-black selection:text-white p-8 md:p-24">
      <Link href="/" className="text-[10px] tracking-widest hover:line-through transition-all uppercase">
        ← ENTRY_LOG
      </Link>

      <div className="mt-20 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-20">
        
        {/* 左側：個人 Profile */}
        <div className="md:col-span-1">
          <div className="aspect-square bg-gray-200 rounded-full mb-10 overflow-hidden grayscale border border-gray-100">
            {/* 未來放置頭像 */}
            <div className="w-full h-full flex items-center justify-center text-gray-400 italic">[ PORTRAIT ]</div>
          </div>
          <h1 className="text-4xl font-extralight tracking-tighter mb-4">LIM Ming Kang <br /> 林明康</h1>
          <p className="text-xs text-gray-400 uppercase tracking-widest leading-relaxed">
            Student X Photographer <br />
            MY in TW <br />
            Based in Hsinchu/
          </p>
        </div>

        {/* 右側：詳細資訊與連結 */}
        <div className="md:col-span-2 space-y-20">
          
          {/* 目標敘述 */}
          <section>
            <h3 className="text-[10px] text-gray-300 uppercase tracking-[0.4em] mb-6 font-bold">// MISSION_STATEMENT</h3>
            <p className="text-lg leading-relaxed text-gray-600">
              紀錄美好生活
            </p>
          </section>

          {/* 器材清單 */}
          <section className="grid grid-cols-2 gap-8 border-y border-gray-100 py-12">
            <div>
              <h4 className="text-[10px] text-gray-300 uppercase tracking-widest mb-4">Core Gear</h4>
              <ul className="text-sm space-y-2">
                <li>Body: Nikon D750</li>
                <li>Lens: Tamron 70-200mm f/2.8 G2</li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] text-gray-300 uppercase tracking-widest mb-4">Optical Target</h4>
              <ul className="text-sm space-y-2 font-bold">
                <li>Graduation Season 2026</li>
                <li>Sports Documentary</li>
              </ul>
            </div>
          </section>

          {/* 外部驅動與連結 */}
          <section className="space-y-6">
            <h3 className="text-[10px] text-gray-300 uppercase tracking-[0.4em] mb-4 font-bold">// DATA_TRANSFER</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a href="#" className="p-6 border border-gray-200 hover:bg-black hover:text-white transition-all flex justify-between items-center group">
                <span className="text-sm">Instagram Archive</span>
                <span className="text-xs opacity-0 group-hover:opacity-100">→</span>
              </a>
              <a href="#" className="p-6 border border-gray-200 hover:bg-black hover:text-white transition-all flex justify-between items-center group text-blue-600">
                <span className="text-sm font-bold underline">Drive: Selection Folder</span>
                <span className="text-xs opacity-0 group-hover:opacity-100">→</span>
              </a>
              <a href="#" className="p-6 border border-gray-200 hover:bg-black hover:text-white transition-all flex justify-between items-center group">
                <span className="text-sm">Drive: Client Delivery</span>
                <span className="text-xs opacity-0 group-hover:opacity-100">→</span>
              </a>
            </div>
          </section>
        </div>
      </div>

      <footer className="mt-40 text-[10px] text-gray-300 font-mono text-center tracking-widest">
        SYSTEM_STATUS: ONLINE / BUFFERING_RESOURCES
      </footer>
    </main>
  );
}