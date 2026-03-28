import { 
  Search, 
  Bell, 
  Calendar, 
  FileText, 
  Eye, 
  ChevronLeft, 
  ChevronRight,
  Filter,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function NoticeList() {
  const [activeTab, setActiveTab] = useState('notice');
  const [filter, setFilter] = useState('전체');

  const stats = [
    { label: '올해 공지사항', value: '48건', icon: <Bell size={20} />, color: 'text-rose-500', bg: 'bg-rose-50' },
    { label: '예정 행사', value: '12건', icon: <Calendar size={20} />, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { label: '보도자료', value: '24건', icon: <FileText size={20} />, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: '올해 누적 조회', value: '184,200회', icon: <Eye size={20} />, color: 'text-purple-500', bg: 'bg-purple-50' },
  ];

  const notices = [
    { id: 48, category: '공지', title: '제3기 리빙랩 참여자 모집 안내 (2026년 상반기)', date: '26.03.13', views: '1,248', color: 'bg-rose-100 text-rose-600' },
    { id: 47, category: '사업', title: '2026년 오픈랩 프로그램 운영 일정 공고', date: '26.03.10', views: '842', color: 'bg-emerald-100 text-emerald-600' },
    { id: 46, category: '데이터', title: '에너지·모빌리티 분야 신규 데이터 32건 등록 안내', date: '26.03.07', views: '620', color: 'bg-blue-100 text-blue-600' },
    { id: 45, category: '점검', title: '플랫폼 정기 점검 안내 (3월 20일 02:00~04:00)', date: '26.03.05', views: '408', color: 'bg-amber-100 text-amber-600' },
    { id: 44, category: '사업', title: '탄소중립 포인트 2기 지급 완료 안내', date: '26.03.01', views: '984', color: 'bg-emerald-100 text-emerald-600' },
    { id: 43, category: '공지', title: '에코뷰 회원가입 시 리빙랩 참여 우선권 부여 안내', date: '26.02.25', views: '1,082', color: 'bg-rose-100 text-rose-600' },
    { id: 42, category: '데이터', title: '오픈 API 서비스 신규 엔드포인트 추가 안내', date: '26.02.20', views: '524', color: 'bg-blue-100 text-blue-600' },
    { id: 41, category: '사업', title: '2025 리빙랩 2기 최종 성과 보고회 결과 공유', date: '26.02.15', views: '742', color: 'bg-emerald-100 text-emerald-600' },
  ];

  const events = [
    { title: '2026 광명시 탄소중립 시민포럼', date: '26.03.21(토) 14:00', location: '광명시청 대강당', status: 'D-7', statusColor: 'bg-rose-100 text-rose-600' },
    { title: '리빙랩 3기 온라인 설명회', date: '26.03.18(수) 19:00', location: '온라인 (Zoom)', status: 'D-4', statusColor: 'bg-rose-100 text-rose-600' },
    { title: '오픈랩 데모데이 & IR 행사', date: '26.03.28(금) 13:00', location: '광명시 창업지원센터', status: '예정', statusColor: 'bg-emerald-100 text-emerald-600' },
    { title: '스마트시티 시민 아카데미 4월반', date: '26.04.01~04.30', location: '광명시청 교육장', status: '모집 중', statusColor: 'bg-blue-100 text-blue-600' },
    { title: '도시데이터 활용 실무 워크숍', date: '26.04.10(금) 10:00', location: '광명시청 3층 회의실', status: '예정', statusColor: 'bg-emerald-100 text-emerald-600' },
  ];

  return (
    <div className="space-y-12 pb-20">
      {/* Tab Navigation */}
      <div className="flex justify-center">
        <div className="inline-flex p-1.5 bg-gray-100 rounded-2xl border border-line-normal">
          {[
            { id: 'notice', label: '공지사항' },
            { id: 'event', label: '행사·일정' },
            { id: 'press', label: '보도자료' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-12 py-3 rounded-xl text-sm font-black transition-all duration-300 ${
                activeTab === tab.id 
                  ? 'bg-white text-primary shadow-sm border border-line-normal' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-8 rounded-[32px] border border-line-normal shadow-sm flex items-center gap-6"
          >
            <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 mb-1">{stat.label}</p>
              <p className="text-2xl font-black text-gray-900">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content Area */}
      <AnimatePresence mode="wait">
        {activeTab === 'notice' && (
          <motion.div
            key="notice-list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1 h-6 bg-primary rounded-full" />
              <h2 className="text-2xl font-black text-gray-900">NOTICE 공지사항</h2>
            </div>

            {/* Filter & Search */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-6 rounded-[24px] border border-line-normal shadow-sm">
              <div className="flex flex-wrap gap-2">
                {['전체', '공지', '데이터', '사업', '점검'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                      filter === cat 
                        ? 'bg-primary text-white shadow-md' 
                        : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <div className="relative flex-1 max-w-md">
                <input 
                  type="text" 
                  placeholder="공지 검색..." 
                  className="w-full pl-6 pr-24 py-3 bg-gray-50 border border-line-normal rounded-full focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-medium"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-primary text-white text-sm font-black rounded-full hover:bg-primary transition-colors">
                  검색
                </button>
              </div>
            </div>

            {/* Notice Table */}
            <div className="bg-white rounded-[32px] border border-line-normal shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50/50 border-b border-line-neutral">
                      <th className="px-8 py-5 text-sm font-black text-gray-400">번호</th>
                      <th className="px-8 py-5 text-sm font-black text-gray-400">구분</th>
                      <th className="px-8 py-5 text-sm font-black text-gray-400">제목</th>
                      <th className="px-8 py-5 text-sm font-black text-gray-400 text-center">작성일</th>
                      <th className="px-8 py-5 text-sm font-black text-gray-400 text-center">조회</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line-neutral">
                    {notices.map((notice) => (
                      <tr key={notice.id} className="hover:bg-gray-50/50 transition-colors cursor-pointer group">
                        <td className="px-8 py-6 text-sm font-bold text-gray-400">{notice.id}</td>
                        <td className="px-8 py-6">
                          <span className={`px-3 py-1 rounded-md text-[11px] font-black ${notice.color}`}>
                            {notice.category}
                          </span>
                        </td>
                        <td className="px-8 py-6 text-sm font-bold text-gray-800 group-hover:text-primary transition-colors">
                          {notice.title}
                        </td>
                        <td className="px-8 py-6 text-sm font-medium text-gray-400 text-center">{notice.date}</td>
                        <td className="px-8 py-6 text-sm font-medium text-gray-400 text-center">{notice.views}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-2 mt-8">
              <button className="p-2 rounded-lg border border-line-normal text-gray-400 hover:text-primary hover:border-primary transition-all">
                <ChevronLeft size={20} />
              </button>
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  className={`w-10 h-10 rounded-xl text-sm font-black transition-all ${
                    n === 1 
                      ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                      : 'bg-white border border-line-normal text-gray-400 hover:text-primary hover:border-primary'
                  }`}
                >
                  {n}
                </button>
              ))}
              <button className="p-2 rounded-lg border border-line-normal text-gray-400 hover:text-primary hover:border-primary transition-all">
                <ChevronRight size={20} />
              </button>
            </div>
          </motion.div>
        )}

        {activeTab === 'event' && (
          <motion.div
            key="event-list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1 h-6 bg-amber-500 rounded-full" />
              <h2 className="text-2xl font-black text-gray-900">EVENT 행사 & 일정</h2>
            </div>

            <div className="bg-white rounded-[32px] border border-line-normal shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50/50 border-b border-line-neutral">
                      <th className="px-8 py-5 text-sm font-black text-gray-400">행사명</th>
                      <th className="px-8 py-5 text-sm font-black text-gray-400 text-center">일시</th>
                      <th className="px-8 py-5 text-sm font-black text-gray-400 text-center">장소</th>
                      <th className="px-8 py-5 text-sm font-black text-gray-400 text-center">구분</th>
                      <th className="px-8 py-5 text-sm font-black text-gray-400 text-center">신청</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line-neutral">
                    {events.map((event, idx) => (
                      <tr key={idx} className="hover:bg-gray-50/50 transition-colors cursor-pointer group">
                        <td className="px-8 py-6 text-sm font-bold text-gray-800 group-hover:text-primary transition-colors">
                          {event.title}
                        </td>
                        <td className="px-8 py-6 text-sm font-medium text-gray-500 text-center">{event.date}</td>
                        <td className="px-8 py-6 text-sm font-medium text-gray-500 text-center">{event.location}</td>
                        <td className="px-8 py-6 text-center">
                          <span className={`px-3 py-1 rounded-md text-[11px] font-black ${event.statusColor}`}>
                            {event.status}
                          </span>
                        </td>
                        <td className="px-8 py-6 text-center">
                          <button className="px-6 py-2 bg-primary text-white text-xs font-black rounded-lg hover:bg-primary transition-colors shadow-sm">
                            신청하기
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
