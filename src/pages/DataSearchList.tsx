import { 
  Search, 
  Filter, 
  Database, 
  FileText, 
  Globe, 
  Download, 
  Eye, 
  Calendar, 
  Tag, 
  ChevronRight, 
  LayoutGrid, 
  List, 
  ArrowRight,
  Info,
  X,
  CheckCircle2,
  Clock,
  TrendingUp,
  MapPin,
  ShieldCheck,
  Zap,
  BarChart3,
  Leaf,
  Bus,
  Heart,
  Briefcase,
  AlertCircle
} from 'lucide-react';
import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';

interface DataItem {
  id: number;
  title: string;
  description: string;
  category: string;
  format: string;
  department: string;
  updatedAt: string;
  views: number;
  downloads: number;
  status: 'new' | 'updated' | 'popular' | 'none';
  tags: string[];
  updateCycle: string;
  regDate: string;
  accessStatus: '공개' | '신청 필요';
}

const mockData: DataItem[] = [
  {
    id: 1,
    title: '광명시 태양광 발전량 실시간 데이터',
    description: '광명시 전체 태양광 패널 발전량 5분 간격 집계 데이터입니다.',
    category: '에너지',
    format: 'JSON/CSV',
    department: '기후에너지과',
    updatedAt: '2026.03.25',
    views: 1240,
    downloads: 850,
    status: 'popular',
    tags: ['태양광', '에너지', '실시간'],
    updateCycle: '실시간',
    regDate: '26.03.07',
    accessStatus: '공개'
  },
  {
    id: 2,
    title: '전기버스 운행 경로 및 탑승 현황',
    description: '광명시 전기버스 수요 응답형 노선 탑승 이력 및 수요 분석 데이터입니다.',
    category: '모빌리티',
    format: 'CSV',
    department: '도시교통과',
    updatedAt: '2026.03.24',
    views: 980,
    downloads: 420,
    status: 'updated',
    tags: ['전기버스', '교통', '모빌리티'],
    updateCycle: '1일',
    regDate: '26.02.28',
    accessStatus: '공개'
  },
  {
    id: 3,
    title: 'IoT 그린배리어 PM2.5 측정 데이터',
    description: '광명시 내 IoT 센서를 통한 초미세먼지 실시간 측정 데이터입니다.',
    category: '안전',
    format: 'JSON',
    department: '환경관리과',
    updatedAt: '2026.02.20',
    views: 2100,
    downloads: 1500,
    status: 'none',
    tags: ['미세먼지', 'IoT', '안전'],
    updateCycle: '10분',
    regDate: '26.02.20',
    accessStatus: '신청 필요'
  },
  {
    id: 4,
    title: '탄소중립 포인트 시민 행동 데이터',
    description: '광명시민들의 탄소중립 실천 포인트 적립 및 활동 내역 통계 데이터입니다.',
    category: '통계',
    format: 'CSV/XLSX',
    department: '기후에너지과',
    updatedAt: '2026.02.15',
    views: 750,
    downloads: 310,
    status: 'new',
    tags: ['탄소중립', '시민행동', '통계'],
    updateCycle: '월간',
    regDate: '26.02.15',
    accessStatus: '공개'
  },
  {
    id: 5,
    title: '광명시 전기차 충전소 이용 현황',
    description: '관내 설치된 전기차 충전소의 위치 및 시간대별 이용률 데이터입니다.',
    category: '모빌리티',
    format: 'API/JSON',
    department: '도시교통과',
    updatedAt: '2026.02.10',
    views: 1560,
    downloads: 640,
    status: 'none',
    tags: ['전기차', '충전소', '모빌리티'],
    updateCycle: '1시간',
    regDate: '26.02.10',
    accessStatus: '공개'
  },
  {
    id: 6,
    title: '광명시 탄소 배출량 연간 통계',
    description: '부문별(산업·수송·가정·상업) 탄소 배출량 연간 집계 통계 데이터입니다.',
    category: '탄소',
    format: 'XLSX',
    department: '기후에너지과',
    updatedAt: '2026.01.10',
    views: 890,
    downloads: 504,
    status: 'none',
    tags: ['탄소배출', '통계', '환경'],
    updateCycle: '연간',
    regDate: '26.01.10',
    accessStatus: '공개'
  }
];

