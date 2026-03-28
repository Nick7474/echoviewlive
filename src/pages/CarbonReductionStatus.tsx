import { useState } from 'react';
import { 
  TrendingDown, 
  Target, 
  BarChart3, 
  Leaf, 
  Zap, 
  Bus, 
  Building2, 
  Trash2,
  ArrowRight,
  ChevronRight,
  Calendar,
  Download,
  Share2,
  Info,
  CheckCircle2
} from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const yearlyData = [
  { year: '2021', target: 1200, actual: 1180 },
  { year: '2022', target: 1150, actual: 1120 },
  { year: '2023', target: 1100, actual: 1050 },
  { year: '2024', target: 1050, actual: 980 },
  { year: '2025', target: 1000, actual: 920 },
  { year: '2026', target: 950, actual: 880 },
];

const sectorReduction = [
  { name: '에너지 전환',  value: 420, color: 'var(--color-status-positive)',   icon: <Zap size={20} /> },
  { name: '그린 모빌리티', value: 280, color: 'var(--color-status-info)',        icon: <Bus size={20} /> },
  { name: '건물 효율화',  value: 150, color: 'var(--color-status-cautionary)', icon: <Building2 size={20} /> },
  { name: '자원 순환',    value: 120, color: 'var(--color-status-negative)',    icon: <Trash2 size={20} /> },
];

