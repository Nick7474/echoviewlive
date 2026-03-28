import { 
  GraduationCap, 
  BookOpen, 
  Users, 
  Calendar, 
  MousePointerClick,
  CheckCircle,
  ArrowRight,
  ChevronRight,
  Award,
  Presentation,
  Lightbulb,
  Target
} from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export default function CitizenEducationIntro() {
  const stats = [
    { label: '누적 수료생', value: '1,240', unit: '명', icon: <Users size={20} /> },
    { label: '운영 교육 과정', value: '24', unit: '개', icon: <BookOpen size={20} /> },
    { label: '시민과학자 전환', value: '15', unit: '%', icon: <Target size={20} /> },
    { label: '교육 만족도', value: '4.8', unit: '/5', icon: <Award size={20} /> },
  ];

  const roadmap = [
    {
      step: 'Step 01',
      title: '데이터 입문 (리터러시)',
      subtitle: 'Data Literacy Foundation',
      desc: '데이터의 개념 이해, 디지털 보안, 공공데이터 포털 사용법 등 데이터와 친해지는 첫 걸음입니다.',
      target: '데이터가 낯선 초보 시민',
      icon: <Lightbulb size={32} className="text-emerald-500" />,
      color: 'bg-emerald-50',
      borderColor: 'border-emerald-100'
    },
    {
      step: 'Step 02',
      title: '데이터 활용 (중급)',
      subtitle: 'Data Application Skills',
      desc: '엑셀 및 시각화 도구를 활용한 기초 분석, 우리 동네 데이터를 직접 읽고 해석하는 능력을 기릅니다.',
      target: '데이터를 직접 다뤄보고 싶은 시민',
      icon: <Presentation size={32} className="text-green-600" />,
      color: 'bg-green-50',
      borderColor: 'border-green-100'
    },
    {
      step: 'Step 03',
      title: '시민과학자 양성 (심화)',
      subtitle: 'Advanced Citizen Scientist',
      desc: '리빙랩 참여 방법론, 데이터 수집 및 정책 제안 실습을 통해 실제 도시 문제를 해결하는 전문가로 성장합니다.',
      target: '리빙랩 및 오픈랩 활동 희망자',
      icon: <GraduationCap size={32} className="text-teal-500" />,
      color: 'bg-teal-50',
      borderColor: 'border-teal-100'
    }
  ];

  const schedule = [
    { month: '03-04월', title: '상반기 데이터 입문 과정', type: '입문', status: '종료' },
    { month: '05-06월', title: '데이터 시각화 및 분석 중급', type: '중급', status: '진행중' },
    { month: '07-08월', title: '여름방학 청소년 데이터 캠프', type: '특강', status: '예정' },
    { month: '09-10월', title: '하반기 시민과학자 양성 과정', type: '심화', status: '예정' },
    { month: '11월', title: '광명 데이터 리터러시 컨퍼런스', type: '행사', status: '예정' },
  ];

  const benefits = [
    { title: '수료증 발급', desc: '광명시장 명의의 공식 교육 수료증 수여', icon: <Award size={24} /> },
    { title: '활동 연계', desc: '리빙랩/오픈랩 참여 시 가점 부여 및 시민과학자 위촉', icon: <Users size={24} /> },
    { title: '커뮤니티 지원', desc: '수료생 대상 네트워킹 및 심화 스터디 공간 지원', icon: <MousePointerClick size={24} /> },
  ];

  return (
    <div className="max-w-[1560px] mx-auto space-y-16 sm:space-y-24">
      {/* Hero Section */}
      <section className="relative bg-emerald-900 rounded-[40px] p-8 sm:p-20 overflow-hidden text-white">
        <div className="absolute top-0 right-0 w-full h-full opacity-20 pointer-events-none">
          <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-emerald-400 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[40%] h-[40%] bg-green-500 rounded-full blur-[100px]" />
        </div>
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 bg-emerald-500/20 border border-[var(--color-primary-border)]/30 text-emerald-300 px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase"
            >
              <GraduationCap size={14} /> Citizen Education
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-5xl font-black leading-[1.1] tracking-tight"
            >
              데이터로 소통하는 시민,<br />
              <span className="text-emerald-400">스마트 광명의 미래를 배웁니다</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-white/70 text-base sm:text-xl font-medium leading-relaxed max-w-2xl"
            >
              광명시민 누구나 데이터를 이해하고 활용하여 우리 동네의 문제를 스스로 해결하는 <br className="hidden sm:block" />
              '시민과학자'로 성장할 수 있도록 맞춤형 교육을 제공합니다.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              {stats.map((stat, idx) => (
                <div key={idx} className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-2xl flex items-center gap-4 min-w-[160px]">
                  <div className="text-emerald-400">{stat.icon}</div>
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
              transition={{ delay: 0.4 }}
              className="relative"
            >
              <img 
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800&auto=format&fit=crop" 
                alt="Citizen Education" 
                className="rounded-[48px] shadow-2xl border border-white/10 aspect-square object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-xl flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white">
                  <CheckCircle size={24} />
                </div>
                <div>
                  <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Education Status</p>
                  <p className="text-gray-900 font-black text-xl">모집 중인 교육 3건</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section>
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h3 className="text-3xl font-black text-gray-900 tracking-tight">교육 로드맵 (3단계 체계)</h3>
          <p className="text-gray-500 font-medium">기초부터 심화까지, 단계별로 성장하는 데이터 전문가 과정</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {roadmap.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`group bg-white rounded-[32px] border ${item.borderColor} p-8 shadow-sm hover:shadow-xl transition-all duration-500`}
            >
              <div className="flex justify-between items-start mb-8">
                <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                  {item.icon}
                </div>
                <span className="text-emerald-500 font-black text-sm tracking-widest">{item.step}</span>
              </div>
              <div className="space-y-4">
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">{item.subtitle}</p>
                  <h4 className="text-xl font-black text-gray-900">{item.title}</h4>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed font-medium">
                  {item.desc}
                </p>
                <div className="pt-4 border-t border-line-normal">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Target</p>
                  <p className="text-sm font-bold text-gray-700">{item.target}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Annual Schedule */}
      <section className="bg-gray-50 rounded-[48px] p-8 sm:p-20 border border-line-normal">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <h3 className="text-3xl font-black text-gray-900 tracking-tight">2026년 교육 운영 일정</h3>
              <p className="text-gray-500 font-medium text-lg leading-relaxed">
                연간 운영 계획을 확인하고 <br className="hidden sm:block" />
                나에게 맞는 교육 일정을 미리 준비하세요.
              </p>
            </div>
            <div className="p-8 bg-emerald-600 rounded-[32px] text-white space-y-6 shadow-xl shadow-emerald-900/10">
              <div className="flex items-center gap-3">
                <Calendar size={24} className="text-emerald-300" />
                <h4 className="text-xl font-black">이달의 추천 교육</h4>
              </div>
              <div className="space-y-4">
                <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
                  <p className="text-xs font-bold text-emerald-200 mb-1">모집중 | 05.15 ~ 06.10</p>
                  <p className="font-bold">데이터 시각화 및 분석 중급 과정</p>
                </div>
                <Link to="/citizen-edu/announcements" className="flex items-center justify-between w-full p-4 bg-white text-emerald-600 rounded-2xl font-black text-sm hover:bg-[var(--color-primary-subtle)] transition-colors">
                  현재 모집 중인 교육 보기 <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-7 space-y-4">
            {schedule.map((item, idx) => (
              <div key={idx} className="flex items-center gap-6 p-6 bg-white rounded-3xl border border-line-normal shadow-sm hover:shadow-md transition-all">
                <div className="w-24 text-center flex-shrink-0">
                  <p className="text-sm font-black text-emerald-500">{item.month}</p>
                </div>
                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-400 text-[10px] font-bold rounded uppercase">{item.type}</span>
                    <h6 className="font-bold text-gray-900">{item.title}</h6>
                  </div>
                </div>
                <div className={`px-4 py-1.5 rounded-full text-xs font-black ${
                  item.status === '진행중' ? 'bg-emerald-100 text-emerald-600' :
                  item.status === '종료' ? 'bg-gray-100 text-gray-400' :
                  'bg-blue-50 text-blue-500'
                }`}>
                  {item.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section>
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h3 className="text-3xl font-black text-gray-900 tracking-tight">교육 참여 혜택</h3>
          <p className="text-gray-500 font-medium">단순한 배움을 넘어 시민과학자로 활동할 수 있는 기회를 제공합니다.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="p-10 bg-white rounded-[40px] border border-line-normal shadow-sm text-center space-y-6 hover:border-[var(--color-primary-border)]/30 transition-colors">
              <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-3xl flex items-center justify-center mx-auto">
                {benefit.icon}
              </div>
              <div className="space-y-2">
                <h5 className="text-xl font-black text-gray-900">{benefit.title}</h5>
                <p className="text-gray-400 font-medium leading-relaxed">{benefit.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-emerald-600 rounded-[48px] p-8 sm:p-20 text-white text-center space-y-12">
        <div className="max-w-3xl mx-auto space-y-6">
          <h3 className="text-3xl sm:text-4xl font-black tracking-tight">배움에서 활동으로, <br />지금 바로 시작하세요!</h3>
          <p className="text-emerald-100 text-lg font-medium">
            광명시의 데이터를 내 손으로 직접 다루고 <br className="hidden sm:block" />
            우리 동네의 변화를 이끄는 주인공이 되어보세요.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/citizen-edu/announcements" className="w-full sm:w-auto bg-white text-emerald-600 font-black px-10 py-5 rounded-2xl shadow-xl hover:bg-[var(--color-primary-subtle)] transition-all flex items-center justify-center gap-3">
            현재 모집 중인 교육 보기
          </Link>
          <button className="w-full sm:w-auto bg-[var(--color-primary-heavy)] text-white font-bold px-10 py-5 rounded-2xl hover:bg-[var(--color-primary-active)] transition-all flex items-center justify-center gap-3">
            교육 과정 제안하기
          </button>
        </div>
      </section>
    </div>
  );
}
