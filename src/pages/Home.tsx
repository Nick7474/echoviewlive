import React, { useEffect, useState, useRef } from 'react';

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
      tabIndex={0}
      role="region"
      aria-label="시민 참여 프로그램 자동 스크롤 컨테이너"
      className="flex gap-2.5 flex-1 min-h-0 pt-1 overflow-x-auto snap-x select-none cursor-grab active:cursor-grabbing hover:cursor-grab focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:-outline-offset-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
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
    <div className="flex flex-col items-center" role="img" aria-label={`${label} 지수: ${value} ${unit || ''}, 상태: ${status}`}>
      <div className="relative mt-[4px]" style={{ width: size, height: size }}>
        <svg width={size} height={size} aria-hidden="true">
          <g transform={`rotate(-90 ${cx} ${cy})`}>
            <circle cx={cx} cy={cy} r={r} fill="white" />
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

// ─── Carbon Semi-circle Gauge ─────────────────────────────────────────────────

const CarbonGauge = ({ value, max = 100 }: { value: number; max?: number }) => {
  const cx = 80, cy = 78, r = 58, sw = 18;
  // clamp to (0, 0.9999) — avoids degenerate arc when pct=0 or pct=1
  const pct = Math.min(Math.max(value / max, 0.0001), 0.9999);
  const theta = Math.PI * (1 - pct);
  const px = cx + r * Math.cos(theta);
  const py = cy - r * Math.sin(theta);
  const largeArc = 0;
  // needle: 0% → -90°, 50% → 0°, 100% → +90°
  const needleRot = pct * 180 - 90;

  return (
    <div className="relative" style={{ width: 160, height: 88 }}>
      <svg width="160" height="88" viewBox="0 0 160 88" style={{ overflow: 'visible' }} aria-hidden="true">
        {/* Background arc (full semicircle) */}
        <path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
          fill="none" stroke="#ccd5f5" strokeWidth={sw} strokeLinecap="butt"
        />
        {/* Filled arc (value portion) */}
        <path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 ${largeArc} 1 ${px.toFixed(3)} ${py.toFixed(3)}`}
          fill="none" stroke="#4064ff" strokeWidth={sw} strokeLinecap="butt"
        />
      </svg>
      {/* Needle — pin.png rotated from its bottom center */}
      <img
        src="/images/pin.png"
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute',
          width: 9,
          height: 50,
          left: cx - 4.5,
          top: cy - 50,
          transformOrigin: '50% 100%',
          transform: `rotate(${needleRot.toFixed(2)}deg)`,
          pointerEvents: 'none',
        }}
      />
      {/* Center pivot */}
      <div style={{
        position: 'absolute',
        width: 12, height: 12,
        borderRadius: '50%',
        background: '#2b2d30',
        left: cx - 6, top: cy - 6,
      }} />
    </div>
  );
};



// ─── Main Component ──────────────────────────────────────────────────────────

export default function Home() {
  useEffect(() => {
    document.title = '광명시 에코뷰 | 통합플랫폼';
  }, []);

  const [activeMile, setActiveMile] = useState(0);
  const [selectedPin, setSelectedPin] = useState<{
    id: number;
    title: string;
    metrics: string;
    address: string;
    detailTitle: string;
    detailItems: { label: string; value: string }[];
    x: string;
    y: string;
  } | null>(null);

  // When activeMile changes, close the detail modal.
  useEffect(() => {
    setSelectedPin(null);
  }, [activeMile]);

  // Auto-cycle tabs every 6 seconds if idle (no modal open)
  useEffect(() => {
    if (selectedPin !== null) return;
    const timer = setTimeout(() => {
      setActiveMile((prev) => (prev + 1) % 5);
    }, 9000);
    return () => clearTimeout(timer);
  }, [activeMile, selectedPin]);

  // 에너지 마일: 7핀 (철산권역 2, 광명권역 2, 하안권역 2, 학온/소하권역 1)
  const pinsEnergy = [
    { x: '38%', y: '12%', id: 1, title: '82% 절감', metrics: '2.5 MWH', address: '광명시 철산동 12', detailTitle: '철산도서관 태양광 발전', detailItems: [{ label: '발전량', value: '2.5 MWH' }, { label: '절감효과', value: '82%' }, { label: '가동상태', value: '정상' }] },
    { x: '65%', y: '18%', id: 2, title: '78% 절감', metrics: '1.8 MWH', address: '광명시 철산동 45', detailTitle: '철산역 태양광 발전소', detailItems: [{ label: '발전량', value: '1.8 MWH' }, { label: '절감효과', value: '78%' }, { label: '가동상태', value: '정상' }] },
    { x: '20%', y: '38%', id: 3, title: '90% 절감', metrics: '3.1 MWH', address: '광명시 광명동 22', detailTitle: '광명시민회관 지열발전', detailItems: [{ label: '발전량', value: '3.1 MWH' }, { label: '절감효과', value: '90%' }, { label: '가동상태', value: '정상' }] },
    { x: '55%', y: '42%', id: 4, title: '72% 절감', metrics: '2.0 MWH', address: '광명시 광명동 7', detailTitle: '광명시청 지붕 태양광', detailItems: [{ label: '발전량', value: '2.0 MWH' }, { label: '절감효과', value: '72%' }, { label: '가동상태', value: '정상' }] },
    { x: '30%', y: '62%', id: 5, title: '75% 절감', metrics: '1.2 MWH', address: '광명시 하안동 7', detailTitle: '하안동 공영주차장 솔라루프', detailItems: [{ label: '발전량', value: '1.2 MWH' }, { label: '절감효과', value: '75%' }, { label: '가동상태', value: '점검요망' }] },
    { x: '72%', y: '68%', id: 6, title: '80% 절감', metrics: '4.8 MWH', address: '광명시 소하동 18', detailTitle: '소하동 시민체육관 지붕', detailItems: [{ label: '발전량', value: '4.8 MWH' }, { label: '절감효과', value: '80%' }, { label: '가동상태', value: '최적' }] },
    { x: '50%', y: '79%', id: 7, title: '85% 절감', metrics: '2.2 MWH', address: '광명시 일직동 10', detailTitle: 'KTX 광명역 태양광', detailItems: [{ label: '발전량', value: '2.2 MWH' }, { label: '절감효과', value: '85%' }, { label: '가동상태', value: '정상' }] },
  ];

  // 모빌리티 마일: 6핀
  const pinsMobility = [
    { x: '42%', y: '15%', id: 8, title: '버스 정류장', metrics: '친환경 버스', address: '광명시 철산동 33', detailTitle: '철산역 친환경 버스 환승센터', detailItems: [{ label: '친환경버스', value: '24대' }, { label: '대기질', value: '좋음' }, { label: '가동상태', value: '정상' }] },
    { x: '70%', y: '22%', id: 9, title: '공유자전거', metrics: '8대 대기', address: '광명시 철산동 55', detailTitle: '철산역 자전거 스테이션', detailItems: [{ label: '대기대수', value: '8대' }, { label: '일 이용', value: '32회' }, { label: '가동상태', value: '운영중' }] },
    { x: '22%', y: '45%', id: 10, title: '충전소 3기', metrics: '이용률 72%', address: '광명시 광명동 11', detailTitle: '광명동 공영주차장 전기차 충전소', detailItems: [{ label: '충전기 수', value: '3기' }, { label: '가동률', value: '72%' }, { label: '월 감축량', value: '0.9t' }] },
    { x: '58%', y: '55%', id: 11, title: '충전소 4기', metrics: '이용률 80%', address: '광명시 소하동 22', detailTitle: '소하동 공영주차장 전기차 충전소', detailItems: [{ label: '충전기 수', value: '4기' }, { label: '가동률', value: '80%' }, { label: '월 감축량', value: '1.2t' }] },
    { x: '25%', y: '72%', id: 12, title: '수소 충전', metrics: '1.2t 수소', address: '광명시 하안동 9', detailTitle: '광명 복합 수소충전소', detailItems: [{ label: '저장량', value: '1.2t' }, { label: '충전효율', value: '우수' }, { label: '가동상태', value: '정상' }] },
    { x: '68%', y: '76%', id: 13, title: '공유자전거', metrics: '12대 대기', address: '광명시 일직동 5', detailTitle: 'KTX 광명역 자전거 스테이션', detailItems: [{ label: '대기대수', value: '12대' }, { label: '일 이용', value: '45회' }, { label: '가동상태', value: '운영중' }] },
  ];

  // 안전 마일: 5핀
  const pinsSafety = [
    { x: '48%', y: '10%', id: 14, title: 'CCTV 24h', metrics: '통합관제중', address: '광명시 철산동 3', detailTitle: '철산역 스마트 안전폴', detailItems: [{ label: '카메라 수', value: '4대' }, { label: '센서', value: '미세먼지, 소음' }, { label: '상태', value: '실시간 관제중' }] },
    { x: '18%', y: '32%', id: 15, title: '폭염 대피', metrics: '에어돔 가동', address: '광명시 광명동 11', detailTitle: '광명동 사거리 쿨링 포그 시스템', detailItems: [{ label: '온도', value: '24도' }, { label: '전력', value: '태양광 연계' }, { label: '상태', value: '가동 대기' }] },
    { x: '62%', y: '45%', id: 16, title: 'CCTV 24h', metrics: '통합관제중', address: '광명시 광명동 1', detailTitle: '광명사거리 스마트 안전폴', detailItems: [{ label: '카메라 수', value: '4대' }, { label: '센서', value: '미세먼지, 소음' }, { label: '상태', value: '실시간 관제중' }] },
    { x: '28%', y: '68%', id: 17, title: '홍수 알림', metrics: '안전수위', address: '광명시 하안동 안양천', detailTitle: '안양천 둔치 홍수 경보 센서', detailItems: [{ label: '하천수위', value: '0.4m (안전)' }, { label: '강수량', value: '0mm' }, { label: '상태', value: '정상 모니터링' }] },
    { x: '60%', y: '80%', id: 18, title: '홍수 알림', metrics: '안전수위', address: '광명시 일직동 안양천', detailTitle: '안양천 둔치 홍수 경보 센서', detailItems: [{ label: '하천수위', value: '0.4m (안전)' }, { label: '강수량', value: '0mm' }, { label: '상태', value: '정상 모니터링' }] },
  ];

  // 데이터 마일: 6핀
  const pinsData = [
    { x: '35%', y: '14%', id: 19, title: 'IoT 센서', metrics: '활성 1,200', address: '광명시 철산동 2', detailTitle: '철산지구 무선 IoT 집계센터', detailItems: [{ label: '활성 노드', value: '1,200개' }, { label: '지연시간', value: '12ms' }, { label: '상태', value: 'ON' }] },
    { x: '68%', y: '20%', id: 20, title: '스마트 미터', metrics: '350 세대', address: '광명시 철산동 8', detailTitle: '철산 에코아파트 스마트 미터기', detailItems: [{ label: '연동 세대', value: '350' }, { label: '사용량', value: '실시간 집계' }, { label: '상태', value: '정상' }] },
    { x: '22%', y: '50%', id: 21, title: '데이터 노드', metrics: '수집 42GB', address: '광명시 시청로 20', detailTitle: '시청 통합 데이터 서버', detailItems: [{ label: '수집량/일', value: '42 GB' }, { label: '트래픽', value: '안정' }, { label: '상태', value: 'ON' }] },
    { x: '60%', y: '48%', id: 22, title: '유동인구', metrics: '5.2만 건', address: '광명시 하안동 22', detailTitle: '하안상업지구 유동인구 센서', detailItems: [{ label: '집계단위', value: '실시간' }, { label: '데이터', value: '52,431 건/일' }, { label: '상태', value: '분석중' }] },
    { x: '30%', y: '75%', id: 23, title: '환경 데이터', metrics: '전송완료', address: '광명시 광명동 14', detailTitle: '광명동 대기질 관측소', detailItems: [{ label: '전송주기', value: '10분' }, { label: '무결성', value: '99.9%' }, { label: '상태', value: 'ON' }] },
    { x: '72%', y: '72%', id: 24, title: '스마트 미터', metrics: '450 세대', address: '광명시 일직동 8', detailTitle: '일직동 에코빌리지 스마트 미터기', detailItems: [{ label: '연동 세대', value: '450' }, { label: '사용량', value: '실시간 집계' }, { label: '상태', value: '정상' }] },
  ];

  const getActivePins = () => {
    switch (activeMile) {
      case 0: return pinsEnergy;
      case 1: return pinsMobility;
      case 2: return pinsSafety;
      case 3: return pinsData;
      default: return [];
    }
  };

  const getPinIcon = () => {
    switch (activeMile) {
      case 1: return '/images/01_pin_모빌리티 마일.png';
      case 2: return '/images/03_pin_안전 마일.png';
      case 3: return '/images/03_pin_데이터 마일.png';
      default: return '/images/00_pin_에너지 마일.png';
    }
  };

  const getMetricsColor = () => {
    switch (activeMile) {
      case 0: return 'text-[#0C8AE5]'; // Energy (Blue)
      case 1: return 'text-[#16a34a]'; // Mobility (Green)
      case 2: return 'text-[#f59e0b]'; // Safety (Orange)
      case 3: return 'text-[#8c30ff]'; // Data (Purple)
      default: return 'text-[#0C8AE5]';
    }
  };

  const datasets = [
    { rank: 1, cat: '교통',   name: '전기차 충전소 이용 현황', count: '1,682', cls: 'bg-[#fff0e4] text-[#fe9c53]' },
    { rank: 2, cat: '환경',   name: '대기질 관측 데이터',      count: '231',   cls: 'bg-[#d9f3ff] text-[#0083b3]' },
    { rank: 3, cat: '교통',   name: '공공자전거 대여 이력',    count: '284',   cls: 'bg-[#fff0e4] text-[#fe9c53]' },
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
    { label: '에너지 마일',     imgOn: '/images/Property 1=00_Btn_Home_Energy_On.png',   imgOff: '/images/Property 1=01_Btn_Home_Energy_Off.png' },
    { label: '모빌리티 마일',   imgOn: '/images/Property 1=10_Btn_Home_Mobility_On.png', imgOff: '/images/Property 1=11_Btn_Home_Mobility_Off.png' },
    { label: '안전 마일',       imgOn: '/images/Property 1=20_Btn_Home_Safety_On.png',   imgOff: '/images/Property 1=21_Btn_Home_Safety_Off.png' },
    { label: '데이터 마일',     imgOn: '/images/Property 1=30_Btn_Home_Data_On.png',     imgOff: '/images/Property 1=31_Btn_Home_Data_Off.png' },
    { label: '탄소 배출 농도', imgOn: '/images/Property 1=40_Btn_Home_Co2_On.png',       imgOff: '/images/Property 1=41_Btn_Home_Co2_Off.png' },
  ];

  return (
    <div className="relative h-[calc(100vh-80px)] overflow-hidden">
      <h1 className="sr-only">광명시 에코뷰 홈</h1>
      <style>{`
        @keyframes fadeInUpPin {
          0% { opacity: 0; transform: translate(-50%, -30%); }
          100% { opacity: 1; transform: translate(-50%, -50%); }
        }
        .anim-pin-enter {
          animation: fadeInUpPin 0.975s cubic-bezier(0.2, 0.8, 0.2, 1) both;
        }
      `}</style>
      
      {/* ── Layer 0: 배경 이미지 (Mapbg) z-0 ──────────────────────────────── */}
      <img
        src="/images/Mapbg.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 z-0 w-full h-full object-cover pointer-events-none"
      />

      {/* ── Layer 1: 지도 이미지 묶음 + 좌표 연동 핀 화면 중앙 z-10 ──────────────────────── */}
      <div 
        className="absolute z-10 pointer-events-none flex justify-center items-center"
        style={{
          top: 'calc(50% + 28px)',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          height: '95%',
        }}
      >
        <div className="relative h-full inline-block pointer-events-none">
          <img
            src="/images/MAP1.png"
            alt=""
            aria-hidden="true"
            className={`h-full w-auto transition-opacity duration-[900ms] ease-in-out ${activeMile === 4 ? 'opacity-0' : 'opacity-100'}`}
          />
          <img
            src="/images/Map2.png"
            alt=""
            aria-hidden="true"
            className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-[900ms] ease-in-out ${activeMile === 4 ? 'opacity-100' : 'opacity-0'}`}
          />
          
          {/* MAP PINS (좌표계가 지도 해상도에 완벽 종속됨) */}
          {activeMile !== 4 && getActivePins().map((pin, idx) => (
            <div 
              key={pin.id}
              className="absolute z-30 anim-pin-enter"
              style={{ left: pin.x, top: pin.y, animationDelay: `${idx * 0.18}s` }}
            >
              <button
                onClick={() => setSelectedPin(pin)}
                className="pointer-events-auto flex group transition-all duration-300 hover:scale-110 hover:-translate-y-[6px]"
                aria-label={`${pin.title} 상세 보기`}
              >
                <img 
                  src={getPinIcon()} 
                  alt="" 
                  className="w-[70px] h-[80px] object-contain drop-shadow-[0_6px_12px_rgba(0,0,0,0.15)]" 
                />
                <div className="absolute top-[14px] left-[62px] bg-white/80 backdrop-blur-xl rounded-[12px] shadow-[0_8px_32px_0_rgba(31,38,135,0.12)] px-[14px] py-[10px] flex flex-col items-start min-w-[max-content] pointer-events-none border border-white/70 text-left">
                  <span className="text-[12.5px] font-[800] text-[#1E2124] leading-tight tracking-[0.2px] mb-1.5">{pin.title}</span>
                  <span className={`text-[14px] font-[900] ${getMetricsColor()} leading-tight tracking-[0.2px]`}>{pin.metrics}</span>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ── Layer 2: 콘텐츠 z-20 ────────────────────────────────────────────── */}
      <div className="relative z-20 h-full flex items-start px-[90px] pt-[16px] gap-[30px] pb-[24px] pointer-events-none">

        {/* 히어로 텍스트 — Layer 2 내 절대 위치 */}
        <div className="absolute top-[30px] left-[504px] text-left pointer-events-none select-none z-10">
          <p className="text-[23px] font-medium text-[#274A89] leading-tight" style={{ letterSpacing: '-0.46px' }}>데이터로 함께 그리는 미래</p>
          <h2 className="text-[46px] font-bold leading-tight mt-0.5" style={{ letterSpacing: '-1.84px' }}>
            <span className="text-[#234178]">광명시 </span>
            <span className="text-[#0C8AE5]">에코뷰</span>
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
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FEC321]" />
                    <span className="text-[10px] text-gray-600 font-medium">당월 생산</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#4064FF]" />
                    <span className="text-[10px] text-gray-600 font-medium">당월 누적</span>
                  </div>
                </div>

                {/* Bar Chart Area */}
                <div 
                  className="flex-1 relative mt-[10px] flex flex-col justify-end"
                  role="img"
                  aria-label="신재생 에너지 원별 당월 생산 및 누적 현황 막대 차트"
                >
                  {/* Background Grid Lines */}
                  <div className="absolute inset-x-0 top-[4px] bottom-[20px] flex flex-col justify-between pointer-events-none z-0">
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
                        {/* Bars container — bottom-[20px] matches grid bottom */}
                        <div className="flex items-end gap-[3px] w-full justify-center" style={{ height: 'calc(100% - 20px)' }}>
                          <div
                            className="w-[10px] bg-[#FEC321]"
                            style={{ height: `${item.cur}%`, borderRadius: '20px 20px 0 0' }}
                          />
                          <div
                            className="w-[10px] bg-[#4064FF]"
                            style={{ height: `${item.acc}%`, borderRadius: '20px 20px 0 0' }}
                          />
                        </div>
                        {/* Label */}
                        <span className="text-[10px] text-gray-700 font-semibold whitespace-nowrap flex-shrink-0 h-[20px] flex items-center">
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Summary Box */}
              <div className="w-[110px] bg-[#f4f6f8] rounded-[10px] p-3 flex flex-col justify-center gap-3 flex-shrink-0 border border-gray-50/50">
                <div className="flex flex-col gap-0.5 mt-[2px]">
                  <p className="text-[10px] text-gray-600 font-semibold mb-0.5">금일 생산량</p>
                  <p className="text-[17px] font-black text-[#EC8913] tracking-tight -mt-[6px]">
                    11.88 <span className="text-[10px] font-bold">kWh</span>
                  </p>
                </div>
                <div className="w-full h-px shrink-0 bg-[#d1d5db]" />
                <div className="flex flex-col gap-0.5 -mt-[6px]">
                  <p className="text-[10px] text-gray-600 font-semibold mb-0.5">당월 누적</p>
                  <p className="text-[17px] font-black text-[#4064FF] tracking-tight -mt-[6px]">
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
            <div className="flex gap-[16px] flex-1 min-h-0 mt-1">
              {/* EV-DRT 버스 */}
              <div className="flex-1 bg-[#e7f4fe] rounded-[12px] relative overflow-hidden" style={{ minHeight: '120px' }}>
                <p className="absolute top-[10px] left-0 right-0 text-center text-[14px] font-bold text-[#4d586b] whitespace-nowrap px-2">친환경 EV-DRT 버스</p>
                <img
                  src="/images/ic_bus 1.png"
                  alt=""
                  aria-hidden="true"
                  className="absolute object-contain"
                  style={{ left: 15, top: 42, width: 77, height: 61 }}
                />
                <div className="absolute text-right" style={{ right: 16, top: 37 }}>
                  <p className="text-[#212529] font-bold leading-[1.3]">
                    <span className="text-[32px]">23</span>
                    <span className="text-[14px] ml-0.5">대</span>
                  </p>
                  <p className="text-[14px] font-medium text-[#666] leading-[1.3]">운행중</p>
                </div>
              </div>

              {/* 공공자전거 이용률 */}
              <div className="flex-1 bg-[#ecf2fe] rounded-[12px] relative overflow-hidden" style={{ minHeight: '120px' }}>
                <p className="absolute top-[10px] left-0 right-0 text-center text-[14px] font-bold text-[#4d586b] whitespace-nowrap px-2">공공자전거 이용률</p>
                <img
                  src="/images/ic_bicycle 1.png"
                  alt=""
                  aria-hidden="true"
                  className="absolute object-contain"
                  style={{ left: 17, top: 43, width: 64, height: 58 }}
                />
                <div className="absolute text-right" style={{ right: 16, top: 39 }}>
                  <p className="text-[#212529] font-bold leading-[1.3]">
                    <span className="text-[32px]">0.8</span>
                    <span className="text-[14px] ml-0.5">%</span>
                  </p>
                  <p className="text-[14px] font-medium text-[#666] leading-[1.3]">전일 대비</p>
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
              <CircleGauge value="16"    unit="μg/m³" label="초미세먼지(PM2.5)" status="보통" statusColor="#4065fe" />
              <CircleGauge value="23"    unit="μg/m³" label="미세먼지(PM10)"    status="좋음" statusColor="#0c8ae5" />
              <CircleGauge value="0.054" unit="ppm"   label="오존(O3)"          status="보통" statusColor="#917b26" />
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
                    <span className="text-[12.5px] font-[500] text-gray-800 truncate">{d.name}</span>
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
          <div className="absolute top-[30px] right-[6px] flex flex-col gap-[16px] items-end pointer-events-auto z-20">
            {/* 세로 구분선 */}
            <div className="absolute top-[20px] bottom-[20px] right-[19.5px] w-[1px] bg-[#DFE0E4] z-0 pointer-events-none" />
            {mileButtons.map((btn, i) => {
              const isActive = activeMile === i;
              return (
                <button
                  key={i}
                  onClick={() => setActiveMile(i)}
                  className="flex items-center justify-end gap-[8px] group relative z-10 w-[200px] py-1 cursor-pointer"
                  aria-pressed={isActive}
                >
                  <span
                    className={`text-[13px] drop-shadow transition-all tracking-[0.28px] ${
                      isActive ? 'text-[#1E2124] font-[700]' : 'text-[#444444] font-[500] group-hover:text-[#1E2124] group-hover:font-[700]'
                    }`}
                  >
                    {btn.label}
                  </span>
                  <div className="relative w-[40px] h-[40px] rounded-full shadow-[0_4px_10px_0_rgba(0,0,0,0.25)] transition-transform duration-300 group-hover:scale-[1.1]">
                    <img
                      src={btn.imgOff}
                      alt=""
                      aria-hidden="true"
                      className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-300 ${
                        isActive ? 'opacity-0' : 'opacity-100 group-hover:opacity-0'
                      }`}
                    />
                    <img
                      src={btn.imgOn}
                      alt=""
                      aria-hidden="true"
                      className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-300 ${
                        isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Map Pin Modal (Pins moved to Layer 1 map wrapper) */}
          {selectedPin && (
            <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none">
              <div className="w-[360px] h-[180px] bg-white/85 backdrop-blur-xl rounded-[16px] shadow-[0_8px_32px_0_rgba(36,40,37,0.15)] p-[22px] relative flex flex-col border border-white/70 pointer-events-auto">
                <button 
                  onClick={() => setSelectedPin(null)}
                  className="absolute top-[18px] right-[18px] p-1 text-[#999] hover:text-[#333] transition-colors bg-white/50 rounded-full hover:bg-white"
                  aria-label="닫기"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <h3 className="text-[17px] font-bold text-[#111] leading-snug tracking-tight pr-6">{selectedPin.detailTitle}</h3>
                    <p className="text-[12px] font-medium text-[#777] mt-1.5 tracking-tight flex items-center gap-1">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                      {selectedPin.address}
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-2 bg-[#F0F3F8] rounded-[10px] p-[10px] mt-3 border border-transparent">
                    {selectedPin.detailItems.map((item, idx) => (
                      <div key={idx} className="flex flex-col items-center justify-center text-center px-1">
                        <span className="text-[10px] text-[#555] font-[600] mb-1 tracking-tight break-keep leading-tight">{item.label}</span>
                        <span className={`text-[13.5px] ${getMetricsColor()} font-[800] tracking-tight leading-none`}>{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

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
              <div className="min-w-[153px] max-w-[153px] bg-[#e4effd] rounded-[10px] p-3 flex flex-col justify-between border border-[#d3e4f7] snap-center shrink-0">
                <div className="flex flex-col gap-1.5 pointer-events-none">
                  <p className="text-[11px] font-bold text-[#0c8ae5]">Living Lab</p>
                  <p className="text-[13.5px] font-bold text-gray-800 leading-snug tracking-tight line-clamp-2 break-keep">우리 동네 환경<br/>개선단 모집</p>
                </div>
                <div className="flex items-center gap-2 mt-2 pointer-events-none">
                  <span className="text-[10px] font-bold text-white bg-[#0c8ae5] px-2 py-[3px] rounded">D-7</span>
                  <span className="text-[11px] font-medium text-gray-700">모집중</span>
                </div>
              </div>

              {/* Card 2: Open Lab */}
              <div className="min-w-[153px] max-w-[153px] bg-[#f7ebff] rounded-[10px] p-3 flex flex-col justify-between border border-[#ecdcf5] snap-center shrink-0">
                <div className="flex flex-col gap-1.5 pointer-events-none">
                  <p className="text-[11px] font-bold text-[#8c30ff]">Open Lab</p>
                  <p className="text-[13.5px] font-bold text-gray-800 leading-snug tracking-tight line-clamp-2 break-keep">탄소중립 혁신<br/>아이디어 공모전</p>
                </div>
                <div className="flex items-center gap-2 mt-2 pointer-events-none">
                  <span className="text-[10px] font-bold text-white bg-[#8c30ff] px-2 py-[3px] rounded">D-15</span>
                  <span className="text-[11px] font-medium text-gray-700">접수중</span>
                </div>
              </div>

              {/* Card 3: Cityzn Edu */}
              <div className="min-w-[153px] max-w-[153px] bg-[#feede2] rounded-[10px] p-3 flex flex-col justify-between border border-[#f5ded4] snap-center shrink-0">
                <div className="flex flex-col gap-1.5 pointer-events-none">
                  <p className="text-[11px] font-bold text-[#f26522]">Cityzn Edu</p>
                  <p className="text-[13.5px] font-bold text-gray-800 leading-snug tracking-tight line-clamp-2 break-keep">2026 상반기<br/>데이터 시각화 및 분석 중급 과정</p>
                </div>
                <div className="flex items-center gap-2 mt-2 pointer-events-none">
                  <span className="text-[10px] font-bold text-white bg-[#f26522] px-2 py-[3px] rounded">D-15</span>
                  <span className="text-[11px] font-medium text-gray-700">접수중</span>
                </div>
              </div>
            </AutoScrollList>
          </section>

          {/* R2 — 실시간 탄소 배출 */}
          <section
            aria-label="실시간 탄소 배출"
            className="flex-1 min-h-0 bg-white border border-[#dfe0e4] rounded-2xl shadow-sm p-3 flex flex-col overflow-hidden"
          >
            <CardHeader title="실시간 탄소 배출" />
            <div className="flex-1 flex gap-4 min-h-0 pt-1">
              {/* Gauge */}
              <div
                className="w-[160px] flex flex-col items-center justify-center flex-shrink-0"
                role="img"
                aria-label="실시간 탄소 배출 지수: 72"
              >
                <CarbonGauge value={72} max={100} />
                <div className="mt-2 flex items-baseline gap-1.5">
                  <span className="text-[11.5px] font-medium text-gray-600">탄소 배출 지수</span>
                  <span className="text-[25px] font-black text-gray-900 tracking-tight leading-none">72</span>
                </div>
              </div>
              
              {/* Stats */}
              <div className="flex-1 flex flex-col justify-center bg-[#f0f3f8] rounded-[12px] px-3 py-3">
                <div className="flex flex-col gap-0.5 mb-2">
                  <p className="text-[11px] font-medium text-gray-600">총 배출량</p>
                  <p className="text-[15px] font-black text-[#212529] tracking-tight leading-none flex items-baseline gap-1">
                    239.18 <span className="text-[11px] font-medium text-[#212529]">tCO₂eq</span>
                  </p>
                </div>
                <div className="w-full h-px shrink-0 bg-[#d1d5db] mb-2" />
                <div className="flex flex-col gap-0.5">
                  <p className="text-[11px] font-medium text-gray-600">목표 대비 저감률</p>
                  <p className="text-[15px] font-black text-[#4064ff] tracking-tight leading-none flex items-baseline gap-1">
                    30.53 <span className="text-[13px] font-bold text-[#4064ff]">%</span>
                  </p>
                  <div className="flex items-center mt-0.5">
                    <span className="text-[12px] font-bold text-[#e53a4c] tracking-tight">▲4.8%</span>
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
            <div 
              role="tablist"
              aria-label="시정 소식 및 공지사항 그룹"
              className="flex w-full h-[36px] rounded-full border border-[#d6dade] bg-white mb-1 flex-shrink-0"
            >
              <button 
                role="tab" 
                aria-selected="true"
                className="flex-1 h-full font-bold text-[14.5px] bg-[#0c8ae5] text-white rounded-full focus-visible:outline-none focus-visible:ring-2"
              >
                시정 소식
              </button>
              <button 
                role="tab" 
                aria-selected="false"
                className="flex-1 h-full font-bold text-[14.5px] bg-transparent text-[#444] rounded-full hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2"
              >
                공지사항
              </button>
            </div>
            <div className="flex-1 flex flex-col justify-around min-h-0 px-[6px] py-1">
              {news.slice(0, 3).map((item, i) => (
                <div key={i} className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-[9px] min-w-0">
                    <span className="w-[4.5px] h-[4.5px] rounded-full bg-[#0c8ae5] flex-shrink-0 mt-px" />
                    <span className="text-[13px] font-[500] text-[#212529] truncate">{item}</span>
                  </div>
                  <span className="text-[11.5px] font-medium text-[#414141] flex-shrink-0">26.03.13</span>
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
            <div className="flex-1 flex flex-col pt-[6px] w-full gap-[12px] justify-center">
              <div className="flex items-center justify-between w-full pr-1">
                <div className="flex items-center gap-[10px]">
                  <img src="/images/IC_weather1.png" alt="" className="w-[48px] h-[48px] object-contain" aria-hidden="true" />
                  <div className="flex flex-col">
                    <span className="text-[11.5px] font-[500] text-[#666] mb-[1px] tracking-tight">오늘 광명시가 심은 나무</span>
                    <div className="flex items-baseline gap-1 mt-0.5">
                      <span className="text-[30px] font-black text-[#222] leading-none tracking-tighter">1,248</span>
                      <span className="text-[13px] font-bold text-[#222]">그루</span>
                    </div>
                    <span className="text-[10.5px] font-[500] text-[#666] mt-1 tracking-tight">
                      (실시간 탄소 감축량 <strong className="text-[#222] font-bold">12.4t</strong> 환산)
                    </span>
                  </div>
                </div>
                <button 
                  aria-label="기후의병 활약상 참여하기"
                  className="bg-[#193a86] text-white text-[13px] font-bold px-[12px] py-[8px] rounded-[6px] flex items-center justify-center gap-1 hover:bg-[#122f6e] shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#193a86]"
                >
                  참여하기 <span aria-hidden="true" className="text-[15px] font-medium leading-none mb-0.5">›</span>
                </button>
              </div>
              
              <div className="w-full flex items-center justify-between px-1">
                <div className="flex items-center justify-center gap-2 flex-1">
                  <div className="flex justify-center">
                    <img src="/images/IC_weather2.png" alt="" className="w-[20px] h-[20px] object-contain" aria-hidden="true" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-[500] text-[#555] mb-0.5 tracking-tight">참여 의명</span>
                    <span className="text-[14px] font-black text-[#222] leading-none tracking-tight">4.2만명</span>
                  </div>
                </div>

                <div className="w-px h-[26px] shrink-0 bg-[#dde0e5]" />

                <div className="flex items-center justify-center gap-2 flex-1">
                  <div className="flex justify-center">
                    <img src="/images/IC_weather3.png" alt="" className="w-[20px] h-[20px] object-contain" aria-hidden="true" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-[500] text-[#555] mb-0.5 tracking-tight">누적 사용량</span>
                    <span className="text-[14px] font-black text-[#222] leading-none tracking-tight">1.2억 P</span>
                  </div>
                </div>

                <div className="w-px h-[26px] shrink-0 bg-[#dde0e5]" />

                <div className="flex items-center justify-center gap-2 flex-1">
                  <div className="flex justify-center">
                    <img src="/images/IC_weather4.png" alt="" className="w-[20px] h-[20px] object-contain" aria-hidden="true" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-[500] text-[#555] mb-0.5 tracking-tight">총 감축량</span>
                    <span className="text-[14px] font-black text-[#222] leading-none tracking-tight">320 t</span>
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
