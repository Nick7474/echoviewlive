import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { TreePine, Maximize2, Plus, Minus, Layers, Bus, Bike, ArrowUp } from 'lucide-react';

// ─── Card Header ─────────────────────────────────────────────────────────────

const CardHeader = ({ title, date = '26년 03월 기준' }: { title: string; date?: string }) => (
  <div className="flex items-center justify-between border-b border-[#e4e8eb] pb-2 mb-2.5 flex-shrink-0">
    <h2 className="text-[13px] font-bold text-[#212529] leading-tight">{title}</h2>
    <span className="text-[10px] text-[#414141] flex-shrink-0 ml-2">{date}</span>
  </div>
);

// ─── Circular Gauge (대기 환경) ───────────────────────────────────────────────

const CircleGauge = ({
  value,
  label,
  status,
  statusColor,
  size = 70,
}: {
  value: string;
  label: string;
  status: string;
  statusColor: string;
  size?: number;
}) => {
  const r = size / 2 - 8;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;
  const fillPct = status === '좋음' ? 0.22 : status === '보통' ? 0.55 : 0.82;
  const filled = fillPct * circumference;

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size}>
          <g transform={`rotate(-90 ${cx} ${cy})`}>
            <circle
              cx={cx} cy={cy} r={r}
              fill="none" stroke="#e5e7eb" strokeWidth="5"
            />
            <circle
              cx={cx} cy={cy} r={r}
              fill="none"
              style={{ stroke: statusColor }}
              strokeWidth="5"
              strokeDasharray={`${filled} ${circumference - filled}`}
              strokeLinecap="round"
            />
          </g>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[10px] font-bold text-gray-800 text-center leading-tight px-0.5">{value}</span>
        </div>
      </div>
      <p className="text-[9px] text-gray-500 text-center leading-tight w-16">{label}</p>
      <p className="text-[11px] font-bold" style={{ color: statusColor }}>{status}</p>
    </div>
  );
};

// ─── Semi-circle Gauge (탄소 배출) ────────────────────────────────────────────

const SemiGauge = ({ value, max = 100 }: { value: number; max?: number }) => {
  const r = 50;
  const cx = 75;
  const cy = 64;

  // Background arc: left (9 o'clock) → right (3 o'clock) through the top
  const bgPath = `M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`;

  // Filled arc: partial arc based on value
  const t = Math.min(value / max, 1);
  // At fraction t along the 180° arc (from 180° to 0° in standard math coords):
  const mathAngle = Math.PI * (1 - t);
  const ex = cx + r * Math.cos(mathAngle);
  const ey = cy - r * Math.sin(mathAngle);
  const largeArc = t > 0.5 ? 1 : 0;
  const fPath = `M ${cx - r} ${cy} A ${r} ${r} 0 ${largeArc} 1 ${ex.toFixed(2)} ${ey.toFixed(2)}`;

  return (
    <svg width="150" height="76" viewBox="0 0 150 76" overflow="visible">
      <path d={bgPath} fill="none" stroke="#e5e7eb" strokeWidth="10" strokeLinecap="round" />
      {t > 0 && (
        <path d={fPath} fill="none" style={{ stroke: 'var(--color-primary)' }} strokeWidth="10" strokeLinecap="round" />
      )}
      <text x={cx} y={cy - 4} textAnchor="middle" fontSize="26" fontWeight="800" fill="#1e2124">{value}</text>
      <text x={cx} y={cy + 14} textAnchor="middle" fontSize="9" fill="#9CA3AF">탄소 배출 지수</text>
    </svg>
  );
};

// ─── Energy Bar (grouped dual bar) ───────────────────────────────────────────

const EnergyBar = ({
  label, cur, acc, maxV = 60,
}: {
  label: string; cur: number; acc: number; maxV?: number;
}) => (
  <div className="flex items-center gap-2">
    <span className="text-[10px] text-gray-400 w-9 flex-shrink-0 text-right">{label}</span>
    <div className="flex-1 bg-gray-100 rounded-full h-2">
      <div className="h-2 rounded-full bg-[var(--color-primary)]" style={{ width: `${Math.min((cur / maxV) * 100, 100)}%` }} />
    </div>
    <div className="flex-1 bg-gray-100 rounded-full h-2">
      <div className="h-2 rounded-full bg-[#017ddd]" style={{ width: `${Math.min((acc / maxV) * 100, 100)}%` }} />
    </div>
  </div>
);

