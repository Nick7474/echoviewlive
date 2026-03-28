import { useState } from 'react';
import { 
  BookOpen, 
  FileText, 
  TrendingUp, 
  Lightbulb, 
  Search, 
  Filter, 
  ChevronRight, 
  ArrowRight,
  Download,
  Share2,
  Clock,
  Eye,
  MessageSquare,
  Bookmark,
  Globe,
  Zap
} from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';

const insights = [
  {
    id: 1,
    title: '광명시 2050 탄소중립 로드맵: 에너지 전환의 핵심 전략',
    category: '정책 리포트',
    date: '2026.03.15',
    views: '1,248',
    comments: '12',
    author: '광명시 탄소중립지원센터',
    image: 'https://picsum.photos/seed/energy-strategy/800/500',
    tags: ['에너지전환', '신재생에너지', '정책'],
    desc: '광명시의 2050 탄소중립 달성을 위한 5대 핵심 전략과 세부 이행 계획을 분석합니다. 특히 시민 주도형 햇빛발전소의 역할과 기대 효과를 중점적으로 다룹니다.'
  },
  {
    id: 2,
    title: '그린 모빌리티 시대: 전기차 보급 가속화를 위한 인프라 구축 방안',
    category: '기술 인사이트',
    date: '2026.03.10',
    views: '856',
    comments: '8',
    author: '스마트도시 연구팀',
    image: 'https://picsum.photos/seed/green-mobility/800/500',
    tags: ['전기차', '인프라', '스마트교통'],
    desc: '전기차 보급 확대를 위한 급속 충전 인프라의 최적 입지 분석과 V2G(Vehicle-to-Grid) 기술의 적용 가능성을 탐색합니다.'
  },
  {
    id: 3,
    title: '시민 과학자가 제안하는 우리 동네 탄소 감축 아이디어 TOP 10',
    category: '시민 참여',
    date: '2026.03.05',
    views: '2,104',
    comments: '45',
    author: '리빙랩 운영사무국',
    image: 'https://picsum.photos/seed/citizen-ideas/800/500',
    tags: ['리빙랩', '시민아이디어', '실천'],
    desc: '지난 하반기 리빙랩을 통해 발굴된 시민들의 창의적인 탄소 감축 아이디어 중 우수 사례 10곳을 소개하고 실제 적용 방안을 공유합니다.'
  }
];

