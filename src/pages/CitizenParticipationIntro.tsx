import { 
  Users, 
  HandHelping, 
  MessageSquare, 
  Lightbulb, 
  Target, 
  Heart, 
  Info,
  ChevronRight,
  ArrowRight,
  Globe,
  Star,
  Calendar,
  MapPin,
  Clock,
  Download,
  Award,
  Zap,
  CheckCircle2,
  Megaphone
} from 'lucide-react';
import { motion } from 'motion/react';

export default function CitizenParticipationIntro() {
  return (
    <div className="max-w-[1560px] mx-auto space-y-20 pb-20">
      {/* Hero Section - Prestige Style */}
      <section className="relative h-[700px] rounded-[40px] overflow-hidden flex items-center bg-slate-900 text-white">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=1920" 
            alt="Citizen Participation" 
            className="w-full h-full object-cover opacity-40"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/60 to-transparent" />
        </div>
        
        <div className="relative z-10 px-12 lg:px-20 max-w-4xl space-y-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-3 px-5 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-xs font-black uppercase tracking-[0.2em]"
          >
            <Users size={16} className="text-emerald-400" /> Citizen Governance
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tighter"
          >
            당신의 <span className="text-emerald-400">목소리</span>가 <br />
            광명의 미래가 됩니다
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-300 font-medium max-w-2xl leading-relaxed"
          >
            광명시는 시민이 직접 정책을 제안하고 결정하는 진정한 참여 민주주의를 실현합니다. <br className="hidden sm:block" />
            더 나은 광명을 위한 당신의 아이디어를 들려주세요.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-6"
          >
            <button className="px-10 py-5 bg-[var(--color-primary)] text-white rounded-2xl font-black text-lg hover:bg-[var(--color-primary-hover)] transition-all shadow-2xl shadow-[var(--color-primary)]/20 flex items-center gap-3 group">
              지금 참여하기 <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
            </button>
            <button className="px-10 py-5 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-2xl font-black text-lg hover:bg-white/20 transition-all flex items-center gap-3">
              활동 소식 보기 <Megaphone size={24} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Participation Pillars */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {[
          { 
            icon: <Lightbulb size={40} />, 
            title: '정책 제안', 
            desc: '일상의 불편함을 해결하고 도시를 발전시킬 창의적인 아이디어를 제안해 주세요.',
            color: 'text-amber-500',
            bg: 'bg-amber-50'
          },
          { 
            icon: <MessageSquare size={40} />, 
            title: '시민 토론', 
            desc: '주요 정책 현안에 대해 다른 시민들과 의견을 나누고 합의점을 찾아갑니다.',
            color: 'text-blue-500',
            bg: 'bg-blue-50'
          },
          { 
            icon: <CheckCircle2 size={40} />, 
            title: '정책 결정', 
            desc: '시민 투표를 통해 우선순위를 정하고 실제 예산에 반영하는 과정에 참여합니다.',
            color: 'text-emerald-500',
            bg: 'bg-emerald-50'
          },
        ].map((pillar, idx) => (
          <div key={idx} className="p-12 bg-white rounded-[40px] border border-line-normal shadow-sm hover:shadow-2xl transition-all duration-500 group">
            <div className={`w-20 h-20 ${pillar.bg} ${pillar.color} rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
              {pillar.icon}
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-4">{pillar.title}</h3>
            <p className="text-slate-500 font-medium leading-relaxed mb-8">
              {pillar.desc}
            </p>
            <button className="flex items-center gap-2 text-slate-900 font-black text-sm group/btn">
              자세히 보기 <ChevronRight size={20} className="group-hover/btn:translate-x-2 transition-transform" />
            </button>
          </div>
        ))}
      </section>

      {/* Success Stories */}
      <section className="space-y-12">
        <div className="flex flex-col md:flex-row items-end justify-between gap-6">
          <div className="space-y-4">
            <h2 className="text-4xl font-black text-slate-900">시민 참여 성공 사례</h2>
            <p className="text-slate-500 text-lg font-medium">시민의 목소리가 실제 정책으로 실현된 결과물입니다.</p>
          </div>
          <button className="px-8 py-4 bg-slate-100 text-slate-900 rounded-2xl font-black text-sm hover:bg-slate-200 transition-all">
            전체 사례 보기
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {[
            {
              title: '광명시 기후의병 제도 도입',
              desc: '시민의 제안으로 시작된 탄소중립 실천 포인트 제도가 전국적인 모범 사례로 정착되었습니다.',
              image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800',
              tags: ['환경', '탄소중립']
            },
            {
              title: '청년 주거 지원 정책 확대',
              desc: '청년 토론회에서 제안된 주거비 지원 확대안이 실제 예산에 편성되어 1,200가구가 혜택을 받았습니다.',
              image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800',
              tags: ['청년', '복지']
            }
          ].map((story, idx) => (
            <div key={idx} className="group relative h-[400px] rounded-[40px] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
              <img src={story.image} alt={story.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-10 space-y-4">
                <div className="flex gap-2">
                  {story.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-[10px] font-black rounded-full uppercase tracking-widest">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-2xl font-black text-white">{story.title}</h3>
                <p className="text-slate-300 font-medium leading-relaxed line-clamp-2">
                  {story.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Participation Process */}
      <section className="bg-slate-50 rounded-[40px] p-12 lg:p-20 space-y-16 border border-line-normal">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-black text-slate-900">참여 프로세스</h2>
          <p className="text-slate-500 text-lg font-medium">당신의 아이디어가 정책이 되기까지의 과정입니다.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 -translate-y-1/2 z-0" />
          {[
            { step: '01', title: '아이디어 제안', desc: '온라인 플랫폼을 통해 자유롭게 제안' },
            { step: '02', title: '부서 검토', desc: '실현 가능성 및 예산 적정성 검토' },
            { step: '03', title: '시민 투표', desc: '시민들의 공감과 투표로 우선순위 결정' },
            { step: '04', title: '정책 반영', desc: '최종 결정된 안을 실제 사업으로 추진' },
          ].map((item, idx) => (
            <div key={idx} className="relative z-10 bg-white p-8 rounded-3xl border border-line-normal shadow-sm text-center space-y-4 group hover:border-[var(--color-primary-border)] transition-colors">
              <div className="w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center mx-auto font-black text-lg group-hover:bg-[var(--color-primary)] transition-colors">
                {item.step}
              </div>
              <h4 className="text-lg font-black text-slate-900">{item.title}</h4>
              <p className="text-sm text-slate-500 font-medium leading-snug">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-emerald-500 rounded-[40px] p-12 lg:p-20 text-white flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden shadow-2xl shadow-emerald-500/20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="space-y-6 text-center lg:text-left relative z-10">
          <h2 className="text-4xl lg:text-5xl font-black leading-tight">
            지금 바로 <br />
            <span className="text-slate-900">광명 시민 거버넌스</span>에 <br />
            참여하세요
          </h2>
          <p className="text-emerald-50 text-xl font-medium max-w-xl">
            당신의 작은 관심이 더 행복한 광명을 만듭니다. <br className="hidden lg:block" />
            지금 회원가입하고 첫 제안을 시작해 보세요.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 relative z-10">
          <button className="px-12 py-6 bg-slate-900 text-white rounded-2xl font-black text-xl hover:bg-slate-800 transition-all shadow-xl flex items-center gap-3">
            참여 플랫폼 바로가기 <ArrowRight size={24} />
          </button>
        </div>
      </section>
    </div>
  );
}
