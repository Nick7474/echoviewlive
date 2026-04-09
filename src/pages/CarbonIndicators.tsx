import { useState, useEffect } from 'react';
import { 
  BarChart3, 
  TrendingDown, 
  Target, 
  Zap, 
  Wind, 
  Droplets, 
  Leaf, 
  Truck,
  TreePine,
  Activity, 
  Info,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  Search,
  Filter,
  RefreshCw,
  MapPin,
  Clock,
  Download,
  Share2,
  Calendar
} from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  Legend,
  PieChart,
  Pie,
  RadialBarChart,
  RadialBar,
  ComposedChart,
  Line
} from 'recharts';

const data = [
  { year: '2021', value: 420, intensity: 0.85, perCapita: 8.2 },
  { year: '2022', value: 380, intensity: 0.78, perCapita: 7.8 },
  { year: '2023', value: 510, intensity: 0.72, perCapita: 7.4 },
  { year: '2024', value: 680, intensity: 0.65, perCapita: 7.1 },
  { year: '2025', value: 620, intensity: 0.58, perCapita: 6.8 },
  { year: '2026', value: 540, intensity: 0.52, perCapita: 6.5 },
];

const sectorData = [
  { name: '에너지', value: 45, color: 'var(--color-status-positive)' },
  { name: '교통',   value: 28, color: 'var(--color-status-info)' },
  { name: '건물',   value: 15, color: 'var(--color-status-cautionary)' },
  { name: '폐기물', value: 12, color: 'var(--color-status-negative)' },
];

const coreIndicators = [
  { 
    id: 'per-capita',
    label: '1인당 탄소 배출량', 
    value: '7.1', 
    unit: 'tCO2eq', 
    target: '5.5',
    trend: 'down',
    trendValue: '4.2%',
    icon: <Activity size={24} />,
    color: 'emerald',
    description: '광명시민 1인당 연간 온실가스 배출량'
  },
  { 
    id: 'renewable',
    label: '재생에너지 전환율', 
    value: '24.8', 
    unit: '%', 
    target: '40.0',
    trend: 'up',
    trendValue: '6.5%',
    icon: <Zap size={24} />,
    color: 'amber',
    description: '총 에너지 소비 대비 재생에너지 비중'
  },
  { 
    id: 'transport',
    label: '수송 부문 배출량', 
    value: '124.5', 
    unit: 'ktCO2eq', 
    target: '100.0',
    trend: 'down',
    trendValue: '2.1%',
    icon: <Truck size={24} />,
    color: 'blue',
    description: '도로 수송 및 대중교통 탄소 배출량'
  },
  { 
    id: 'intensity',
    label: '탄소 집약도', 
    value: '0.65', 
    unit: 'tCO2/백만원', 
    target: '0.45',
    trend: 'down',
    trendValue: '8.4%',
    icon: <BarChart3 size={24} />,
    color: 'indigo',
    description: 'GRDP 대비 온실가스 배출 효율'
  },
  { 
    id: 'building',
    label: '건물 에너지 효율등급', 
    value: '1+++', 
    unit: '등급', 
    target: '1+++',
    trend: 'up',
    trendValue: '12%',
    icon: <Zap size={24} />,
    color: 'orange',
    description: '공공건축물 제로에너지 인증 비율'
  },
  { 
    id: 'absorption',
    label: '녹색 탄소 흡수량', 
    value: '42.8', 
    unit: 'ktCO2', 
    target: '60.0',
    trend: 'up',
    trendValue: '3.5%',
    icon: <TreePine size={24} />,
    color: 'green',
    description: '도시숲 및 습지 탄소 흡수 총량'
  },
  { 
    id: 'waste',
    label: '폐기물 감량화율', 
    value: '18.4', 
    unit: '%', 
    target: '25.0',
    trend: 'up',
    trendValue: '5.2%',
    icon: <RefreshCw size={24} />,
    color: 'rose',
    description: '전년 대비 생활폐기물 발생 감소율'
  }
];

const radialData = [
  { name: '재생에너지', value: 24.8, fill: '#f59e0b' },
  { name: '폐기물감량', value: 18.4, fill: '#ef4444' },
  { name: '건물효율', value: 65, fill: '#10b981' },
];

