import { 
  Search, 
  Filter, 
  Calendar, 
  MapPin, 
  Users, 
  ChevronRight,
  GraduationCap,
  BookOpen,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';

interface EducationItem {
  id: number;
  title: string;
  status: 'recruiting' | 'upcoming' | 'completed';
  type: '입문' | '중급' | '심화' | '특강';
  target: string;
  period: string;
  location: string;
  capacity: string;
  image: string;
}

const educationData: EducationItem[] = [
  {
    id: 1,
    title: '2026 상반기 데이터 시각화 및 분석 중급 과정',
    status: 'recruiting',
    type: '중급',
    target: '데이터 기초 지식이 있는 광명 시민',
    period: '2026.06.15 ~ 2026.07.20',
    location: '광명시 스마트도시 교육장',
    capacity: '20명',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 2,
    title: '우리 동네 데이터 읽기: 리터러시 입문 3기',
    status: 'recruiting',
    type: '입문',
    target: '데이터에 관심 있는 광명 시민 누구나',
    period: '2026.06.20 ~ 2026.07.15',
    location: '온라인 (Zoom)',
    capacity: '50명',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 3,
    title: '시민과학자 양성 심화 과정 (리빙랩 연계)',
    status: 'upcoming',
    type: '심화',
    target: '데이터 활용 중급 수료자 및 활동 희망자',
    period: '2026.09.01 ~ 2026.10.30',
    location: '광명시청 대회의실',
    capacity: '15명',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 4,
    title: '청소년 데이터 캠프: 우리 학교 데이터 분석하기',
    status: 'upcoming',
    type: '특강',
    target: '광명시 관내 중·고등학생',
    period: '2026.07.25 ~ 2026.07.27',
    location: '광명시 청소년 수련관',
    capacity: '30명',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 5,
    title: '2026 상반기 데이터 입문 과정 1기',
    status: 'completed',
    type: '입문',
    target: '데이터 초보 시민',
    period: '2026.03.10 ~ 2026.04.15',
    location: '광명시 평생학습원',
    capacity: '30명',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 6,
    title: '디지털 보안 및 데이터 윤리 특강',
    status: 'completed',
    type: '특강',
    target: '광명 시민 누구나',
    period: '2026.04.20 ~ 2026.04.21',
    location: '온라인 (Zoom)',
    capacity: '100명',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop'
  }
];

export default function CitizenEducationAnnouncements() {
  const [filter, setFilter] = useState<'all' | 'recruiting' | 'upcoming' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = educationData.filter(item => {
    const matchesFilter = filter === 'all' || item.status === filter;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'recruiting': return { label: '모집중', color: 'bg-emerald-500 text-white' };
      case 'upcoming': return { label: '예정', color: 'bg-blue-500 text-white' };
      case 'completed': return { label: '종료', color: 'bg-gray-400 text-white' };
      default: return { label: '', color: '' };
    }
  };

  return (
    <div className="max-w-[1560px] mx-auto space-y-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b border-line-normal">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <GraduationCap size={14} /> Education Programs
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">교육 공고 및 신청</h2>
          <p className="text-gray-500 font-medium text-lg">나에게 맞는 교육 과정을 찾고 시민과학자로 성장하세요.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative flex-grow sm:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="교육 과정 검색..."
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-line-normal rounded-2xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-border)]/20 focus:border-[var(--color-primary-border)] transition-all font-medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="bg-[#0f2a4a] text-white p-4 rounded-2xl hover:bg-slate-800 transition-colors">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'all', label: '전체보기' },
          { id: 'recruiting', label: '모집중' },
          { id: 'upcoming', label: '예정' },
          { id: 'completed', label: '종료' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id as any)}
            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
              filter === tab.id 
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' 
                : 'bg-white text-gray-400 border border-line-normal hover:bg-gray-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredData.map((item) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="group bg-white rounded-[32px] border border-line-normal overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className={`px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider shadow-lg ${getStatusLabel(item.status).color}`}>
                    {getStatusLabel(item.status).label}
                  </span>
                  <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md text-gray-900 rounded-full text-[11px] font-black uppercase tracking-wider shadow-lg">
                    {item.type}
                  </span>
                </div>
              </div>

              <div className="p-8 space-y-6">
                <div className="space-y-3">
                  <h4 className="text-xl font-black text-gray-900 leading-tight group-hover:text-emerald-600 transition-colors cursor-pointer">
                    {item.title}
                  </h4>
                  <div className="flex items-center gap-2 text-gray-400 text-sm font-bold">
                    <Users size={14} className="text-emerald-500" />
                    대상: {item.target}
                  </div>
                </div>

                <div className="space-y-3 pt-6 border-t border-line-normal">
                  <div className="flex items-center gap-3 text-gray-500 text-sm font-medium">
                    <Calendar size={16} className="text-gray-300" />
                    <span>{item.period}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-500 text-sm font-medium">
                    <MapPin size={16} className="text-gray-300" />
                    <span>{item.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-500 text-sm font-medium">
                    <BookOpen size={16} className="text-gray-300" />
                    <span>정원: {item.capacity}</span>
                  </div>
                </div>

                <div className="pt-4">
                  {item.status === 'recruiting' ? (
                    <Link 
                      to="/citizen-edu/announcements" 
                      className="flex items-center justify-center gap-2 w-full py-4 bg-[var(--color-primary)] text-white rounded-2xl font-black text-sm hover:bg-[var(--color-primary-hover)] transition-all shadow-lg shadow-[var(--color-primary)]/10"
                    >
                      교육 신청하기 <ChevronRight size={18} />
                    </Link>
                  ) : (
                    <button 
                      disabled
                      className="flex items-center justify-center gap-2 w-full py-4 bg-gray-100 text-gray-400 rounded-2xl font-black text-sm cursor-not-allowed"
                    >
                      {item.status === 'upcoming' ? '모집 예정' : '모집 종료'}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredData.length === 0 && (
        <div className="py-32 text-center space-y-4">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-300">
            <Search size={32} />
          </div>
          <div className="space-y-1">
            <p className="text-xl font-black text-gray-900">검색 결과가 없습니다</p>
            <p className="text-gray-400 font-medium">다른 검색어나 필터를 선택해 보세요.</p>
          </div>
        </div>
      )}

      {/* Info Box */}
      <div className="bg-slate-900 rounded-[40px] p-8 sm:p-12 text-white flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-500/20">
            <Clock size={32} />
          </div>
          <div className="space-y-1">
            <h5 className="text-xl font-black">교육 알림 서비스를 신청하세요!</h5>
            <p className="text-slate-400 font-medium">새로운 교육 과정이 등록되면 카카오톡으로 가장 먼저 알려드립니다.</p>
          </div>
        </div>
        <button className="w-full lg:w-auto px-8 py-4 bg-white text-slate-900 rounded-2xl font-black text-sm hover:bg-[var(--color-primary-subtle)] transition-all">
          알림 신청하기
        </button>
      </div>
    </div>
  );
}
