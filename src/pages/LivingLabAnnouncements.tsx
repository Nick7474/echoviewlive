import { 
  Search, 
  Zap, 
  Truck, 
  Heart, 
  Database, 
  Download, 
  PenTool,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal
} from 'lucide-react';
import { useState } from 'react';
import { motion } from 'motion/react';

interface Announcement {
  id: number;
  isNew?: boolean;
  title: string;
  category: '에너지' | '모빌리티' | '세이프티' | '데이터';
  period: string;
  capacity: string;
  status: '모집 중' | '검토 중' | '마감';
}

const ANNOUNCEMENTS: Announcement[] = [
  {
    id: 1,
    isNew: true,
    title: '우리 동네 에너지 절감 실증 — 태양광 발전 데이터 시민 모니터링단',
    category: '에너지',
    period: '26.03.01 ~ 03.31',
    capacity: '30명',
    status: '모집 중',
  },
  {
    id: 2,
    title: '전기버스 DRT 노선 시민 만족도 실증 및 개선 과제',
    category: '모빌리티',
    period: '26.02.15 ~ 03.20',
    capacity: '50명',
    status: '모집 중',
  },
  {
    id: 3,
    title: 'IoT 그린배리어 구역 주민 환경 모니터링 참여단',
    category: '세이프티',
    period: '26.02.01 ~ 03.15',
    capacity: '20명',
    status: '검토 중',
  },
  {
    id: 4,
    title: '탄소중립 포인트 실증 — 기후의병 연계 시민 행동 분석',
    category: '데이터',
    period: '26.01.15 ~ 02.28',
    capacity: '100명',
    status: '모집 중',
  },
  {
    id: 5,
    title: '친환경 배달문화 다회용기 확산 시민 실증단 (2차)',
    category: '모빌리티',
    period: '26.01.01 ~ 01.31',
    capacity: '80명',
    status: '마감',
  },
];

const CATEGORY_CONFIG = {
  '에너지': { color: 'bg-amber-500', icon: <Zap size={14} />, textColor: 'text-amber-600', bgColor: 'bg-amber-50' },
  '모빌리티': { color: 'bg-blue-500', icon: <Truck size={14} />, textColor: 'text-blue-600', bgColor: 'bg-blue-50' },
  '세이프티': { color: 'bg-pink-500', icon: <Heart size={14} />, textColor: 'text-pink-600', bgColor: 'bg-pink-50' },
  '데이터': { color: 'bg-purple-500', icon: <Database size={14} />, textColor: 'text-purple-600', bgColor: 'bg-purple-50' },
};

