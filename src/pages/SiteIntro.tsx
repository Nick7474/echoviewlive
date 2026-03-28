import { 
  Globe, 
  Database, 
  Users, 
  Activity, 
  BarChart3, 
  MapPin, 
  UserCircle,
  Mail,
  Phone,
  MapPinned,
  ArrowDown,
  ArrowRightLeft,
  Star,
  Settings,
  ArrowRight
} from 'lucide-react';
import { motion } from 'motion/react';

export default function SiteIntro() {
  const keyServices = [
    {
      icon: <Activity size={24} />,
      title: '실시간 탄소·환경 현황',
      desc: '광명시 전체 탄소 배출·흡수, 에너지, 미세먼지 등 환경 데이터를 실시간으로 모니터링합니다.'
    },
    {
      icon: <Database size={24} />,
      title: '공공 데이터 허브',
      desc: '488건의 광명시 스마트도시 데이터를 개방하여 누구나 검색·다운로드·API 형태로 활용할 수 있습니다.'
    },
    {
      icon: <Users size={24} />,
      title: '시민 참여 플랫폼',
      desc: '리빙랩·오픈랩·시티즌교육을 통해 시민이 직접 도시 문제 해결에 참여할 수 있습니다.'
    },
    {
      icon: <BarChart3 size={24} />,
      title: '도시지표 대시보드',
      desc: '탄소지표·스마트도시 지표를 시각화하여 광명시의 발전 현황을 한눈에 파악합니다.'
    },
    {
      icon: <MapPin size={24} />,
      title: '스마트 시티맵',
      desc: 'CCTV·안전시설·편의시설 위치를 지도 기반으로 실시간 확인할 수 있습니다.'
    },
    {
      icon: <UserCircle size={24} />,
      title: '마이페이지',
      desc: '내 사업 신청 현황, 데이터 활용 내역, 관심 사업을 개인화된 대시보드로 관리합니다.'
    }
  ];

  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative rounded-[32px] overflow-hidden min-h-[500px] flex items-center shadow-2xl">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80&w=1920" 
            alt="Smart City Gwangmyeong" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/90 via-emerald-900/70 to-transparent" />
          <div className="absolute inset-0 bg-emerald-950/20 backdrop-blur-[2px]" />
        </div>

        <div className="relative z-10 p-12 lg:p-20 max-w-4xl space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary text-white text-xs font-black rounded-full uppercase tracking-widest shadow-lg shadow-primary/20"
          >
            <Star size={14} className="fill-current" /> Smart City Platform
          </motion.div>
          
          <div className="space-y-4">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl lg:text-6xl font-black text-white leading-tight"
            >
              광명시 강소형 스마트도시 <br />
              <span className="text-primary">통합 플랫폼 에코뷰</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-white/90 font-bold leading-relaxed max-w-2xl drop-shadow-md"
            >
              에코뷰(EcoView)는 광명시의 탄소중립과 스마트도시 비전을 실현하기 위해 구축된 통합 개방형 플랫폼입니다. 시민·기업·연구자가 함께 도시 문제를 해결하고 데이터를 공유하며, 더 나은 광명시의 미래를 만들어 갑니다.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Features & Services */}
      <section className="space-y-12">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
            <Star size={20} className="fill-current" />
          </div>
          <div className="space-y-0.5">
            <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">주요 기능 및 서비스</h2>
            <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">Features & Services</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {keyServices.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="p-8 bg-white rounded-[24px] border border-line-normal shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-500 group"
            >
              <div className="w-14 h-14 bg-gray-50 text-gray-400 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                {service.icon}
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-3 group-hover:text-primary transition-colors">{service.title}</h3>
              <p className="text-gray-500 font-medium text-sm leading-relaxed">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Operation System */}
      <section className="space-y-12">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
            <Settings size={20} />
          </div>
          <div className="space-y-0.5">
            <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">운영 체계</h2>
            <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">Operation System</p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-[40px] p-12 lg:p-20 border border-line-normal overflow-hidden">
          <div className="max-w-4xl mx-auto flex flex-col items-center gap-12">
            {/* Top Node */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-primary text-white px-10 py-4 rounded-2xl font-black shadow-lg shadow-primary/20 relative z-10"
            >
              광명시 스마트도시과
            </motion.div>

            <ArrowDown className="text-gray-300" size={32} />

            {/* Middle Nodes */}
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {/* Connection Lines (Desktop) */}
              <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-gray-200 -z-10" />
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="bg-white border-2 border-primary p-6 rounded-2xl text-center shadow-md"
              >
                <p className="text-primary font-black text-sm mb-1">에코뷰 플랫폼</p>
                <p className="text-gray-900 font-bold">(통합 운영)</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="bg-white border border-line-normal p-6 rounded-2xl text-center shadow-md"
              >
                <p className="text-emerald-600 font-black text-sm mb-1">광명시 데이터허브</p>
                <p className="text-gray-900 font-bold">(488건)</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white border border-line-normal p-6 rounded-2xl text-center shadow-md"
              >
                <p className="text-blue-600 font-black text-sm mb-1">경기도 데이터허브</p>
                <p className="text-gray-900 font-bold">(연계 40건)</p>
              </motion.div>
            </div>

            <ArrowDown className="text-gray-300" size={32} />

            {/* Bottom Nodes */}
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="bg-white border border-line-normal p-6 rounded-full text-center shadow-sm"
              >
                <p className="text-gray-900 font-black text-sm">시민 참여</p>
                <p className="text-gray-400 text-xs font-bold">(리빙랩·오픈랩)</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white border border-line-normal p-6 rounded-full text-center shadow-sm"
              >
                <p className="text-gray-900 font-black text-sm">데이터 개방</p>
                <p className="text-gray-400 text-xs font-bold">(API·다운로드)</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white border border-line-normal p-6 rounded-full text-center shadow-sm"
              >
                <p className="text-gray-900 font-black text-sm">탄소현황</p>
                <p className="text-gray-400 text-xs font-bold">(실시간 모니터링)</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="space-y-12">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
            <Phone size={20} />
          </div>
          <div className="space-y-0.5">
            <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">문의 및 연락처</h2>
            <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">Contact Info</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-10 bg-white rounded-[32px] border border-line-normal shadow-sm space-y-6">
            <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center">
              <MapPinned size={24} />
            </div>
            <div className="space-y-2">
              <h4 className="text-lg font-black text-gray-900">주소</h4>
              <p className="text-gray-500 text-sm font-medium leading-relaxed">
                우)14234 경기도 광명시 시청로 20 <br />
                광명시청 스마트도시과
              </p>
            </div>
          </div>

          <div className="p-10 bg-white rounded-[32px] border border-line-normal shadow-sm space-y-6">
            <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center">
              <Phone size={24} />
            </div>
            <div className="space-y-2">
              <h4 className="text-lg font-black text-gray-900">연락처</h4>
              <p className="text-gray-500 text-sm font-medium leading-relaxed">
                민원콜센터: 1688-3399 <br />
                스마트도시과: 02-2680-2114
              </p>
            </div>
          </div>

          <div className="p-10 bg-white rounded-[32px] border border-line-normal shadow-sm space-y-6">
            <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center">
              <Mail size={24} />
            </div>
            <div className="space-y-2">
              <h4 className="text-lg font-black text-gray-900">이메일</h4>
              <p className="text-gray-500 text-sm font-medium leading-relaxed">
                ecoview@gwangmyeong.go.kr <br />
                <span className="text-gray-400">평일 09:00 ~ 18:00</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

