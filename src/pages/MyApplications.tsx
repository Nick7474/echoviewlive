import { useState, useEffect } from 'react';
import { ClipboardList, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import MyPageLayout from '../components/MyPageLayout';

const ALL_ROWS = [
  { title: '태양광 모니터링 리빙랩 참여 (3기)', type: '리빙랩',   date: '26.03.13', status: '참여 중', action: '상세보기',  actionStyle: 'text-[var(--color-primary)]' },
  { title: '전기버스 DRT 수요 실증 리빙랩 (2기)', type: '리빙랩', date: '25.11.10', status: '완료',   action: '결과보기',  actionStyle: 'text-slate-500' },
  { title: '스마트시티 시민 아카데미 3월반',      type: '시민교육', date: '26.02.20', status: '수료',   action: '수료증',    actionStyle: 'text-slate-500' },
];

const STATUS_STYLE: Record<string, string> = {
  '참여 중': 'bg-[var(--color-primary-subtle)] text-[var(--color-primary)]',
  '완료':   'bg-slate-100 text-slate-500',
  '수료':   'bg-blue-50 text-blue-500',
};

const FILTER_TABS = ['전체', '리빙랩', '오픈랩', '시민교육'];

export default function MyApplications() {
  useEffect(() => {
    document.title = "사업신청내역 | 에코뷰";
  }, []);
  const [filter, setFilter] = useState('전체');
  const rows = filter === '전체' ? ALL_ROWS : ALL_ROWS.filter(r => r.type === filter);

  return (
    <MyPageLayout>
      {/* Page title */}
      <div className="flex items-center gap-3">
        <ClipboardList className="text-[var(--color-primary)]" size={28} />
        <h1 className="text-2xl font-black text-slate-900">사업신청내역</h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: '전체 신청', value: '3건', color: 'text-slate-900' },
          { label: '참여 중',   value: '1건', color: 'text-[var(--color-primary)]' },
          { label: '완료',      value: '2건', color: 'text-slate-400' },
        ].map(c => (
          <div key={c.label} className="bg-white border border-line-normal rounded-[16px] p-6 text-center space-y-1">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{c.label}</p>
            <p className={`text-3xl font-black ${c.color}`}>{c.value}</p>
          </div>
        ))}
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
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">사업명</th>
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">유형</th>
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">신청일</th>
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest text-center">상태</th>
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest text-center">비고</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line-neutral">
              {rows.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">{row.title}</td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-500">{row.type}</td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-500">{row.date}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${STATUS_STYLE[row.status]}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button className={`text-sm font-bold hover:underline underline-offset-4 ${row.actionStyle}`}>
                      {row.action}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {rows.length === 0 && (
          <div className="py-16 text-center text-slate-400 font-medium">해당 유형의 신청 내역이 없습니다.</div>
        )}
      </div>

      {/* CTA Banner */}
      <div className="bg-[var(--color-primary-subtle)] border border-[var(--color-primary-border)]/20 rounded-[16px] p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-lg font-black text-slate-900">새 리빙랩 과제에 참여해 보세요!</h3>
          <p className="text-slate-500 font-medium text-sm">제3기 리빙랩 모집이 진행 중입니다.</p>
        </div>
        <Link
          to="/announcements"
          className="flex items-center gap-2 px-6 py-3 bg-[var(--color-primary)] text-white rounded-[16px] font-black text-sm hover:bg-[var(--color-primary-hover)] transition-all shadow-lg shadow-[var(--color-primary)]/20 whitespace-nowrap"
        >
          리빙랩 바로가기 <ArrowRight size={16} />
        </Link>
      </div>
    </MyPageLayout>
  );
}
