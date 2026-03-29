import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON, CircleMarker, Popup } from 'react-leaflet';
import type { PathOptions } from 'leaflet';
import { TreePine, Maximize2, Plus, Minus, Layers, Bus, Bike, ArrowUp, Zap, Car, ShieldCheck, Database } from 'lucide-react';

// ─── Auto Scroll Container (마우스 드래그 및 자동 슬라이드) ────────────────────────
const AutoScrollList = ({ children }: { children: React.ReactNode }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (!isHovered) {
      interval = setInterval(() => {
        if (scrollRef.current) {
          const { scrollLeft: left, scrollWidth, clientWidth } = scrollRef.current;
          const itemWidth = 163; 
          
          if (left + clientWidth >= scrollWidth - 10) {
            scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            scrollRef.current.scrollBy({ left: itemWidth, behavior: 'smooth' });
          }
        }
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isHovered]);

  const onMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    isDragging.current = true;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
  };

  const onMouseLeave = () => {
    isDragging.current = false;
    setIsHovered(false);
  };

  const onMouseUp = () => {
    isDragging.current = false;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <div
      ref={scrollRef}
      className="flex gap-2.5 flex-1 min-h-0 pt-1 overflow-x-auto snap-x select-none cursor-grab active:cursor-grabbing [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={onMouseLeave}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
    >
      {children}
    </div>
  );
};

// ─── Card Header (compact) ────────────────────────────────────────────────────

const CardHeader = ({ title, date = '26년 03월 기준' }: { title: string; date?: string }) => (
  <div className="flex items-center justify-between border-b border-[#e4e8eb] py-[6px] mb-[6px] flex-shrink-0">
    <h2 className="text-[15px] font-bold text-[#212529] leading-tight">{title}</h2>
    <span className="text-[10px] text-[#414141] flex-shrink-0 ml-2">{date}</span>
  </div>
);

// ─── Circular Gauge (대기 환경) ───────────────────────────────────────────────

const CircleGauge = ({
  value,
  unit,
  label,
  status,
  statusColor,
  size = 76,
}: {
  value: string;
  unit?: string;
  label: string;
  status: string;
  statusColor: string;
  size?: number;
}) => {
  const strokeW = 4.5;
  const r = size / 2 - strokeW / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;
  const fillPct = status === '좋음' ? 0.18 : status === '보통' ? 0.28 : 0.6;
  const filled = fillPct * circumference;

  const mainL = label.includes('(') ? label.substring(0, label.indexOf('(')) : label;
  const subL = label.includes('(') ? label.substring(label.indexOf('(')) : '';

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size}>
          <g transform={`rotate(-90 ${cx} ${cy})`}>
            <circle cx={cx} cy={cy} r={r} fill={statusColor} fillOpacity={0.08} />
            <circle cx={cx} cy={cy} r={r} fill="none" stroke={statusColor} strokeOpacity={0.25} strokeWidth={strokeW} />
            <circle
              cx={cx} cy={cy} r={r}
              fill="none"
              stroke={statusColor}
              strokeWidth={strokeW}
              strokeDasharray={`${filled} ${circumference - filled}`}
              strokeLinecap="butt"
            />
          </g>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-0.5">
          <span className="text-[18px] font-black text-gray-900 leading-[1.1] tracking-tight">{value}</span>
          {unit && <span className="text-[9.5px] font-bold text-gray-600 leading-none">{unit}</span>}
        </div>
      </div>
      <div className="flex flex-col items-center leading-[1.3] mt-2 mb-1">
        <p className="text-[11.5px] font-bold text-gray-800 tracking-tight">{mainL}</p>
        {subL && <p className="text-[10px] font-semibold text-gray-600">{subL}</p>}
      </div>
      <p className="text-[11.5px] font-bold" style={{ color: statusColor }}>{status}</p>
    </div>
  );
};

// ─── Semi-circle Gauge (탄소 배출) ────────────────────────────────────────────