const categories = [
  { name: '전체', icon: <Database size={20} />, color: 'bg-slate-100 text-slate-600' },
  { name: '에너지', icon: <Zap size={20} />, color: 'bg-amber-100 text-amber-600' },
  { name: '모빌리티', icon: <Bus size={20} />, color: 'bg-blue-100 text-blue-600' },
  { name: '안전·환경', icon: <Leaf size={20} />, color: 'bg-emerald-100 text-emerald-600' },
  { name: '공개', icon: <Globe size={20} />, color: 'bg-green-100 text-green-600' },
  { name: '신청 필요', icon: <ShieldCheck size={20} />, color: 'bg-red-100 text-red-600' },
];

export default function DataSearchList() {
  useEffect(() => {
    document.title = "데이터 검색/조회 | 에코뷰";
  }, []);
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<DataItem | null>(null);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { '전체': mockData.length };
    mockData.forEach(item => {
      // Basic category count
      counts[item.category] = (counts[item.category] || 0) + 1;
      
      // Special categories logic
      if (item.accessStatus === '공개') counts['공개'] = (counts['공개'] || 0) + 1;
      if (item.accessStatus === '신청 필요') counts['신청 필요'] = (counts['신청 필요'] || 0) + 1;
      if (item.category === '안전' || item.category === '환경') {
        counts['안전·환경'] = (counts['안전·환경'] || 0) + 1;
      }
    });
    return counts;
  }, []);

  const filteredData = useMemo(() => {
    return mockData.filter(item => {
      let matchesCategory = true;
      if (selectedCategory === '공개' || selectedCategory === '신청 필요') {
        matchesCategory = item.accessStatus === selectedCategory;
      } else if (selectedCategory === '안전·환경') {
        matchesCategory = item.category === '안전' || item.category === '환경';
      } else if (selectedCategory !== '전체') {
        matchesCategory = item.category === selectedCategory;
      }
      
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case '에너지': return <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-700 text-[11px] font-bold rounded"><Zap size={10} /> 에너지</span>;
      case '모빌리티': return <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-[11px] font-bold rounded"><Bus size={10} /> 모빌리티</span>;
      case '안전': return <span className="inline-flex items-center gap-1 px-2 py-1 bg-pink-100 text-pink-700 text-[11px] font-bold rounded"><ShieldCheck size={10} /> 안전</span>;
      case '통계': return <span className="inline-flex items-center gap-1 px-2 py-1 bg-indigo-100 text-indigo-700 text-[11px] font-bold rounded"><BarChart3 size={10} /> 통계</span>;
      case '탄소': return <span className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-100 text-emerald-700 text-[11px] font-bold rounded"><Leaf size={10} /> 탄소</span>;
      default: return <span className="px-2 py-1 bg-gray-100 text-gray-600 text-[11px] font-bold rounded">{category}</span>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new': return <span className="px-2 py-0.5 bg-emerald-500 text-white text-[10px] font-black rounded uppercase tracking-widest">New</span>;
      case 'updated': return <span className="px-2 py-0.5 bg-emerald-600 text-white text-[10px] font-black rounded uppercase tracking-widest">Updated</span>;
      case 'popular': return <span className="px-2 py-0.5 bg-amber-500 text-white text-[10px] font-black rounded uppercase tracking-widest">Popular</span>;
      default: return null;
    }
  };

  const getAccessBadge = (status: string) => {
    if (status === '공개') {
      return <span className="px-2 py-1 bg-green-50 text-green-600 border border-green-100 text-[11px] font-bold rounded">공개</span>;
    }
    return <span className="px-2 py-1 bg-amber-50 text-amber-600 border border-amber-100 text-[11px] font-bold rounded">신청 필요</span>;
  };

  return (
    <div className="max-w-[1560px] mx-auto space-y-12 pb-20">
      {/* Section 1: Integrated Search & Stats */}
      <section 
        className="rounded-[16px] p-8 sm:p-16 relative overflow-hidden shadow-sm"
        style={{
          background: 'linear-gradient(135deg, var(--color-primary-subtle) 0%, var(--color-primary-muted) 100%)'
        }}
      >
        <div className="absolute top-0 right-0 w-full h-full opacity-20 pointer-events-none">
          <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-white rounded-full blur-[120px]" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-10">
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
              className="inline-flex items-center gap-2 bg-white/40 text-emerald-700 px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase backdrop-blur-sm"
            >
              <Zap size={14} /> Gwangmyeong Open Data Portal
            </motion.div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-slate-900">
              원하는 데이터를 <br className="sm:hidden" /> 쉽고 빠르게 찾아보세요
            </h2>
          </div>

          <div className="relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-600 transition-colors" size={24} />
            <input 
              type="text" 
              placeholder="데이터 명칭, 키워드, 부서명을 입력하세요..."
              className="w-full pl-16 pr-6 py-6 bg-white/60 backdrop-blur-xl border border-white/40 rounded-[32px] text-xl font-medium focus:outline-none focus:ring-4 focus:ring-[var(--color-primary-border)]/20 focus:border-[var(--color-primary-border)]/50 transition-all placeholder:text-slate-400 text-slate-900"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:flex gap-2">
              <span className="px-3 py-1 bg-slate-900/5 rounded-lg text-[10px] font-bold text-slate-500 border border-slate-900/5">K</span>
              <span className="px-3 py-1 bg-slate-900/5 rounded-lg text-[10px] font-bold text-slate-500 border border-slate-900/5">Enter</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <span className="text-slate-600 text-sm font-bold mr-2">인기 검색어:</span>
            {['#미세먼지', '#CCTV', '#주차장', '#인구통계', '#공공와이파이'].map(tag => (
              <button 
                key={tag}
                onClick={() => setSearchQuery(tag.replace('#', ''))}
                className="text-sm font-medium text-slate-700 hover:text-emerald-700 transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-8 pt-8 border-t border-slate-900/10">
            <div className="text-center">
              <p className="text-slate-600 text-[10px] font-black uppercase tracking-widest mb-1">Total Data</p>
              <p className="text-2xl font-black font-mono tracking-tighter text-slate-900">1,248</p>
            </div>
            <div className="text-center">
              <p className="text-slate-600 text-[10px] font-black uppercase tracking-widest mb-1">New Today</p>
              <p className="text-2xl font-black font-mono tracking-tighter text-emerald-700">+12</p>
            </div>
            <div className="text-center">
              <p className="text-slate-600 text-[10px] font-black uppercase tracking-widest mb-1">API Services</p>
              <p className="text-2xl font-black font-mono tracking-tighter text-emerald-700">342</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Category Navigation (Restored Design) */}
      <section className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
        {categories.map((cat) => (
          <button
            key={cat.name}
            aria-label={`${cat.name} 카테고리 필터`}
            onClick={() => setSelectedCategory(cat.name)}
            className={`flex flex-col items-center justify-center p-6 rounded-[16px] border transition-all duration-300 group ${
              selectedCategory === cat.name 
                ? 'bg-white border-[var(--color-primary-border)] shadow-xl shadow-[var(--color-primary)]/10 -translate-y-1' 
                : 'bg-gray-50 border-line-normal hover:bg-white hover:border-line-normal'
            }`}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${
              selectedCategory === cat.name ? cat.color : 'bg-white text-slate-400'
            }`}>
              {cat.icon}
            </div>
            <div className="text-center">
              <p className={`text-sm font-black ${
                selectedCategory === cat.name ? 'text-slate-900' : 'text-slate-400'
              }`}>
                {cat.name}
              </p>
              <p className={`text-[10px] font-bold ${
                selectedCategory === cat.name ? 'text-emerald-600' : 'text-slate-300'
              }`}>
                {categoryCounts[cat.name] || 0}건
              </p>
            </div>
          </button>
        ))}
      </section>

      {/* Section 3: Filters & Data List (Restored Design) */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-line-neutral">
          <div className="flex items-center gap-4">
            <h3 className="text-xl font-black text-gray-900">데이터 목록</h3>
            <span className="text-sm font-bold text-gray-400">총 {filteredData.length}건</span>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            {/* Search Bar */}
            <div className="flex items-center gap-2 w-full sm:w-[300px]">
              <div className="relative flex-grow">
                <input 
                  type="text" 
                  placeholder="데이터셋 검색..."
                  className="w-full pl-4 pr-4 py-2.5 bg-white border border-line-normal rounded-[16px] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-border)]/20 focus:border-[var(--color-primary-border)]/50 transition-all placeholder:text-gray-400 text-gray-900"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button className="px-6 py-2.5 bg-[var(--color-primary)] text-white rounded-[16px] font-black text-sm hover:bg-[var(--color-primary-hover)] transition-all flex-shrink-0">
                검색
              </button>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex bg-gray-100 p-1 rounded-xl">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-emerald-600' : 'text-gray-400'}`}
                >
                  <LayoutGrid size={18} />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-emerald-600' : 'text-gray-400'}`}
                >
                  <List size={18} />
                </button>
              </div>
              <select className="bg-gray-50 border border-line-normal rounded-xl px-4 py-2.5 text-sm font-bold text-gray-600 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-border)]/20">
                <option>최신순</option>
                <option>조회순</option>
                <option>다운로드순</option>
                <option>가나다순</option>
              </select>
            </div>
          </div>
        </div>

        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' : 'space-y-4'}>
          <AnimatePresence mode="popLayout">
            {filteredData.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={() => setSelectedItem(item)}
                className={`group bg-white border border-line-normal rounded-[16px] overflow-hidden transition-all duration-500 cursor-pointer hover:shadow-2xl hover:border-[var(--color-primary-border)]/20 ${
                  viewMode === 'list' ? 'flex items-center p-6 gap-8' : 'p-8 space-y-6'
                }`}
              >
                {viewMode === 'list' && (
                  <div className="w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center text-slate-400 flex-shrink-0">
                    <Database size={24} />
                  </div>
                )}

                <div className="flex-grow space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      {getStatusBadge(item.status)}
                      <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">{item.category}</span>
                    </div>
                    <h4 className="text-lg font-black text-slate-900 group-hover:text-emerald-600 transition-colors leading-tight">
                      {item.title}
                    </h4>
                    {viewMode === 'grid' && (
                      <p className="text-slate-400 text-sm font-medium line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-gray-50 text-gray-500 text-[10px] font-bold rounded border border-line-normal">
                      포맷: {item.format}
                    </span>
                    <span className="px-2 py-1 bg-[var(--color-primary-subtle)] text-emerald-600 text-[10px] font-bold rounded border border-[var(--color-primary-border)]/20">
                      갱신주기: {item.updateCycle}
                    </span>
                    {getAccessBadge(item.accessStatus)}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-line-normal">
                    <div className="flex items-center gap-4 text-[11px] font-bold text-gray-400">
                      <span className="flex items-center gap-1"><Eye size={12} /> {item.views.toLocaleString()}</span>
                      <span className="flex items-center gap-1"><Download size={12} /> {item.downloads.toLocaleString()}</span>
                      <span className="flex items-center gap-1"><Clock size={12} /> {item.regDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-[11px] font-black text-slate-900 bg-slate-50 px-2 py-1 rounded">
                        {item.department}
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          if (item.accessStatus === '신청 필요') {
                            navigate('/data/list/download');
                          } else {
                            // Download logic
                          }
                        }}
                        className="px-3 py-1.5 bg-[var(--color-primary)] text-white rounded-lg text-[11px] font-black hover:bg-[var(--color-primary-hover)] transition-all shadow-sm"
                      >
                        {item.accessStatus === '공개' ? '다운로드' : '신청'}
                      </button>
                    </div>
                  </div>
                </div>
                
                {viewMode === 'list' && (
                  <div className="flex-shrink-0">
                    <ChevronRight className="text-gray-300 group-hover:text-emerald-500 transition-colors" size={24} />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredData.length === 0 && (
          <div className="py-32 text-center space-y-6">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-200">
              <AlertCircle size={48} />
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-black text-gray-900">검색 결과가 없습니다</p>
              <p className="text-gray-400 font-medium">다른 키워드로 검색하거나 필터를 조정해 보세요.</p>
            </div>
            <button 
              onClick={() => {setSearchQuery(''); setSelectedCategory('전체');}}
              className="px-8 py-3 bg-slate-900 text-white rounded-[16px] font-black text-sm hover:bg-slate-800 transition-all"
            >
              필터 초기화
            </button>
          </div>
        )}

        {/* Pagination Integration */}
        <div className="flex justify-center pt-8">
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-400 hover:text-emerald-500 transition-colors"><ChevronRight className="rotate-180" size={18} /></button>
            <button className="w-10 h-10 rounded-lg bg-emerald-500 text-white font-black text-sm">1</button>
            <button className="w-10 h-10 rounded-lg bg-white border border-line-normal text-slate-500 font-black text-sm hover:border-[var(--color-primary-border)] hover:text-[var(--color-primary-hover)] transition-all">2</button>
            <button className="w-10 h-10 rounded-lg bg-white border border-line-normal text-slate-500 font-black text-sm hover:border-[var(--color-primary-border)] hover:text-[var(--color-primary-hover)] transition-all">3</button>
            <button className="p-2 text-gray-400 hover:text-emerald-500 transition-colors"><ChevronRight size={18} /></button>
          </div>
        </div>
      </section>

      {/* Section 4: Popular Datasets (Bottom Highlight) */}
      <section className="space-y-8">
        <div className="flex items-center gap-4">
          <div className="px-3 py-1 bg-amber-100 text-amber-700 text-[10px] font-black rounded uppercase tracking-widest flex items-center gap-1">
            <TrendingUp size={12} /> Popular
          </div>
          <div>
            <h3 className="text-2xl font-black text-slate-900">인기 데이터셋</h3>
            <p className="text-slate-400 text-sm font-medium">이번 달 가장 많이 다운로드된 데이터</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: '태양광 발전량 실시간 통합 데이터', 
              desc: '광명시 전체 태양광 패널 발전량 5분 간격 집계 데이터', 
              count: '842회', 
              color: 'bg-amber-100', 
              icon: '☀️',
              cat: '에너지'
            },
            { 
              title: '전기버스 DRT 노선 수요 데이터', 
              desc: '광명시 전기버스 수요 응답형 노선 탑승 이력 및 수요 분석', 
              count: '618회', 
              color: 'bg-blue-100', 
              icon: '🚌',
              cat: '모빌리티'
            },
            { 
              title: '광명시 탄소 배출량 연간 통계', 
              desc: '부문별(산업·수송·가정·상업) 탄소 배출량 연간 집계 통계', 
              count: '504회', 
              color: 'bg-emerald-100', 
              icon: '🌿',
              cat: '탄소'
            }
          ].map((card, idx) => (
            <div key={idx} className="bg-white rounded-[16px] shadow-sm border border-line-normal overflow-hidden group hover:shadow-xl transition-all duration-500">
              <div className={`${card.color} h-40 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-500 relative`}>
                <span className="relative z-10">{card.icon}</span>
                <div className="absolute top-4 left-6">
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-white/60 backdrop-blur-sm text-slate-900 text-[10px] font-black rounded uppercase tracking-widest">
                    <Zap size={10} /> {card.cat}
                  </span>
                </div>
              </div>
              <div className="p-8 space-y-6">
                <div className="space-y-2">
                  <h4 className="text-lg font-black text-slate-900 leading-tight group-hover:text-emerald-600 transition-colors">{card.title}</h4>
                  <p className="text-slate-400 text-sm font-medium leading-relaxed">{card.desc}</p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-line-normal">
                  <span className="text-xs font-bold text-slate-400">이번 달 {card.count} 다운로드</span>
                  <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-xs font-black hover:bg-blue-100 transition-all">
                    다운로드
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 6: CTA Bottom */}
      <section className="bg-emerald-600 rounded-[16px] p-8 sm:p-16 text-white flex flex-col lg:flex-row items-center justify-between gap-12">
        <div className="space-y-4 text-center lg:text-left">
          <h3 className="text-3xl font-black tracking-tight">찾으시는 데이터가 없으신가요?</h3>
          <p className="text-emerald-100 text-lg font-medium">
            광명시에 필요한 데이터를 직접 신청해 주세요. <br className="hidden sm:block" />
            검토 후 신속하게 제공해 드리겠습니다.
          </p>
        </div>
        <Link 
          to="/data/list/request"
          className="w-full lg:w-auto bg-white text-emerald-600 font-black px-10 py-5 rounded-[16px] shadow-xl hover:bg-[var(--color-primary-subtle)] transition-all flex items-center justify-center gap-3"
        >
          신규 데이터 신청하기 <ArrowRight size={20} />
        </Link>
      </section>

      {/* Section 5: Quick Preview Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-[16px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-8 sm:p-12 overflow-y-auto space-y-10">
                <button 
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-8 right-8 p-2 text-gray-400 hover:text-gray-900 transition-colors"
                >
                  <X size={24} />
                </button>

                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    {getStatusBadge(selectedItem.status)}
                    <span className="text-xs font-black text-emerald-500 uppercase tracking-widest">{selectedItem.category}</span>
                  </div>
                  <h3 className="text-3xl font-black text-gray-900 leading-tight">{selectedItem.title}</h3>
                  <p className="text-gray-500 text-lg leading-relaxed font-medium">{selectedItem.description}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h5 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                      <Info size={16} className="text-emerald-500" /> 데이터 정보
                    </h5>
                    <div className="space-y-3 bg-gray-50 p-6 rounded-[16px] border border-line-normal">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400 font-bold">제공부서</span>
                        <span className="text-gray-900 font-black">{selectedItem.department}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400 font-bold">등록일</span>
                        <span className="text-gray-900 font-black">{selectedItem.regDate}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400 font-bold">갱신주기</span>
                        <span className="text-gray-900 font-black">{selectedItem.updateCycle}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400 font-bold">데이터 형식</span>
                        <span className="text-gray-900 font-black">{selectedItem.format}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400 font-bold">이용상태</span>
                        <span className="text-gray-900 font-black">{selectedItem.accessStatus}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h5 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                      <Tag size={16} className="text-emerald-500" /> 관련 태그
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {selectedItem.tags.map(tag => (
                        <span key={tag} className="px-4 py-2 bg-white border border-line-normal rounded-[16px] text-xs font-bold text-gray-600">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h5 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                    <BarChart3 size={16} className="text-emerald-500" /> 데이터 샘플 (미리보기)
                  </h5>
                  <div className="overflow-x-auto rounded-[16px] border border-line-normal">
                    <table className="w-full text-sm text-left">
                      <thead className="bg-gray-50 text-gray-400 font-bold uppercase text-[10px] tracking-widest">
                        <tr>
                          <th className="px-6 py-4">ID</th>
                          <th className="px-6 py-4">지점명</th>
                          <th className="px-6 py-4">측정값</th>
                          <th className="px-6 py-4">상태</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-line-neutral font-medium text-gray-600">
                        {[1, 2, 3].map(i => (
                          <tr key={i}>
                            <td className="px-6 py-4 font-mono">000{i}</td>
                            <td className="px-6 py-4">광명사거리역 {i}번출구</td>
                            <td className="px-6 py-4 font-mono">24.5</td>
                            <td className="px-6 py-4"><span className="text-emerald-500">정상</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-gray-50 border-t border-line-normal flex flex-col sm:flex-row gap-4">
                <button className="flex-grow py-4 bg-[var(--color-primary)] text-white rounded-[16px] font-black text-sm hover:bg-[var(--color-primary-hover)] transition-all shadow-lg shadow-[var(--color-primary)]/10 flex items-center justify-center gap-2">
                  <Download size={18} /> 데이터 다운로드
                </button>
                <Link 
                  to="/data/list/download"
                  className="flex-grow py-4 bg-slate-900 text-white rounded-[16px] font-black text-sm hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
                >
                  <Zap size={18} /> API 활용 신청
                </Link>
                <Link 
                  to="/data/list/detail"
                  className="px-8 py-4 bg-white border border-line-normal text-gray-600 rounded-[16px] font-black text-sm hover:bg-gray-50 transition-all flex items-center justify-center"
                >
                  상세보기
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
