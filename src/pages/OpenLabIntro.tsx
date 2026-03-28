import { 
  Monitor, 
  Users, 
  Calendar, 
  MapPin, 
  Clock, 
  ChevronRight,
  Info,
  Activity,
  ArrowRight,
  Bell,
  Cpu,
  Search,
  Lightbulb,
  Settings,
  CheckCircle,
  Rocket,
  Database,
  Briefcase,
  GraduationCap,
  Globe,
  Zap,
  PenTool
} from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Link } from 'react-router-dom';

export default function OpenLabIntro() {
  const shouldReduceMotion = useReducedMotion();
  const [activeYear, setActiveYear] = useState(2026);

  const stats = [
    { icon: <Cpu size={24} />, label: '누적 오픈랩 과제', value: '24', unit: '건', color: 'bg-sky-50 text-sky-600' },
    { icon: <Globe size={24} />, label: '참여 기업·기관', value: '38', unit: '개', color: 'bg-blue-50 text-blue-600' },
    { icon: <Lightbulb size={24} />, label: '누적 아이디어 제안', value: '156', unit: '건', color: 'bg-yellow-50 text-yellow-600' },
    { icon: <GraduationCap size={24} />, label: '취창업 연계 성공', value: '12', unit: '명', color: 'bg-purple-50 text-purple-600' },
  ];

  const operationSteps = [
    { id: 1, title: '아이디어 발굴', desc: '데이터 기반 과제 탐색 및 제안', icon: <Lightbulb size={18} /> },
    { id: 2, title: 'PoC 실증', desc: '소규모 실증·프로토타입 개발', icon: <Rocket size={18} /> },
    { id: 3, title: '스케일업', desc: '성과 검증 및 사업화 연계', icon: <Activity size={18} /> },
  ];

  const processSteps = [
    { id: 1, label: '과제 공모', sub: '공고 등록, 신청 접수', icon: <Bell size={24} /> },
    { id: 2, label: '제안 심사', sub: '서류·발표 심사 평가', icon: <Search size={24} /> },
    { id: 3, label: 'PoC 실증', sub: '프로토타입 실증 개발', icon: <Rocket size={24} /> },
    { id: 4, label: '성과 발표', sub: '결과 발표, 우수팀 선정', icon: <Monitor size={24} /> },
    { id: 5, label: '사업화 연계', sub: '취창업 연계 확산 지원', icon: <Briefcase size={24} /> },
  ];

  const scheduleData = {
    2026: [
      { 
        category: '데이터 챌린지 (1차)', 
        color: 'bg-orange-500',
        phases: [
          { label: '기획·준비', start: 1, end: 2, color: 'bg-gray-100 text-gray-400' },
          { label: '공모·접수', start: 3, end: 4, color: 'bg-orange-500 text-white' },
          { label: '심사·발표', start: 5, end: 6, color: 'bg-blue-500 text-white' },
        ]
      },
      { 
        category: '데이터 챌린지 (2차)', 
        color: 'bg-blue-500',
        phases: [
          { label: '공모·접수', start: 7, end: 8, color: 'bg-orange-500 text-white' },
          { label: '심사·발표', start: 9, end: 10, color: 'bg-blue-500 text-white' },
        ]
      },
      { 
        category: '협업 PoC 실증', 
        color: 'bg-green-500',
        phases: [
          { label: '모집·선정', start: 1, end: 3, color: 'bg-orange-500 text-white' },
          { label: 'PoC 실증 운영', start: 4, end: 8, color: 'bg-green-500 text-white' },
          { label: '성과 검증·발표', start: 9, end: 12, color: 'bg-sky-500 text-white' },
        ]
      },
      { 
        category: '취업 지원', 
        color: 'bg-yellow-500',
        phases: [
          { label: '연중 상시 접수', start: 1, end: 12, color: 'bg-yellow-500/20 text-yellow-700' },
        ]
      },
      { 
        category: '주제 제안', 
        color: 'bg-sky-400',
        phases: [
          { label: '상시 접수', start: 1, end: 12, color: 'bg-sky-400/20 text-sky-700' },
        ]
      },
    ],
    2025: [
      { 
        category: '오픈랩 초기 운영', 
        color: 'bg-gray-400',
        phases: [
          { label: '안정화 기간', start: 1, end: 12, color: 'bg-gray-200 text-gray-500' },
        ]
      }
    ]
  };

  return (
    <div className="max-w-[1560px] mx-auto">
      {/* Notice Bar */}
      <Link to="/openlab/announcements" className="block mb-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
          className="bg-[#0f2a4a] text-white rounded-2xl p-4 flex items-center justify-between shadow-lg hover:bg-sky-900 transition-colors"
        >
          <div className="flex items-center gap-4 overflow-hidden">
            <div className="bg-sky-500 text-white px-3 py-1 rounded-full text-xs font-bold flex-shrink-0 flex items-center gap-1">
              <Bell size={12} fill="currentColor" /> 공지
            </div>
            <p className="text-sm sm:text-base font-medium truncate">
              2026년 제1기 오픈랩 데이터 분석 챌린지가 공모를 시작합니다. 광명시 탄소중립 데이터로 혁신 아이디어를 제안하세요.
            </p>
          </div>
          <span className="text-xs opacity-60 ml-4 whitespace-nowrap hidden sm:block">26.03.10</span>
        </motion.div>
      </Link>

      {/* Status Board */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={shouldReduceMotion ? { duration: 0 } : { delay: idx * 0.1 }}
            className="bg-white p-6 rounded-[24px] shadow-sm border border-line-normal flex items-center gap-5 hover:shadow-md transition-shadow"
          >
            <div className={`w-14 h-14 ${stat.color.split(' ')[0]} rounded-2xl flex items-center justify-center text-current shadow-inner`}>
              {stat.icon}
            </div>
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-gray-900">{stat.value}</span>
                <span className="text-sm font-bold text-gray-400">{stat.unit}</span>
              </div>
              <p className="text-xs font-bold text-gray-400 mt-0.5">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative rounded-[32px] overflow-hidden mb-12 sm:mb-20 shadow-xl group">
        <img 
          src="https://picsum.photos/seed/lab-collaboration/1600/500" 
          alt="Open Lab Innovation" 
          className="w-full h-[400px] sm:h-[450px] object-cover group-hover:scale-105 transition-transform duration-1000"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent flex items-center">
          <div className="max-w-[1560px] mx-auto w-full px-6 sm:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 bg-sky-500 text-white px-4 py-1.5 rounded-full text-xs font-bold mb-6">
                <Rocket size={14} /> Open Lab
              </div>
              <h3 className="text-3xl sm:text-[44px] font-black text-white leading-[1.1] mb-6 tracking-tight">
                광명시 데이터로<br />
                혁신을 <span className="text-white">실험하다</span>
              </h3>
              <p className="text-white/80 text-sm sm:text-lg font-medium leading-relaxed mb-8 max-w-2xl">
                오픈랩은 광명시 스마트도시 데이터를 기반으로 시민·스타트업·연구자가 함께 혁신 아이디어를 발굴하고 실증하는 개방형 혁신 프로그램입니다. 탄소중립 4대 마일 데이터를 자유롭게 분석하고, 비즈니스 모델로 발전시킬 수 있는 전 과정을 지원합니다.
              </p>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {[
                  { label: '도시 데이터 활용', icon: <Database size={14} /> },
                  { label: '스타트업 실증', icon: <Rocket size={14} /> },
                  { label: '데이터 챌린지', icon: <Activity size={14} /> },
                  { label: '취창업 연계', icon: <Briefcase size={14} /> },
                  { label: '산학관 협력', icon: <Users size={14} /> },
                  { label: '탄소중립 혁신', icon: <Zap size={14} /> },
                ].map((tag, idx) => (
                  <span key={idx} className="bg-sky-400/10 backdrop-blur-md border border-sky-400/20 text-sky-100 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2">
                    {tag.icon} {tag.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: Operation Phases */}
            <div className="lg:col-span-5 hidden lg:block">
              <div className="bg-white/90 backdrop-blur-xl rounded-[32px] p-8 border border-white/20 shadow-2xl">
                <h4 className="text-gray-900 font-bold text-lg mb-8 flex items-center justify-between">
                  오픈랩 운영 단계
                  <span className="text-[10px] text-gray-400 font-normal tracking-widest uppercase">Phases</span>
                </h4>
                <div className="space-y-6">
                  {operationSteps.map((step) => (
                    <div key={step.id} className="flex items-start gap-4 group">
                      <div className="w-10 h-10 bg-sky-500/10 text-sky-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-sky-500 group-hover:text-white transition-all">
                        {step.icon}
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-gray-900 font-bold">{step.title}</span>
                          <span className="w-6 h-6 border border-line-normal rounded-full flex items-center justify-center text-[10px] text-gray-400">{step.id}</span>
                        </div>
                        <p className="text-gray-500 text-xs leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Open Lab? (Adapted from Image 1) */}
      <section className="mb-24">
        <h4 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-12">왜 오픈랩인가?</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              icon: <Zap className="text-sky-600" size={32} />, 
              title: '기술 혁신', 
              desc: '리빙랩에서 도출된 아이디어를 최신 스마트 기술로 구체화하고 검증하는 혁신 공간입니다.' 
            },
            { 
              icon: <Database className="text-sky-600" size={32} />, 
              title: '데이터 개방', 
              desc: '광명시의 탄소중립 데이터를 누구나 자유롭게 분석하고 새로운 가치를 창출하는 개방형 실험실입니다.' 
            },
            { 
              icon: <Rocket className="text-sky-600" size={32} />, 
              title: '창업 생태계', 
              desc: '혁신적인 아이디어가 실제 비즈니스로 연결되도록 취·창업과 실증을 지원하는 허브입니다.' 
            }
          ].map((card, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={shouldReduceMotion ? { duration: 0 } : { delay: idx * 0.1 }}
              className="bg-white p-8 rounded-[32px] border border-line-normal shadow-sm hover:shadow-md transition-all text-center group"
            >
              <div className="w-16 h-16 bg-sky-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                {card.icon}
              </div>
              <h5 className="text-xl font-bold mb-4">{card.title}</h5>
              <p className="text-gray-500 text-[15px] leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Promotion Process (추진 절차) */}
      <section className="mb-24 bg-gray-50 rounded-[40px] p-8 sm:p-16 border border-line-normal">
        <div className="mb-16">
          <h4 className="text-3xl font-black text-gray-900">추진 절차</h4>
          <p className="text-gray-400 mt-2">공모 신청부터 성과 사업화까지 5단계</p>
        </div>

        <div className="relative">
          {/* Connector Line */}
          <div className="absolute top-12 left-0 right-0 h-1 bg-line-normal hidden md:block" />
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10">
            {processSteps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center text-center group">
                <div className="relative mb-6">
                  <div className="w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center text-sky-500 border-4 border-line-normal group-hover:border-sky-500/20 group-hover:scale-110 transition-all duration-500">
                    {step.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-sky-500 text-white rounded-full flex items-center justify-center font-black text-sm shadow-md">
                    {step.id}
                  </div>
                </div>
                <h5 className="text-lg font-bold text-gray-900 mb-2">{step.label}</h5>
                <p className="text-xs text-gray-400 leading-relaxed max-w-[140px]">{step.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Participation Subjects (Adapted from Image 2) */}
      <section className="mb-24">
        <h4 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-20">참여 주체</h4>
        <div className="relative max-w-lg mx-auto aspect-square flex items-center justify-center">
          {/* Outer Circle */}
          <div className="absolute inset-0 border-2 border-dashed border-line-normal rounded-full"></div>
          
          {/* Center Node */}
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 4, repeat: Infinity }}
            className="w-32 h-32 sm:w-48 sm:h-48 bg-sky-500 rounded-full flex flex-col items-center justify-center text-white shadow-2xl z-20"
          >
            <span className="text-xl sm:text-2xl font-black mb-1">스타트업/연구자</span>
            <span className="text-[10px] sm:text-xs opacity-80">혁신 아이디어 제안 및 실증 주체</span>
          </motion.div>

          {/* Surrounding Nodes */}
          {[
            { label: '광명시', sub: '데이터 제공, 실증 장소 지원 및 행정적 협력', pos: 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2' },
            { label: '시민', sub: '서비스 체험 및 피드백 제공, 데이터 분석 참여', pos: 'top-1/2 right-0 translate-x-1/2 -translate-y-1/2' },
            { label: '산학연', sub: '기술 자문, 솔루션 고도화 및 전문 인력 지원', pos: 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2' }
          ].map((node, idx) => (
            <div key={idx} className={`absolute ${node.pos} z-10 flex flex-col items-center w-40 sm:w-56`}>
              <div className="w-4 h-4 bg-sky-400 rounded-full mb-2 shadow-sm"></div>
              <span className="font-bold text-gray-900 text-sm sm:text-base">{node.label}</span>
              <span className="text-[10px] sm:text-xs text-gray-500 mt-1 leading-tight">{node.sub}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Operating Schedule Section */}
      <section className="mb-24 bg-white border border-line-normal rounded-[32px] p-6 sm:p-10 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-4">
            <div>
              <h4 className="text-2xl font-bold text-gray-900">운영 일정</h4>
              <p className="text-sm text-gray-400 mt-1">{activeYear}년 오픈랩 주요 일정을 확인하세요</p>
            </div>
          </div>
          <div className="flex bg-gray-50 p-1 rounded-xl self-start">
            {[2025, 2026].map(year => (
              <button
                key={year}
                onClick={() => setActiveYear(year)}
                className={`px-8 py-2.5 rounded-lg text-sm font-bold transition-all ${activeYear === year ? 'bg-white text-sky-500 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
              >
                {year}년
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto pb-4 scrollbar-hide">
          <div className="min-w-[1000px]">
            {/* Timeline Header (Months) */}
            <div className="grid grid-cols-[200px_1fr] border-b border-line-neutral pb-6 mb-8">
              <div />
              <div className="grid grid-cols-12 text-center text-xs font-black text-gray-400">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className={i === 2 ? 'text-sky-500' : ''}>{i + 1}월</div>
                ))}
              </div>
            </div>

            {/* Schedule Rows */}
            <div className="space-y-8 relative">
              {/* Today Marker (March) */}
              <div className="absolute top-0 bottom-0 left-[calc(200px+(100%-200px)/12*2.5)] w-px bg-sky-500/30 border-l border-dashed border-sky-500/50 z-0" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeYear}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
                  className="space-y-8"
                >
                  {scheduleData[activeYear as keyof typeof scheduleData].map((row, idx) => (
                    <div key={idx} className="grid grid-cols-[200px_1fr] items-center group">
                      <div className="flex items-center gap-3">
                        <div className={`w-2.5 h-2.5 rounded-full ${row.color}`} />
                        <span className="text-[15px] font-bold text-gray-700">{row.category}</span>
                      </div>
                      <div className="grid grid-cols-12 h-12 relative">
                        {row.phases.map((phase, pIdx) => (
                          <motion.div
                            key={pIdx}
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={shouldReduceMotion ? { duration: 0 } : { delay: pIdx * 0.1 + idx * 0.05, duration: 0.5 }}
                            style={{ 
                              gridColumnStart: phase.start, 
                              gridColumnEnd: phase.end + 1,
                              transformOrigin: 'left'
                            }}
                            className={`${phase.color} rounded-full flex items-center justify-center text-[11px] font-bold px-3 shadow-md z-10 mx-0.5 border border-white/20`}
                          >
                            {phase.label}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-gradient-to-r from-sky-50 via-blue-50 to-sky-50 rounded-[40px] p-12 sm:p-20 text-center relative overflow-hidden border border-sky-100">
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-sky-200 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-200 rounded-full blur-[120px]" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-sky-600 font-black mb-4 tracking-[0.2em] uppercase text-sm">Join the Innovation</p>
          <h4 className="text-3xl sm:text-4xl font-black text-gray-900 mb-8 leading-tight">광명시의 데이터를 비즈니스로,<br />당신의 아이디어를 현실로 만드세요.</h4>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/openlab/announcements" className="w-full sm:w-auto bg-sky-500 text-white font-black px-10 py-5 rounded-2xl shadow-lg shadow-sky-200 hover:bg-sky-600 transition-all flex items-center justify-center gap-3 group">
              오픈랩 참여 신청 <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/openlab/suggestion" className="w-full sm:w-auto bg-white text-sky-600 border border-sky-200 font-bold px-10 py-5 rounded-2xl hover:bg-sky-50 transition-all shadow-sm flex items-center justify-center gap-3">
              <PenTool size={20} /> 혁신 아이디어 제안
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