const SemiGauge = ({ value, max = 100 }: { value: number; max?: number }) => {
  const r = 44;
  const cx = 66;
  const cy = 56;
  const bgPath = `M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`;
  const t = Math.min(value / max, 1);
  const angle = Math.PI * (1 - t);
  const ex = cx + r * Math.cos(angle);
  const ey = cy - r * Math.sin(angle);
  const largeArc = t > 0.5 ? 1 : 0;
  const fPath = `M ${cx - r} ${cy} A ${r} ${r} 0 ${largeArc} 1 ${ex.toFixed(2)} ${ey.toFixed(2)}`;

  return (
    <svg width="132" height="68" viewBox="0 0 132 68" overflow="visible">
      <path d={bgPath} fill="none" stroke="#e5e7eb" strokeWidth="9" strokeLinecap="round" />
      {t > 0 && (
        <path d={fPath} fill="none" style={{ stroke: 'var(--color-primary)' }} strokeWidth="9" strokeLinecap="round" />
      )}
      <text x={cx} y={cy - 3} textAnchor="middle" fontSize="22" fontWeight="800" fill="#1e2124">{value}</text>
      <text x={cx} y={cy + 12} textAnchor="middle" fontSize="8" fill="#9CA3AF">탄소 배출 지수</text>
    </svg>
  );
};

// ─── Energy Bar ───────────────────────────────────────────────────────────────

const EnergyBar = ({ label, cur, acc, maxV = 60 }: { label: string; cur: number; acc: number; maxV?: number }) => (
  <div className="flex items-center gap-[8px]">
    <span className="text-[10px] text-gray-400 w-8 flex-shrink-0 text-right">{label}</span>
    <div className="flex-1 bg-gray-100 rounded-full h-1.5">
      <div className="h-1.5 rounded-full bg-[var(--color-primary)]" style={{ width: `${Math.min((cur / maxV) * 100, 100)}%` }} />
    </div>
    <div className="flex-1 bg-gray-100 rounded-full h-1.5">
      <div className="h-1.5 rounded-full bg-[#017ddd]" style={{ width: `${Math.min((acc / maxV) * 100, 100)}%` }} />
    </div>
  </div>
);

// ─── GeoJSON 광명시 경계 (근사 폴리곤) ────────────────────────────────────────

const gwangmyeongBoundary = {
  type: 'Feature' as const,
  properties: {},
  geometry: {
    type: 'Polygon' as const,
    coordinates: [[
      [126.8305, 37.4495],
      [126.8480, 37.4390],
      [126.8700, 37.4370],
      [126.8980, 37.4450],
      [126.9100, 37.4680],
      [126.9080, 37.4980],
      [126.8860, 37.5180],
      [126.8540, 37.5200],
      [126.8260, 37.5040],
      [126.8200, 37.4760],
      [126.8305, 37.4495],
    ]],
  },
};

const boundaryStyle: PathOptions = {
  color: '#069F7C',
  weight: 2.5,
  opacity: 0.8,
  fillColor: '#069F7C',
  fillOpacity: 0.06,
  dashArray: '6 4',
};

// ─── CircleMarker 데이터 ──────────────────────────────────────────────────────

type MarkerCategory = 'energy' | 'mobility' | 'safety' | 'data';

const MAP_MARKERS: { id: number; lat: number; lng: number; category: MarkerCategory; label: string; value: string }[] = [
  { id: 1, lat: 37.4782, lng: 126.8642, category: 'energy',   label: '태양광 발전소',      value: '52 kWh' },
  { id: 2, lat: 37.4732, lng: 126.8720, category: 'energy',   label: '풍력 발전소',        value: '18 kWh' },
  { id: 3, lat: 37.4852, lng: 126.8578, category: 'mobility', label: 'EV-DRT 정류장',     value: '운행중' },
  { id: 4, lat: 37.4796, lng: 126.8504, category: 'mobility', label: '공공자전거 스테이션', value: '12대 대기중' },
  { id: 5, lat: 37.4810, lng: 126.8700, category: 'safety',   label: '소화전',             value: '정상' },
  { id: 6, lat: 37.4750, lng: 126.8632, category: 'safety',   label: 'AED',               value: '정상' },
  { id: 7, lat: 37.4765, lng: 126.8550, category: 'data',     label: '대기질 센서',        value: '보통' },
  { id: 8, lat: 37.4830, lng: 126.8645, category: 'data',     label: '교통 CCTV',         value: '정상 운영중' },
];

const MARKER_COLORS: Record<MarkerCategory, string> = {
  energy:   '#faad14',
  mobility: '#069F7C',
  safety:   '#ef4444',
  data:     '#7c3aed',
};

