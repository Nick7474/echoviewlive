import { 
  ExternalLink, 
  Globe, 
  ShieldCheck, 
  Users, 
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import { motion } from 'motion/react';

export default function EtcIntro() {
  const sites = [
    {
      title: '광명시청 홈페이지',
      desc: '광명시의 주요 소식과 행정 서비스를 제공합니다.',
      url: 'https://www.gm.go.kr'
    },
    {
      title: '광명시 탄소중립 포털',
      desc: '기후 위기 대응 및 탄소 중립 실천 정보를 공유합니다.',
      url: 'https://www.gm.go.kr/carbon'
    },
    {
      title: '광명시 스마트도시 리빙랩',
      desc: '시민과 함께 도시 문제를 해결하는 혁신 공간입니다.',
      url: 'https://www.gm.go.kr/livinglab'
    }
  ];

  return (
    <div className="space-y-16 pb-20">
      <section className="bg-white rounded-[32px] p-12 lg:p-20 shadow-sm border border-line-normal space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary text-xs font-black rounded-full uppercase tracking-widest">
          <Globe size={14} /> Other Websites
        </div>
        <h1 className="text-4xl lg:text-5xl font-black text-gray-900 leading-tight">
          광명시 유관 <br />
          <span className="text-primary">홈페이지 안내</span>
        </h1>
        <p className="text-xl text-gray-500 font-medium leading-relaxed max-w-3xl">
          광명시가 운영하는 다양한 행정 및 특화 포털을 안내해 드립니다.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {sites.map((site, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="p-10 bg-white rounded-[32px] border border-line-normal shadow-sm hover:shadow-xl transition-all duration-500 group"
          >
            <div className="w-16 h-16 bg-gray-50 text-primary rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
              <ExternalLink size={24} />
            </div>
            <h3 className="text-xl font-black text-gray-900 mb-4">{site.title}</h3>
            <p className="text-gray-500 font-medium leading-relaxed mb-8">{site.desc}</p>
            <a 
              href={site.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-primary font-black text-sm group/btn"
            >
              바로가기 <ArrowRight size={18} className="group-hover/btn:translate-x-2 transition-transform" />
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
