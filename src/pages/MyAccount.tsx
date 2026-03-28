import { motion } from 'motion/react';
import { User, Mail, Phone, MapPin, Shield, Bell, ChevronRight, Save } from 'lucide-react';

export default function MyAccount() {
  return (
    <div className="max-w-[1200px] mx-auto space-y-8 pb-20">
      <header className="space-y-4">
        <h1 className="text-3xl font-black text-slate-900">계정 및 정보 관리</h1>
        <p className="text-slate-500 font-medium text-lg">회원님의 기본 정보와 보안 설정을 관리하실 수 있습니다.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white rounded-[32px] p-10 shadow-sm border border-line-normal space-y-8">
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
              <User className="text-blue-500" size={24} /> 기본 정보
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">이름</label>
                <input 
                  type="text" 
                  defaultValue="홍길동"
                  className="w-full px-6 py-4 bg-slate-50 border border-line-normal rounded-2xl text-sm font-black focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">이메일</label>
                <div className="relative">
                  <input 
                    type="email" 
                    defaultValue="gildong@example.com"
                    className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-line-normal rounded-2xl text-sm font-black focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                  />
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">연락처</label>
                <div className="relative">
                  <input 
                    type="tel" 
                    defaultValue="010-1234-5678"
                    className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-line-normal rounded-2xl text-sm font-black focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                  />
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">거주지</label>
                <div className="relative">
                  <input 
                    type="text" 
                    defaultValue="경기도 광명시 철산동"
                    className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-line-normal rounded-2xl text-sm font-black focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                  />
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                </div>
              </div>
            </div>
            <div className="pt-4 flex justify-end">
              <button className="px-8 py-4 bg-blue-500 text-white rounded-2xl font-black text-sm hover:bg-blue-600 transition-all flex items-center gap-2 shadow-lg shadow-blue-500/20">
                <Save size={18} /> 변경사항 저장
              </button>
            </div>
          </section>

          <section className="bg-white rounded-[32px] p-10 shadow-sm border border-line-normal space-y-8">
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
              <Shield className="text-emerald-500" size={24} /> 보안 및 알림 설정
            </h3>
            <div className="divide-y divide-line">
              {[
                { title: '비밀번호 변경', desc: '주기적인 비밀번호 변경으로 계정을 안전하게 보호하세요.', icon: <Shield size={20} /> },
                { title: '마케팅 알림 수신', desc: '새로운 사업 공고 및 이벤트 소식을 받아보실 수 있습니다.', icon: <Bell size={20} />, toggle: true },
                { title: '개인정보 이용 내역', desc: '회원님의 개인정보가 어떻게 활용되고 있는지 확인하세요.', icon: <User size={20} /> },
              ].map((item, idx) => (
                <div key={idx} className="py-6 flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-500 transition-all">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-slate-900">{item.title}</h4>
                      <p className="text-xs font-bold text-slate-400">{item.desc}</p>
                    </div>
                  </div>
                  {item.toggle ? (
                    <div className="w-12 h-6 bg-emerald-500 rounded-full relative">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                    </div>
                  ) : (
                    <ChevronRight className="text-slate-300 group-hover:text-blue-500 transition-all" size={20} />
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <section className="bg-slate-900 rounded-[32px] p-10 text-white space-y-6">
            <div className="w-20 h-20 bg-white/10 rounded-[24px] flex items-center justify-center text-blue-400 border border-white/10">
              <User size={40} />
            </div>
            <div className="space-y-1">
              <h3 className="text-2xl font-black">홍길동 <span className="text-blue-400 text-sm font-black ml-2 uppercase tracking-widest">일반회원</span></h3>
              <p className="text-slate-400 font-medium text-sm">가입일: 2024.01.01</p>
            </div>
            <div className="pt-6 border-t border-white/10 grid grid-cols-2 gap-4">
              <div className="text-center space-y-1">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">신청사업</p>
                <p className="text-xl font-black">12</p>
              </div>
              <div className="text-center space-y-1">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">관심사업</p>
                <p className="text-xl font-black">5</p>
              </div>
            </div>
          </section>

          <section className="bg-rose-50 rounded-[32px] p-10 border border-line-normal space-y-4">
            <h4 className="text-sm font-black text-rose-600">계정 탈퇴</h4>
            <p className="text-xs font-bold text-rose-400 leading-relaxed">계정을 탈퇴하시면 모든 활동 내역 및 관심 정보가 삭제되며 복구할 수 없습니다.</p>
            <button className="w-full py-4 bg-white border border-line-normal text-rose-500 rounded-2xl font-black text-xs hover:bg-rose-100 transition-all">
              회원 탈퇴하기
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