const MARKER_LABELS: Record<MarkerCategory, string> = {
  energy:   '에너지',
  mobility: '모빌리티',
  safety:   '안전',
  data:     '데이터',
};

// ─── Main Component ──────────────────────────────────────────────────────────

export default function Home() {
  useEffect(() => {
    document.title = '광명시 에코뷰 | 통합플랫폼';
  }, []);

  const [activeTab, setActiveTab] = useState<'news' | 'notice'>('news');
  const [activeMile, setActiveMile] = useState(0);

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
    { label: '에너지 마일',   Icon: Zap,        activeColor: '#faad14', activeBg: 'bg-[#faad14]' },
    { label: '모빌리티 마일', Icon: Car,        activeColor: '#069F7C', activeBg: 'bg-[#069F7C]' },
    { label: '안전 마일',     Icon: ShieldCheck, activeColor: '#ef4444', activeBg: 'bg-[#ef4444]' },
    { label: '데이터 마일',   Icon: Database,   activeColor: '#7c3aed', activeBg: 'bg-[#7c3aed]' },
  ];

  // home_cover.png 유무 확인 — 실제 파일명 대소문자 그대로 사용
  const coverSrc = '/images/Home_Cover.png';

  return (
    <div className="relative h-[calc(100vh-80px)] overflow-hidden">
      <h1 className="sr-only">광명시 에코뷰 홈</h1>

      {/* ── Layer 0: Leaflet 지도 (전체 배경) z-0 ──────────────────────────── */}
      <div
        className="absolute inset-0 z-0"
        style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'auto' }}
        role="img"
        aria-label="광명시 스마트 시티 지도"
      >
        <MapContainer
          center={[37.4789, 126.8644]}
          zoom={12}
          zoomControl={false}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {/* 광명시 경계 GeoJSON */}
          <GeoJSON
            data={gwangmyeongBoundary as GeoJSON.Feature}
            style={() => boundaryStyle}
          />
          {/* 카테고리별 CircleMarker 핀 */}
          {MAP_MARKERS.map((m) => (
            <CircleMarker
              key={m.id}
              center={[m.lat, m.lng]}
              radius={7}
              pathOptions={{
                color: '#fff',
                weight: 2,
                fillColor: MARKER_COLORS[m.category],
                fillOpacity: 0.95,
              }}
            >
              <Popup>
                <div className="text-xs min-w-[120px]">
                  <span
                    className="inline-block px-1.5 py-0.5 rounded text-white font-bold text-[10px] mb-1"
                    style={{ backgroundColor: MARKER_COLORS[m.category] }}
                  >
                    {MARKER_LABELS[m.category]}
                  </span>
                  <p className="font-bold text-gray-800">{m.label}</p>
                  <p className="text-gray-500">{m.value}</p>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>

      {/* ── Layer 1: 커버 이미지 오버레이 z-10 ──────────────────────────────── */}
      <img
        src={coverSrc}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 z-10 w-full h-full object-cover pointer-events-none"
        style={{ pointerEvents: 'none' }}
        onError={(e) => {
          // 이미지 로드 실패 시 그라디언트로 대체
          const el = e.currentTarget;
          el.style.display = 'none';
          const fallback = el.nextElementSibling as HTMLElement | null;
          if (fallback) fallback.style.display = 'block';
        }}
      />
      {/* 커버 이미지 fallback 그라디언트 (기본 숨김) */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          display: 'none',
          pointerEvents: 'none',
          background: `
            radial-gradient(ellipse 60% 80% at 50% 50%, transparent 20%, rgba(225,241,240,0.6) 60%, rgba(225,241,240,0.95) 100%),
            linear-gradient(to right, rgba(225,241,240,0.95) 0%, transparent 22%, transparent 78%, rgba(225,241,240,0.95) 100%),
            linear-gradient(to bottom, rgba(225,241,240,0.4) 0%, transparent 12%, transparent 88%, rgba(225,241,240,0.6) 100%)
          `,
        }}
      />

      {/* ── Layer 2: 콘텐츠 z-20 ────────────────────────────────────────────── */}
      <div className="relative z-20 h-full flex items-start px-[90px] pt-[16px] gap-[30px] pb-[24px] pointer-events-none">

        {/* 히어로 텍스트 — Layer 2 내 절대 위치 */}
        <div className="absolute top-[60px] left-[504px] text-left pointer-events-none select-none z-10">
          <p className="text-[28px] font-medium text-[#0d2d1c] drop-shadow-sm leading-tight">데이터로 함께 그리는 미래</p>
          <h2 className="text-[56px] font-bold drop-shadow-sm leading-tight mt-1">
            <span className="text-[#0d2d1c]">광명시 </span>
            <span className="text-[var(--color-primary)]">에코뷰</span>
          </h2>
        </div>

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* LEFT PANEL                                                         */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        <div className="w-[380px] flex-shrink-0 flex flex-col h-full gap-[14px] mb-[24px] pointer-events-auto">

          {/* L1 — 신재생 에너지 생산현황 */}
          <section
            aria-label="신재생 에너지 생산현황"
            className="flex-1 min-h-0 bg-white border border-[#dfe0e4] rounded-2xl shadow-sm p-3 flex flex-col overflow-hidden"
          >
            <CardHeader title="신재생 에너지 생산현황" />
            
            <div className="flex flex-1 gap-3 min-h-0 mt-1">
              {/* Left Column: Chart */}
              <div className="flex-1 flex flex-col min-w-0 pr-1">
                {/* Legend */}
                <div className="flex items-center justify-center gap-3 mb-[2px] flex-shrink-0">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-primary)]" />
                    <span className="text-[10px] text-gray-600 font-medium">당월 생산</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#017ddd]" />
                    <span className="text-[10px] text-gray-600 font-medium">당월 누적</span>
                  </div>
                </div>

                {/* Bar Chart Area */}
                <div className="flex-1 relative mt-[6px] flex flex-col justify-end">
                  {/* Background Grid Lines */}
                  <div className="absolute inset-x-0 top-[4px] bottom-[15px] flex flex-col justify-between pointer-events-none z-0">
                    <div className="border-t-[1.5px] border-dashed border-[#e8eaed] w-full" />
                    <div className="border-t-[1.5px] border-dashed border-[#e8eaed] w-full" />
                    <div className="border-t-[1.5px] border-dashed border-[#e8eaed] w-full" />
                    <div className="border-t-[1.5px] border-dashed border-[#e8eaed] w-full" />
                  </div>
                  
                  {/* Bars */}
                  <div className="relative z-10 flex h-full items-end justify-between px-1">
                    {[
                      { label: '태양광', cur: 15, acc: 25 },
                      { label: '풍력', cur: 45, acc: 55 },
                      { label: '지열', cur: 95, acc: 42 },
                      { label: '바이오', cur: 50, acc: 28 },
                    ].map((item, idx) => (
                      <div key={idx} className="flex flex-col items-center h-full justify-end gap-1 flex-1">
                        {/* Bars container */}
                        <div className="flex items-end gap-[3px] flex-1 min-h-0 w-full justify-center pb-[3px]">
                          <div
                            className="w-[10px] bg-[var(--color-primary)] rounded-t-[1.5px]"
                            style={{ height: `${item.cur}%` }}
                          />
                          <div
                            className="w-[10px] bg-[#017ddd] rounded-t-[1.5px]"
                            style={{ height: `${item.acc}%` }}
                          />
                        </div>
                        {/* Label */}
                        <span className="text-[10px] text-gray-700 font-semibold whitespace-nowrap flex-shrink-0">
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Summary Box */}
              <div className="w-[110px] bg-[#f4f6f8] rounded-[10px] p-3 flex flex-col justify-center gap-3 flex-shrink-0 border border-gray-50/50">
                <div className="flex flex-col gap-0.5">
                  <p className="text-[10px] text-gray-600 font-semibold mb-0.5">금일 생산량</p>
                  <p className="text-[15px] font-black text-[var(--color-primary)] tracking-tight">
                    11.88 <span className="text-[10px] font-bold">kWh</span>
                  </p>
                </div>
                <div className="w-full h-px bg-[#e4e7ea]" />
                <div className="flex flex-col gap-0.5">
                  <p className="text-[10px] text-gray-600 font-semibold mb-0.5">당월 누적</p>
                  <p className="text-[15px] font-black text-[#017ddd] tracking-tight">
                    56.00 <span className="text-[10px] font-bold">kWh</span>
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* L2 — 스마트 모빌리티 운영현황 */}
          <section
            aria-label="스마트 모빌리티 운영현황"
            className="flex-1 min-h-0 bg-white border border-[#dfe0e4] rounded-2xl shadow-sm p-3 flex flex-col overflow-hidden"
          >
            <CardHeader title="스마트 모빌리티 운영현황" />
            <div className="flex gap-3 flex-1 min-h-0 mt-1">
              {/* EV-DRT 버스 */}
              <div className="flex-1 bg-[#f4f6f8] rounded-[10px] px-3.5 py-3 flex flex-col justify-between border border-gray-50/50">
                <p className="text-[11.5px] font-bold text-gray-800">친환경 EV-DRT 버스</p>
                <div className="flex items-center justify-between w-full mt-1.5 px-0.5">
                  <Bus size={32} className="text-[#017ddd]" strokeWidth={2} />
                  <div className="flex flex-col items-end">
                    <p className="text-[20px] font-black text-gray-900 leading-none tracking-tight">
                      23<span className="text-[11px] font-bold text-gray-600 ml-0.5">대</span>
                    </p>
                    <span className="text-[10px] text-gray-500 font-medium mt-1">운행중</span>
                  </div>
                </div>
              </div>
              
              {/* 공공자전거 이용률 */}
              <div className="flex-1 bg-[#f4f6f8] rounded-[10px] px-3.5 py-3 flex flex-col justify-between border border-gray-50/50">
                <p className="text-[11.5px] font-bold text-gray-800">공공자전거 이용률</p>
                <div className="flex items-center justify-between w-full mt-1.5 px-0.5">
                  <Bike size={34} className="text-[var(--color-primary)]" strokeWidth={2} />
                  <div className="flex flex-col items-end">
                    <p className="text-[20px] font-black text-gray-900 leading-none tracking-tight">
                      0.8<span className="text-[11px] font-bold text-gray-600 ml-0.5">%</span>
                    </p>
                    <span className="text-[10px] text-gray-500 font-medium mt-1">전일 대비</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* L3 — 통합대기환경지수 */}
          <section
            aria-label="통합대기환경지수"
            className="flex-1 min-h-0 bg-white border border-[#dfe0e4] rounded-2xl shadow-sm p-3 flex flex-col overflow-hidden"
          >
            <CardHeader title="통합대기환경지수" />
            <div className="flex-1 flex items-center justify-around px-1 min-h-0">
              <CircleGauge value="16"    unit="μg/m³" label="초미세먼지(PM2.5)" status="보통" statusColor="#017ddd" />
              <CircleGauge value="23"    unit="μg/m³" label="미세먼지(PM10)"    status="좋음" statusColor="var(--color-primary)" />
              <CircleGauge value="0.054" unit="ppm"   label="오존(O3)"          status="보통" statusColor="#017ddd" />
            </div>
          </section>

          {/* L4 — 인기 데이터 세트 TOP 5 */}
          <section
            aria-label="인기 데이터 세트 TOP 5"
            className="flex-1 min-h-0 bg-white border border-[#dfe0e4] rounded-2xl shadow-sm p-3 flex flex-col overflow-hidden"
          >
            <CardHeader title="인기 데이터 세트 TOP 5" />
            <div className="flex-1 flex flex-col justify-between py-1 px-1 min-h-0">
              {datasets.map((d) => (
                <div key={d.rank} className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-[13px] font-bold text-gray-800 w-[14px] text-right flex-shrink-0">{d.rank}.</span>
                    <span className={`text-[10px] font-bold h-[20px] w-[42px] flex items-center justify-center rounded-[4px] flex-shrink-0 ${d.cls}`}>
                      {d.cat}
                    </span>
                    <span className="text-[12.5px] font-medium text-gray-800 truncate">{d.name}</span>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="text-[14px] font-black text-gray-900">{d.count}</span>
                    <span className="text-[12px] font-medium text-gray-600 ml-[2px]">건</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>{/* /LEFT PANEL */}

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* CENTER — 투명 영역 (지도 비침) + 컨트롤                           */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        <div className="flex-1 relative h-full pointer-events-none">

          {/* ── 마일 버튼 그룹 (수정 3: 텍스트 레이블 + 아이콘 원형) ── */}
          <div className="absolute top-[60px] right-[6px] flex flex-col gap-[16px] items-end pointer-events-auto">
            {mileButtons.map((btn, i) => {
              const isActive = activeMile === i;
              return (
                <button
                  key={i}
                  onClick={() => setActiveMile(i)}
                  className="flex items-center gap-[8px] group"
                  aria-pressed={isActive}
                >
                  {/* 텍스트 레이블 */}
                  <span
                    className={`text-[12px] font-bold drop-shadow transition-colors ${
                      isActive ? 'text-gray-900' : 'text-gray-600 group-hover:text-gray-800'
                    }`}
                  >
                    {btn.label}
                  </span>
                  {/* 아이콘 원형 */}
                  <div
                    className={`w-[44px] h-[44px] rounded-full flex items-center justify-center shadow-md transition-all ${
                      isActive
                        ? `${btn.activeBg} scale-110`
                        : 'bg-white border border-gray-200 group-hover:scale-105'
                    }`}
                  >
                    <btn.Icon
                      size={18}
                      className={isActive ? 'text-white' : 'text-gray-500'}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* 지도 컨트롤 버튼 */}
          <div className="absolute top-[360px] right-[6px] flex flex-col gap-2 pointer-events-auto">
            <button
              aria-label="전체화면"
              className="w-8 h-8 bg-white border border-gray-200 rounded-lg flex items-center justify-center shadow-sm hover:bg-gray-50 text-gray-600 transition-colors"
            >
              <Maximize2 size={13} />
            </button>
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col divide-y divide-gray-100">
              <button aria-label="확대" className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 text-gray-600 transition-colors">
                <Plus size={13} />
              </button>
              <button aria-label="축소" className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 text-gray-600 transition-colors">
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

        </div>{/* /CENTER */}

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* RIGHT PANEL                                                        */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        <div className="w-[380px] flex-shrink-0 flex flex-col h-full gap-[14px] mb-[24px] pointer-events-auto">

          {/* R1 — 시민 참여 프로그램 */}
          <section
            aria-label="시민 참여 프로그램"
            className="flex-1 min-h-0 bg-white border border-[#dfe0e4] rounded-2xl shadow-sm p-3 flex flex-col overflow-hidden"
          >
            <CardHeader title="시민 참여 프로그램" />
            <AutoScrollList>
              {/* Card 1: Living Lab */}
              <div className="min-w-[153px] max-w-[153px] bg-[#edf8f1] rounded-[10px] p-3 flex flex-col justify-between border border-[#e2efe6] snap-center shrink-0">
                <div className="flex flex-col gap-1.5 pointer-events-none">
                  <p className="text-[11px] font-bold text-[#1f8c56]">Living Lab</p>
                  <p className="text-[13.5px] font-bold text-gray-800 leading-snug tracking-tight">우리 동네 환경<br/>개선단 모집</p>
                </div>
                <div className="flex items-center gap-2 mt-2 pointer-events-none">
                  <span className="text-[10px] font-bold text-white bg-[#34a86b] px-2 py-[3px] rounded">D-7</span>
                  <span className="text-[11px] font-medium text-gray-700">모집중</span>
                </div>
              </div>

              {/* Card 2: Open Lab */}
              <div className="min-w-[153px] max-w-[153px] bg-[#eaf2fb] rounded-[10px] p-3 flex flex-col justify-between border border-[#e1eaf3] snap-center shrink-0">
                <div className="flex flex-col gap-1.5 pointer-events-none">
                  <p className="text-[11px] font-bold text-[#077bca]">Open Lab</p>
                  <p className="text-[13.5px] font-bold text-gray-800 leading-snug tracking-tight">탄소중립<br/>혁신 아이디어<br/>공모전</p>
                </div>
                <div className="flex items-center gap-2 mt-2 pointer-events-none">
                  <span className="text-[10px] font-bold text-white bg-[#00a3e8] px-2 py-[3px] rounded">D-15</span>
                  <span className="text-[11px] font-medium text-gray-700">접수중</span>
                </div>
              </div>

              {/* Card 3: Cityzn Edu */}
              <div className="min-w-[153px] max-w-[153px] bg-[#feede2] rounded-[10px] p-3 flex flex-col justify-between border border-[#f5ded4] snap-center shrink-0">
                <div className="flex flex-col gap-1.5 pointer-events-none">
                  <p className="text-[11px] font-bold text-[#f26522]">Cityzn Edu</p>
                  <p className="text-[13.5px] font-bold text-gray-800 leading-snug tracking-tight">2026 상반기<br/>데이터 시각화<br/>및 분석 중급 과정</p>
                </div>
                <div className="flex items-center gap-2 mt-2 pointer-events-none">
                  <span className="text-[10px] font-bold text-white bg-[#f26522] px-2 py-[3px] rounded">D-15</span>
                  <span className="text-[11px] font-medium text-gray-700">접수중</span>
                </div>
              </div>
            </AutoScrollList>
          </section>

          {/* R2 — 실시간 탄소 배출 / 저감 현황 */}
          <section
            aria-label="실시간 탄소 배출 및 저감 현황"
            className="flex-1 min-h-0 bg-white border border-[#dfe0e4] rounded-2xl shadow-sm p-3 flex flex-col overflow-hidden"
          >
            <CardHeader title="실시간 탄소 배출 / 저감 현황" />
            <div className="flex-1 flex gap-4 min-h-0 pt-1">
              {/* Gauge */}
              <div className="w-[140px] flex flex-col items-center justify-center flex-shrink-0 pt-2">
                <svg width="138" height="74" viewBox="0 0 138 74" className="overflow-visible drop-shadow-sm">
                  <defs>
                    <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#3263c9" />
                      <stop offset="100%" stopColor="#5aa553" />
                    </linearGradient>
                  </defs>
                  {/* Background Arc */}
                  <path d="M 14 68 A 55 55 0 0 1 124 68" fill="none" stroke="#d5d9de" strokeWidth="22" strokeLinecap="butt" />
                  {/* Colored Arc (~72%) */}
                  <path d="M 14 68 A 55 55 0 0 1 108 24" fill="none" stroke="url(#gaugeGrad)" strokeWidth="22" strokeLinecap="butt" />
                  {/* Needle */}
                  <path d="M 69 68 L 96 24" stroke="#2b2d30" strokeWidth="5" strokeLinecap="round" />
                  <circle cx="69" cy="68" r="7" fill="#2b2d30" />
                </svg>
                <div className="mt-4 flex items-baseline gap-1.5">
                  <span className="text-[11.5px] font-medium text-gray-600">탄소 배출 지수</span>
                  <span className="text-[25px] font-black text-gray-900 tracking-tight leading-none">72</span>
                </div>
              </div>
              
              {/* Stats */}
              <div className="flex-1 flex flex-col justify-center bg-[#f4f6f8] rounded-[10px] px-3.5 py-3 border border-gray-50/50">
                <div className="flex flex-col gap-1 mb-2">
                  <p className="text-[10px] font-semibold text-gray-600">총 배출량</p>
                  <p className="text-[17px] font-black text-gray-900 tracking-tight">
                    239.18 <span className="text-[10.5px] font-bold text-gray-700 ml-0.5">tCO₂eq</span>
                  </p>
                </div>
                <div className="w-full h-[1.5px] bg-[#e4e7ea] mb-2" />
                <div className="flex flex-col gap-1">
                  <p className="text-[10px] font-semibold text-gray-600">목표 대비 저감률</p>
                  <p className="text-[17px] font-black text-[#1a8b54] tracking-tight flex items-baseline gap-1">
                    30.53 <span className="text-[11px] font-bold text-[#1a8b54]">%</span>
                  </p>
                  <div className="flex items-center gap-0.5 mt-0.5">
                    <span className="text-[10px] font-black text-[#ed3c4d]">▲</span>
                    <span className="text-[10.5px] font-bold text-[#ed3c4d]">4.8%</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* R3 — 시정 소식 & 공지사항 */}
          <section
            aria-label="시정 소식 및 공지사항"
            className="flex-1 min-h-0 bg-white border border-[#dfe0e4] rounded-2xl shadow-sm p-3 flex flex-col overflow-hidden"
          >
            <CardHeader title="시정 소식 & 공지사항" />
            <div className="flex w-full h-[34px] rounded-full border border-gray-300 overflow-hidden mb-3 flex-shrink-0 mt-1">
              <button className="flex-1 h-full font-bold text-[12.5px] bg-[#0074db] text-white">
                시정 소식
              </button>
              <button className="flex-1 h-full font-bold text-[12.5px] bg-white text-gray-600">
                공지사항
              </button>
            </div>
            <div className="flex-1 flex flex-col justify-around min-h-0 px-1 pt-1">
              {news.map((item, i) => (
                <div key={i} className="flex items-center justify-between gap-2 py-1">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-[4px] h-[4px] rounded-full bg-[#0074db] flex-shrink-0" />
                    <span className="text-[13px] font-medium text-gray-800 truncate">{item}</span>
                  </div>
                  <span className="text-[10.5px] font-medium text-gray-500 flex-shrink-0">26.03.13</span>
                </div>
              ))}
            </div>
          </section>

          {/* R4 — 기후의병 활약상 */}
          <section
            aria-label="기후의병 활약상"
            className="flex-1 min-h-0 bg-white border border-[#dfe0e4] rounded-2xl shadow-sm p-3 flex flex-col overflow-hidden"
          >
            <CardHeader title="기후의병 활약상" />
            <div className="flex-1 flex flex-col pt-1 w-full gap-3 justify-center">
              <div className="flex items-center justify-between w-full px-1">
                <div className="flex items-center gap-4">
                  <TreePine size={46} className="text-[#5ba653] fill-[#5ba653]" strokeWidth={1} />
                  <div className="flex flex-col">
                    <span className="text-[10.5px] font-semibold text-gray-500 mb-0.5">오늘 광명시가 심은 나무</span>
                    <div className="flex items-baseline gap-1 mt-0.5">
                      <span className="text-[30px] font-black text-[#26282a] leading-none tracking-tighter">1,248</span>
                      <span className="text-[13.5px] font-bold text-gray-700">그루</span>
                    </div>
                    <span className="text-[9.5px] font-medium text-gray-500 mt-1.5 px-0.5 tracking-tight">(실시간 탄소 감축량 <strong className="text-gray-800">12.4t</strong> 환산)</span>
                  </div>
                </div>
                <button className="bg-[#3ab164] text-white text-[12.5px] font-bold px-3.5 py-2.5 rounded-[8px] flex items-center gap-1 hover:bg-[#349e59] shadow-sm mb-2">
                  참여하기 <span className="text-[15px] leading-none mb-0.5 ml-0.5">›</span>
                </button>
              </div>
              
              <div className="bg-[#f2f4f6] rounded-[10px] px-2 py-3 flex items-center justify-between mx-1 border border-gray-100 mt-1">
                <div className="flex items-center justify-center gap-2 flex-1">
                  <div className="w-[18px] text-[#29b057] flex justify-center"><TreePine size={18} className="fill-[#29b057] text-[#29b057]" /></div>
                  <div className="flex flex-col">
                    <span className="text-[9.5px] font-medium text-gray-600 mb-0.5">참여 의명</span>
                    <span className="text-[13px] font-black text-gray-900 leading-none">4.2만명</span>
                  </div>
                </div>
                <div className="w-px h-[24px] bg-gray-200" />
                <div className="flex items-center justify-center gap-2 flex-1">
                  <div className="w-[18px] flex justify-center"><div className="w-[14px] h-[14px] rounded-full bg-[#f6a04a]" /></div>
                  <div className="flex flex-col">
                    <span className="text-[9.5px] font-medium text-gray-600 mb-0.5">누적 사용량</span>
                    <span className="text-[13px] font-black text-gray-900 leading-none">1.2억 P</span>
                  </div>
                </div>
                <div className="w-px h-[24px] bg-gray-200" />
                <div className="flex items-center justify-center gap-2 flex-1 pl-1">
                  <div className="w-[18px] flex justify-center"><div className="text-[#a5b4c7] font-black text-[15px] relative">X<div className="absolute inset-0 bg-[#6d9be8] opacity-10 mix-blend-overlay"></div></div></div>
                  <div className="flex flex-col">
                    <span className="text-[9.5px] font-medium text-gray-600 mb-0.5">총 감축량</span>
                    <span className="text-[13px] font-black text-gray-900 leading-none">320 t</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>{/* /RIGHT PANEL */}

      </div>{/* /Layer 2 */}

    </div>
  );
}
