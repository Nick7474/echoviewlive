import { useState } from 'react';
import { 
  Building2, 
  Cpu, 
  Wifi, 
  ShieldCheck, 
  Truck, 
  TreePine, 
  Zap, 
  Activity, 
  TrendingDown,
  Target,
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
  Calendar,
  Globe,
  Smartphone,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { motion } from 'motion/react';
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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

const radarData = [
  { subject: '스마트 거버넌스', A: 120, B: 110, fullMark: 150 },
  { subject: '스마트 경제', A: 98, B: 130, fullMark: 150 },
  { subject: '스마트 환경', A: 86, B: 130, fullMark: 150 },
  { subject: '스마트 리빙', A: 99, B: 100, fullMark: 150 },
  { subject: '스마트 모빌리티', A: 85, B: 90, fullMark: 150 },
  { subject: '스마트 피플', A: 65, B: 85, fullMark: 150 },
];

const barData = [
  { name: '2021', value: 42 },
  { name: '2022', value: 58 },
  { name: '2023', value: 72 },
  { name: '2024', value: 85 },
  { name: '2025', value: 94 },
];

export default function SmartCityIndicators() {
  const [activeTab, setActiveTab] = useState('전체');

  return (
    <div className="max-w-[1560px] mx-auto space-y-12 pb-20">
      {/* Real-time Update Bar */}
      <div className="bg-blue-50 border border-blue-100 rounded-2xl px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-blue-600 font-black text-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
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
            src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=1920" 
            alt="Smart City Indicators Header" 
            className="w-full h-full object-cover opacity-40 transition-transform duration-1000 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-blue-900/40" />
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/20 backdrop-blur-md border border-blue-500/30 text-blue-400 text-[10px] font-black rounded-full uppercase tracking-widest">
              <Cpu size={14} /> Smart City Indicators
            </div>
            <h1 className="text-4xl sm:text-6xl font-black leading-tight tracking-tighter">
              스마트도시 <span className="text-blue-400">지표 모니터링</span>
            </h1>
            <p className="text-slate-300 text-lg sm:text-xl font-medium max-w-2xl leading-relaxed">
              광명시의 스마트도시 성숙도를 측정하는 핵심 지표들을 통합 관리합니다. <br className="hidden lg:block" />
              데이터와 기술을 통해 시민의 삶의 질이 얼마나 향상되었는지 확인하세요.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button className="w-full sm:w-auto px-8 py-4 bg-blue-500 text-white rounded-2xl font-black text-sm hover:bg-blue-400 transition-all flex items-center justify-center gap-2 shadow-xl shadow-blue-500/20">
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
          { label: '스마트 서비스 보급률', value: '78.4', unit: '%', icon: <Smartphone size={24} />, trend: 'up', trendValue: '12.4%', color: 'text-blue-500', bg: 'bg-blue-50' },
          { label: 'IoT 센서 설치 수', value: '1,245', unit: '개', icon: <Wifi size={24} />, trend: 'up', trendValue: '45.2%', color: 'text-emerald-500', bg: 'bg-emerald-50' },
          { label: '공공 데이터 개방 건수', value: '842', unit: '건', icon: <Globe size={24} />, trend: 'up', trendValue: '8.4%', color: 'text-amber-500', bg: 'bg-amber-50' },
          { label: '스마트 치안 만족도', value: '82.4', unit: '점', icon: <ShieldCheck size={24} />, trend: 'up', trendValue: '3.5%', color: 'text-indigo-500', bg: 'bg-indigo-50' },
        ].map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
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

      {/* Main Analysis Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="bg-white rounded-[24px] p-10 shadow-sm border border-line-normal space-y-10">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <Activity className="text-blue-500" size={28} /> 스마트도시 성숙도 분석
            </h3>
            <div className="flex bg-slate-50 p-1.5 rounded-xl">
              <button className="px-6 py-2 bg-white text-blue-600 rounded-xl text-sm font-black shadow-sm">6대 분야</button>
              <button className="px-6 py-2 text-slate-400 hover:text-slate-600 rounded-xl text-sm font-black transition-all">세부 지표</button>
            </div>
          </div>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#f1f5f9" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 800 }} />
                <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                <Radar
                  name="광명시"
                  dataKey="A"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.6}
                />
                <Radar
                  name="전국 평균"
                  dataKey="B"
                  stroke="#94a3b8"
                  fill="#94a3b8"
                  fillOpacity={0.2}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', fontWeight: 800, fontSize: '12px' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="bg-white rounded-[24px] p-10 shadow-sm border border-line-normal space-y-10">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <TrendingDown className="text-blue-500" size={28} /> 연도별 스마트 지수 추이
            </h3>
            <button className="p-3 bg-slate-50 text-slate-400 rounded-2xl hover:text-blue-500 transition-colors">
              <RefreshCw size={20} />
            </button>
          </div>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
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
                <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} barSize={40}>
                  {barData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === barData.length - 1 ? '#3b82f6' : '#e2e8f0'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      {/* Detailed Indicators Table */}
      <section className="bg-white rounded-[24px] shadow-sm border border-line-normal overflow-hidden">
        <div className="p-10 border-b border-line-normal flex flex-col sm:flex-row items-center justify-between gap-8">
          <div className="space-y-1">
            <h3 className="text-2xl font-black text-slate-900">세부 지표 목록</h3>
            <p className="text-slate-400 font-medium">광명시 스마트도시 기본계획에 따른 32개 세부 지표입니다.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="지표명 검색..." 
                className="pl-12 pr-6 py-3 bg-slate-50 border border-line-normal rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-line-normal">
                <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">분야</th>
                <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">지표명</th>
                <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">단위</th>
                <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">현재값</th>
                <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">목표값</th>
                <th className="px-10 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">상태</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {[
                { cat: '모빌리티', name: '스마트 주차장 이용률', unit: '%', current: '68.4', target: '80.0', status: 'normal' },
                { cat: '환경', name: '스마트 쓰레기통 보급률', unit: '%', current: '42.5', target: '60.0', status: 'warning' },
                { cat: '안전', name: '지능형 CCTV 관제율', unit: '%', current: '92.4', target: '95.0', status: 'success' },
                { cat: '거버넌스', name: '시민 참여 플랫폼 가입자 수', unit: '명', current: '12,450', target: '15,000', status: 'success' },
                { cat: '리빙', name: '스마트 헬스케어 이용자 수', unit: '명', current: '8,420', target: '10,000', status: 'normal' },
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
                      {row.status === 'success' && <CheckCircle2 className="text-emerald-500" size={16} />}
                      {row.status === 'normal' && <Activity className="text-blue-500" size={16} />}
                      {row.status === 'warning' && <AlertCircle className="text-amber-500" size={16} />}
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
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-blue-500 shadow-sm">
            <Info size={32} />
          </div>
          <div className="space-y-1">
            <h4 className="text-xl font-black text-slate-900">스마트도시 지표 산출 안내</h4>
            <p className="text-slate-500 font-medium">국토교통부 스마트도시 지표(KPI) 가이드라인을 준수하여 산출되었습니다.</p>
          </div>
        </div>
        <button className="px-10 py-4 bg-white border border-line-normal text-slate-900 rounded-2xl font-black text-sm hover:bg-gray-50 transition-all shadow-sm flex items-center gap-2">
          지표 상세 정의 보기 <ChevronRight size={20} />
        </button>
      </section>
    </div>
  );
}