// ─── Main Component ──────────────────────────────────────────────────────────

export default function Home() {
  useEffect(() => {
    document.title = '광명시 에코뷰 | 통합플랫폼';
  }, []);

  const [activeTab, setActiveTab] = useState<'news' | 'notice'>('news');

  const datasets = [
    { rank: 1, cat: '교통',   name: '전기차 충전소 이용 현황', count: '1,682', cls: 'bg-[#e1f1f0] text-[var(--color-primary)]' },
    { rank: 2, cat: '환경',   name: '대기질 관측 데이터',      count: '231',   cls: 'bg-[#d9f3ff] text-[#0083b3]' },
    { rank: 3, cat: '교통',   name: '공공자전거 대여 이력',    count: '284',   cls: 'bg-[#e1f1f0] text-[var(--color-primary)]' },
    { rank: 4, cat: '에너지', name: '전기차 충전소 이용 현황', count: '225',   cls: 'bg-[#efe8f2] text-[#a155b9]' },
    { rank: 5, cat: '에너지', name: '에너지 사용량 통계',      count: '198',   cls: 'bg-[#efe8f2] text-[#a155b9]' },
  ];

  const news = [
    '광명시, 탄소중립 실천 경제 활성화..',
    '2026년 에코뷰 서비스 점검 안내',
    '우리 동네 기후에너지 체험관 운영',
    '제3기 기후의병 시민 활동가 모집',
  ];

  const mileButtons = [
    { label: '에너지\n마일',   cls: 'bg-[#faad14] text-white shadow-md' },
    { label: '모빌리티\n마일', cls: 'bg-white border border-gray-200 text-gray-600 shadow-sm' },
    { label: '안전\n마일',     cls: 'bg-white border border-gray-200 text-gray-600 shadow-sm' },
    { label: '데이터\n마일',   cls: 'bg-white border border-gray-200 text-gray-600 shadow-sm' },
  ];

  return (
    <div className="bg-[#e1f1f0] w-full">
      <h1 className="sr-only">광명시 에코뷰 홈</h1>

      <div className="max-w-[1560px] mx-auto w-full px-3 py-3">
        <div className="flex gap-3" style={{ height: '960px' }}>

          {/* ════════════════════════════════════════════════════════════════ */}
          {/* LEFT PANEL                                                       */}
          {/* ════════════════════════════════════════════════════════════════ */}
          <div className="w-[380px] flex-shrink-0 flex flex-col gap-3">

            {/* L1 — 신재생 에너지 생산현황 */}
            <section
              aria-label="신재생 에너지 생산현황"
              className="flex-1 bg-white border border-[#dfe0e4] rounded-2xl shadow-sm p-3.5 flex flex-col"
            >
              <CardHeader title="신재생 에너지 생산현황" />

              {/* Info box */}
              <div className="bg-[#f0f3f8] rounded-xl p-2.5 flex gap-3 mb-3 flex-shrink-0">
                <div className="flex-1 text-center">
                  <p className="text-[9px] text-gray-500 mb-0.5">금일 생산량</p>
                  <p className="text-[13px] font-black text-[var(--color-primary)]">
                    11.88 <span className="text-[9px] font-normal">kWh</span>
                  </p>
                </div>
                <div className="w-px bg-gray-200" />
                <div className="flex-1 text-center">
                  <p className="text-[9px] text-gray-500 mb-0.5">당월 누적</p>
                  <p className="text-[13px] font-black text-[#017ddd]">
                    56.00 <span className="text-[9px] font-normal">kWh</span>
                  </p>
                </div>
              </div>

              {/* Grouped dual bars */}
              <div className="flex-1 flex flex-col justify-center gap-2.5">
                <EnergyBar label="태양광" cur={52} acc={40} />
                <EnergyBar label="풍력"   cur={32} acc={22} />
                <EnergyBar label="지열"   cur={18} acc={14} />
                <EnergyBar label="바이오" cur={10} acc={8}  />
              </div>

              {/* Legend */}
              <div className="flex items-center gap-4 pt-2 border-t border-gray-100 mt-1 flex-shrink-0">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-primary)]" />
                  <span className="text-[9px] text-gray-500">당월 생산</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#017ddd]" />
                  <span className="text-[9px] text-gray-500">당월 누적</span>
                </div>
              </div>
            </section>

            {/* L2 — 스마트 모빌리티 운영현황 */}
            <section
              aria-label="스마트 모빌리티 운영현황"
              className="flex-1 bg-white border border-[#dfe0e4] rounded-2xl shadow-sm p-3.5 flex flex-col"
            >
              <CardHeader title="스마트 모빌리티 운영현황" />
              <div className="flex gap-3 flex-1">
                {/* EV-DRT 버스 */}
                <div className="flex-1 bg-[#f0f3f8] rounded-xl p-3 flex flex-col items-center justify-center gap-1.5">
                  <div className="w-10 h-10 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center">
                    <Bus size={20} className="text-[var(--color-primary)]" />
                  </div>
                  <p className="text-[9px] text-gray-500 text-center leading-tight">친환경 EV-DRT 버스</p>
                  <p className="text-2xl font-black text-[var(--color-primary)]">
                    23<span className="text-sm font-normal text-gray-500">대</span>
                  </p>
                  <span className="text-[10px] bg-[var(--color-primary)] text-white px-2.5 py-0.5 rounded-full font-bold">
                    운행중
                  </span>
                </div>
                {/* 공공자전거 */}
                <div className="flex-1 bg-[#f0f3f8] rounded-xl p-3 flex flex-col items-center justify-center gap-1.5">
                  <div className="w-10 h-10 rounded-full bg-[#017ddd]/10 flex items-center justify-center">
                    <Bike size={20} className="text-[#017ddd]" />
                  </div>
                  <p className="text-[9px] text-gray-500 text-center leading-tight">공공자전거 이용률</p>
                  <p className="text-2xl font-black text-[#017ddd]">
                    0.8<span className="text-sm font-normal text-gray-500">%</span>
                  </p>
                  <span className="text-[10px] text-gray-400">전일 대비</span>
                </div>
              </div>
            </section>

            {/* L3 — 통합대기환경지수 */}
            <section
              aria-label="통합대기환경지수"
              className="flex-1 bg-white border border-[#dfe0e4] rounded-2xl shadow-sm p-3.5 flex flex-col"
            >
              <CardHeader title="통합대기환경지수" />
              <div className="flex-1 flex items-center justify-around px-1">
                <CircleGauge
                  value="16㎍/m³"
                  label="초미세먼지(PM2.5)"
                  status="보통"
                  statusColor="#017ddd"
                />
                <CircleGauge
                  value="23㎍/m³"
                  label="미세먼지(PM10)"
                  status="좋음"
                  statusColor="var(--color-primary)"
                />
                <CircleGauge
                  value="0.054ppm"
                  label="오존(O3)"
                  status="보통"
                  statusColor="#017ddd"
                />
              </div>
            </section>

            {/* L4 — 인기 데이터 세트 TOP 5 */}
            <section
              aria-label="인기 데이터 세트 TOP 5"
              className="flex-1 bg-white border border-[#dfe0e4] rounded-2xl shadow-sm p-3.5 flex flex-col"
            >
              <CardHeader title="인기 데이터 세트 TOP 5" />
              <div className="flex-1 flex flex-col justify-around">
                {datasets.map((d) => (
                  <div key={d.rank} className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-gray-100 text-[10px] font-black text-gray-500 flex items-center justify-center flex-shrink-0">
                      {d.rank}
                    </span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded flex-shrink-0 ${d.cls}`}>
                      {d.cat}
                    </span>
                    <span className="text-[11px] text-gray-700 flex-1 truncate">{d.name}</span>
                    <span className="text-[10px] font-bold text-gray-400 flex-shrink-0">{d.count}건</span>
                  </div>
                ))}
              </div>
            </section>

          </div>{/* /LEFT PANEL */}

          {/* ════════════════════════════════════════════════════════════════ */}
          {/* CENTER — MAP                                                     */}
          {/* ════════════════════════════════════════════════════════════════ */}
          <div
            className="flex-1 relative rounded-2xl overflow-hidden border border-[#dfe0e4] shadow-sm"
            role="img"
            aria-label="광명시 스마트 시티 지도"
          >
            <MapContainer
              center={[37.4789, 126.8644]}
              zoom={12}
              style={{ width: '100%', height: '100%', zIndex: 0 }}
              zoomControl={false}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
            </MapContainer>

            {/* Hero text overlay */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10 text-center pointer-events-none select-none">
              <p className="text-sm font-medium text-[#0d2d1c] drop-shadow">데이터로 함께 그리는 미래</p>
              <p className="text-[2.6rem] font-bold drop-shadow leading-tight">
                <span className="text-[#0d2d1c]">광명시 </span>
                <span className="text-[var(--color-primary)]">에코뷰</span>
              </p>
            </div>

            {/* Mile buttons — right side column */}
            <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
              {mileButtons.map((btn, i) => (
                <button
                  key={i}
                  className={`w-[52px] h-[52px] rounded-full flex flex-col items-center justify-center text-[9px] font-bold leading-tight whitespace-pre-line ${btn.cls}`}
                >
                  {btn.label}
                </button>
              ))}
            </div>

            {/* Map controls — left of mile buttons */}
            <div className="absolute top-4 right-[68px] z-10 flex flex-col gap-2">
              <button
                aria-label="전체화면"
                className="w-8 h-8 bg-white border border-gray-200 rounded-lg flex items-center justify-center shadow-sm hover:bg-gray-50 text-gray-600 transition-colors"
              >
                <Maximize2 size={13} />
              </button>
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col divide-y divide-gray-100">
                <button
                  aria-label="확대"
                  className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 text-gray-600 transition-colors"
                >
                  <Plus size={13} />
                </button>
                <button
                  aria-label="축소"
                  className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 text-gray-600 transition-colors"
                >
                  <Minus size={13} />
                </button>
              </div>
              <button
                aria-label="레이어"
                className="w-8 h-8 bg-white border border-gray-200 rounded-lg flex items-center justify-center shadow-sm hover:bg-gray-50 text-gray-600 transition-colors"
              >
                <Layers size={13} />
              </button>
            </div>
          </div>{/* /CENTER MAP */}

          {/* ════════════════════════════════════════════════════════════════ */}
          {/* RIGHT PANEL                                                      */}
          {/* ════════════════════════════════════════════════════════════════ */}
          <div className="w-[380px] flex-shrink-0 flex flex-col gap-3">

            {/* R1 — 시민 참여 프로그램 */}
            <section
              aria-label="시민 참여 프로그램"
              className="flex-1 bg-white border border-[#dfe0e4] rounded-2xl shadow-sm p-3.5 flex flex-col"
            >
              <CardHeader title="시민 참여 프로그램" />
              <div className="flex gap-3 flex-1">
                {/* Living Lab */}
                <div className="flex-1 bg-[#ecf9f0] rounded-xl p-3 flex flex-col justify-between">
                  <div>
                    <p className="text-[9px] font-bold text-[var(--color-primary)] mb-1">Living Lab</p>
                    <p className="text-[12px] font-bold text-gray-800 leading-snug">
                      우리 동네 환경 개선단 모집
                    </p>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[9px] font-black text-white bg-[var(--color-primary)] px-2 py-0.5 rounded-full">
                      D-7
                    </span>
                    <span className="text-[11px] font-bold text-[var(--color-primary)]">모집중</span>
                  </div>
                </div>
                {/* Open Lab */}
                <div className="flex-1 bg-[#e4effd] rounded-xl p-3 flex flex-col justify-between">
                  <div>
                    <p className="text-[9px] font-bold text-[#00aeef] mb-1">Open Lab</p>
                    <p className="text-[12px] font-bold text-gray-800 leading-snug">
                      탄소중립 혁신 아이디어 공모전
                    </p>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[9px] font-black text-white bg-[#00aeef] px-2 py-0.5 rounded-full">
                      D-15
                    </span>
                    <span className="text-[11px] font-bold text-[#00aeef]">접수중</span>
                  </div>
                </div>
              </div>
            </section>

            {/* R2 — 실시간 탄소 배출/저감 현황 */}
            <section
              aria-label="실시간 탄소 배출 및 저감 현황"
              className="flex-1 bg-white border border-[#dfe0e4] rounded-2xl shadow-sm p-3.5 flex flex-col"
            >
              <CardHeader title="실시간 탄소 배출 / 저감 현황" />
              <div className="flex-1 flex items-center gap-2">
                {/* Semi-circle gauge */}
                <div className="flex items-end justify-center flex-shrink-0">
                  <SemiGauge value={72} />
                </div>
                {/* Stats */}
                <div className="flex-1 bg-[#f0f3f8] rounded-xl p-3 space-y-2.5 self-center">
                  <div>
                    <p className="text-[9px] text-gray-500">총 배출량</p>
                    <p className="text-[13px] font-black text-gray-800">
                      239.18 <span className="text-[9px] font-normal">tCO₂eq</span>
                    </p>
                  </div>
                  <div>
                    <p className="text-[9px] text-gray-500">목표 대비 저감률</p>
                    <p className="text-[13px] font-black text-[var(--color-primary)]">
                      30.53<span className="text-[9px] font-normal">%</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <ArrowUp size={11} className="text-[#e53a4c]" />
                    <span className="text-[11px] font-bold text-[#e53a4c]">4.8%</span>
                  </div>
                </div>
              </div>
            </section>

            {/* R3 — 시정 소식 & 공지사항 */}
            <section
              aria-label="시정 소식 및 공지사항"
              className="flex-1 bg-white border border-[#dfe0e4] rounded-2xl shadow-sm p-3.5 flex flex-col"
            >
              <CardHeader title="시정 소식 & 공지사항" />

              {/* Tab switcher */}
              <div className="flex gap-0.5 mb-2.5 bg-gray-100 rounded-full p-0.5 w-fit flex-shrink-0">
                {(['news', 'notice'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`text-[11px] font-bold px-3 py-1 rounded-full transition-all ${
                      activeTab === tab ? 'bg-[#017ddd] text-white shadow-sm' : 'text-gray-500'
                    }`}
                  >
                    {tab === 'news' ? '시정 소식' : '공지사항'}
                  </button>
                ))}
              </div>

              {/* News list */}
              <div className="flex-1 flex flex-col justify-around">
                {news.map((item, i) => (
                  <div key={i} className="flex items-center justify-between gap-2 py-0.5">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] flex-shrink-0" />
                      <span className="text-[12px] text-gray-700 truncate">{item}</span>
                    </div>
                    <span className="text-[10px] text-gray-400 flex-shrink-0">26.03.13</span>
                  </div>
                ))}
              </div>
            </section>

            {/* R4 — 기후의병 활약상 */}
            <section
              aria-label="기후의병 활약상"
              className="flex-1 bg-white border border-[#dfe0e4] rounded-2xl shadow-sm p-3.5 flex flex-col"
            >
              <CardHeader title="기후의병 활약상" />

              {/* Main content */}
              <div className="flex-1 flex flex-col items-center justify-center gap-1.5">
                <div className="w-11 h-11 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center">
                  <TreePine size={24} className="text-[var(--color-primary)]" />
                </div>
                <p className="text-[11px] text-gray-500">오늘 광명시가 심은 나무</p>
                <p className="text-3xl font-black text-gray-900">
                  1,248 <span className="text-base font-medium text-gray-600">그루</span>
                </p>
                <button className="mt-0.5 px-5 py-1.5 bg-[var(--color-primary)] text-white text-[12px] font-bold rounded-lg hover:opacity-90 transition-opacity">
                  참여하기
                </button>
              </div>

              {/* Bottom stats */}
              <div className="bg-[#f0f3f8] rounded-xl p-2.5 grid grid-cols-3 divide-x divide-gray-200 flex-shrink-0 mt-2">
                {[
                  { label: '참여 인원',   value: '4.2만명' },
                  { label: '누적 사용량', value: '1.2억 P' },
                  { label: '총 감축량',   value: '320 t'   },
                ].map((s) => (
                  <div key={s.label} className="flex flex-col items-center gap-0.5 px-1">
                    <span className="text-[9px] text-gray-500">{s.label}</span>
                    <span className="text-[12px] font-black text-gray-800">{s.value}</span>
                  </div>
                ))}
              </div>
            </section>

          </div>{/* /RIGHT PANEL */}

        </div>
      </div>
    </div>
  );
}
