import { 
  CloudRain, 
  Sun, 
  Thermometer, 
  Wind, 
  AlertTriangle, 
  ShieldCheck, 
  Info,
  ChevronRight,
  ArrowRight,
  Globe,
  Droplets,
  Leaf,
  Calendar,
  MapPin,
  Clock,
  Download,
  FileText,
  ExternalLink
} from 'lucide-react';
import { motion } from 'motion/react';

export default function ClimateChangeIntro() {
  return (
    <div className="max-w-[1560px] mx-auto space-y-20 pb-20">
      {/* Hero Section - Atmospheric Mood */}
      <section className="relative h-[600px] rounded-[32px] overflow-hidden flex items-center justify-center text-white">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1920" 
            alt="Climate Change" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-slate-900/80" />
        </div>
        
        <div className="relative z-10 text-center space-y-8 px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 backdrop-blur-md border border-[var(--color-primary-border)]/30 rounded-full text-emerald-300 text-xs font-black uppercase tracking-widest"
          >
            <Globe size={14} /> Climate Action Gwangmyeong
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight"
          >
            기후위기, <br />
            <span className="text-emerald-400">광명</span>이 함께 응답합니다
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-200 font-medium max-w-2xl mx-auto leading-relaxed"
          >
            지구 온난화를 넘어 기후 위기의 시대로 접어들었습니다. <br className="hidden sm:block" />
            광명시는 시민과 함께 기후 회복력을 높이고 지속 가능한 미래를 준비합니다.
          </motion.p>
        </div>
      </section>

      {/* Climate Crisis Reality */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl font-black text-slate-900 leading-tight">
              우리가 직면한 <br />
              <span className="text-emerald-600">기후위기의 현실</span>
            </h2>
            <p className="text-slate-500 text-lg font-medium leading-relaxed">
              기후변화는 더 이상 먼 미래의 이야기가 아닙니다. 폭염, 집중호우, 생태계 변화 등 우리 삶의 모든 영역에 영향을 미치고 있습니다. 광명시는 이러한 위기에 선제적으로 대응하기 위해 기후변화 적응 대책을 수립하고 실행하고 있습니다.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { icon: <Thermometer size={24} />, title: '평균 기온 상승', desc: '지난 100년간 전 세계 평균 기온 1.09℃ 상승' },
              { icon: <CloudRain size={24} />, title: '극한 기상 현상', desc: '집중호우 및 가뭄의 빈도와 강도 증가' },
              { icon: <Droplets size={24} />, title: '수자원 부족', desc: '강수 패턴 변화로 인한 안정적 용수 확보 위기' },
              { icon: <AlertTriangle size={24} />, title: '건강 위협', desc: '온열 질환 및 감염병 매개체 확산 위험' },
            ].map((item, idx) => (
              <div key={idx} className="p-6 bg-slate-50 rounded-2xl border border-line-normal space-y-3 hover:bg-white hover:shadow-xl transition-all duration-300 group">
                <div className="text-emerald-500 group-hover:scale-110 transition-transform">{item.icon}</div>
                <h4 className="font-black text-slate-900">{item.title}</h4>
                <p className="text-sm text-slate-500 font-medium leading-snug">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="relative">
          <div className="aspect-square rounded-[32px] overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=1000" 
              alt="Nature" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 bg-white p-8 rounded-3xl shadow-xl border border-line-normal max-w-[280px] space-y-4">
            <div className="flex items-center gap-3 text-emerald-600">
              <ShieldCheck size={32} />
              <span className="text-2xl font-black">2050</span>
            </div>
            <p className="text-sm font-bold text-slate-900 leading-snug">
              광명시는 2050년까지 탄소중립을 달성하여 기후 안전 도시를 실현하겠습니다.
            </p>
          </div>
        </div>
      </div>

      {/* Strategic Pillars */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-black text-slate-900">광명시 기후변화 대응 전략</h2>
          <p className="text-slate-500 text-lg font-medium">체계적인 계획과 실천으로 기후 위기를 극복합니다.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: '온실가스 감축', 
              desc: '에너지 전환, 친환경 교통, 자원순환을 통해 탄소 배출을 최소화합니다.',
              color: 'bg-blue-500',
              image: 'https://images.unsplash.com/photo-1466611653911-95282fc365d5?auto=format&fit=crop&q=80&w=600'
            },
            { 
              title: '기후위기 적응', 
              desc: '기후 재난으로부터 시민을 보호하고 도시의 회복력을 강화합니다.',
              color: 'bg-emerald-500',
              image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=600'
            },
            { 
              title: '시민 참여 활성화', 
              desc: '모든 시민이 기후 행동의 주체가 되는 거버넌스를 구축합니다.',
              color: 'bg-amber-500',
              image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=600'
            },
          ].map((pillar, idx) => (
            <div key={idx} className="group relative h-[450px] rounded-[32px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
              <img src={pillar.image} alt={pillar.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-10 space-y-4">
                <div className={`w-12 h-1.5 ${pillar.color} rounded-full`} />
                <h3 className="text-2xl font-black text-white">{pillar.title}</h3>
                <p className="text-slate-300 font-medium leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {pillar.desc}
                </p>
                <button className="flex items-center gap-2 text-white font-black text-sm group/btn">
                  자세히 보기 <ArrowRight size={18} className="group-hover/btn:translate-x-2 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Resources & Downloads */}
      <section className="bg-slate-900 rounded-[32px] p-12 lg:p-20 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-black leading-tight">
              기후변화 대응 <br />
              <span className="text-emerald-400">관련 자료실</span>
            </h2>
            <p className="text-slate-400 text-lg font-medium leading-relaxed">
              광명시의 기후변화 대응 정책과 연구 보고서, 시민 실천 가이드를 확인하실 수 있습니다. <br />
              데이터를 통해 투명하게 공개되는 광명시의 노력을 확인하세요.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-[var(--color-primary)] text-white rounded-2xl font-black text-sm hover:bg-[var(--color-primary-hover)] transition-all flex items-center gap-2">
                <Download size={18} /> 전체 자료 다운로드
              </button>
              <button className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-2xl font-black text-sm hover:bg-white/20 transition-all flex items-center gap-2">
                <ExternalLink size={18} /> 유관기관 사이트
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {[
              { title: '2024 광명시 기후변화 적응대책 세부시행계획', date: '2024.03.12', size: '4.2MB' },
              { title: '시민을 위한 기후위기 대응 행동 가이드북', date: '2024.02.28', size: '12.8MB' },
              { title: '광명시 온실가스 인벤토리 분석 보고서 (2023)', date: '2024.01.15', size: '8.5MB' },
              { title: '탄소중립 도시 실현을 위한 전략 로드맵', date: '2023.12.20', size: '3.1MB' },
            ].map((file, idx) => (
              <div key={idx} className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl flex items-center justify-between group hover:bg-white/10 transition-all cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-400">
                    <FileText size={24} />
                  </div>
                  <div>
                    <h4 className="font-black text-sm group-hover:text-emerald-400 transition-colors">{file.title}</h4>
                    <p className="text-xs text-slate-500 font-bold">{file.date} • {file.size}</p>
                  </div>
                </div>
                <Download size={20} className="text-slate-500 group-hover:text-white transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center space-y-8 py-10">
        <h2 className="text-3xl font-black text-slate-900">지금 바로 기후 행동에 동참하세요</h2>
        <div className="flex justify-center gap-4">
          <button className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-black text-lg hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20 flex items-center gap-3">
            실천 방법 알아보기 <ChevronRight size={24} />
          </button>
        </div>
      </section>
    </div>
  );
}
