import React, { useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Heart, MapPin, Siren, BarChart3, Car, Zap, Coffee, Trash2 } from 'lucide-react';
import SmartCityMapLayout from '../components/SmartCityMapLayout';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';

// Custom Convenience Icon
const createConvenienceIcon = (color: string, iconType: string) => {
  let iconSvg = '';
  switch(iconType) {
    case '주차장': iconSvg = '<path d="M9 17V7h4a3 3 0 0 1 0 6H9"/>'; break;
    case '충전소': iconSvg = '<path d="M11 2 3 14h8v8l8-12h-8V2Z"/>'; break;
    case '화장실': iconSvg = '<path d="M12 22v-5M9 17h6M12 17V7M12 7c2.76 0 5-2.24 5-5H7c0 2.76 2.24 5 5 5Z"/>'; break;
    case '스마트벤치': iconSvg = '<path d="M2 18h20M2 14h20M4 14v4M20 14v4M12 14v4"/>'; break;
    default: iconSvg = '<circle cx="12" cy="12" r="10"/>';
  }

  return L.divIcon({
    html: `<div style="background-color: ${color}; width: 32px; height: 32px; border-radius: 50%; border: 3px solid white; display: flex; align-items: center; justify-center; color: white; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${iconSvg}</svg></div>`,
    className: 'custom-div-icon',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });
};

const CONVENIENCE_DATA = [
  { id: 1, name: '광명시청 공영주차장', type: '주차장', address: '광명시 시청로 20', lat: 37.4782, lng: 126.8642, status: '여유' },
  { id: 2, name: '철산역 전기차 충전소', type: '충전소', address: '철산동 241-1', lat: 37.4765, lng: 126.8672, status: '사용가능' },
  { id: 3, name: '광명사거리 개방화장실', type: '화장실', address: '광명동 158-6', lat: 37.4798, lng: 126.8542, status: '개방중' },
  { id: 4, name: '광명초 스마트벤치', type: '스마트벤치', address: '광명동 288-1', lat: 37.4825, lng: 126.8582, status: '정상' },
  { id: 5, name: '광명전통시장 주차장', type: '주차장', address: '광명동 150-19', lat: 37.4802, lng: 126.8562, status: '만차' },
];

const CHART_DATA = [
  { time: '03시', fire: 0, rescue: 0 },
  { time: '04시', fire: 0, rescue: 0 },
  { time: '05시', fire: 0, rescue: 0 },
  { time: '06시', fire: 0, rescue: 0 },
  { time: '07시', fire: 0, rescue: 0 },
  { time: '08시', fire: 0, rescue: 1 },
  { time: '09시', fire: 0, rescue: 1 },
  { time: '10시', fire: 0, rescue: 0 },
  { time: '11시', fire: 0, rescue: 0 },
  { time: '12시', fire: 0, rescue: 0 },
  { time: '13시', fire: 0, rescue: 1 },
  { time: '14시', fire: 0, rescue: 1 },
  { time: '15시', fire: 0, rescue: 0 },
];

const TYPE_COLORS: Record<string, string> = {
  '주차장': '#3B82F6',
  '충전소': 'var(--color-primary)',
  '화장실': '#F59E0B',
  '스마트벤치': '#8B5CF6',
};

