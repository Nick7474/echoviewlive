import { useState } from 'react';
import { 
  Zap, 
  Wind, 
  Droplets, 
  Leaf, 
  Activity, 
  TrendingDown, 
  AlertCircle, 
  Info,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  Search,
  Filter,
  RefreshCw,
  MapPin,
  Clock,
  Sun,
  Cloud,
  Thermometer,
  CloudRain
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
  Cell
} from 'recharts';

const data = [
  { time: '00:00', value: 420 },
  { time: '04:00', value: 380 },
  { time: '08:00', value: 510 },
  { time: '12:00', value: 680 },
  { time: '16:00', value: 620 },
  { time: '20:00', value: 540 },
  { time: '24:00', value: 460 },
];

const sectorData = [
  { name: '에너지', value: 45, color: '#10b981' },
  { name: '교통', value: 28, color: '#3b82f6' },
  { name: '건물', value: 15, color: '#f59e0b' },
  { name: '폐기물', value: 12, color: '#ef4444' },
];

export default function CarbonNeutralStatus() {
  const [activeTab, setActiveTab] = useState('전체');

  return (
    <div className="max-w-[1560px] mx-auto space-y-8 pb-20">
      {/* Header Section */}
      <section className="relative rounded-[16px] p-6 sm:p-10 shadow-xl overflow-hidden min-h-[280px] flex flex-col lg:flex-row items-center justify-between gap-8 group">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&q=80&w=1920" 
            alt="Carbon Neutral Header" 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/95 via-emerald-900/80 to-emerald-900/40" />
        </div>

        <div className="space-y-6 text-center lg:text-left relative z-10 max-w-3xl">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/20 backdrop-blur-md text-emerald-300 text-[11px] font-black rounded-full uppercase tracking-[0.2em] border border-[var(--color-primary-border)]/30"
          >
            <Activity size={14} className="animate-pulse" /> Real-time Dashboard
          </motion.div>
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight">
              실시간 <span className="text-emerald-400">탄소중립</span> 현황
            </h1>
            <p className="text-emerald-50/80 text-lg sm:text-xl font-medium leading-relaxed max-w-2xl">
              광명시 전역의 탄소 배출 및 감축 현황을 실시간 데이터로 모니터링합니다. <br className="hidden lg:block" />
              에너지, 교통, 건물 등 주요 분야별 탄소 발자국을 확인하세요.
            </p>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10"
        >
          <div className="bg-white/10 backdrop-blur-xl p-6 rounded-[24px] border border-white/20 flex items-center gap-5 shadow-2xl">
            <div className="w-14 h-14 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
              <RefreshCw size={28} className="animate-spin-slow" />
            </div>
            <div className="space-y-1">
              <p className="text-[11px] font-black text-emerald-300 uppercase tracking-[0.15em]">Last Updated</p>
              <p className="text-lg font-black text-white">2026.03.26 14:26:05</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Main Stats & Real-time Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left: Main Stats & Chart (3 cols) */}
        <div className="lg:col-span-3 space-y-8">
          {/* Real-time Carbon & Energy Summary Header */}
          <div className="bg-emerald-950 rounded-[16px] p-6 text-white flex items-center justify-between shadow-lg">
            <h3 className="text-xl font-black flex items-center gap-3">
              <Activity size={24} className="text-emerald-400" /> 실시간 탄소·에너지 종합 현황
            </h3>
            <div className="flex items-center gap-4 text-xs font-bold text-emerald-400/80">
              <span className="flex items-center gap-1.5">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" /> LIVE · 5분마다 갱신
              </span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: '태양광 발전량', value: '847', unit: 'MWh', trend: 'up', trendValue: '7.1%', color: 'emerald' },
              { label: '전력 소비량', value: '2,940', unit: 'MWh', trend: 'up', trendValue: '2.3%', color: 'rose' },
              { label: '탄소포인트 발행', value: '38,240', unit: 'P', trend: 'up', trendValue: '12%', color: 'amber' },
            ].map((stat, idx) => (
              <div key={idx} className="bg-white p-6 rounded-[16px] shadow-sm border border-line-normal space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                  <div className={`flex items-center gap-1 text-xs font-black ${stat.color === 'rose' ? 'text-rose-500' : 'text-emerald-500'}`}>
                    <ArrowUpRight size={14} /> {stat.trendValue}
                  </div>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-slate-900">{stat.value}</span>
                  <span className="text-sm font-bold text-slate-400">{stat.unit}</span>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full bg-${stat.color}-500 rounded-full`} style={{ width: '65%' }} />
                </div>
              </div>
            ))}
          </div>

          {/* Main Trend Chart */}
          <section className="bg-white rounded-[16px] p-8 shadow-sm border border-line-normal space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-slate-900">시간별 탄소 배출량 추이 <span className="text-slate-400 font-medium text-sm ml-2">(tCO2/h, 오늘 기준)</span></h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                  <div className="w-3 h-3 bg-emerald-400 rounded-sm" /> 배출량
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                  <div className="w-3 h-3 bg-blue-400 rounded-sm" /> 현재 시각
                </div>
              </div>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="time" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }}
                    dy={10}
                  />
                  <YAxis hide />
                  <Tooltip 
                    cursor={{ fill: '#f8fafc' }}
                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff' }}
                  />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={40}>
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 4 ? '#3b82f6' : '#6ee7b7'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>
        </div>

        {/* Right: Side Widgets (1 col) */}
        <div className="space-y-8">
          {/* Carbon Emission & Absorption Board */}
          <section className="bg-white rounded-[16px] p-8 shadow-sm border border-line-normal space-y-6">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <Leaf className="text-emerald-500" size={20} /> 탄소 배출·흡수 현황
            </h3>
            <div className="space-y-4">
              {[
                { label: '오늘 총 배출', value: '4,218', unit: 'tCO2', color: 'text-rose-500' },
                { label: '산림·녹지 흡수', value: '-312', unit: 'tCO2', color: 'text-emerald-500' },
                { label: '재생에너지 상쇄', value: '-428', unit: 'tCO2', color: 'text-emerald-500' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between py-2 border-b border-line-normal last:border-0">
                  <span className="text-sm font-bold text-slate-500">{item.label}</span>
                  <span className={`text-sm font-black ${item.color}`}>{item.value} {item.unit}</span>
                </div>
              ))}
              <div className="pt-4 mt-4 border-t-2 border-line-normal flex items-center justify-between">
                <span className="text-base font-black text-slate-900">순 배출량</span>
                <span className="text-lg font-black text-rose-500">3,478 tCO2</span>
              </div>
            </div>
          </section>

          {/* Weather Status Widget */}
          <section className="bg-white rounded-[16px] p-8 shadow-sm border border-line-normal space-y-6">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <Cloud className="text-blue-500" size={20} /> 기상 현황
            </h3>
            <div className="space-y-5">
              {[
                { label: '기온', value: '8.4', unit: '°C', icon: <Thermometer size={16} /> },
                { label: '일사량', value: '4.8', unit: 'MJ/㎡', icon: <Sun size={16} /> },
                { label: '풍속', value: '3.2', unit: 'm/s NE', icon: <Wind size={16} /> },
                { label: '미세먼지(PM10)', value: '44', unit: 'μg/㎥ 보통', icon: <CloudRain size={16} /> },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-400">
                    {item.icon}
                    <span className="text-sm font-bold">{item.label}</span>
                  </div>
                  <span className="text-sm font-black text-slate-900">{item.value} <span className="text-slate-400 font-bold">{item.unit}</span></span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Sector Distribution Improved UI */}
      <section className="bg-white rounded-[16px] p-10 shadow-sm border border-line-normal space-y-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center">
            <Filter size={20} />
          </div>
          <div className="space-y-0.5">
            <h3 className="text-2xl font-black text-slate-900">부문별 탄소 배출 현황</h3>
            <p className="text-sm text-slate-400 font-medium">오늘 기준 부문별 배출량 비중입니다.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { name: '산업 부문', value: '1,820', percent: 43.1, color: 'rose', icon: '🏭' },
            { name: '수송 부문', value: '1,240', percent: 29.4, color: 'amber', icon: '🚗' },
            { name: '가정 부문', value: '680', percent: 16.1, color: 'blue', icon: '🏠' },
            { name: '상업 부문', value: '478', percent: 11.3, color: 'emerald', icon: '🏢' },
          ].map((sector, idx) => (
            <div key={idx} className="space-y-4 p-6 rounded-2xl bg-slate-50/50 border border-line-normal group hover:bg-white hover:shadow-xl transition-all duration-500">
              <div className="flex items-center justify-between">
                <span className="text-2xl">{sector.icon}</span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sector {idx + 1}</span>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-black text-slate-500">{sector.name}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black text-slate-900">{sector.value}</span>
                  <span className="text-xs font-bold text-slate-400">t</span>
                </div>
                <p className="text-xs font-bold text-slate-400">전체 대비 {sector.percent}%</p>
              </div>
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${sector.percent}%` }}
                  transition={{ duration: 1, delay: idx * 0.1 }}
                  className={`h-full bg-${sector.color}-500 rounded-full`}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Real-time Sensor Data Grid */}
      <section className="bg-white rounded-[16px] shadow-sm border border-line-normal overflow-hidden">
        <div className="p-8 border-b border-line-normal flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <MapPin className="text-emerald-500" size={24} /> 지점별 실시간 탄소 지표
            </h3>
            <p className="text-sm text-slate-400 font-medium">광명시 주요 거점별 설치된 IoT 센서 데이터입니다.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <input 
                type="text" 
                placeholder="지점명 검색..." 
                className="pl-10 pr-4 py-2.5 bg-slate-50 border border-line-normal rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-border)]/20 transition-all"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            </div>
            <button className="p-2.5 bg-slate-50 text-slate-400 rounded-xl hover:text-emerald-500 transition-colors">
              <Filter size={20} />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-line-normal">
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">상태</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">지점명</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">에너지 사용량</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">탄소 배출량</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">온도/습도</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">최종 업데이트</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {[
                { name: '광명시청 본관', status: 'Normal', energy: '124 kWh', carbon: '56.2 kg', temp: '22.4°C / 45%', time: '2분 전' },
                { name: '철산역 광장', status: 'Warning', energy: '245 kWh', carbon: '112.8 kg', temp: '24.1°C / 42%', time: '5분 전' },
                { name: '소하동 행정복지센터', status: 'Normal', energy: '86 kWh', carbon: '38.4 kg', temp: '21.8°C / 48%', time: '12분 전' },
                { name: '광명동굴 입구', status: 'Normal', energy: '156 kWh', carbon: '72.1 kg', temp: '18.5°C / 55%', time: '8분 전' },
                { name: '광명시민체육관', status: 'Normal', energy: '312 kWh', carbon: '142.5 kg', temp: '23.2°C / 44%', time: '1분 전' },
              ].map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors group cursor-pointer">
                  <td className="px-8 py-5">
                    <div className={`w-2 h-2 rounded-full ${row.status === 'Normal' ? 'bg-emerald-500' : 'bg-amber-500'} shadow-sm shadow-current/20`} />
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-sm font-black text-slate-900">{row.name}</span>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-sm font-bold text-slate-600">{row.energy}</span>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-sm font-black text-emerald-600">{row.carbon}</span>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-sm font-medium text-slate-500">{row.temp}</span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                      <Clock size={14} /> {row.time}
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button className="p-2 text-slate-300 hover:text-emerald-500 transition-colors">
                      <ChevronRight size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-6 bg-slate-50 text-center">
          <button className="text-sm font-black text-slate-500 hover:text-emerald-600 transition-colors flex items-center gap-2 mx-auto">
            전체 지점 데이터 보기 <ArrowUpRight size={16} />
          </button>
        </div>
      </section>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="bg-slate-900 rounded-[16px] p-10 text-white space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="space-y-2 relative z-10">
            <h4 className="text-2xl font-black tracking-tight">탄소중립 실천 포인트제</h4>
            <p className="text-slate-400 font-medium leading-relaxed">
              광명시민이라면 누구나! 일상 속 탄소중립 실천하고 <br />
              현금처럼 사용 가능한 포인트를 적립하세요.
            </p>
          </div>
          <button className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-black px-8 py-4 rounded-2xl transition-all shadow-lg shadow-[var(--color-primary)]/20 flex items-center gap-2 relative z-10">
            참여 방법 알아보기 <ChevronRight size={20} />
          </button>
        </section>

        <section className="bg-white rounded-[16px] p-10 shadow-sm border border-line-normal space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center">
              <AlertCircle size={32} />
            </div>
            <div className="space-y-1">
              <h4 className="text-xl font-black text-slate-900">데이터 수집 안내</h4>
              <p className="text-sm text-slate-400 font-medium">실시간 데이터는 센서 상태에 따라 오차가 발생할 수 있습니다.</p>
            </div>
          </div>
          <p className="text-slate-600 font-medium leading-relaxed">
            본 대시보드의 데이터는 광명시 전역에 설치된 1,200여 개의 IoT 센서를 통해 수집됩니다. 
            공식 통계 데이터는 검증 과정을 거쳐 매월 초 업데이트됩니다.
          </p>
        </section>
      </div>
    </div>
  );
}