export default function LivingLabAnnouncements() {
  const [activeTab, setActiveTab] = useState('전체');
  const [activeCategory, setActiveCategory] = useState('전체');

  const filteredAnnouncements = ANNOUNCEMENTS.filter(item => {
    const statusMatch = activeTab === '전체' || item.status === activeTab;
    const categoryMatch = activeCategory === '전체' || item.category === activeCategory;
    return statusMatch && categoryMatch;
  });

  return (
    <div className="space-y-8">
      {/* Header Area */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-secondary text-primary px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 uppercase tracking-wider">
            Announcement
          </div>
          <h3 className="text-2xl font-bold text-gray-900">공고 목록</h3>
        </div>
        <p className="text-gray-400 text-sm">현재 모집 중인 리빙랩 과제를 확인하고 신청하세요</p>
      </div>

      {/* Filter Area */}
      <div className="bg-white p-6 rounded-[24px] border border-line-normal shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-6">
          {/* Status Tabs */}
          <div className="flex border-b border-line-normal">
            {['전체', '모집 중', '검토 중', '완료'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-sm font-bold transition-all relative ${
                  activeTab === tab ? 'text-primary' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                )}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="flex-grow max-w-md flex items-center gap-2">
            <div className="relative flex-grow">
              <input 
                type="text" 
                placeholder="과제명, 키워드 검색" 
                className="w-full pl-4 pr-10 py-2.5 bg-gray-50 border border-line-normal rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            </div>
            <button className="bg-primary hover:bg-primary text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-sm">
              검색
            </button>
          </div>
        </div>

        {/* Category Tags */}
        <div className="flex flex-wrap items-center gap-2">
          {['전체', '에너지', '모빌리티', '세이프티', '데이터'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all flex items-center gap-1.5 ${
                activeCategory === cat 
                  ? 'bg-primary border-primary text-white shadow-md' 
                  : 'bg-white border-line-normal text-gray-500 hover:border-primary hover:text-primary'
              }`}
            >
              {cat !== '전체' && CATEGORY_CONFIG[cat as keyof typeof CATEGORY_CONFIG].icon}
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* List Table */}
      <div className="bg-white rounded-[24px] border border-line-normal shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-line-normal">
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">공고 제목</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">마일 분야</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">신청기간</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">모집인원</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">상태</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">신청</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {filteredAnnouncements.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/30 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      {item.isNew && (
                        <span className="bg-red-50 text-red-500 text-[10px] font-black px-1.5 py-0.5 rounded border border-red-100 uppercase">New</span>
                      )}
                      <span className="text-sm font-bold text-gray-700 group-hover:text-primary transition-colors cursor-pointer">{item.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex justify-center">
                      <div className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-bold ${CATEGORY_CONFIG[item.category].bgColor} ${CATEGORY_CONFIG[item.category].textColor}`}>
                        {CATEGORY_CONFIG[item.category].icon}
                        {item.category}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-center text-sm text-gray-500 font-medium">{item.period}</td>
                  <td className="px-6 py-5 text-center text-sm text-gray-500 font-medium">{item.capacity}</td>
                  <td className="px-6 py-5 text-center">
                    <span className={`text-xs font-bold ${
                      item.status === '모집 중' ? 'text-primary' : 
                      item.status === '검토 중' ? 'text-amber-500' : 'text-gray-400'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-center">
                    {item.status === '모집 중' ? (
                      <button className="bg-primary hover:bg-primary text-white px-5 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm">
                        신청하기
                      </button>
                    ) : item.status === '검토 중' ? (
                      <button className="border border-primary text-primary hover:bg-primary hover:text-white px-5 py-1.5 rounded-lg text-xs font-bold transition-all">
                        결과 대기
                      </button>
                    ) : (
                      <button className="bg-gray-100 text-gray-400 px-5 py-1.5 rounded-lg text-xs font-bold cursor-not-allowed">
                        마감됨
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-6 border-t border-line-normal flex items-center justify-center gap-2">
          <button className="p-2 text-gray-400 hover:text-primary transition-colors"><ChevronLeft size={18} /></button>
          <button className="w-8 h-8 rounded-lg bg-primary text-white text-sm font-bold shadow-md">1</button>
          <button className="w-8 h-8 rounded-lg hover:bg-gray-100 text-gray-500 text-sm font-bold transition-colors">2</button>
          <button className="w-8 h-8 rounded-lg hover:bg-gray-100 text-gray-500 text-sm font-bold transition-colors">3</button>
          <button className="p-2 text-gray-400 hover:text-primary transition-colors"><ChevronRight size={18} /></button>
        </div>
      </div>

      {/* Bottom CTA Banner */}
      <section className="bg-[var(--color-primary-subtle)]/50 rounded-[32px] p-8 sm:p-10 border border-[var(--color-primary-border)]/20 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
        <div className="flex items-center gap-6 text-left">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg flex-shrink-0">
            <PenTool size={32} />
          </div>
          <div>
            <h4 className="text-xl font-bold text-gray-900 mb-2">리빙랩 주제를 직접 제안해 보세요!</h4>
            <p className="text-sm text-gray-500 leading-relaxed">
              광명시에서 해결하고 싶은 도시 문제나 아이디어가 있으신가요?<br />
              시민이 제안한 주제가 실제 리빙랩 과제로 채택될 수 있습니다.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 w-full lg:w-auto">
          <button className="flex-grow lg:flex-none bg-primary hover:bg-primary text-white px-8 py-3.5 rounded-xl font-bold text-sm transition-all shadow-lg flex items-center justify-center gap-2">
            <PenTool size={16} /> 주제 제안하기
          </button>
          <button className="flex-grow lg:flex-none bg-white border border-primary text-primary hover:bg-primary/5 px-8 py-3.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2">
            <Download size={16} /> 제안 양식 다운로드
          </button>
        </div>
      </section>
    </div>
  );
}
