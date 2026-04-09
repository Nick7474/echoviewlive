import { useState } from 'react';
import { 
  Leaf, 
  Zap, 
  Truck, 
  Recycle, 
  Droplets, 
  Heart, 
  CheckCircle2, 
  ChevronRight, 
  ArrowRight, 
  Info,
  Calendar,
  MapPin,
  Users,
  Trophy,
  Share2,
  Download,
  Star,
  Smartphone,
  Gift,
  Lightbulb
} from 'lucide-react';
import { motion } from 'motion/react';

export default function ClimateChangeAction() {
  const [activeTab, setActiveTab] = useState('가정');

  const actionCategories = [
    { id: '가정', icon: <Zap size={20} />, label: '가정에서' },
    { id: '직장', icon: <Building2 size={20} />, label: '직장에서' },
    { id: '이동', icon: <Truck size={20} />, label: '이동할 때' },
    { id: '소비', icon: <Recycle size={20} />, label: '소비할 때' },
  ];

  const actions = {
    '가정': [
      { title: '에너지 효율 등급 확인', desc: '가전제품 구매 시 에너지 효율 1등급 제품을 선택하세요.', points: 500, icon: <Zap /> },
      { title: 'LED 조명 교체', desc: '백열등을 LED 조명으로 교체하여 전력 소비를 줄이세요.', points: 300, icon: <Lightbulb /> },
      { title: '물 아껴 쓰기', desc: '양치컵 사용, 절수형 샤워기 설치로 수자원을 보호하세요.', points: 200, icon: <Droplets /> },
    ],
    '직장': [
      { title: '계단 이용하기', desc: '엘리베이터 대신 계단을 이용하여 에너지를 절약하세요.', points: 100, icon: <Activity /> },
      { title: '개인 컵 사용', desc: '종이컵 대신 텀블러나 개인 컵을 사용하세요.', points: 200, icon: <Coffee /> },
      { title: '퇴근 시 전원 끄기', desc: 'PC, 모니터 등 사무기기 전원을 완전히 차단하세요.', points: 150, icon: <Power /> },
    ],
    '이동': [
      { title: '대중교통 이용', desc: '가까운 거리는 걷거나 자전거를, 먼 거리는 대중교통을 이용하세요.', points: 1000, icon: <Bus /> },
      { title: '친환경 운전', desc: '급출발·급제동을 자제하고 경제 속도를 준수하세요.', points: 400, icon: <Car /> },
      { title: '전기차 전환', desc: '차량 교체 시 전기차나 수소차를 고려해 보세요.', points: 5000, icon: <Zap /> },
    ],
    '소비': [
      { title: '장바구니 사용', desc: '비닐봉지 대신 장바구니나 에코백을 사용하세요.', points: 300, icon: <ShoppingBag /> },
      { title: '로컬 푸드 구매', desc: '탄소 발자국이 적은 지역 농산물을 애용하세요.', points: 400, icon: <Apple /> },
      { title: '분리배출 철저', desc: '재활용품을 올바르게 분리하여 배출하세요.', points: 200, icon: <Recycle /> },
    ],
  };

  return (
    <div className="max-w-[1560px] mx-auto space-y-20 pb-20">
      {/* Header Section */}
      <section className="bg-white rounded-[32px] p-12 lg:p-20 shadow-sm border border-line-normal flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="space-y-8 relative z-10 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 text-xs font-black rounded-full uppercase tracking-widest">
            <Leaf size={14} /> Climate Action Guide
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-tight">
            지구를 구하는 <br />
            <span className="text-emerald-600">작은 실천</span>의 힘
          </h1>
          <p className="text-slate-500 text-xl font-medium max-w-2xl leading-relaxed">
            거창한 계획보다 중요한 것은 오늘의 작은 실천입니다. <br className="hidden lg:block" />
            광명시민이 함께하는 기후 행동, 지금 바로 시작해 보세요.
          </p>
          <div className="flex flex-wrap justify-center lg:justify-start gap-4">
            <button className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-sm hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20 flex items-center gap-2">
              실천 서약하기 <CheckCircle2 size={18} />
            </button>
            <button className="px-8 py-4 bg-white border border-line-normal text-slate-900 rounded-2xl font-black text-sm hover:bg-gray-50 transition-all shadow-sm flex items-center gap-2">
              포인트 확인 <Star size={18} className="text-amber-500" />
            </button>
          </div>
        </div>
        <div className="relative z-10 w-full max-w-md aspect-square rounded-[40px] overflow-hidden shadow-2xl rotate-3">
          <img 
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1000" 
            alt="Eco Action" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </section>

      {/* Action Categories & Cards */}
      <section className="space-y-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-3xl font-black text-slate-900">분야별 실천 가이드</h2>
            <p className="text-slate-500 font-medium">일상 속에서 실천할 수 있는 구체적인 방법을 확인하세요.</p>
          </div>
          <div className="flex bg-slate-100 p-2 rounded-2xl overflow-x-auto max-w-full">
            {actionCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-black transition-all whitespace-nowrap ${
                  activeTab === cat.id ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {cat.icon} {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {actions[activeTab as keyof typeof actions].map((action, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-10 rounded-[32px] shadow-sm border border-line-normal space-y-8 group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
            >
              <div className="w-16 h-16 bg-[var(--color-primary-subtle)] text-[var(--color-primary)] rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-[var(--color-primary)] group-hover:text-white transition-all duration-500">
                {action.icon}
              </div>
              <div className="space-y-3">
                <h4 className="text-xl font-black text-slate-900">{action.title}</h4>
                <p className="text-slate-500 font-medium leading-relaxed">{action.desc}</p>
              </div>
              <div className="pt-6 border-t border-line-normal flex items-center justify-between">
                <div className="flex items-center gap-2 text-amber-500 font-black text-sm">
                  <Trophy size={16} /> {action.points} P 적립
                </div>
                <button className="text-slate-400 hover:text-emerald-500 transition-colors">
                  <ArrowRight size={20} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Campaign Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-slate-900 rounded-[40px] p-12 lg:p-20 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full blur-2xl" />
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-emerald-500 rounded-full blur-3xl" />
        </div>
        
        <div className="space-y-8 relative z-10">
          <h2 className="text-4xl font-black leading-tight">
            함께하면 더 큰 변화, <br />
            <span className="text-emerald-400">광명 1.5℃ 기후의병</span>
          </h2>
          <p className="text-slate-400 text-lg font-medium leading-relaxed">
            기후 위기에 맞서 싸우는 광명시의 시민 군단, 기후의병에 참여하세요. <br />
            실천 활동을 통해 포인트를 쌓고, 지역 화폐로 환급받을 수 있습니다.
          </p>
          <div className="space-y-4">
            {[
              { icon: <Users size={20} />, text: '현재 12,450명의 기후의병 활동 중' },
              { icon: <Trophy size={20} />, text: '누적 탄소 감축량 1,240톤 달성' },
              { icon: <Gift size={20} />, text: '참여 시민 대상 다양한 혜택 제공' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 text-slate-300 font-bold">
                <div className="text-emerald-400">{item.icon}</div>
                {item.text}
              </div>
            ))}
          </div>
          <button className="px-10 py-5 bg-[var(--color-primary)] text-white rounded-2xl font-black text-lg hover:bg-[var(--color-primary-hover)] transition-all shadow-xl shadow-[var(--color-primary)]/20 flex items-center gap-3 group">
            기후의병 가입하기 <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>

        <div className="relative z-10 grid grid-cols-2 gap-4">
          <div className="space-y-4 pt-12">
            <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl">
              <img src="https://images.unsplash.com/photo-1536939459926-301728717817?auto=format&fit=crop&q=80&w=400" alt="Action 1" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <img src="https://images.unsplash.com/photo-1591193686104-fddba4d0ee4b?auto=format&fit=crop&q=80&w=400" alt="Action 2" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
          </div>
          <div className="space-y-4">
            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <img src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=400" alt="Action 3" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl">
              <img src="https://images.unsplash.com/photo-1618477461853-cf6ed80fafa5?auto=format&fit=crop&q=80&w=400" alt="Action 4" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>
      </section>

      {/* App Download / Mobile Action */}
      <section className="bg-[var(--color-primary-subtle)] rounded-[32px] p-12 lg:p-20 flex flex-col md:flex-row items-center justify-between gap-12 border border-[var(--color-primary-border)]/20">
        <div className="space-y-6 text-center md:text-left">
          <h3 className="text-3xl font-black text-slate-900">언제 어디서나 간편하게 실천 인증</h3>
          <p className="text-slate-600 text-lg font-medium">
            기후의병 전용 앱을 통해 실천 활동을 인증하고 포인트를 관리하세요. <br className="hidden lg:block" />
            QR 코드 스캔 한 번으로 간편하게 참여할 수 있습니다.
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <button className="px-8 py-4 bg-white border border-line-normal text-slate-900 rounded-2xl font-black text-sm hover:bg-gray-50 transition-all shadow-sm flex items-center gap-3">
              <Smartphone size={20} /> App Store
            </button>
            <button className="px-8 py-4 bg-white border border-line-normal text-slate-900 rounded-2xl font-black text-sm hover:bg-gray-50 transition-all shadow-sm flex items-center gap-3">
              <Smartphone size={20} /> Google Play
            </button>
          </div>
        </div>
        <div className="w-full max-w-[280px] relative">
          <div className="bg-white p-4 rounded-[40px] shadow-2xl border border-line-normal relative z-10">
            <div className="aspect-[9/19] bg-slate-900 rounded-[32px] overflow-hidden relative">
              <div className="absolute top-0 left-0 right-0 h-8 bg-slate-900 z-20 flex items-center justify-center">
                <div className="w-16 h-4 bg-slate-800 rounded-full" />
              </div>
              <img src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=400" alt="App Preview" className="w-full h-full object-cover opacity-80" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                    <Leaf className="text-white" size={32} />
                  </div>
                  <p className="text-white font-black text-sm">기후의병 앱</p>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-emerald-500/10 rounded-full blur-3xl -z-10" />
        </div>
      </section>

      {/* Bottom FAQ / Support */}
      <section className="bg-white rounded-[32px] p-12 border border-line-normal flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-emerald-500">
            <Info size={32} />
          </div>
          <div className="space-y-1">
            <h4 className="text-xl font-black text-slate-900">궁금한 점이 있으신가요?</h4>
            <p className="text-slate-500 font-medium">실천 방법이나 포인트 적립에 대해 자세히 안내해 드립니다.</p>
          </div>
        </div>
        <div className="flex gap-4">
          <button className="px-8 py-4 bg-slate-50 text-slate-900 rounded-2xl font-black text-sm hover:bg-slate-100 transition-all flex items-center gap-2">
            자주 묻는 질문 <ChevronRight size={18} />
          </button>
          <button className="px-8 py-4 bg-[var(--color-primary-subtle)] text-[var(--color-primary)] rounded-2xl font-black text-sm hover:bg-[var(--color-primary-muted)] transition-all flex items-center gap-2">
            1:1 문의하기 <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
}

// Missing component imports
const Building2 = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg>;
const Activity = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>;
const Coffee = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><path d="M6 2v2"/><path d="M10 2v2"/><path d="M14 2v2"/></svg>;
const Power = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v10"/><path d="M18.4 6.6a9 9 0 1 1-12.77.04"/></svg>;
const Bus = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 6v6"/><path d="M15 6v6"/><path d="M2 12h19.6"/><path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 5.5 19.1 5 18 5H4c-1.1 0-2.1.5-2.4 1.8l-1.4 5c-.1.4-.2.8-.2 1.2 0 .4.1.8.2 1.2C.5 16.3 1 18 1 18h3"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>;
const Car = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-1.1 0-2.1.5-2.4 1.8l-1.4 5c-.1.4-.2.8-.2 1.2 0 .4.1.8.2 1.2C1.5 16.3 2 18 2 18h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/><path d="M13 17h2"/><path d="M7 17h2"/><path d="M5 17h2"/></svg>;
const ShoppingBag = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>;
const Apple = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20.94c1.88 0 3.05-1.07 4.64-1.07 1.27 0 2.1.51 3.31.51 1.61 0 2.45-1.03 2.45-1.03-1.58-1.15-2.23-3.08-2.23-4.53 0-2.45 1.63-4.36 3.77-5.19-.4-.95-1.24-1.67-2.33-1.83-1.83-.28-2.81.73-4.33.73-1.35 0-2.51-.73-4.03-.73-2.25 0-4.55 1.67-4.55 5.44 0 2.47 1.37 5.44 3.39 7.71 1.58 1.73 2.96 2.47 4.25 2.47Z"/><path d="M12 4c.03 0 .05 0 .08.01.03-.03.04-.08.04-.12 0-1.68-1.35-3.12-3.02-3.12-.03 0-.05 0-.08.01-.03.03-.04.08-.04.12 0 1.68 1.35 3.12 3.02 3.12Z"/></svg>;
