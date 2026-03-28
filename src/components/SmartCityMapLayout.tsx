import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Video, ShieldCheck, Heart, Info, Search, Layers, Map as MapIcon, List, ChevronLeft, ChevronRight, Flame, Siren, Plus, Minus, Target } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SmartCityMapLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
  filterContent?: React.ReactNode;
  bottomContent?: React.ReactNode;
}

const MENU_ITEMS = [
  { icon: Video, title: 'CCTV', path: '/smart-city/map/cctv' },
  { icon: ShieldCheck, title: '안전 시설', path: '/smart-city/map/safety' },
  { icon: Heart, title: '편의 시설', path: '/smart-city/map/convenience' },
];

export default function SmartCityMapLayout({ children, title, description, filterContent, bottomContent }: SmartCityMapLayoutProps) {
  const location = useLocation();
  const [isFilterOpen, setIsFilterOpen] = useState(true);

  return (
    <div className="flex flex-col w-full bg-white pb-20">
      <div className="max-w-[1510px] mx-auto w-full px-4">
        {/* Title Section - Now above the map */}
        <div className="mb-8 pt-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
          <p className="text-gray-500">{description}</p>
        </div>

        {/* Map Container Section */}
        <div className="relative w-full h-[600px] border border-line-normal rounded-2xl overflow-hidden flex shadow-sm">
          {/* 1. Leftmost Icon Menu */}
          <aside className="w-[80px] bg-white border-r border-line-normal flex flex-col items-center py-6 z-30">
            <div className="flex flex-col gap-4 w-full px-2">
              {MENU_ITEMS.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl transition-all group border-2 ${
                      isActive 
                        ? 'bg-white border-primary text-primary shadow-sm' 
                        : 'bg-white border-transparent text-gray-400 hover:border-line-normal hover:text-primary'
                    }`}
                  >
                    <item.icon size={24} className={isActive ? 'text-primary' : 'group-hover:scale-110 transition-transform'} />
                    <span className={`text-[11px] font-bold text-center leading-tight ${isActive ? 'text-primary' : 'text-gray-500'}`}>
                      {item.title}
                    </span>
                  </Link>
                );
              })}
            </div>
            
            <div className="mt-auto flex flex-col gap-4 w-full px-2">
              <button className="flex flex-col items-center gap-1 p-3 text-gray-400 hover:text-primary transition-colors">
                <Info size={20} />
                <span className="text-[10px] font-medium">도움말</span>
              </button>
            </div>
          </aside>

          {/* 2. Filter/Detail Panel */}
          <AnimatePresence initial={false}>
            {isFilterOpen && (
              <motion.aside 
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 240, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                className="bg-white border-r border-line-normal z-20 overflow-hidden flex flex-col"
              >
                <div className="p-5 w-[240px]">
                  {filterContent || (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-wider">구분</h3>
                        <div className="space-y-3">
                          <label className="flex items-center justify-between group cursor-pointer">
                            <div className="flex items-center gap-2">
                              <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)]" />
                              <span className="text-[15px] font-medium text-gray-700 group-hover:text-[var(--color-primary)] transition-colors">화재</span>
                            </div>
                            <span className="text-[15px] font-bold text-red-500">0 <span className="text-gray-400 font-normal">건</span></span>
                          </label>
                          <label className="flex items-center justify-between group cursor-pointer">
                            <div className="flex items-center gap-2">
                              <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)]" />
                              <span className="text-[15px] font-medium text-gray-700 group-hover:text-[var(--color-primary)] transition-colors">구조</span>
                            </div>
                            <span className="text-[15px] font-bold text-[var(--color-primary)]">6 <span className="text-gray-400 font-normal">건</span></span>
                          </label>
                        </div>
                      </div>
                      
                      <div className="pt-6 border-t border-line-normal">
                        <h3 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-wider">시설</h3>
                        <div className="space-y-3">
                          {['소방시설', '의료시설', '경찰서'].map(facility => (
                            <label key={facility} className="flex items-center gap-2 group cursor-pointer">
                              <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" />
                              <span className="text-[15px] font-medium text-gray-700 group-hover:text-primary transition-colors">{facility}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Panel Toggle Button */}
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="absolute left-[80px] top-1/2 -translate-y-1/2 z-30 bg-white border border-line-normal w-6 h-12 flex items-center justify-center rounded-r-lg shadow-sm hover:bg-gray-50 transition-colors"
            style={{ left: isFilterOpen ? '320px' : '80px' }}
          >
            {isFilterOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
          </button>

          {/* 3. Main Map Area (Bottom Layer) */}
          <div className="flex-grow relative bg-gray-50 overflow-hidden">
            {/* The Actual Map Content (Lowest Z-index) */}
            <div className="absolute inset-0 z-0">
              {children}
            </div>

            {/* Floating Controls (Over Map) */}
            <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
              <div className="bg-white rounded-lg shadow-md border border-line-normal flex flex-col">
                <button className="p-2 hover:bg-gray-50 text-gray-600 border-b border-line-neutral"><Plus size={18} /></button>
                <button className="p-2 hover:bg-gray-50 text-gray-600"><Minus size={18} /></button>
              </div>
              <button className="bg-white p-2 rounded-lg shadow-md border border-line-normal text-gray-600 hover:bg-gray-50">
                <Target size={18} />
              </button>
            </div>

            {/* Bottom Status/Legend Bar (Over Map) */}
            <div className="absolute bottom-6 left-6 z-10">
              <div className="bg-white/95 backdrop-blur-sm px-6 py-3 rounded-full shadow-xl border border-white/50 flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white">
                    <Flame size={14} />
                  </div>
                  <span className="text-[13px] font-bold text-gray-700">화재</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-[var(--color-primary)] rounded-full flex items-center justify-center text-white">
                    <Siren size={14} />
                  </div>
                  <span className="text-[13px] font-bold text-gray-700">구조</span>
                  <span className="text-[13px] font-black text-[var(--color-primary)] ml-1">119</span>
                </div>
                <div className="h-4 w-px bg-gray-200" />
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    <ShieldCheck size={14} />
                  </div>
                  <span className="text-[13px] font-bold text-gray-700">소방시설</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-cyan-500/10 rounded-full flex items-center justify-center text-cyan-600">
                    <Heart size={14} />
                  </div>
                  <span className="text-[13px] font-bold text-gray-700">의료시설</span>
                  <span className="text-[13px] font-black text-cyan-600 ml-1">112</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
                    <ShieldCheck size={14} />
                  </div>
                  <span className="text-[13px] font-bold text-gray-700">경찰서</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Bottom Data Section (Tables & Charts) */}
        <div className="mt-12 w-full">
          {bottomContent}
        </div>
      </div>
    </div>
  );
}