export default function CarbonIndicators() {
  useEffect(() => {
    document.title = "탄소 지표 | 에코뷰";
  }, []);
  const shouldReduceMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState('전체');

  return (
    <div className="max-w-[1560px] mx-auto space-y-12 pb-20">
      <h1 className="sr-only">탄소 지표</h1>
      {/* Real-time Update Bar */}
      <div className="bg-[var(--color-primary-subtle)] border border-[var(--color-primary-border)]/20 rounded-2xl px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-emerald-600 font-black text-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            LIVE
          </div>
          <p className="text-slate-500 text-xs font-bold">데이터 업데이트: 2024.03.21 14:30</p>
        </div>
        <div className="flex items-center gap-2 text-slate-400 text-xs font-bold">
          <Clock size={14} /> 다음 업데이트까지 15:00
        </div>
      </div>

      {/* Header Section */}
      <section className="relative bg-slate-900 rounded-[32px] p-10 sm:p-16 overflow-hidden text-white group shadow-2xl">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=1920" 
            alt="Carbon Indicators Header" 
            className="w-full h-full object-cover opacity-40 transition-transform duration-1000 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-emerald-900/40" />
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/20 backdrop-blur-md border border-[var(--color-primary-border)]/30 text-emerald-400 text-[10px] font-black rounded-full uppercase tracking-widest">
              <BarChart3 size={14} /> City Indicators
            </div>
            <h1 className="text-4xl sm:text-6xl font-black leading-tight tracking-tighter">
              탄소지표 <span className="text-emerald-400">모니터링</span>
            </h1>
            <p className="text-slate-300 text-lg sm:text-xl font-medium max-w-2xl leading-relaxed">
              광명시의 탄소중립 달성 여부를 판단하는 핵심 지표들을 통합 관리합니다. <br className="hidden lg:block" />
              데이터 기반의 객관적인 지표를 통해 기후위기 대응 성과를 확인하세요.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button className="w-full sm:w-auto px-8 py-4 bg-[var(--color-primary)] text-white rounded-2xl font-black text-sm hover:bg-[var(--color-primary-hover)] transition-all flex items-center justify-center gap-2 shadow-xl shadow-[var(--color-primary)]/20">
              <Download size={18} /> 데이터 다운로드
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-2xl font-black text-sm hover:bg-white/20 transition-all flex items-center justify-center gap-2">
              <Share2 size={18} /> 공유하기
            </button>
          </div>
        </div>
      </section>

      {/* Key Indicators Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: '2022년 대비 탄소감축률', value: '21.4', unit: '%', icon: <TrendingDown size={24} />, trend: 'down', trendValue: '12.4%', color: 'text-emerald-500', bg: 'bg-emerald-50' },
          { label: '재생에너지 발전 비율', value: '24.8', unit: '%', icon: <Zap size={24} />, trend: 'up', trendValue: '4.2%', color: 'text-amber-500', bg: 'bg-amber-50' },
          { label: '친환경 차량 보급률', value: '18.2', unit: '%', icon: <Truck size={24} />, trend: 'up', trendValue: '8.4%', color: 'text-blue-500', bg: 'bg-blue-50' },
          { label: '탄소흡수원 면적', value: '1,240', unit: 'ha', icon: <TreePine size={24} />, trend: 'up', trendValue: '3.5%', color: 'text-emerald-600', bg: 'bg-emerald-50' },
        ].map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { delay: idx * 0.1 }}
            className="bg-white p-8 rounded-[24px] shadow-sm border border-line-normal space-y-4 group hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
          >
            <div className="flex items-center justify-between">
              <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}>
                {stat.icon}
              </div>
              <div className={`flex items-center gap-1 text-xs font-black ${stat.trend === 'up' ? 'text-blue-500' : 'text-emerald-500'} bg-slate-50 px-2 py-1 rounded-full`}>
                {stat.trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {stat.trendValue}
              </div>
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black text-slate-900 tracking-tight">{stat.value}</span>
                <span className="text-sm font-bold text-slate-400">{stat.unit}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Core Indicators Section - Bento Grid Style */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">핵심 탄소 지표</h2>
            <p className="text-slate-400 font-medium">광명시 탄소중립 2050 로드맵의 7대 핵심 성과 지표입니다.</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-2xl text-slate-500 text-xs font-black">
            <Calendar size={14} /> 2024년 1분기 기준
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {coreIndicators.map((indicator, idx) => (
            <motion.div
              key={indicator.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={shouldReduceMotion ? { duration: 0 } : { delay: idx * 0.05 }}
              className={`relative overflow-hidden bg-white p-8 rounded-[32px] border border-line-normal shadow-sm hover:shadow-2xl transition-all duration-500 group ${
                idx === 0 ? 'lg:col-span-2 lg:row-span-1' : ''
              }`}
            >
              {/* Decorative Background Element */}
              <div className={`absolute -right-4 -top-4 w-24 h-24 bg-${indicator.color}-500/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700`} />
              
              <div className="relative z-10 space-y-6">
                <div className="flex items-center justify-between">
                  <div className={`w-14 h-14 bg-${indicator.color}-50 text-${indicator.color}-600 rounded-2xl flex items-center justify-center shadow-sm group-hover:rotate-12 transition-transform`}>
                    {indicator.icon}
                  </div>
                  <div className={`flex items-center gap-1 text-[10px] font-black px-2.5 py-1 rounded-full ${
                    indicator.trend === 'up' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'
                  }`}>
                    {indicator.trend === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                    {indicator.trendValue}
                  </div>
                </div>

                <div className="space-y-1">
                  <h4 className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{indicator.label}</h4>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-slate-900 tracking-tighter">{indicator.value}</span>
                    <span className="text-sm font-bold text-slate-400">{indicator.unit}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-line-normal flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="text-[9px] font-black text-slate-300 uppercase tracking-tighter">2030 목표</p>
                    <p className="text-xs font-black text-slate-600">{indicator.target}{indicator.unit}</p>
                  </div>
                  <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-${indicator.color}-500 rounded-full`} 
                      style={{ width: `${Math.min((parseFloat(indicator.value) / parseFloat(indicator.target)) * 100, 100)}%` }}
                    />
                  </div>
                </div>
                
                <p className="text-[11px] text-slate-400 font-medium leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {indicator.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Advanced Analytics Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Carbon Intensity & Per Capita Trend */}
        <section className="xl:col-span-2 bg-white rounded-[32px] p-10 shadow-sm border border-line-normal space-y-10">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                <Activity className="text-emerald-500" size={28} /> 탄소 효율성 분석
              </h3>
              <p className="text-slate-400 text-sm font-medium">탄소 집약도 및 1인당 배출량의 상관관계 분석</p>
            </div>
            <div className="flex bg-slate-50 p-1.5 rounded-2xl">
              <button className="px-6 py-2 bg-white text-emerald-600 rounded-xl text-xs font-black shadow-sm">통합 분석</button>
              <button className="px-6 py-2 text-slate-400 hover:text-slate-600 rounded-xl text-xs font-black transition-all">지표별</button>
            </div>
          </div>
          
          <div className="h-[450px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="year" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 800 }}
                  dy={10}
                />
                <YAxis 
                  yAxisId="left"
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 800 }}
                />
                <YAxis 
                  yAxisId="right"
                  orientation="right"
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 800 }}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '16px', color: '#fff' }}
                />
                <Legend verticalAlign="top" align="right" height={36} iconType="circle" />
                <Bar yAxisId="left" dataKey="perCapita" name="1인당 배출량 (tCO2eq)" fill="#10b981" radius={[8, 8, 0, 0]} barSize={40} />
                <Line yAxisId="right" type="monotone" dataKey="intensity" name="탄소 집약도" stroke="#3b82f6" strokeWidth={4} dot={{ r: 6, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Energy & Transition Radial Chart */}
        <section className="bg-white rounded-[32px] p-10 shadow-sm border border-line-normal flex flex-col justify-between">
          <div className="space-y-1">
            <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <Zap className="text-amber-500" size={28} /> 전환 지표 달성도
            </h3>
            <p className="text-slate-400 text-sm font-medium">주요 전환 지표의 목표 대비 현재 수준</p>
          </div>

          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart 
                cx="50%" 
                cy="50%" 
                innerRadius="30%" 
                outerRadius="100%" 
                barSize={20} 
                data={radialData}
                startAngle={180}
                endAngle={-180}
              >
                <RadialBar
                  label={{ position: 'insideStart', fill: '#fff', fontSize: 10, fontWeight: 800 }}
                  background
                  dataKey="value"
                />
                <Legend iconSize={10} layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ fontSize: '12px', fontWeight: 800 }} />
                <Tooltip />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-amber-500 shadow-sm">
                  <Zap size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-amber-600 uppercase">재생에너지 전환</p>
                  <p className="text-sm font-black text-slate-900">목표까지 15.2% 남음</p>
                </div>
              </div>
              <ChevronRight className="text-amber-300" size={20} />
            </div>
          </div>
        </section>
      </div>

      {/* Sector Performance Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="bg-white rounded-[32px] p-10 shadow-sm border border-line-normal space-y-10">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <Truck className="text-blue-500" size={28} /> 수송 및 폐기물 성과
            </h3>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-blue-500 rounded-full" />
              <span className="text-xs font-black text-slate-400">수송</span>
              <span className="w-3 h-3 bg-rose-500 rounded-full ml-2" />
              <span className="text-xs font-black text-slate-400">폐기물</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="p-6 bg-blue-50 rounded-[24px] border border-blue-100 space-y-4">
                <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">수송 부문 감축</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-slate-900">124.5</span>
                  <span className="text-xs font-bold text-slate-400">ktCO2</span>
                </div>
                <div className="w-full h-2 bg-white rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-[65%]" />
                </div>
                <p className="text-[11px] text-blue-500 font-bold">전년 대비 2.1% 감소</p>
              </div>
              <div className="p-6 bg-slate-50 rounded-[24px] border border-line-normal space-y-2">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">친환경차 보급</p>
                <p className="text-xl font-black text-slate-900">18.2%</p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="p-6 bg-rose-50 rounded-[24px] border border-rose-100 space-y-4">
                <p className="text-[10px] font-black text-rose-600 uppercase tracking-widest">폐기물 감량화</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-slate-900">18.4</span>
                  <span className="text-xs font-bold text-slate-400">%</span>
                </div>
                <div className="w-full h-2 bg-white rounded-full overflow-hidden">
                  <div className="h-full bg-rose-500 w-[45%]" />
                </div>
                <p className="text-[11px] text-rose-500 font-bold">목표치 25% 대비 73% 달성</p>
              </div>
              <div className="p-6 bg-slate-50 rounded-[24px] border border-line-normal space-y-2">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">재활용률</p>
                <p className="text-xl font-black text-slate-900">68.4%</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-emerald-900 rounded-[32px] p-10 shadow-2xl relative overflow-hidden text-white group">
          <div className="absolute inset-0 z-0 opacity-20">
            <img 
              src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1000" 
              alt="Forest" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="relative z-10 h-full flex flex-col justify-between space-y-12">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 text-emerald-300 text-[10px] font-black rounded-full uppercase tracking-widest">
                <TreePine size={14} /> Nature-based Solutions
              </div>
              <h3 className="text-4xl font-black leading-tight">녹색 탄소 흡수원 <br />성과 리포트</h3>
              <p className="text-emerald-100/70 font-medium leading-relaxed">
                광명시의 도시숲, 공원, 습지 등 자연 기반 솔루션을 통한 <br />
                탄소 흡수 능력을 실시간으로 모니터링합니다.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-2">
                <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">현재 흡수량</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black text-white">42.8</span>
                  <span className="text-sm font-bold text-emerald-300">ktCO2</span>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">조성 면적</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black text-white">1,240</span>
                  <span className="text-sm font-bold text-emerald-300">ha</span>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-white/10 flex items-center justify-between">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-emerald-900 bg-emerald-800 flex items-center justify-center overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" referrerPolicy="no-referrer" />
                  </div>
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-emerald-900 bg-emerald-700 flex items-center justify-center text-[10px] font-black">
                  +12
                </div>
              </div>
              <button className="px-6 py-3 bg-white text-emerald-900 rounded-2xl font-black text-xs hover:bg-[var(--color-primary-subtle)] transition-all shadow-xl">
                상세 보고서 보기
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Main Analysis Section (Original) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="bg-white rounded-[24px] p-10 shadow-sm border border-line-normal space-y-10">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <Activity className="text-emerald-500" size={28} /> 탄소 배출량 변화 추이
            </h3>
            <div className="flex bg-slate-50 p-1.5 rounded-xl">
              <button className="px-6 py-2 bg-white text-emerald-600 rounded-xl text-sm font-black shadow-sm">연간</button>
              <button className="px-6 py-2 text-slate-400 hover:text-slate-600 rounded-xl text-sm font-black transition-all">월간</button>
            </div>
          </div>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
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
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#10b981" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="bg-white rounded-[24px] p-10 shadow-sm border border-line-normal space-y-10">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <RefreshCw className="text-emerald-500" size={28} /> 부문별 탄소 배출 비중
            </h3>
            <button className="p-3 bg-slate-50 text-slate-400 rounded-2xl hover:text-emerald-500 transition-colors">
              <RefreshCw size={20} />
            </button>
          </div>
          <div className="h-[400px] w-full flex items-center justify-center">
            <div className="w-full h-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sectorData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={140}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {sectorData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff' }}
                  />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36}
                    iconType="circle"
                    wrapperStyle={{ paddingTop: '20px', fontWeight: 800, fontSize: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>
      </div>

      {/* Detailed Indicators Table */}
      <section className="bg-white rounded-[24px] shadow-sm border border-line-normal overflow-hidden">
        <div className="p-10 border-b border-line-neutral flex flex-col sm:flex-row items-center justify-between gap-8">
          <div className="space-y-1">
            <h3 className="text-2xl font-black text-slate-900">세부 지표 현황</h3>
            <p className="text-slate-400 font-medium">광명시 탄소중립 기본계획에 따른 주요 지표별 상세 데이터입니다.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="지표명 검색..." 
                className="pl-12 pr-6 py-3 bg-slate-50 border border-line-normal rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-border)]/20 transition-all"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-line-neutral">
                <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">분야</th>
                <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">지표명</th>
                <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">단위</th>
                <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">현재값</th>
                <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">목표값</th>
                <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">상태</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line-neutral">
              {[
                { cat: '에너지', name: '재생에너지 발전 비율', unit: '%', current: '24.8', target: '30.0', status: 'normal' },
                { cat: '교통', name: '친환경 차량 보급률', unit: '%', current: '18.2', target: '25.0', status: 'normal' },
                { cat: '건물', name: '제로에너지 건축물 인증 건수', unit: '건', current: '12', target: '20', status: 'warning' },
                { cat: '폐기물', name: '생활폐기물 재활용률', unit: '%', current: '68.4', target: '75.0', status: 'normal' },
                { cat: '흡수원', name: '도시숲 조성 면적', unit: 'ha', current: '312', target: '500', status: 'normal' },
              ].map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors group cursor-pointer">
                  <td className="px-10 py-6">
                    <span className="px-3 py-1 bg-slate-100 text-slate-500 text-[10px] font-black rounded uppercase tracking-widest">{row.cat}</span>
                  </td>
                  <td className="px-10 py-6">
                    <span className="text-sm font-black text-slate-900">{row.name}</span>
                  </td>
                  <td className="px-10 py-6">
                    <span className="text-sm font-bold text-slate-400">{row.unit}</span>
                  </td>
                  <td className="px-10 py-6">
                    <span className="text-sm font-black text-slate-900">{row.current}</span>
                  </td>
                  <td className="px-10 py-6">
                    <span className="text-sm font-black text-slate-900">{row.target}</span>
                  </td>
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        row.status === 'success' ? 'bg-emerald-500' : 
                        row.status === 'normal' ? 'bg-blue-500' : 'bg-amber-500'
                      }`} />
                      <span className={`text-xs font-black ${
                        row.status === 'success' ? 'text-emerald-500' : 
                        row.status === 'normal' ? 'text-blue-500' : 'text-amber-500'
                      }`}>
                        {row.status === 'success' ? '목표 달성' : row.status === 'normal' ? '정상 추진' : '관리 필요'}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Bottom Info */}
      <section className="bg-slate-50 rounded-[16px] p-10 flex flex-col md:flex-row items-center justify-between gap-8 border border-line-normal">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-emerald-500 shadow-sm">
            <Info size={32} />
          </div>
          <div className="space-y-1">
            <h4 className="text-xl font-black text-slate-900">지표 산출 기준 안내</h4>
            <p className="text-slate-500 font-medium">본 지표는 국가 온실가스 인벤토리(NIR) 및 광명시 통계 연보를 기준으로 산출됩니다.</p>
          </div>
        </div>
        <button className="px-10 py-4 bg-white border border-line-normal text-slate-900 rounded-2xl font-black text-sm hover:bg-gray-50 transition-all shadow-sm flex items-center gap-2">
          지표 정의서 보기 <ChevronRight size={20} />
        </button>
      </section>
    </div>
  );
}
