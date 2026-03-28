import { ExternalLink, Globe } from 'lucide-react';

const SITES = [
  {
    name: '공공데이터포털',
    desc: '정부 및 공공기관의 공공데이터 통합 제공 포털',
    url: 'https://www.data.go.kr',
    initial: '공데',
  },
  {
    name: '국가통계포털 (KOSIS)',
    desc: '통계청이 제공하는 국내외 주요 통계 데이터',
    url: 'https://kosis.kr',
    initial: 'KO',
  },
  {
    name: '광명시청',
    desc: '광명시 공식 홈페이지 및 시정 정보',
    url: 'https://www.gwangmyeong.go.kr',
    initial: '광명',
  },
  {
    name: '경기데이터드림',
    desc: '경기도 공공데이터 개방 및 활용 플랫폼',
    url: 'https://data.gg.go.kr',
    initial: '경기',
  },
  {
    name: '환경부',
    desc: '환경 정책·법령·통계 등 환경부 공식 정보',
    url: 'https://www.me.go.kr',
    initial: '환경',
  },
  {
    name: '한국환경공단',
    desc: '대기·수질·소음 등 환경 측정 데이터 제공',
    url: 'https://www.keco.or.kr',
    initial: '환공',
  },
  {
    name: '기상청',
    desc: '날씨·기후변화 관련 기상 데이터 및 예보',
    url: 'https://www.kma.go.kr',
    initial: '기상',
  },
  {
    name: '에너지공단',
    desc: '에너지 효율·신재생에너지 관련 정보 및 통계',
    url: 'https://www.energy.or.kr',
    initial: '에너',
  },
  {
    name: '탄소중립 녹색성장위원회',
    desc: '국가 탄소중립 정책·목표·추진 현황 안내',
    url: 'https://www.2050cnc.go.kr',
    initial: '탄소',
  },
];

export default function RelatedSites() {
  return (
    <div className="max-w-[1560px] mx-auto space-y-12 pb-20">
      {/* Header */}
      <section className="bg-white rounded-[16px] p-8 sm:p-12 shadow-sm border border-line-normal flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-4 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--color-primary-subtle)] text-[var(--color-primary)] text-[10px] font-black rounded uppercase tracking-widest">
            <Globe size={12} /> Related Sites
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
            관련 사이트
          </h1>
          <p className="text-slate-500 text-lg font-medium max-w-2xl">
            에코뷰와 연계된 주요 공공 데이터·환경 관련 사이트를 안내합니다.
          </p>
        </div>
        <div className="flex-shrink-0 w-32 h-32 bg-[var(--color-primary-subtle)] rounded-full flex items-center justify-center text-[var(--color-primary)]">
          <Globe size={64} />
        </div>
      </section>

      {/* Site Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {SITES.map(site => (
          <a
            key={site.name}
            href={site.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white border border-line-normal rounded-lg p-6 flex flex-col gap-4 hover:shadow-xl hover:border-[var(--color-primary-border)]/40 transition-all duration-300 group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[var(--color-primary-subtle)] text-[var(--color-primary)] flex items-center justify-center text-sm font-black flex-shrink-0">
                {site.initial}
              </div>
              <h3 className="text-base font-medium text-slate-900 leading-snug group-hover:text-[var(--color-primary)] transition-colors">
                {site.name}
              </h3>
            </div>

            <p className="text-sm text-slate-500 font-medium leading-relaxed flex-grow">
              {site.desc}
            </p>

            <div className="flex items-center gap-1.5 text-[var(--color-primary)] text-sm font-bold group-hover:underline underline-offset-4">
              바로가기 <ExternalLink size={14} />
            </div>
          </a>
        ))}
      </section>
    </div>
  );
}
