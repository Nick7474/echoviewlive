import { motion } from 'motion/react';
import { Database, Search, Filter, Download, ChevronRight } from 'lucide-react';

export default function MyDataRequests() {
  const requests = [
    { id: 1, title: '광명시 교통량 데이터 활용 신청', date: '2024-03-10', status: '승인완료', type: 'API 활용' },
    { id: 2, title: '광명시 탄소 배출량 데이터 다운로드', date: '2024-02-28', status: '다운로드 가능', type: '파일 다운로드' },
    { id: 3, title: '신규 데이터 신청: 광명시 전기차 충전소 위치', date: '2024-01-15', status: '검토중', type: '신규 데이터 신청' },
  ];

  return (
    <div className="max-w-[1200px] mx-auto space-y-8 pb-20">
      <header className="space-y-4">
        <h1 className="text-3xl font-black text-slate-900">데이터 신청/활용 내역</h1>
        <p className="text-slate-500 font-medium text-lg">신청하신 데이터의 활용 현황과 다운로드 내역을 확인하실 수 있습니다.</p>
      </header>

      <div className="bg-white rounded-[24px] shadow-sm border border-line-normal overflow-hidden">
        <div className="p-8 border-b border-line-normal flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="데이터명 검색..." 
                className="pl-12 pr-6 py-3 bg-slate-50 border border-line-normal rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            </div>
            <button className="p-3 bg-slate-50 text-slate-600 rounded-2xl hover:bg-slate-100 transition-all">
              <Filter size={20} />
            </button>
          </div>
          <button className="px-6 py-3 bg-slate-900 text-white rounded-2xl font-black text-sm hover:bg-slate-800 transition-all flex items-center gap-2">
            <Download size={18} /> 전체 내역 다운로드
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-line-normal">
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">유형</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">데이터명</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">신청일</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">상태</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {requests.map((req) => (
                <motion.tr 
                  key={req.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-slate-50/50 transition-colors group"
                >
                  <td className="px-8 py-6">
                    <span className="px-3 py-1 bg-slate-100 text-slate-500 text-[10px] font-black rounded uppercase tracking-widest">{req.type}</span>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-sm font-black text-slate-900">{req.title}</span>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-sm font-bold text-slate-400">{req.date}</span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        req.status === '승인완료' || req.status === '다운로드 가능' ? 'bg-emerald-500' : 
                        req.status === '검토중' ? 'bg-blue-500' : 'bg-slate-300'
                      }`} />
                      <span className={`text-xs font-black ${
                        req.status === '승인완료' || req.status === '다운로드 가능' ? 'text-emerald-500' : 
                        req.status === '검토중' ? 'text-blue-500' : 'text-slate-400'
                      }`}>
                        {req.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <button className="p-2 text-slate-300 group-hover:text-blue-500 transition-colors">
                      <ChevronRight size={20} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
