import {
  Users,
  MapPin,
  Cpu,
  Search,
  Lightbulb,
  Settings,
  CheckCircle,
  Calendar,
  Bell,
  PencilRuler,
  MessageSquare,
  FlaskConical,
  Trophy,
  Leaf,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';

export default function LivingLabIntro() {
  useEffect(() => {
    document.title = "리빙랩 소개/일정 | 에코뷰";
  }, []);
  const shouldReduceMotion = useReducedMotion();
  const [activeYear, setActiveYear] = useState(2026);
  const [selectedPhase, setSelectedPhase] = useState<{ category: string, label: string, start: number, end: number } | null>(null);

  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  const currentDay = today.getDate();
  const daysInMonth = new Date(today.getFullYear(), currentMonth, 0).getDate();
  const markerPosition = (currentMonth - 1) + (currentDay / daysInMonth);

  const scheduleData = {
    2026: [
      { 
        category: '에너지마일 과제', 
        color: 'bg-orange-500',
        phases: [
          { label: '공모 준비', start: 2, end: 3, color: 'bg-gray-100 text-gray-400' },
          { label: '모집·선정', start: 4, end: 5, color: 'bg-orange-500 text-white' },
          { label: '실증 운영', start: 6, end: 10, color: 'bg-green-500 text-white' },
          { label: '성과 분석', start: 11, end: 12, color: 'bg-sky-500 text-white' },
        ]
      },
      { 
        category: '모빌리티 과제', 
        color: 'bg-blue-500',
        phases: [
          { label: '계획 수립', start: 1, end: 3, color: 'bg-blue-500 text-white' },
          { label: '모집·선정', start: 4, end: 5, color: 'bg-orange-500 text-white' },
          { label: '실증 운영', start: 6, end: 9, color: 'bg-green-500 text-white' },
          { label: '결과', start: 10, end: 12, color: 'bg-sky-500 text-white' },
        ]
      },
      { 
        category: '세이프티 과제', 
        color: 'bg-purple-500',
        phases: [
          { label: '모집·선정·착수', start: 3, end: 5, color: 'bg-orange-500 text-white' },
          { label: '실증 운영', start: 6, end: 9, color: 'bg-purple-500 text-white' },
          { label: '성과 분석·확산', start: 10, end: 12, color: 'bg-sky-500 text-white' },
        ]
      },
      { 
        category: '시민 주제 제안', 
        color: 'bg-emerald-400',
        phases: [
          { label: '상시 접수', start: 1, end: 12, color: 'bg-emerald-400/60 text-emerald-800' },
        ]
      },
    ],
    2025: [
      { 
        category: '기존 과제 운영', 
        color: 'bg-gray-400',
        phases: [
          { label: '상시 운영 및 유지보수', start: 1, end: 12, color: 'bg-gray-200 text-gray-500' },
        ]
      }
    ]
  };

  const stats = [
    { icon: Trophy,      label: '누적 리빙랩 과제', value: '18',   unit: '건', bg: 'bg-amber-50',  color: 'text-amber-500' },
    { icon: Users,       label: '시민 참여자',      value: '1,248', unit: '명', bg: 'bg-blue-50',   color: 'text-blue-500' },
    { icon: FlaskConical,label: '현재 진행 과제',   value: '6',    unit: '건', bg: 'bg-orange-50', color: 'text-orange-500' },
    { icon: Leaf,        label: '탄소감축 기여량',  value: '320',  unit: 't',  bg: 'bg-green-50',  color: 'text-green-500' },
  ];

  return (
    <>
      <h1 className="sr-only">리빙랩 소개 및 일정</h1>
      {/* Notice Bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
        className="bg-[#1a3a2a] text-white rounded-2xl p-4 mb-6 flex items-center justify-between shadow-lg"
      >
        <div className="flex items-center gap-4 overflow-hidden">
          <div className="bg-[#2ecc71] text-white px-3 py-1 rounded-full text-xs font-bold flex-shrink-0 flex items-center gap-1">
            <Bell size={12} fill="currentColor" /> 공지
          </div>
          <p className="text-sm sm:text-base font-medium truncate">
            제3기 리빙랩 참여자 모집이 시작되었습니다. 광명시 탄소중립 실증 과제에 함께할 시민을 모집합니다.
          </p>
        </div>
        <span className="text-xs opacity-60 ml-4 whitespace-nowrap hidden sm:block">26.03.13</span>
      </motion.div>

      {/* Status Board (Situation Board) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={shouldReduceMotion ? { duration: 0 } : { delay: idx * 0.1 }}
            className="bg-white p-6 rounded-[24px] shadow-sm border border-line-normal flex items-center gap-5 hover:shadow-md transition-shadow"
          >
            <div className={`w-14 h-14 ${stat.bg} rounded-2xl flex items-center justify-center shadow-inner`}>
              <stat.icon size={24} className={stat.color} />
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
      <section className="relative rounded-xl overflow-hidden mb-12 sm:mb-20 shadow-xl group">
        <div
          className="w-full h-72 group-hover:scale-105 transition-transform duration-1000"
          style={{ backgroundImage: "url('/images/vs1.jpg')", backgroundSize: 'cover', backgroundPosition: 'center 30%' }}
        />
        <div className="absolute inset-0 flex items-center justify-start p-6 sm:p-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
            className="bg-white/85 backdrop-blur-sm p-6 rounded-xl w-full max-w-[420px] border border-white/40 shadow-2xl"
          >
            <div className="inline-flex items-center gap-2 bg-[var(--color-primary)] text-white px-4 py-1.5 rounded-full text-xs font-black mb-4 shadow-lg shadow-emerald-200/50">
              <FlaskConical size={14} fill="white" fillOpacity={0.2} />
              <span>Living Lab</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 leading-snug mb-3 tracking-tight">
              우리 동네의 문제를<br />
              시민의 아이디어로 해결합니다.
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              시민이 주인공이 되어 도시 문제를 발굴하고,<br />
              데이터와 스마트 기술로 해결책을 찾는 생활 속 실험실입니다.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Living Lab? */}
      <section className="mb-16 sm:mb-24">
        <h4 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 sm:mb-12">왜 리빙랩인가?</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {[
            {
              img: '/images/ic_citizen.png',
              alt: '시민 주도',
              title: '시민 주도',
              desc: '공무원 중심의 행정에서 벗어나 시민이 직접 도시 문제의 해결사가 됩니다.',
            },
            {
              img: '/images/ic_location.png',
              alt: '현장 중심',
              title: '현장 중심',
              desc: '책상이 아닌 우리가 사는 골목과 거리에서 실제 데이터를 기반으로 답을 찾습니다.',
            },
            {
              img: '/images/ic_data.png',
              alt: '기술 융합',
              title: '기술 융합',
              desc: '에코뷰(EcoView) 플랫폼의 데이터를 활용해 기후위기 대응과 탄소중립을 과학적으로 실현합니다.',
            },
          ].map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={shouldReduceMotion ? { duration: 0 } : { delay: idx * 0.1 }}
              className="bg-white p-6 sm:p-8 rounded-2xl border border-line-normal shadow-sm hover:shadow-md transition-shadow text-center"
            >
              <img src={card.img} alt={card.alt} width={86} height={84} className="mx-auto mb-6" />
              <h5 className="text-lg sm:text-xl font-bold mb-3">{card.title}</h5>
              <p className="text-gray-500 text-sm sm:text-base leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Operating Schedule Section */}
      <section className="mb-16 sm:mb-24 bg-white border border-line-normal rounded-[32px] p-6 sm:p-10 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div>
              <h4 className="text-2xl font-bold text-gray-900">운영 일정</h4>
              <p className="text-sm text-gray-400 mt-1">{activeYear}년 리빙랩 주요 일정을 확인하세요</p>
            </div>
          </div>
          <div className="flex bg-gray-50 p-1 rounded-xl self-start">
            {[2025, 2026].map(year => (
              <button
                key={year}
                onClick={() => setActiveYear(year)}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeYear === year ? 'bg-white text-primary shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
              >
                {year}년
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto pb-4 scrollbar-hide">
          <div className="min-w-[800px]">
            {/* Timeline Header (Months) */}
            <div className="grid grid-cols-[160px_1fr] border-b border-line-neutral pb-4 mb-6">
              <div />
              <div className="grid grid-cols-12 text-center text-xs font-bold text-gray-400">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className={i === 2 ? 'text-primary' : ''}>{i + 1}월</div>
                ))}
              </div>
            </div>

            {/* Schedule Rows */}
            <div className="space-y-6 relative">
              {/* Today Marker (Dynamic) */}
              <div 
                className="absolute top-0 bottom-0 w-px bg-primary/40 border-l border-dashed border-primary/60 z-20 pointer-events-none" 
                style={{ left: `calc(160px + (100% - 160px) / 12 * ${markerPosition})` }}
              >
                <div className="absolute -top-1 -left-1 w-2 h-2 rounded-full bg-primary shadow-sm" />
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-black px-1.5 py-0.5 rounded shadow-sm whitespace-nowrap">
                  TODAY
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeYear}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
                  className="space-y-6"
                >
                  {scheduleData[activeYear as keyof typeof scheduleData].map((row, idx) => (
                    <div key={idx} className="grid grid-cols-[160px_1fr] items-center group">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${row.color}`} />
                        <span className="text-sm font-bold text-gray-700">{row.category}</span>
                      </div>
                      <div className="grid grid-cols-12 h-10 relative">
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
                            onClick={() => setSelectedPhase({ category: row.category, ...phase })}
                            className={`${phase.color} rounded-full flex items-center justify-center text-[11px] font-bold px-2 shadow-sm z-10 mx-0.5 cursor-pointer hover:brightness-95 hover:scale-[1.02] active:scale-95 transition-all`}
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

      {/* Phase Detail Popup */}
      <AnimatePresence>
        {selectedPhase && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
              onClick={() => setSelectedPhase(null)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.2 }}
              className="relative bg-white rounded-[32px] p-8 w-full max-w-md shadow-2xl border border-line-normal"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <span className="text-xs font-black text-emerald-500 tracking-widest uppercase">{selectedPhase.category}</span>
                    <h5 className="text-xl font-black text-gray-900">{selectedPhase.label}</h5>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedPhase(null)}
                  className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                  <span className="text-sm font-bold text-gray-400">진행 기간</span>
                  <span className="text-sm font-black text-gray-900">{selectedPhase.start}월 ~ {selectedPhase.end}월</span>
                </div>
                <div className="p-4 border border-line-normal rounded-2xl">
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {selectedPhase.category}의 {selectedPhase.label} 단계가 진행되는 기간입니다. 
                    관련 공고 및 자세한 내용은 공지사항을 확인해 주세요.
                  </p>
                </div>
              </div>

              <button 
                onClick={() => {
                  setSelectedPhase(null);
                  // Optional: scroll to notice bar or something
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full py-4 bg-[#1a3a2a] text-white font-black rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all"
              >
                관련 공고 확인하기
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Promotion Process */}
      <section className="mb-16 sm:mb-24">
        <h4 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-12">추진 절차</h4>
        <div className="bg-emerald-50/30 rounded-[40px] p-8 sm:p-16 border border-line-normal">
          <div className="relative">
            {/* Connector Line (Desktop) */}
            <div className="absolute top-[120px] left-[10%] right-[10%] h-0.5 bg-line-normal hidden md:block z-0" />
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-4 relative z-10">
              {[
                { 
                  step: '01',
                  label: '문제 발견', 
                  desc: '시민 삶의 현장 데이터를 분석하여 지역의 핵심 현안을 도출',
                  icon: <Search size={32} />,
                  color: 'bg-emerald-500',
                  lightColor: 'bg-emerald-50'
                },
                { 
                  step: '02',
                  label: '아이디어 제안', 
                  desc: '워크숍과 브레인스토밍을 통해 스마트 서비스 모델 설계',
                  icon: <Lightbulb size={32} />,
                  color: 'bg-blue-500',
                  lightColor: 'bg-blue-50'
                },
                { 
                  step: '03',
                  label: '솔루션 설계', 
                  desc: '데이터스테이션 및 API 연계를 통한 기술적 구현 및 서비스 구체화',
                  icon: <PencilRuler size={32} />,
                  color: 'bg-orange-500',
                  lightColor: 'bg-orange-50'
                },
                { 
                  step: '04',
                  label: '실증 및 피드백', 
                  desc: '현장에 서비스를 적용하고 데이터를 바탕으로 성과를 검증',
                  icon: <MessageSquare size={32} />,
                  color: 'bg-purple-500',
                  lightColor: 'bg-purple-50'
                }
              ].map((step, idx) => (
                <div key={idx} className="flex flex-col items-center group">
                  {/* Step Number Badge */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
                    className={`mb-4 px-3 py-1 rounded-full text-[10px] font-black tracking-widest text-white ${step.color} shadow-sm`}
                  >
                    STEP {step.step}
                  </motion.div>

                  {/* Icon Container */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={shouldReduceMotion ? { duration: 0 } : { delay: idx * 0.1 }}
                    className={`w-24 h-24 ${step.lightColor} rounded-[32px] flex items-center justify-center mb-6 shadow-sm group-hover:shadow-md transition-all duration-300 relative`}
                  >
                    <div className={`text-white p-4 rounded-2xl ${step.color} shadow-lg group-hover:scale-110 transition-transform`}>
                      {step.icon}
                    </div>
                  </motion.div>

                  {/* Text Content */}
                  <div className="text-center px-4">
                    <h5 className="font-black text-gray-900 text-xl mb-3">{step.label}</h5>
                    <p className="text-sm text-gray-500 leading-relaxed font-medium break-keep">
                      {step.desc}
                    </p>
                  </div>

                  {/* Connector Arrow (MD only) */}
                  {idx < 3 && (
                    <div className="hidden md:flex absolute top-[120px] right-0 translate-x-1/2 -translate-y-1/2 text-emerald-200">
                      <ChevronRight size={24} strokeWidth={3} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Participation Subjects */}
      <section className="mb-16 sm:mb-24">
        <h4 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-12 sm:mb-20">참여 주체</h4>
        <div className="relative max-w-5xl mx-auto py-12 px-4">
          {/* Connection Lines (SVG) */}
          <div className="absolute inset-0 z-0 hidden md:block">
            <svg className="w-full h-full" viewBox="0 0 1000 600" fill="none">
              <path d="M250,150 L500,300 M750,150 L500,300 M250,450 L500,300 M750,450 L500,300" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="8 8" />
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center relative z-10">
            {/* Left Column */}
            <div className="space-y-12 md:space-y-32">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
                className="bg-white p-6 rounded-3xl border border-line-normal shadow-sm text-right relative"
              >
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-emerald-500 rounded-full border-4 border-white shadow-sm hidden md:block" />
                <h5 className="text-xl font-black text-gray-900 mb-2">광명시</h5>
                <p className="text-sm text-gray-500 leading-relaxed">행정적 지원, 예산 확보 및<br />리빙랩 결과의 정책 반영</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.2 }}
                className="bg-white p-6 rounded-3xl border border-line-normal shadow-sm text-right relative"
              >
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-emerald-500 rounded-full border-4 border-white shadow-sm hidden md:block" />
                <h5 className="text-xl font-black text-gray-900 mb-2">운영지원단</h5>
                <p className="text-sm text-gray-500 leading-relaxed">리빙랩 운영 총괄 및<br />시민 참여 프로세스 관리</p>
              </motion.div>
            </div>

            {/* Center Column */}
            <div className="flex justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
                className="w-56 h-56 sm:w-72 sm:h-72 bg-[var(--color-primary)] rounded-full flex flex-col items-center justify-center text-white shadow-[0_30px_60px_rgba(6,159,124,0.3)] text-center p-8 relative"
              >
                <div className="absolute inset-0 rounded-full border-8 border-white/20 animate-pulse" />
                <span className="text-4xl sm:text-5xl font-black mb-3 tracking-tight">시민</span>
                <span className="text-sm sm:text-lg font-medium opacity-90 leading-tight">아이디어 제공 및<br />실증 주체</span>
              </motion.div>
            </div>

            {/* Right Column */}
            <div className="space-y-12 md:space-y-32">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.1 }}
                className="bg-white p-6 rounded-3xl border border-line-normal shadow-sm text-left relative"
              >
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-emerald-500 rounded-full border-4 border-white shadow-sm hidden md:block" />
                <h5 className="text-xl font-black text-gray-900 mb-2">전문가/기업</h5>
                <p className="text-sm text-gray-500 leading-relaxed">기술 자문, 솔루션 구현 및<br />데이터 분석 지원</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.3 }}
                className="bg-white p-6 rounded-3xl border border-line-normal shadow-sm text-left relative"
              >
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-emerald-500 rounded-full border-4 border-white shadow-sm hidden md:block" />
                <h5 className="text-xl font-black text-gray-900 mb-2">데이터 스테이션</h5>
                <p className="text-sm text-gray-500 leading-relaxed">실증 데이터 수집·저장 및<br />공유 플랫폼 제공</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section 
        style={{
          background: 'linear-gradient(135deg, var(--color-primary-subtle) 0%, var(--color-primary-muted) 100%)'
        }}
        className="rounded-[24px] p-12 sm:p-16 text-center shadow-sm"
      >
        <p className="text-gray-800 font-medium mb-3 text-sm sm:text-lg">당신의 작은 생각이 광명의 내일을 바꿉니다.</p>
        <h4 className="text-2xl sm:text-[32px] font-black text-gray-900 mb-10 tracking-tight">지금 바로 우리 동네의 변화에 동참하세요!</h4>
        <button className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-bold px-12 py-4 rounded-full shadow-lg hover:shadow-xl transition-all active:scale-95 text-lg">
          리빙랩 참여하기
        </button>
      </section>
    </>
  );
}

function ChevronRight({ className, size, strokeWidth }: { className?: string, size?: number, strokeWidth?: number }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size || 24} 
      height={size || 24} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth={strokeWidth || 2} 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="m9 18 6-6-6-6"/>
    </svg>
  );
}
