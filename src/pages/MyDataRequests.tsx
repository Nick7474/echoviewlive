import { useState } from 'react';
import { Database, Download, Eye, EyeOff, RefreshCw, AlertTriangle } from 'lucide-react';
import MyPageLayout from '../components/MyPageLayout';

const TABS = ['다운로드 내역', 'API 키 관리', '신규 데이터 신청'] as const;
type Tab = typeof TABS[number];

const DOWNLOADS = [
  { title: '광명시 월별 탄소배출량 현황',     format: 'CSV',  date: '26.03.10' },
  { title: '광명시 전기차 충전소 위치 데이터', format: 'JSON', date: '26.02.28' },
  { title: '광명시 에너지 사용량 통계',        format: 'XLSX', date: '26.02.15' },
];

const FORMAT_COLOR: Record<string, string> = {
  CSV:  'bg-[var(--color-primary-subtle)] text-[var(--color-primary)]',
  JSON: 'bg-blue-50 text-blue-500',
  XLSX: 'bg-amber-50 text-amber-500',
};

const NEW_REQUESTS = [
  { title: '광명시 CCTV 설치 현황',        date: '26.03.05', status: '검토 중',   statusStyle: 'bg-amber-50 text-amber-500',                                                                           action: '-',        actionStyle: 'text-slate-300 cursor-default' },
  { title: '광명시 대기질 측정 원시데이터', date: '26.01.20', status: '승인 완료', statusStyle: 'bg-[var(--color-primary-subtle)] text-[var(--color-primary)]', action: '다운로드', actionStyle: 'text-[var(--color-primary)] font-bold hover:underline underline-offset-4' },
];

export default function MyDataRequests() {
  const [activeTab, setActiveTab] = useState<Tab>('다운로드 내역');
  const [showKey, setShowKey] = useState(false);
  const usagePercent = Math.round((142 / 1000) * 100);

  return (
    <MyPageLayout>
      {/* Page title */}
      <div className="flex items-center gap-3">
        <Database className="text-[var(--color-primary)]" size={28} />
        <h1 className="text-2xl font-black text-slate-900">데이터 신청내역</h1>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
              activeTab === tab
                ? 'bg-slate-900 text-white'
                : 'bg-white border border-line-normal text-slate-500 hover:border-slate-400'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ── 다운로드 내역 ── */}
      {activeTab === '다운로드 내역' && (
        <div className="bg-white border border-line-normal rounded-[16px] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-line-neutral">
                  <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">데이터명</th>
                  <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">형식</th>
                  <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">다운로드일</th>
                  <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest text-center">재다운로드</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line-neutral">
                {DOWNLOADS.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">{row.title}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-black ${FORMAT_COLOR[row.format]}`}>
                        {row.format}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-500">{row.date}</td>
                    <td className="px-6 py-4 text-center">
                      <button className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-600 hover:text-[var(--color-primary)] transition-colors">
                        <Download size={14} /> 재다운로드
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── API 키 관리 ── */}
      {activeTab === 'API 키 관리' && (
        <div className="bg-white border border-line-normal rounded-[16px] p-8 space-y-8">
          <h3 className="text-lg font-black text-slate-900">API 키 정보</h3>

          <div className="space-y-3">
            <p className="text-sm font-bold text-slate-500">현재 API 키</p>
            <div className="flex items-center gap-3">
              <div className="flex-grow bg-gray-50 border border-line-normal rounded-xl px-4 py-3 font-mono text-sm text-slate-700 tracking-widest">
                {showKey ? 'gm-eco-a3f2-b91c-7e4d' : 'gm-eco-xxxx-xxxx-xxxx'}
              </div>
              <button
                onClick={() => setShowKey(!showKey)}
                className="p-3 rounded-xl border border-line-normal text-slate-400 hover:border-slate-400 hover:text-slate-700 transition-all"
              >
                {showKey ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm font-bold">
              <span className="text-slate-500">일일 사용량</span>
              <span className="text-slate-900">142 / 1,000건</span>
            </div>
            <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[var(--color-primary)] rounded-full transition-all"
                style={{ width: `${usagePercent}%` }}
              />
            </div>
            <p className="text-xs text-slate-400 font-medium">{usagePercent}% 사용 중 · 매일 자정 초기화</p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <button className="flex items-center gap-2 px-5 py-2.5 border border-[var(--color-primary-border)] text-[var(--color-primary)] rounded-xl font-black text-sm hover:bg-[var(--color-primary-subtle)] transition-all">
              <RefreshCw size={16} /> 키 재발급
            </button>
            <div className="flex items-center gap-2 text-amber-600 text-sm font-medium">
              <AlertTriangle size={14} />
              재발급 시 기존 키는 즉시 만료됩니다
            </div>
          </div>
        </div>
      )}

      {/* ── 신규 데이터 신청 ── */}
      {activeTab === '신규 데이터 신청' && (
        <div className="bg-white border border-line-normal rounded-[16px] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-line-neutral">
                  <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">신청 데이터명</th>
                  <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">신청일</th>
                  <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest text-center">처리 상태</th>
                  <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest text-center">비고</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line-neutral">
                {NEW_REQUESTS.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">{row.title}</td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-500">{row.date}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${row.statusStyle}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button className={`text-sm ${row.actionStyle}`}>{row.action}</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </MyPageLayout>
  );
}
