import { motion } from 'motion/react';
import { Heart, Search, Filter, ChevronRight, Share2, Trash2 } from 'lucide-react';

export default function MyInterests() {
  const interests = [
    { id: 1, title: '광명시 탄소중립 시민참여단 2기', date: '2024-03-20', type: '사업', category: '탄소중립' },
    { id: 2, title: '광명시 구름산 지구 스마트도시 구축 사업', date: '2024-03-18', type: '사업', category: '스마트도시' },
    { id: 3, title: '광명시 연도별 온실가스 배출량 데이터', date: '2024-03-15', type: '데이터', category: '환경' },
  ];

  return (
    <div className="max-w-[1200px] mx-auto space-y-8 pb-20">
      <header className="space-y-4">
        <h1 className="text-3xl font-black text-slate-900">관심사업 관리</h1>
        <p className="text-slate-500 font-medium text-lg">관심 등록하신 사업과 데이터를 모아보실 수 있습니다.</p>
      </header>

      <div className="bg-white rounded-[24px] shadow-sm border border-line-normal overflow-hidden">
        <div className="p-8 border-b border-line-neutral flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="검색어 입력..." 
                className="pl-12 pr-6 py-3 bg-slate-50 border border-line-normal rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            </div>
            <button className="p-3 bg-slate-50 text-slate-600 rounded-2xl hover:bg-slate-100 transition-all">
              <Filter size={20} />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-6 py-3 bg-slate-100 text-slate-600 rounded-2xl font-black text-sm hover:bg-slate-200 transition-all">
              선택 삭제
            </button>
          </div>
        </div>

        <div className="divide-y divide-line-neutral">
          {interests.map((item) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8 hover:bg-slate-50/50 transition-all group flex items-center justify-between"
            >
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center">
                  <Heart size={24} fill="currentColor" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[9px] font-black rounded uppercase tracking-widest">{item.type}</span>
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-500 text-[9px] font-black rounded uppercase tracking-widest">{item.category}</span>
                  </div>
                  <h3 className="text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors cursor-pointer">{item.title}</h3>
                  <p className="text-xs font-bold text-slate-400">등록일: {item.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button className="p-3 text-slate-300 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-all">
                  <Share2 size={20} />
                </button>
                <button className="p-3 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all">
                  <Trash2 size={20} />
                </button>
                <button className="p-3 text-slate-300 group-hover:text-blue-500 transition-all">
                  <ChevronRight size={24} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
