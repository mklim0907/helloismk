"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function HighlightPage() {
  const [activeTab, setActiveTab] = useState('Portrait');

  const mainCategories = ['Portrait', 'Event', 'Landscape', 'Still Life'];
  
  // 模擬活動下的子分類數據結構
  const eventSubCats = ['Meichu Game', 'NTHU Marathon', 'Youth Festival'];

  return (
    <main className="min-h-screen bg-white text-black font-mono selection:bg-black selection:text-white">
      {/* 導航 */}
      <nav className="p-8 flex justify-between items-center sticky top-0 bg-white/80 backdrop-blur-sm z-10">
        <Link href="/" className="text-[10px] tracking-[0.4em] hover:line-through transition-all">
          ← RETURN_TO_ENTRY
        </Link>
        <div className="text-[10px] tracking-[0.2em] opacity-30">ARCHIVE_SYSTEM_V1</div>
      </nav>

      <div className="px-8 md:px-24 py-12">
        {/* 主標題 */}
        <h1 className="text-6xl font-extralight tracking-tighter mb-20 italic">SELECTED_WORKS_</h1>

        {/* 分類切換 (Tabs) */}
        <div className="flex flex-wrap gap-x-12 gap-y-6 mb-16 border-b border-gray-100 pb-6">
          {mainCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`text-xs tracking-widest uppercase transition-all ${
                activeTab === cat ? 'font-bold border-b-2 border-black pb-1' : 'opacity-30 hover:opacity-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 照片佔位區域 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {activeTab !== 'Event' ? (
            // 一般分類佈局
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="group">
                <div className="aspect-[3/4] bg-gray-50 border border-gray-100 flex items-center justify-center text-[10px] text-gray-300 italic group-hover:bg-gray-100 transition-colors">
                  [ PHOTO_PLACEHOLDER_{i+1} ]
                </div>
                <div className="mt-4 flex justify-between items-baseline opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[10px] font-bold tracking-tight">DATA_SET_{i+1}</span>
                  <span className="text-[9px] text-gray-400 font-mono">EXIF_PENDING</span>
                </div>
              </div>
            ))
          ) : (
            // 活動類 sub-category 佈局
            <div className="col-span-full space-y-32">
              {eventSubCats.map((sub) => (
                <section key={sub}>
                  <div className="flex items-baseline gap-4 mb-8">
                    <h2 className="text-xl font-medium tracking-tight uppercase">{sub}</h2>
                    <span className="text-[10px] text-blue-600 font-mono tracking-widest">// EVENT_RECORDS</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Array.from({ length: 4 }).map((_, j) => (
                      <div key={j} className="aspect-square bg-gray-50 border border-gray-100 flex items-center justify-center text-[8px] text-gray-300">
                        [ {sub}_IMG_{j} ]
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}