export default function SmartCityMapConvenience() {
  const [selectedTypes, setSelectedTypes] = useState<string[]>(['주차장', '충전소', '화장실', '스마트벤치']);

  const filteredData = useMemo(() => {
    return CONVENIENCE_DATA.filter(item => selectedTypes.includes(item.type));
  }, [selectedTypes]);

  const filterContent = (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-wider">구분</h3>
        <div className="space-y-3">
            <label className="flex items-center justify-between group cursor-pointer">
            <div className="flex items-center gap-2">
              <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-line-normal text-primary focus:ring-primary" />
              <span className="text-[15px] font-medium text-gray-700 group-hover:text-primary transition-colors">화재</span>
            </div>
            <span className="text-[15px] font-bold text-red-500">0 <span className="text-gray-400 font-normal">건</span></span>
          </label>
          <label className="flex items-center justify-between group cursor-pointer">
            <div className="flex items-center gap-2">
              <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-line-normal text-primary focus:ring-primary" />
              <span className="text-[15px] font-medium text-gray-700 group-hover:text-primary transition-colors">구조</span>
            </div>
            <span className="text-[15px] font-bold text-primary">6 <span className="text-gray-400 font-normal">건</span></span>
          </label>
        </div>
      </div>
      
      <div className="pt-6 border-t border-line-normal">
        <h3 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-wider">시설</h3>
        <div className="space-y-3">
                {['주차장', '충전소', '화장실', '스마트벤치'].map(type => (
            <label key={type} className="flex items-center gap-2 group cursor-pointer">
              <input 
                type="checkbox" 
                checked={selectedTypes.includes(type)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedTypes([...selectedTypes, type]);
                  } else {
                    setSelectedTypes(selectedTypes.filter(t => t !== type));
                  }
                }}
                className="w-4 h-4 rounded border-line-normal text-primary focus:ring-primary" 
              />
              <span className="text-[15px] font-medium text-gray-700 group-hover:text-primary transition-colors">{type}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  const bottomContent = (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Real-time Table */}
      <div className="bg-white rounded-2xl border border-line-normal shadow-sm overflow-hidden">
        <div className="p-5 border-b border-line-normal flex items-center gap-2">
          <Siren size={20} className="text-primary" />
          <h3 className="font-bold text-gray-900">실시간 재난안전</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 font-bold">
              <tr>
                <th className="px-6 py-3">구분</th>
                <th className="px-6 py-3">발생일시</th>
                <th className="px-6 py-3">주소</th>
                <th className="px-6 py-3">처리상태</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
                { [
                { type: '구조', time: '26-03-27 14:43', addr: '광명시 철산동', status: '출동보고' },
                { type: '구조', time: '26-03-27 13:13', addr: '광명시 하안동', status: '출동보고' },
                { type: '구조', time: '26-03-27 09:46', addr: '광명시 소하동', status: '현장도착보고' },
                { type: '구조', time: '26-03-27 08:10', addr: '광명시 광명동', status: '현장도착보고' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-primary">{row.type}</td>
                  <td className="px-6 py-4 text-gray-500">{row.time}</td>
                  <td className="px-6 py-4 text-gray-900">{row.addr}</td>
                  <td className="px-6 py-4 text-gray-500">{row.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Period Chart */}
      <div className="bg-white rounded-2xl border border-line-normal shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <BarChart3 size={20} className="text-primary" />
            <h3 className="font-bold text-gray-900">기간별 재난안전</h3>
          </div>
          <div className="flex items-center gap-4 text-xs font-bold">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input type="radio" name="period" defaultChecked className="text-[var(--color-primary)] focus:ring-[var(--color-primary)]" />
              <span>시간별</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer text-gray-400">
              <input type="radio" name="period" className="text-[var(--color-primary)] focus:ring-[var(--color-primary)]" />
              <span>일자별</span>
            </label>
          </div>
        </div>
        <div className="h-[240px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={CHART_DATA}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#D8DDE6" />
              <XAxis 
                dataKey="time" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 11, fill: '#9CA3AF' }}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 11, fill: '#9CA3AF' }}
              />
              <RechartsTooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              />
              <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', paddingTop: '20px' }} />
              <Line type="monotone" dataKey="fire" name="화재" stroke="#EF4444" strokeWidth={2} dot={{ r: 4, fill: '#EF4444' }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="rescue" name="구조" stroke="var(--color-primary)" strokeWidth={2} dot={{ r: 4, fill: 'var(--color-primary)' }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  return (
    <SmartCityMapLayout 
      title="편의 시설 현황" 
      description="주차장, 전기차 충전소, 개방 화장실 등 시민 생활 편의를 위한 시설 정보를 확인하세요."
      filterContent={filterContent}
      bottomContent={bottomContent}
    >
      <MapContainer 
        center={[37.4785, 126.8646]} 
        zoom={14} 
        style={{ width: '100%', height: '100%', zIndex: 0 }}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {filteredData.map((item) => (
          <Marker 
            key={item.id} 
            position={[item.lat, item.lng]}
            icon={createConvenienceIcon(TYPE_COLORS[item.type] || '#6B7280', item.type)}
          >
            <Popup className="custom-popup">
              <div className="p-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold text-white" style={{ backgroundColor: TYPE_COLORS[item.type] }}>
                    {item.type}
                  </span>
                  <h3 className="font-bold text-sm">{item.name}</h3>
                </div>
                <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                  <MapPin size={12} /> {item.address}
                </p>
                <div className="flex items-center justify-between pt-2 border-t border-line-normal">
                  <span className="text-[10px] text-gray-400">상태: <span className={`font-bold ${item.status === '만차' || item.status === '사용중' ? 'text-red-500' : 'text-green-500'}`}>{item.status}</span></span>
                  <button className="text-[10px] font-bold text-primary hover:underline">상세정보</button>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </SmartCityMapLayout>
  );
}
