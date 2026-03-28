import { 
  Search, 
  Rocket, 
  Monitor, 
  Cpu, 
  Database, 
  Download, 
  PenTool,
  ChevronLeft,
  ChevronRight,
  Briefcase,
  Zap,
  Activity,
  Lightbulb,
  ArrowRight
} from 'lucide-react';
import { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

interface Announcement {
  id: number;
  isNew?: boolean;
  title: string;
  category: '데이터 분석' | 'PoC 실증' | '아이디어 챌린지' | '취창업 지원';
  period: string;
  capacity: string;
  status: '모집 중' | '검토 중' | '마감';
}

const ANNOUNCEMENTS: Announcement[] = [
  {
    id: 1,
    isNew: true,
    title: '2026 제1기 오픈랩 데이터 분석 챌린지 — 탄소중립 도시 모델 발굴',
    category: '데이터 분석',
    period: '26.03.10 ~ 04.10',
    capacity: '10팀',
    status: '모집 중',
  },
  {
    id: 2,
    title: '스마트 모빌리티 PoC 실증 지원 사업 — 자율주행 셔틀 데이터 연계',
    category: 'PoC 실증',
    period: '26.03.01 ~ 03.25',
    capacity: '3개사',
    status: '모집 중',
  },
  {
    id: 3,
    title: '광명시 공공데이터 활용 창업 아이디어 경진대회',
    category: '아이디어 챌린지',
    period: '26.02.20 ~ 03.15',
    capacity: '제한없음',
    status: '검토 중',
  },
  {
    id: 4,
    title: '데이터 사이언티스트 취업 연계 프로그램 (상반기)',
    category: '취창업 지원',
    period: '26.02.01 ~ 02.28',
    capacity: '20명',
    status: '마감',
  },
  {
    id: 5,
    title: '에너지 마일 데이터 기반 비즈니스 모델 PoC 2차 모집',
    category: 'PoC 실증',
    period: '26.01.15 ~ 02.10',
    capacity: '5개사',
    status: '마감',
  },
];

const CATEGORY_CONFIG = {
  '데이터 분석': { color: 'bg-sky-500', icon: <Database size={14} />, textColor: 'text-sky-600', bgColor: 'bg-sky-50' },
  'PoC 실증': { color: 'bg-blue-600', icon: <Rocket size={14} />, textColor: 'text-blue-700', bgColor: 'bg-blue-50' },
  '아이디어 챌린지': { color: 'bg-indigo-500', icon: <Zap size={14} />, textColor: 'text-indigo-600', bgColor: 'bg-indigo-50' },
  '취창업 지원': { color: 'bg-purple-500', icon: <Briefcase size={14} />, textColor: 'text-purple-600', bgColor: 'bg-purple-50' },
};

export default function OpenLabAnnouncements() {
  const [activeTab, setActiveTab] = useState('전체');
  const [activeCategory, setActiveCategory] = useState('전체');

  const filteredAnnouncements = ANNOUNCEMENTS.filter(item => {
    const statusMatch = activeTab === '전체' || item.status === activeTab;
    const categoryMatch = activeCategory === '전체' || item.category === activeCategory;
    return statusMatch && categoryMatch;
  });

  return (
    <div className="space-y-8 max-w-[1560px] mx-auto">
      {/* Header Area */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-sky-100 text-sky-600 px-3 py-1 rounded-full text-[10px] font-black flex items-center gap-1 uppercase tracking-wider">
            Open Lab Notice
          </div>
          <h3 className="text-3xl font-black text-gray-900 tracking-tight">오픈랩 공고 목록</h3>
        </div>
        <p className="text-gray-500 text-sm font-medium">데이터로 혁신을 만드는 오픈랩의 최신 공고를 확인하세요</p>
      </div>

      {/* Filter Area */}
      <div className="bg-white p-8 rounded-[32px] border border-line-normal shadow-sm space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-8">
          {/* Status Tabs */}
          <div className="flex border-b border-line-normal">
            {['전체', '모집 중', '검토 중', '마감'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-4 text-sm font-black transition-all relative ${
                  activeTab === tab ? 'text-sky-500' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div layoutId="activeTabOpen" className="absolute bottom-0 left-0 right-0 h-1 bg-sky-500 rounded-t-full" />
                )}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="flex-grow max-w-lg flex items-center gap-3">
            <div className="relative flex-grow">
              <input 
                type="text" 
                placeholder="공고명, 기술 키워드 검색" 
                className="w-full pl-5 pr-12 py-3.5 bg-gray-50 border border-line-normal rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all font-medium"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            </div>
            <button className="bg-[#0f2a4a] hover:bg-sky-900 text-white px-8 py-3.5 rounded-2xl font-black text-sm transition-all shadow-lg shadow-blue-900/10">
              검색
            </button>
          </div>
        </div>

        {/* Category Tags */}
        <div className="flex flex-wrap items-center gap-3">
          {['전체', '데이터 분석', 'PoC 실증', '아이디어 챌린지', '취창업 지원'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-xl text-xs font-black border transition-all flex items-center gap-2 ${
                activeCategory === cat 
                  ? 'bg-sky-500 border-sky-500 text-white shadow-lg shadow-sky-200' 
                  : 'bg-white border-line-normal text-gray-500 hover:border-sky-500 hover:text-sky-500'
              }`}
            >
              {cat !== '전체' && CATEGORY_CONFIG[cat as keyof typeof CATEGORY_CONFIG].icon}
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* List Table */}
      <div className="bg-white rounded-[32px] border border-line-normal shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-line-normal">
                <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">공고 제목</th>
                <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest text-center">분야</th>
                <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest text-center">신청기간</th>
                <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest text-center">모집규모</th>
                <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest text-center">상태</th>
                <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest text-center">신청</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {filteredAnnouncements.map((item) => (
                <tr key={item.id} className="hover:bg-sky-50/20 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      {item.isNew && (
                        <span className="bg-sky-500 text-white text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-tighter">New</span>
                      )}
                      <Link to="/openlab/suggestion" className="text-[15px] font-bold text-gray-800 group-hover:text-sky-500 transition-colors leading-tight">
                        {item.title}
                      </Link>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex justify-center">
                      <div className={`flex items-center gap-2 px-4 py-1.5 rounded-xl text-[11px] font-black ${CATEGORY_CONFIG[item.category].bgColor} ${CATEGORY_CONFIG[item.category].textColor}`}>
                        {CATEGORY_CONFIG[item.category].icon}
                        {item.category}
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center text-sm text-gray-500 font-bold">{item.period}</td>
                  <td className="px-8 py-6 text-center text-sm text-gray-500 font-bold">{item.capacity}</td>
                  <td className="px-8 py-6 text-center">
                    <span className={`text-xs font-black ${
                      item.status === '모집 중' ? 'text-sky-500' : 
                      item.status === '검토 중' ? 'text-blue-600' : 'text-gray-400'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-center">
                    {item.status === '모집 중' ? (
                      <Link to="/openlab/suggestion" className="inline-block bg-sky-500 hover:bg-sky-600 text-white px-6 py-2 rounded-xl text-xs font-black transition-all shadow-md shadow-sky-100">
                        신청하기
                      </Link>
                    ) : item.status === '검토 중' ? (
                      <Link to="/openlab/suggestion" className="inline-block border-2 border-sky-500 text-sky-500 hover:bg-sky-500 hover:text-white px-6 py-2 rounded-xl text-xs font-black transition-all">
                        결과 확인
                      </Link>
                    ) : (
                      <span className="inline-block bg-gray-100 text-gray-400 px-6 py-2 rounded-xl text-xs font-black cursor-not-allowed">
                        마감됨
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-8 border-t border-line-normal flex items-center justify-center gap-3">
          <button className="p-2.5 text-gray-400 hover:text-sky-500 transition-colors"><ChevronLeft size={20} /></button>
          <button className="w-10 h-10 rounded-xl bg-sky-500 text-white text-sm font-black shadow-lg shadow-sky-200">1</button>
          <button className="w-10 h-10 rounded-xl hover:bg-gray-100 text-gray-500 text-sm font-bold transition-colors">2</button>
          <button className="w-10 h-10 rounded-xl hover:bg-gray-100 text-gray-500 text-sm font-bold transition-colors">3</button>
          <button className="p-2.5 text-gray-400 hover:text-sky-500 transition-colors"><ChevronRight size={20} /></button>
        </div>
      </div>

      {/* Bottom CTA Banner */}
      <section className="bg-[#0f2a4a] rounded-[40px] p-10 sm:p-16 text-white relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-10">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-sky-400 rounded-full blur-[100px]" />
        </div>
        
        <div className="flex items-center gap-8 text-left relative z-10">
          <div className="w-20 h-20 bg-sky-500 rounded-[28px] flex items-center justify-center text-white shadow-2xl flex-shrink-0">
            <Lightbulb size={40} />
          </div>
          <div>
            <h4 className="text-2xl font-black mb-3">새로운 오픈랩 주제를 제안해 주세요!</h4>
            <p className="text-sky-100/70 text-base font-medium leading-relaxed">
              광명시의 데이터를 활용한 혁신적인 비즈니스 모델이나<br />
              실증이 필요한 기술 아이디어가 있다면 언제든 환영합니다.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 w-full lg:w-auto relative z-10">
          <Link to="/openlab/suggestion" className="flex-grow lg:flex-none bg-sky-500 hover:bg-sky-600 text-white px-10 py-4.5 rounded-2xl font-black text-base transition-all shadow-xl shadow-sky-900/20 flex items-center justify-center gap-3 group">
            <PenTool size={20} /> 주제 제안하기 <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <button className="flex-grow lg:flex-none bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 px-10 py-4.5 rounded-2xl font-black text-base transition-all flex items-center justify-center gap-3">
            <Download size={20} /> 가이드 다운로드
          </button>
        </div>
      </section>
    </div>
  );
}
