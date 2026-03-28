import { 
  Building2, 
  Leaf, 
  Zap, 
  ShieldCheck, 
  Users, 
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import { motion } from 'motion/react';

export default function BusinessIntro() {
  const businesses = [
    {
      title: '탄소중립 스마트시티',
      desc: '에너지 자립, 탄소 배출 모니터링 사업을 통해 기후 위기에 대응합니다.',
      icon: <Leaf size={24} />,
      color: 'bg-emerald-50 text-emerald-600'
    },
    {
      title: '지능형 교통 체계',
      desc: '전기버스, 스마트 주차, DRT 운영으로 도시 이동성을 혁신합니다.',
      icon: <Zap size={24} />,
      color: 'bg-blue-50 text-blue-600'
    },
    {
      title: '시민 체감형 안전',
      desc: 'IoT 센서 기반 재난 대응, 스마트 CCTV로 안전한 도시를 만듭니다.',
      icon: <ShieldCheck size={24} />,
      color: 'bg-amber-50 text-amber-600'
    }
  ];

  return (
    <div className="space-y-16 pb-20">
      <section 
        className="relative min-h-[500px] rounded-[32px] overflow-hidden flex flex-col justify-center p-12 lg:p-20 shadow-2xl border border-line-normal group"
      >
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 z-0 transition-transform duration-1000 group-hover:scale-105"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=1920")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-900/70 to-transparent z-10 backdrop-blur-[2px]" />

        <div className="relative z-20 space-y-8 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md text-white text-xs font-black rounded-full uppercase tracking-widest border border-white/30">
            <Building2 size={14} /> Business Introduction
          </div>
          <h1 className="text-4xl lg:text-6xl font-black text-white leading-tight drop-shadow-lg">
            광명시가 추진하는 <br />
            <span className="text-blue-400">스마트도시 주요 사업</span>
          </h1>
          <p className="text-xl text-blue-50/90 font-bold leading-relaxed max-w-2xl drop-shadow-md">
            광명시는 시민의 삶의 질을 높이고 지속 가능한 미래를 위해 <br />
            다양한 스마트도시 프로젝트를 추진하고 있습니다.
          </p>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {businesses.map((biz, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="p-10 bg-white rounded-[32px] border border-line-normal shadow-sm hover:shadow-xl transition-all duration-500 group"
          >
            <div className={`w-16 h-16 ${biz.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
              {biz.icon}
            </div>
            <h3 className="text-xl font-black text-gray-900 mb-4">{biz.title}</h3>
            <p className="text-gray-500 font-medium leading-relaxed mb-8">{biz.desc}</p>
            <button className="flex items-center gap-2 text-primary font-black text-sm group/btn">
              자세히 보기 <ArrowRight size={18} className="group-hover/btn:translate-x-2 transition-transform" />
            </button>
          </motion.div>
        ))}
      </div>

      <section className="bg-gray-50 rounded-[32px] p-12 lg:p-20 border border-line-normal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-black text-gray-900">추진 체계</h2>
            <p className="text-gray-500 font-medium leading-relaxed">
              광명시, 유관기관, 시민과학자가 협력하여 <br />
              데이터 기반의 스마트도시 거버넌스를 구축합니다.
            </p>
            <div className="space-y-4">
              {[
                '광명시: 사업 총괄 및 행정 지원',
                '유관기관: 기술 개발 및 인프라 운영',
                '시민과학자: 데이터 생산 및 문제 해결 참여'
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 text-gray-700 font-bold">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="aspect-video bg-white rounded-3xl border border-line-normal shadow-sm flex items-center justify-center text-gray-300 font-black italic">
            Governance Diagram Placeholder
          </div>
        </div>
      </section>
    </div>
  );
}