export default function CarbonReductionStatus() {
  const shouldReduceMotion = useReducedMotion();
  const [activeYear, setActiveYear] = useState('2026');

  return (
    <div className="max-w-[1560px] mx-auto space-y-12 pb-20">
      {/* Hero Section - Recipe 2: Editorial Style */}
      <section className="relative bg-slate-900 rounded-[40px] p-8 sm:p-16 overflow-hidden text-white group">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1920" 
            alt="Carbon Reduction Header" 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/70 to-emerald-900/40" />
        </div>

        <div className="relative z-10 space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
            className="inline-flex items-center gap-2 bg-emerald-500/20 backdrop-blur-md border border-[var(--color-primary-border)]/30 text-emerald-400 px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase"
          >
            <Target size={14} /> Carbon Reduction Goal
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.1 }}
            className="text-3xl sm:text-6xl font-black leading-[1.1] tracking-tighter"
          >
            2050 탄소중립,<br />
            <span className="text-emerald-400">광명의 약속입니다</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.2 }}
            className="text-slate-300 text-base sm:text-xl font-medium leading-relaxed max-w-2xl"
          >
            광명시는 2030년까지 탄소 배출량을 40% 감축하고, 2050년 탄소중립(Net-Zero) 달성을 목표로 달리고 있습니다. 
            시민과 함께 만들어가는 지속가능한 미래를 확인하세요.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { delay: 0.3 }}
            className="flex flex-wrap gap-8 pt-4"
          >
            <div className="space-y-1">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Target 2030</p>
              <p className="text-3xl font-black text-white">-40%</p>
            </div>
            <div className="w-px h-10 bg-white/10 hidden sm:block" />
            <div className="space-y-1">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Current Progress</p>
              <p className="text-3xl font-black text-emerald-400">18.4%</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Progress Overview - Recipe 9: Oversized Typographic */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2 bg-white rounded-[16px] p-10 shadow-sm border border-line-normal space-y-10">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <TrendingDown className="text-emerald-500" size={28} /> 연도별 감축 실적
            </h3>
            <div className="flex items-center gap-2">
              <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors"><Download size={20} /></button>
              <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors"><Share2 size={20} /></button>
            </div>
          </div>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={yearlyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="year" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 14, fontWeight: 800 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 14, fontWeight: 800 }}
                />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff' }}
                />
                <Legend iconType="circle" />
                <Bar dataKey="target" name="목표 배출량" fill="#e2e8f0" radius={[10, 10, 0, 0]} />
                <Bar dataKey="actual" name="실제 배출량" fill="#10b981" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="bg-emerald-500 rounded-[16px] p-10 text-white space-y-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <h3 className="text-2xl font-black relative z-10">분야별 감축 기여도</h3>
          <div className="space-y-6 relative z-10">
            {sectorReduction.map((item, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {item.icon}
                    <span className="text-sm font-black">{item.name}</span>
                  </div>
                  <span className="text-sm font-black">{item.value} tCO2eq</span>
                </div>
                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(item.value / 450) * 100}%` }}
                    transition={shouldReduceMotion ? { duration: 0 } : { duration: 1, delay: idx * 0.1 }}
                    className="h-full bg-white rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="pt-6 border-t border-white/10 relative z-10">
            <p className="text-emerald-100 text-sm font-medium leading-relaxed">
              에너지 전환 분야가 전체 감축량의 40% 이상을 차지하며 가장 큰 성과를 보이고 있습니다.
            </p>
          </div>
        </section>
      </div>

      {/* 2026 Carbon Neutral Milestone Table */}
      <section className="bg-white rounded-[16px] p-10 shadow-sm border border-line-normal space-y-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-50 text-amber-500 rounded-xl flex items-center justify-center">
            <Target size={20} />
          </div>
          <div className="space-y-0.5">
            <h3 className="text-2xl font-black text-slate-900">2026 탄소중립 마일스톤</h3>
            <p className="text-sm text-slate-400 font-medium">올해 주요 목표 달성 현황입니다.</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-line-neutral">
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">마일스톤 항목</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">목표치</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">현재 달성</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">달성률</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">상태</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line-neutral">
              {[
                { name: '재생에너지 전환율 목표', target: '30%', current: '24.8%', percent: 82.7, status: '진행 중', color: 'emerald' },
                { name: '친환경 차량 보급률', target: '25%', current: '18.2%', percent: 72.8, status: '진행 중', color: 'blue' },
                { name: '탄소흡수원 확충 면적', target: '1,500ha', current: '1,240ha', percent: 82.7, status: '진행 중', color: 'amber' },
                { name: '시민 탄소중립 실천 참여율', target: '40%', current: '38.4%', percent: 96.0, status: '거의 달성', color: 'emerald' },
              ].map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-6">
                    <span className="text-sm font-black text-slate-900">{item.name}</span>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <span className="text-sm font-bold text-slate-500">{item.target}</span>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <span className="text-sm font-black text-slate-900">{item.current}</span>
                  </td>
                  <td className="px-8 py-6 min-w-[200px]">
                    <div className="flex items-center gap-4">
                      <div className="flex-grow h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.percent}%` }}
                          transition={shouldReduceMotion ? { duration: 0 } : { duration: 1, delay: idx * 0.1 }}
                          className={`h-full bg-${item.color}-500 rounded-full`}
                        />
                      </div>
                      <span className={`text-xs font-black text-${item.color}-600 w-12 text-right`}>{item.percent}%</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      item.status === '거의 달성' ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Detailed Reduction Projects */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="text-2xl font-black text-slate-900">주요 감축 사업 현황</h3>
            <p className="text-slate-400 font-medium">광명시에서 추진 중인 탄소중립 핵심 프로젝트입니다.</p>
          </div>
          <div className="flex bg-slate-100 p-1.5 rounded-2xl">
            {['전체', '에너지', '교통', '건물'].map((cat) => (
              <button key={cat} className={`px-6 py-2 rounded-xl text-sm font-black transition-all ${cat === '전체' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { 
              title: '시민 주도 햇빛발전소 건립', 
              category: '에너지', 
              status: '진행중', 
              progress: 85, 
              impact: '연간 450t 감축',
              desc: '공공기관 옥상을 활용한 태양광 발전소 건립 및 시민 펀딩 운영',
              icon: <Zap size={24} className="text-emerald-500" />,
              bg: 'bg-emerald-50'
            },
            { 
              title: '그린 모빌리티 보급 확대', 
              category: '교통', 
              status: '진행중', 
              progress: 62, 
              impact: '연간 320t 감축',
              desc: '전기차/수소차 구매 보조금 지원 및 급속 충전 인프라 구축',
              icon: <Bus size={24} className="text-blue-500" />,
              bg: 'bg-blue-50'
            },
            { 
              title: '노후 공공건축물 그린리모델링', 
              category: '건물', 
              status: '완료', 
              progress: 100, 
              impact: '연간 180t 감축',
              desc: '창호 교체, 단열 보강 등을 통한 노후 어린이집/보건소 에너지 효율 개선',
              icon: <Building2 size={24} className="text-amber-500" />,
              bg: 'bg-amber-50'
            },
          ].map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={shouldReduceMotion ? { duration: 0 } : { delay: idx * 0.1 }}
              className="bg-white rounded-[16px] border border-line-normal shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col"
            >
              <div className="p-8 space-y-6 flex-grow">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 ${project.bg} rounded-xl flex items-center justify-center`}>
                    {project.icon}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    project.status === '완료' ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'
                  }`}>
                    {project.status}
                  </span>
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{project.category}</p>
                  <h4 className="text-xl font-black text-slate-900 leading-tight">{project.title}</h4>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">{project.desc}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-black">
                    <span className="text-slate-400 uppercase tracking-widest">Progress</span>
                    <span className="text-slate-900">{project.progress}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${project.progress}%` }}
                      transition={shouldReduceMotion ? { duration: 0 } : { duration: 1, delay: 0.5 }}
                      className="h-full bg-emerald-500 rounded-full"
                    />
                  </div>
                </div>
              </div>
              <div className="px-8 py-5 bg-slate-50 border-t border-line-normal flex items-center justify-between">
                <div className="flex items-center gap-2 text-emerald-600 font-black text-xs">
                  <CheckCircle2 size={16} /> {project.impact}
                </div>
                <button className="text-slate-400 hover:text-slate-900 transition-colors">
                  <ChevronRight size={20} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section 
        className="rounded-[32px] p-8 sm:p-12 text-center space-y-6 relative overflow-hidden shadow-sm border border-[var(--color-primary-border)]/20"
        style={{ background: 'linear-gradient(90deg, #D5EDDF 0%, #BAE5D4 21%, #D4EDDF 52%, #B7E3BD 77%, #B5E3B5 100%)' }}
      >
        <div className="relative z-10 max-w-3xl mx-auto space-y-4">
          <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">당신의 실천이 광명을 바꿉니다</h3>
          <p className="text-slate-600 text-base sm:text-lg font-medium">
            탄소중립은 행정의 노력만으로 완성되지 않습니다. <br className="hidden sm:block" />
            시민 여러분의 작은 실천이 모여 거대한 변화를 만듭니다.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
          <button className="w-full sm:w-auto bg-slate-900 text-white font-black px-10 py-4 rounded-2xl shadow-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-3">
            탄소중립 실천 서약하기 <ArrowRight size={20} />
          </button>
          <button className="w-full sm:w-auto bg-white/40 backdrop-blur-sm text-slate-900 border border-white/50 font-bold px-10 py-4 rounded-2xl hover:bg-white/60 transition-all">
            감축 아이디어 제안
          </button>
        </div>
      </section>
    </div>
  );
}
