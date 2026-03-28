import { useState } from 'react';
import { User, Bell, Lock, AlertTriangle } from 'lucide-react';
import MyPageLayout from '../components/MyPageLayout';

type NotifKey = '이메일 공지 수신' | 'SMS 알림 수신' | '리빙랩·오픈랩 모집 알림';
const NOTIF_KEYS: NotifKey[] = ['이메일 공지 수신', 'SMS 알림 수신', '리빙랩·오픈랩 모집 알림'];
const INTERESTS = ['탄소중립', '에너지', '모빌리티', '데이터', '안전·환경'];

export default function MyAccount() {
  const [interests, setInterests] = useState<string[]>(['탄소중립', '에너지']);
  const [notifs, setNotifs] = useState<Record<NotifKey, boolean>>({
    '이메일 공지 수신': true,
    'SMS 알림 수신': false,
    '리빙랩·오픈랩 모집 알림': true,
  });

  const toggleInterest = (v: string) =>
    setInterests(prev => prev.includes(v) ? prev.filter(i => i !== v) : [...prev, v]);

  return (
    <MyPageLayout>
      {/* Page title */}
      <div className="flex items-center gap-3">
        <User className="text-[var(--color-primary)]" size={28} />
        <h1 className="text-2xl font-black text-slate-900">계정 및 정보관리</h1>
      </div>

      {/* ── 섹션 1: 기본 정보 ── */}
      <section className="bg-white border border-line-normal rounded-[16px] p-8 space-y-8">
        <h2 className="text-lg font-black text-slate-900">기본 정보</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            { label: '이름',     name: 'name',    defaultValue: '홍길동',                   readOnly: false, type: 'text' },
            { label: '닉네임',   name: 'nick',    defaultValue: '에코러버',                 readOnly: false, type: 'text' },
            { label: '이메일',   name: 'email',   defaultValue: 'citizen@gwangmyeong.kr',  readOnly: true,  type: 'email' },
            { label: '연락처',   name: 'phone',   defaultValue: '010-1234-5678',            readOnly: false, type: 'tel' },
          ].map(field => (
            <div key={field.name} className="space-y-1.5">
              <label className="text-sm font-bold text-slate-500">{field.label}</label>
              <input
                type={field.type}
                defaultValue={field.defaultValue}
                readOnly={field.readOnly}
                className={`w-full px-4 py-3 rounded-xl border text-sm font-medium outline-none transition-all ${
                  field.readOnly
                    ? 'bg-gray-50 border-line-normal text-slate-400 cursor-default'
                    : 'bg-white border-line-normal text-slate-900 focus:border-[var(--color-primary-border)] focus:ring-2 focus:ring-[var(--color-primary-border)]/20'
                }`}
              />
              {field.readOnly && <p className="text-xs text-slate-400">로그인 ID로 사용되며 변경할 수 없습니다.</p>}
            </div>
          ))}

          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-500">거주지 구분</label>
            <select className="w-full px-4 py-3 rounded-xl border border-line-normal bg-white text-sm font-medium text-slate-900 outline-none focus:border-[var(--color-primary-border)] focus:ring-2 focus:ring-[var(--color-primary-border)]/20">
              <option>광명시 거주자</option>
              <option>광명시 근무자</option>
              <option>기타</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-500">회원 유형</label>
            <select className="w-full px-4 py-3 rounded-xl border border-line-normal bg-white text-sm font-medium text-slate-900 outline-none focus:border-[var(--color-primary-border)] focus:ring-2 focus:ring-[var(--color-primary-border)]/20">
              <option>일반 시민</option>
              <option>연구자·학생</option>
              <option>기업·기관</option>
            </select>
          </div>
        </div>

        {/* Interest Checkboxes */}
        <div className="space-y-3">
          <label className="text-sm font-bold text-slate-500">관심 분야</label>
          <div className="flex flex-wrap gap-3">
            {INTERESTS.map(v => (
              <button
                key={v}
                onClick={() => toggleInterest(v)}
                className={`px-4 py-2 rounded-full text-sm font-bold border transition-all ${
                  interests.includes(v)
                    ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]'
                    : 'bg-white text-slate-500 border-line-normal hover:border-[var(--color-primary-border)]'
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        <button className="px-8 py-3 bg-[var(--color-primary)] text-white rounded-xl font-black text-sm hover:bg-[var(--color-primary-hover)] transition-all shadow-lg shadow-[var(--color-primary)]/20">
          저장하기
        </button>
      </section>

      {/* ── 섹션 2: 비밀번호 변경 ── */}
      <section className="bg-white border border-line-normal rounded-[16px] p-8 space-y-6">
        <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
          <Lock size={20} className="text-slate-400" /> 비밀번호 변경
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl">
          {['현재 비밀번호', '새 비밀번호', '새 비밀번호 확인'].map(label => (
            <div key={label} className={`space-y-1.5 ${label === '현재 비밀번호' ? 'sm:col-span-2' : ''}`}>
              <label className="text-sm font-bold text-slate-500">{label}</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-line-normal bg-white text-sm font-medium text-slate-900 outline-none focus:border-[var(--color-primary-border)] focus:ring-2 focus:ring-[var(--color-primary-border)]/20"
              />
            </div>
          ))}
        </div>
        <button className="px-8 py-3 bg-slate-900 text-white rounded-xl font-black text-sm hover:bg-slate-800 transition-all">
          비밀번호 변경
        </button>
      </section>

      {/* ── 섹션 3: 알림 설정 ── */}
      <section className="bg-white border border-line-normal rounded-[16px] p-8 space-y-6">
        <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
          <Bell size={20} className="text-[var(--color-primary)]" /> 알림 설정
        </h2>
        <div className="space-y-1">
          {NOTIF_KEYS.map(key => (
            <div key={key} className="flex items-center justify-between py-3.5 border-b border-line-neutral last:border-0">
              <span className="text-sm font-medium text-slate-700">{key}</span>
              <button
                onClick={() => setNotifs(prev => ({ ...prev, [key]: !prev[key] }))}
                className={`w-11 h-6 rounded-full transition-all relative flex-shrink-0 ${notifs[key] ? 'bg-[var(--color-primary)]' : 'bg-gray-200'}`}
              >
                <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all ${notifs[key] ? 'left-[22px]' : 'left-0.5'}`} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ── 섹션 4: 회원 탈퇴 ── */}
      <section className="bg-white border border-[var(--color-status-negative)]/30 rounded-[16px] p-8 space-y-4">
        <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
          <AlertTriangle size={20} className="text-[var(--color-status-negative)]" /> 회원 탈퇴
        </h2>
        <p className="text-sm font-medium text-slate-500">
          탈퇴 시 모든 데이터·신청 내역이 삭제됩니다. 삭제된 데이터는 복구할 수 없습니다.
        </p>
        <button className="px-6 py-2.5 border border-[var(--color-status-negative)] text-[var(--color-status-negative)] rounded-xl font-black text-sm hover:bg-red-50 transition-all">
          회원 탈퇴 신청
        </button>
      </section>
    </MyPageLayout>
  );
}
