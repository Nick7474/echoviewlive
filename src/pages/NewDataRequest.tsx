import { useState } from 'react';
import { 
  PlusCircle, 
  Search, 
  Filter, 
  ChevronRight, 
  MessageSquare, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  ArrowRight,
  FileText,
  User,
  Calendar,
  Send
} from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';

interface RequestItem {
  id: number;
  title: string;
  description: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Reviewing';
  author: string;
  date: string;
  likes: number;
  comments: number;
}

const mockRequests: RequestItem[] = [
  {
    id: 1,
    title: '광명시 전기차 충전소 실시간 혼잡도 데이터 요청',
    description: '현재 광명시 내 설치된 전기차 충전소의 실시간 사용 여부와 대기 차량 정보를 API 형태로 제공받고 싶습니다. 전기차 이용자들의 편의를 위한 앱 개발에 활용할 예정입니다.',
    status: 'Reviewing',
    author: '김*현',
    date: '2024-03-20',
    likes: 24,
    comments: 5
  },
  {
    id: 2,
    title: '전통시장 유동인구 및 매출 통계 데이터',
    description: '광명전통시장의 요일별, 시간별 유동인구 변화와 업종별 매출 추이 데이터를 요청합니다. 소상공인 지원 정책 수립을 위한 분석 자료로 사용하고자 합니다.',
    status: 'Approved',
    author: '이*우',
    date: '2024-03-18',
    likes: 15,
    comments: 3
  },
  {
    id: 3,
    title: '광명시 자전거 도로 파손 신고 및 보수 이력',
    description: '시민들이 신고한 자전거 도로 파손 위치와 실제 보수가 완료된 이력 데이터를 지도로 시각화하고 싶습니다. 안전한 자전거 이용 환경 조성을 위해 필요합니다.',
    status: 'Pending',
    author: '박*아',
    date: '2024-03-15',
    likes: 8,
    comments: 2
  }
];

