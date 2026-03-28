import { useState } from 'react';
import { Star, Bell, BellOff } from 'lucide-react';
import MyPageLayout from '../components/MyPageLayout';

const FILTER_TABS = ['전체', '리빙랩', '오픈랩', '시민교육'];

const ALL_ROWS = [
  { title: 'IoT 그린배리어 구역 환경 모니터링 참여단', type: '리빙랩',  status: '검토 중',  statusStyle: 'bg-amber-50 text-amber-500',                                                                      alarm: true,  action: '신청하기', actionStyle: 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)]' },
  { title: '오픈랩 AI 챌린지 2026 상반기',             type: '오픈랩',  status: '모집예정', statusStyle: 'bg-blue-50 text-blue-500',                                                                         alarm: true,  action: '관심취소', actionStyle: 'bg-white border border-line-normal text-slate-500 hover:border-slate-400' },
  { title: '탄소중립 포인트 실증 — 기후의병 연계',     type: '리빙랩',  status: '모집 중',  statusStyle: 'bg-[var(--color-primary-subtle)] text-[var(--color-primary)]',                                    alarm: true,  action: '신청하기', actionStyle: 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)]' },
  { title: '스마트시티 시민 아카데미 4월반',            type: '시민교육', status: '모집 중',  statusStyle: 'bg-[var(--color-primary-subtle)] text-[var(--color-primary)]',                                    alarm: false, action: '수강신청', actionStyle: 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)]' },
  { title: '광명시 에너지 데이터 AI 예측 챌린지',      type: '오픈랩',  status: '종료',     statusStyle: 'bg-slate-100 text-slate-400',                                                                      alarm: false, action: '종료됨',   actionStyle: 'bg-slate-100 text-slate-400 cursor-default' },
];

type NotifKey = '관심 사업 모집 시작 알림' | '신청 결과 통보 알림' | '마감 임박 알림 (D-3)';
const NOTIF_KEYS: NotifKey[] = ['관심 사업 모집 시작 알림', '신청 결과 통보 알림', '마감 임박 알림 (D-3)'];

export default function MyInterests() {
  const [filter, setFilter] = useState('전체');
  const [notifs, setNotifs] = useState<Record<NotifKey, boolean>>({
    '관심 사업 모집 시작 알림': true,
    '신청 결과 통보 알림': true,
    '마감 임박 알림 (D-3)': false,
  });

  const rows = filter === '전체' ? ALL_ROWS : ALL_ROWS.filter(r => r.type === filter);

  return (
    <MyPageLayout>
      {/* Page title */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Star className="text-[var(--color-primary)]" size={28} />
          <h1 className="text-2xl font-black text-slate-900">관심사업 관리</h1>
        </div>
        <span className="text-sm font-bold text-slate-400">총 {ALL_ROWS.length}건</span>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {FILTER_TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
              filter === tab
                ? 'bg-slate-900 text-white'
                : 'bg-white border border-line-normal text-slate-500 hover:border-slate-400'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white border border-line-normal rounded-[16px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-line-neutral">
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">사업·과제명</th>
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">유형</th>
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest text-center">상태</th>
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest text-center">알림</th>
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest text-center">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line-neutral">
              {rows.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-slate-900 max-w-[260px]">{row.title}</td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-500 whitespace-nowrap">{row.type}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold whitespace-nowrap ${row.statusStyle}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {row.alarm
                      ? <span className="inline-flex items-center gap-1 text-xs font-bold text-[var(--color-primary)]"><Bell size={12} /> ON</span>
                      : <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-300"><BellOff size={12} /> OFF</span>
                    }
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all whitespace-nowrap ${row.actionStyle}`}>
                      {row.action}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {rows.length === 0 && (
          <div className="py-16 text-center text-slate-400 font-medium">해당 유형의 관심 사업이 없습니다.</div>
        )}
      </div>

      {/* Notification Settings */}
      <div className="bg-white border border-line-normal rounded-[16px] p-8 space-y-6">
        <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
          <Bell className="text-[var(--color-primary)]" size={20} /> 알림 설정
        </h3>
        <div className="space-y-4">
          {NOTIF_KEYS.map(key => (
            <div key={key} className="flex items-center justify-between py-3 border-b border-line-neutral last:border-0">
              <span className="text-sm font-medium text-slate-700">{key}</span>
              <button
                onClick={() => setNotifs(prev => ({ ...prev, [key]: !prev[key] }))}
                className={`w-11 h-6 rounded-full transition-all relative ${notifs[key] ? 'bg-[var(--color-primary)]' : 'bg-gray-200'}`}
              >
                <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all ${notifs[key] ? 'left-[22px]' : 'left-0.5'}`} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </MyPageLayout>
  );
}
