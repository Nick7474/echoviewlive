import { 
  Briefcase, 
  Lightbulb, 
  TrendingUp, 
  Database, 
  Users, 
  Rocket, 
  ChevronRight, 
  ArrowRight,
  CheckCircle,
  Award,
  Globe,
  MessageCircle,
  Layout,
  Cpu,
  Zap
} from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { Link } from 'react-router-dom';

export default function OpenLabSupport() {
  const shouldReduceMotion = useReducedMotion();
  const stats = [
    { label: '누적 창업 지원', value: '42', unit: '팀', icon: <Rocket size={20} /> },
    { label: '투자 유치 금액', value: '15.8', unit: '억', icon: <TrendingUp size={20} /> },
    { label: '취업 연계 성공', value: '28', unit: '명', icon: <Users size={20} /> },
    { label: '데이터 활용 협약', value: '12', unit: '건', icon: <Database size={20} /> },
  ];

  const mainPrograms = [
    {
      title: '스타트업 멘토링',
      subtitle: 'Startup Mentoring',
      desc: '탄소중립·스마트시티 분야 전문가 멘토와 1:1 매칭. 비즈니스 모델 검증부터 투자 유치까지 단계별 지원을 제공합니다.',
      tag: '월 2회 정기 진행',
      icon: <Users size={32} className="text-sky-500" />,
      color: 'bg-sky-50',
      borderColor: 'border-sky-100',
      link: '/openlab/suggestion'
    },
    {
      title: '광명시 공공 데이터 활용 창업',
      subtitle: 'Data-Driven Startup',
      desc: '광명시 데이터허브(488건) 및 경기도 데이터허브(40건) 연계 데이터를 우선 제공하며, 광명시 실증 사업 참여 기회를 부여합니다.',
      tag: '수시 신청',
      icon: <Database size={32} className="text-blue-600" />,
      color: 'bg-blue-50',
      borderColor: 'border-blue-100',
      link: '/openlab/suggestion'
    },
    {
      title: '투자·IR 연계',
      subtitle: 'Investment & IR',
      desc: '오픈랩 우수 팀을 대상으로 경기도 창업 생태계 네트워크와 연결하여 시드 투자 및 IR 피칭 기회를 제공합니다.',
      tag: '연 1회 데모데이',
      icon: <TrendingUp size={32} className="text-indigo-500" />,
      color: 'bg-indigo-50',
      borderColor: 'border-indigo-100',
      link: '/openlab/announcements'
    }
  ];

  const roadmap = [
    { step: '01', title: '오픈랩 참여', desc: '데이터 분석 및 아이디어 발굴', status: 'completed' },
    { step: '02', title: 'PoC 실증', desc: '프로토타입 개발 및 성과 검증', status: 'active' },
    { step: '03', title: '취창업 지원', desc: '멘토링 및 비즈니스 모델 고도화', status: 'upcoming' },
    { step: '04', title: '시장 진출', desc: '투자 유치 및 사업화 확산', status: 'upcoming' },
  ];

  const benefits = [
    { title: '인프라 지원', desc: '협업 공간 지원 및 클라우드 서버 크레딧 제공', icon: <Layout size={24} /> },
    { title: '네트워킹', desc: '유관 분야 스타트업 네트워킹 데이 정기 참여', icon: <Globe size={24} /> },
    { title: '마케팅 지원', desc: '우수 사례 홍보 및 언론 보도, 전시회 참가 지원', icon: <Zap size={24} /> },
    { title: '기술 자문', desc: '산학연 전문가 그룹의 기술 고도화 컨설팅', icon: <Cpu size={24} /> },
  ];

  return (
    <div className="max-w-[1560px] mx-auto space-y-16 sm:space-y-24">
      {/* Hero Section */}
      <section className="relative bg-[#0f2a4a] rounded-[40px] p-8 sm:p-20 overflow-hidden text-white">
        <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-sky-400 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[40%] h-[40%] bg-blue-500 rounded-full blur-[100px]" />
        </div>
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
              className="inline-flex items-center gap-2 bg-sky-500/20 border border-sky-500/30 text-sky-300 px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase"
            >
              <Briefcase size={14} /> Support Program
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.1 }}
              className="text-3xl sm:text-5xl font-black leading-[1.1] tracking-tight"
            >
              데이터로 여는 새로운 기회,<br />
              <span className="text-sky-400">취창업 지원 프로그램</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.2 }}
              className="text-white/70 text-base sm:text-xl font-medium leading-relaxed max-w-2xl"
            >
              오픈랩 연계 취업·창업 지원 정보 및 신청 안내입니다. <br className="hidden sm:block" />
              단순한 아이디어 실증을 넘어 비즈니스 모델 고도화와 시장 진출을 위한 전 과정을 밀착 지원합니다.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.3 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              {stats.map((stat, idx) => (
                <div key={idx} className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-2xl flex items-center gap-4 min-w-[160px]">
                  <div className="text-sky-400">{stat.icon}</div>
                  <div>
                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-wider">{stat.label}</p>
                    <p className="text-lg font-black">{stat.value}<span className="text-xs font-bold text-white/60 ml-0.5">{stat.unit}</span></p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
          
          <div className="lg:col-span-5 hidden lg:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.4 }}
              className="relative"
            >
              <img 
                src="https://picsum.photos/seed/startup-support/800/800" 
                alt="Startup Support" 
                className="rounded-[48px] shadow-2xl border border-white/10"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-xl flex items-center gap-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white">
                  <CheckCircle size={24} />
                </div>
                <div>
                  <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Success Rate</p>
                  <p className="text-gray-900 font-black text-xl">+85% Growth</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Programs */}
      <section>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <h3 className="text-3xl font-black text-gray-900 tracking-tight">3대 핵심 지원 프로그램</h3>
            <p className="text-gray-500 font-medium">실질적인 성장을 돕는 오픈랩만의 차별화된 지원책</p>
          </div>
          <div className="flex items-center gap-2 text-sky-500 font-bold text-sm">
            상세 가이드 보기 <ChevronRight size={16} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mainPrograms.map((program, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={shouldReduceMotion ? { duration: 0 } : { delay: idx * 0.1 }}
              className={`group bg-white rounded-[32px] border ${program.borderColor} p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500`}
            >
              <div className={`w-16 h-16 ${program.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                {program.icon}
              </div>
              <div className="space-y-4 mb-8">
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-sky-500 uppercase tracking-widest">{program.subtitle}</p>
                  <h4 className="text-xl font-black text-gray-900">{program.title}</h4>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed font-medium">
                  {program.desc}
                </p>
                <div className="inline-flex items-center gap-2 bg-gray-50 text-gray-400 px-3 py-1 rounded-lg text-[11px] font-bold">
                  <Award size={12} /> {program.tag}
                </div>
              </div>
              <Link 
                to={program.link} 
                className="flex items-center justify-between w-full p-4 bg-gray-50 rounded-2xl group-hover:bg-sky-500 group-hover:text-white transition-all duration-300"
              >
                <span className="font-bold text-sm">프로그램 신청하기</span>
                <ArrowRight size={18} />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Roadmap */}
      <section className="bg-gray-50 rounded-[48px] p-8 sm:p-20 border border-line-normal">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h3 className="text-3xl font-black text-gray-900 tracking-tight">단계별 성장 로드맵</h3>
          <p className="text-gray-500 font-medium">아이디어 발굴부터 글로벌 시장 진출까지, 오픈랩이 함께합니다.</p>
        </div>

        <div className="relative">
          {/* Connector Line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-line-normal -translate-y-1/2 hidden lg:block" />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
            {roadmap.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center space-y-6">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-black shadow-lg transition-all duration-500 ${
                  item.status === 'completed' ? 'bg-sky-500 text-white' :
                  item.status === 'active' ? 'bg-white text-sky-500 border-4 border-sky-500' :
                  'bg-white text-gray-300 border-2 border-line-normal'
                }`}>
                  {item.step}
                </div>
                <div className="space-y-2">
                  <h5 className={`text-lg font-black ${item.status === 'upcoming' ? 'text-gray-400' : 'text-gray-900'}`}>{item.title}</h5>
                  <p className="text-sm text-gray-400 font-medium leading-tight max-w-[180px] mx-auto">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Benefits */}
      <section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-3xl font-black text-gray-900 tracking-tight">추가 지원 혜택</h3>
              <p className="text-gray-500 font-medium text-lg leading-relaxed">
                비즈니스에만 집중할 수 있도록 <br className="hidden sm:block" />
                다양한 유·무형의 인프라를 전폭적으로 지원합니다.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {benefits.map((benefit, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={shouldReduceMotion ? { duration: 0 } : { delay: idx * 0.1 }}
                  className="flex items-start gap-4 p-6 bg-white rounded-3xl border border-line-normal shadow-sm hover:shadow-md transition-all"
                >
                  <div className="w-12 h-12 bg-sky-50 text-sky-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    {benefit.icon}
                  </div>
                  <div className="space-y-1">
                    <h6 className="font-bold text-gray-900">{benefit.title}</h6>
                    <p className="text-xs text-gray-400 leading-relaxed font-medium">{benefit.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-video rounded-[40px] overflow-hidden shadow-2xl border-8 border-white">
              <img 
                src="https://picsum.photos/seed/lab-space/1200/800" 
                alt="Open Lab Space" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-sky-500 rounded-full flex items-center justify-center text-white font-black text-center p-4 leading-tight shadow-xl rotate-12">
              협업 공간 <br /> 무상 지원
            </div>
          </div>
        </div>
      </section>

      {/* FAQ & Contact */}
      <section className="bg-sky-500 rounded-[48px] p-8 sm:p-20 text-white text-center space-y-12">
        <div className="max-w-3xl mx-auto space-y-6">
          <h3 className="text-3xl sm:text-4xl font-black tracking-tight">궁금한 점이 있으신가요?</h3>
          <p className="text-sky-100 text-lg font-medium">
            취창업 지원 프로그램에 대한 상세한 안내와 <br className="hidden sm:block" />
            실시간 상담을 통해 여러분의 고민을 해결해 드립니다.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="w-full sm:w-auto bg-white text-sky-600 font-black px-10 py-5 rounded-2xl shadow-xl hover:bg-sky-50 transition-all flex items-center justify-center gap-3">
            <MessageCircle size={20} /> 실시간 1:1 상담하기
          </button>
          <button className="w-full sm:w-auto bg-sky-600 text-white font-bold px-10 py-5 rounded-2xl hover:bg-sky-700 transition-all flex items-center justify-center gap-3">
            자주 묻는 질문 (FAQ)
          </button>
        </div>
        
        <div className="pt-8 border-t border-white/20 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm font-bold text-sky-100">
          <div className="flex items-center gap-2">
            <span className="opacity-60">문의처:</span> 광명시 오픈랩 운영사무국
          </div>
          <div className="flex items-center gap-2">
            <span className="opacity-60">연락처:</span> 02-2680-XXXX
          </div>
          <div className="flex items-center gap-2">
            <span className="opacity-60">이메일:</span> openlab@gm.go.kr
          </div>
        </div>
      </section>
    </div>
  );
}