export default function NewDataRequest() {
  const shouldReduceMotion = useReducedMotion();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState('전체');

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Pending': return <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-[10px] font-black rounded uppercase tracking-widest flex items-center gap-1"><Clock size={10} /> 대기중</span>;
      case 'Reviewing': return <span className="px-2 py-0.5 bg-blue-100 text-blue-600 text-[10px] font-black rounded uppercase tracking-widest flex items-center gap-1"><AlertCircle size={10} /> 검토중</span>;
      case 'Approved': return <span className="px-2 py-0.5 bg-emerald-100 text-emerald-600 text-[10px] font-black rounded uppercase tracking-widest flex items-center gap-1"><CheckCircle2 size={10} /> 승인됨</span>;
      case 'Rejected': return <span className="px-2 py-0.5 bg-red-100 text-red-600 text-[10px] font-black rounded uppercase tracking-widest flex items-center gap-1"><XCircle size={10} /> 반려됨</span>;
      default: return null;
    }
  };

  return (
    <div className="max-w-[1560px] mx-auto space-y-12 pb-20">
      {/* Header Section */}
      <section className="bg-white rounded-[16px] p-8 sm:p-12 shadow-sm border border-line-normal flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-4 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 text-[10px] font-black rounded uppercase tracking-widest">
            <PlusCircle size={12} /> New Data Request
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
            신규 데이터 신청
          </h1>
          <p className="text-slate-500 text-lg font-medium max-w-2xl">
            찾으시는 데이터가 없으신가요? 광명시에 필요한 데이터를 직접 제안해 주세요. <br className="hidden lg:block" />
            시민 여러분의 소중한 의견을 바탕으로 새로운 데이터를 발굴하고 제공하겠습니다.
          </p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-10 py-5 bg-[var(--color-primary)] text-white rounded-[16px] font-black text-lg hover:bg-[var(--color-primary-hover)] transition-all shadow-xl shadow-[var(--color-primary)]/20 flex items-center gap-3"
        >
          데이터 신청하기 <PlusCircle size={24} />
        </button>
      </section>

      {/* Stats & Search */}
      <section className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white rounded-[16px] p-8 shadow-sm border border-line-normal space-y-6">
            <h3 className="text-lg font-black text-slate-900 uppercase tracking-widest">신청 현황</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-bold text-sm">전체 신청</span>
                <span className="text-slate-900 font-black">124건</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-emerald-500 font-bold text-sm">제공 완료</span>
                <span className="text-emerald-600 font-black">86건</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-blue-500 font-bold text-sm">검토 중</span>
                <span className="text-blue-600 font-black">18건</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300 font-bold text-sm">대기 중</span>
                <span className="text-slate-400 font-black">20건</span>
              </div>
            </div>
            <div className="pt-6 border-t border-line-normal">
              <p className="text-xs text-slate-400 font-medium leading-relaxed">
                * 신청하신 데이터는 담당 부서의 검토를 거쳐 제공 여부가 결정됩니다.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 space-y-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
              {['전체', '검토중', '승인됨', '대기중'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-6 py-2.5 rounded-full text-sm font-black transition-all whitespace-nowrap ${
                    filter === f 
                      ? 'bg-slate-900 text-white shadow-lg' 
                      : 'bg-white text-slate-500 border border-line-normal hover:border-slate-900 hover:text-slate-900'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
            <div className="relative w-full sm:w-[300px]">
              <input 
                type="text" 
                placeholder="신청 내역 검색..."
                className="w-full pl-12 pr-4 py-3 bg-white border border-line-normal rounded-[16px] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-border)]/20 focus:border-[var(--color-primary-border)]/50 transition-all"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>

          <div className="space-y-6">
            {mockRequests.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
                className="bg-white border border-line-normal rounded-[16px] p-8 space-y-6 hover:shadow-xl transition-all duration-500 group cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getStatusBadge(item.status)}
                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">No. {item.id}</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
                    <span className="flex items-center gap-1"><User size={14} /> {item.author}</span>
                    <span className="flex items-center gap-1"><Calendar size={14} /> {item.date}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xl font-black text-slate-900 group-hover:text-emerald-600 transition-colors leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 text-sm font-medium line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-line-normal">
                  <div className="flex items-center gap-6">
                    <button className="flex items-center gap-2 text-xs font-black text-slate-400 hover:text-emerald-500 transition-colors">
                      <MessageSquare size={16} /> 댓글 {item.comments}
                    </button>
                    <button className="flex items-center gap-2 text-xs font-black text-slate-400 hover:text-amber-500 transition-colors">
                      <PlusCircle size={16} /> 공감 {item.likes}
                    </button>
                  </div>
                  <button className="text-sm font-black text-slate-900 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    상세보기 <ChevronRight size={18} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center pt-8">
            <div className="flex items-center gap-2">
              <button className="p-2 text-gray-400 hover:text-emerald-500 transition-colors"><ChevronRight className="rotate-180" size={18} /></button>
              <button className="w-10 h-10 rounded-lg bg-emerald-500 text-white font-black text-sm">1</button>
              <button className="w-10 h-10 rounded-lg bg-white border border-line-normal text-slate-500 font-black text-sm hover:border-[var(--color-primary-border)] hover:text-[var(--color-primary-hover)] transition-all">2</button>
              <button className="w-10 h-10 rounded-lg bg-white border border-line-normal text-slate-500 font-black text-sm hover:border-[var(--color-primary-border)] hover:text-[var(--color-primary-hover)] transition-all">3</button>
              <button className="p-2 text-gray-400 hover:text-emerald-500 transition-colors"><ChevronRight size={18} /></button>
            </div>
          </div>
        </div>
      </section>

      {/* Request Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
              className="relative w-full max-w-2xl bg-white rounded-[16px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-8 sm:p-12 overflow-y-auto space-y-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-black text-slate-900">데이터 신청하기</h2>
                  <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-900 transition-colors"><PlusCircle className="rotate-45" size={24} /></button>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-black text-slate-900 flex items-center gap-2">
                      <FileText size={16} className="text-emerald-500" /> 신청 제목
                    </label>
                    <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-line-normal rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-border)]/20" placeholder="신청하시는 데이터의 제목을 입력하세요" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-black text-slate-900 flex items-center gap-2">
                      <MessageSquare size={16} className="text-emerald-500" /> 상세 내용 및 활용 목적
                    </label>
                    <textarea className="w-full h-[200px] px-4 py-3 bg-gray-50 border border-line-normal rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-border)]/20 resize-none" placeholder="어떤 데이터가 필요한지, 어떻게 활용하실 예정인지 상세히 작성해 주세요."></textarea>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-black text-slate-900 flex items-center gap-2">
                        <User size={16} className="text-emerald-500" /> 신청자
                      </label>
                      <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-line-normal rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-border)]/20" placeholder="성함" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-black text-slate-900 flex items-center gap-2">
                        <Filter size={16} className="text-emerald-500" /> 관련 분야
                      </label>
                      <select className="w-full px-4 py-3 bg-gray-50 border border-line-normal rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-border)]/20">
                        <option>전체</option>
                        <option>환경</option>
                        <option>교통</option>
                        <option>에너지</option>
                        <option>복지</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="flex-grow py-4 bg-white border border-line-normal text-slate-500 rounded-[16px] font-black text-base hover:bg-gray-50 transition-all"
                  >
                    취소
                  </button>
                  <button 
                    className="flex-grow py-4 bg-[var(--color-primary)] text-white rounded-[16px] font-black text-base hover:bg-[var(--color-primary-hover)] transition-all shadow-lg shadow-[var(--color-primary)]/20 flex items-center justify-center gap-2"
                  >
                    <Send size={20} /> 신청서 제출
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