export default function CarbonInsights() {
  const shouldReduceMotion = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState('전체');

  return (
    <div className="max-w-[1560px] mx-auto space-y-16 pb-20">
      {/* Hero Section - Recipe 4: Dark Luxury Style */}
      <section className="relative bg-black rounded-[40px] p-8 sm:p-16 overflow-hidden text-white group">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1920" 
            alt="Carbon Insights Header" 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-60"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-emerald-900/30" />
        </div>
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
              className="inline-flex items-center gap-2 bg-emerald-500/20 backdrop-blur-md border border-[var(--color-primary-border)]/30 text-emerald-400 px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase"
            >
              <Lightbulb size={14} /> Carbon Neutral Insights
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.1 }}
              className="text-3xl sm:text-6xl font-light leading-[1.1] tracking-tighter"
            >
              데이터로 읽는<br />
              <span className="font-black text-emerald-400">탄소중립의 미래</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.2 }}
              className="text-slate-300 text-base sm:text-xl font-medium leading-relaxed max-w-2xl"
            >
              광명시의 탄소중립 정책, 기술 트렌드, 그리고 시민들의 목소리를 담은 깊이 있는 인사이트를 제공합니다.
            </motion.p>
          </div>
          
          <div className="lg:col-span-5 hidden lg:block">
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: '리포트', count: '124', icon: <FileText size={20} /> },
                { label: '데이터 분석', count: '86', icon: <TrendingUp size={20} /> },
                { label: '시민 제안', count: '256', icon: <MessageSquare size={20} /> },
                { label: '기술 트렌드', count: '42', icon: <Zap size={20} /> },
              ].map((stat, idx) => (
                <div key={idx} className="bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-3xl space-y-3">
                  <div className="w-8 h-8 bg-emerald-500/20 text-emerald-400 rounded-lg flex items-center justify-center">
                    {stat.icon}
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                    <p className="text-xl font-black">{stat.count}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Filter & Search */}
      <section className="flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex bg-slate-100 p-1.5 rounded-2xl overflow-x-auto max-w-full scrollbar-hide">
          {['전체', '정책 리포트', '기술 인사이트', '시민 참여', '데이터 분석'].map((cat) => (
            <button 
              key={cat} 
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-xl text-sm font-black transition-all whitespace-nowrap ${cat === activeCategory ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="relative w-full sm:w-80">
          <input 
            type="text" 
            placeholder="인사이트 검색..." 
            className="w-full pl-12 pr-4 py-3 bg-white border border-line-normal rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-border)]/20 transition-all"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        </div>
      </section>

      {/* Insight List */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {insights.map((insight, idx) => (
          <motion.div
            key={insight.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={shouldReduceMotion ? { duration: 0 } : { delay: idx * 0.1 }}
            className="group flex flex-col sm:flex-row gap-8 bg-white rounded-[32px] overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer"
          >
            <div className="sm:w-2/5 h-64 sm:h-auto relative overflow-hidden">
              <img 
                src={insight.image} 
                alt={insight.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-black text-slate-900 uppercase tracking-widest">
                {insight.category}
              </div>
            </div>
            <div className="sm:w-3/5 p-8 sm:pl-0 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
                  <span className="flex items-center gap-1"><Clock size={14} /> {insight.date}</span>
                  <span className="flex items-center gap-1"><Eye size={14} /> {insight.views}</span>
                  <span className="flex items-center gap-1"><MessageSquare size={14} /> {insight.comments}</span>
                </div>
                <h3 className="text-2xl font-black text-slate-900 leading-tight group-hover:text-emerald-600 transition-colors">
                  {insight.title}
                </h3>
                <p className="text-slate-500 text-sm font-medium leading-relaxed line-clamp-3">
                  {insight.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {insight.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="text-[10px] font-black text-slate-400 bg-slate-50 px-2 py-1 rounded uppercase tracking-widest">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between pt-6 border-t border-line-normal">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                    <Globe size={16} />
                  </div>
                  <span className="text-xs font-bold text-slate-900">{insight.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-slate-300 hover:text-emerald-500 transition-colors"><Bookmark size={20} /></button>
                  <button className="p-2 text-slate-300 hover:text-emerald-500 transition-colors"><Share2 size={20} /></button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Featured Insight - Recipe 10: Bold Background */}
      <section className="bg-emerald-500 rounded-[40px] p-12 sm:p-20 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-white rounded-full blur-[120px]" />
        </div>
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase">
              <TrendingUp size={14} /> Monthly Special
            </div>
            <h3 className="text-3xl sm:text-5xl font-black leading-tight tracking-tight">
              광명시 탄소중립<br />데이터 백서 2026
            </h3>
            <p className="text-emerald-100 text-lg font-medium leading-relaxed max-w-lg">
              지난 1년간의 탄소 배출 및 감축 데이터를 총망라한 종합 보고서입니다. 
              광명시의 기후위기 대응 성과와 향후 과제를 한눈에 확인하세요.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-white text-emerald-600 font-black px-10 py-5 rounded-2xl shadow-xl hover:bg-[var(--color-primary-subtle)] transition-all flex items-center justify-center gap-3">
                백서 다운로드 (PDF) <Download size={20} />
              </button>
              <button className="bg-[var(--color-primary-heavy)] text-white font-bold px-10 py-5 rounded-2xl hover:bg-[var(--color-primary-active)] transition-all">
                온라인 뷰어로 보기
              </button>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="relative">
              <div className="absolute inset-0 bg-white/20 rounded-[48px] rotate-6 scale-105" />
              <img 
                src="https://picsum.photos/seed/report-cover/600/800" 
                alt="Report Cover" 
                className="relative z-10 rounded-[48px] shadow-2xl border border-white/20"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-slate-50 rounded-[40px] p-12 sm:p-20 text-center space-y-10 border border-line-normal">
        <div className="max-w-2xl mx-auto space-y-4">
          <h3 className="text-3xl font-black text-slate-900 tracking-tight">탄소중립 인사이트를 메일로 받으세요</h3>
          <p className="text-slate-500 font-medium text-lg">
            매월 말, 광명시의 최신 탄소중립 소식과 깊이 있는 리포트를 <br className="hidden sm:block" />
            뉴스레터로 전해드립니다.
          </p>
        </div>
        <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
          <input 
            type="email" 
            placeholder="이메일 주소를 입력하세요" 
            className="flex-grow px-8 py-5 bg-white border border-line-normal rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-border)]/20 transition-all shadow-sm"
          />
          <button className="bg-slate-900 text-white font-black px-10 py-5 rounded-2xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10">
            구독하기
          </button>
        </div>
        <p className="text-slate-400 text-xs font-medium">언제든지 구독을 해지하실 수 있습니다. 개인정보는 안전하게 보호됩니다.</p>
      </section>
    </div>
  );
}
