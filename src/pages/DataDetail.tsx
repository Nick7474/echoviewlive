import { useState } from 'react';
import { 
  Database, 
  Download, 
  Eye, 
  Clock, 
  Tag, 
  BarChart3, 
  Zap, 
  ArrowLeft,
  Share2,
  Bookmark,
  MessageSquare,
  FileText,
  Calendar,
  Building2,
  RefreshCw,
  Lock,
  Unlock
} from 'lucide-react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';

interface DataItem {
  id: number;
  title: string;
  category: string;
  description: string;
  views: number;
  downloads: number;
  format: string;
  status: 'New' | 'Updated' | 'Popular' | 'Normal';
  department: string;
  tags: string[];
  updateCycle: string;
  regDate: string;
  accessStatus: '공개' | '신청 필요';
}

const mockDetailData: DataItem = {
  id: 1,
  title: '광명시 대기질 실시간 측정 정보',
  category: '환경',
  description: '광명시 주요 지점별 대기질(미세먼지, 초미세먼지, 오존 등)을 실시간으로 측정하여 제공하는 데이터입니다. 시민들의 건강 보호와 대기 환경 개선을 위한 기초 자료로 활용될 수 있습니다.',
  views: 1240,
  downloads: 450,
  format: 'CSV, JSON',
  status: 'Updated',
  department: '환경관리과',
  tags: ['대기질', '미세먼지', '환경', '실시간', '광명시'],
  updateCycle: '1시간',
  regDate: '2024-03-15',
  accessStatus: '공개'
};

export default function DataDetail() {
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(false);

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'New': return <span className="px-2 py-0.5 bg-emerald-100 text-emerald-600 text-[10px] font-black rounded uppercase tracking-widest">New</span>;
      case 'Updated': return <span className="px-2 py-0.5 bg-blue-100 text-blue-600 text-[10px] font-black rounded uppercase tracking-widest">Updated</span>;
      case 'Popular': return <span className="px-2 py-0.5 bg-amber-100 text-amber-600 text-[10px] font-black rounded uppercase tracking-widest">Popular</span>;
      default: return null;
    }
  };

  return (
    <div className="max-w-[1560px] mx-auto space-y-8 pb-20">
      {/* Header / Navigation */}
      <div className="flex items-center justify-between">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-500 hover:text-emerald-600 transition-colors font-bold"
        >
          <ArrowLeft size={20} /> 목록으로 돌아가기
        </button>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`p-2.5 rounded-xl border transition-all ${isBookmarked ? 'bg-amber-50 border-amber-200 text-amber-500' : 'bg-white border-line-normal text-gray-400 hover:border-line-normal'}`}
          >
            <Bookmark size={20} fill={isBookmarked ? 'currentColor' : 'none'} />
          </button>
          <button className="p-2.5 bg-white border border-line-normal text-gray-400 rounded-xl hover:border-line-normal transition-all">
            <Share2 size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Main Info */}
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white rounded-[16px] p-8 sm:p-10 shadow-sm border border-line-normal space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                {getStatusBadge(mockDetailData.status)}
                <span className="text-xs font-black text-emerald-500 uppercase tracking-widest">{mockDetailData.category}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
                {mockDetailData.title}
              </h1>
              <p className="text-slate-500 text-lg font-medium leading-relaxed">
                {mockDetailData.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-6 py-6 border-y border-line-normal">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                  <Eye size={20} />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">조회수</p>
                  <p className="text-sm font-black text-slate-900">{mockDetailData.views.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                  <Download size={20} />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">다운로드</p>
                  <p className="text-sm font-black text-slate-900">{mockDetailData.downloads.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                  <MessageSquare size={20} />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">활용사례</p>
                  <p className="text-sm font-black text-slate-900">12건</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <BarChart3 className="text-emerald-500" size={24} /> 데이터 미리보기
              </h3>
              <div className="overflow-x-auto rounded-[16px] border border-line-normal">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-line-neutral">
                      <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">측정일시</th>
                      <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">측정소명</th>
                      <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest text-center">미세먼지(PM10)</th>
                      <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest text-center">초미세먼지(PM2.5)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line-neutral">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4 text-sm font-medium text-slate-600">2024-03-26 14:00</td>
                        <td className="px-6 py-4 text-sm font-black text-slate-900">철산동 측정소</td>
                        <td className="px-6 py-4 text-sm font-bold text-slate-600 text-center">32 ㎍/㎥</td>
                        <td className="px-6 py-4 text-sm font-bold text-slate-600 text-center">18 ㎍/㎥</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-slate-400 font-medium">* 상기 데이터는 실제 데이터의 일부를 발췌한 샘플입니다.</p>
            </div>
          </section>

          <section className="bg-white rounded-[16px] p-8 sm:p-10 shadow-sm border border-line-normal space-y-6">
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <FileText className="text-emerald-500" size={24} /> 데이터 설명 및 활용 가이드
            </h3>
            <div className="prose prose-slate max-w-none text-slate-600 font-medium leading-relaxed space-y-4">
              <p>
                본 데이터셋은 광명시 전역에 설치된 대기오염 측정망으로부터 수집된 실시간 정보를 제공합니다. 
                제공되는 항목은 미세먼지(PM10), 초미세먼지(PM2.5), 오존(O3), 이산화질소(NO2), 일산화탄소(CO), 아황산가스(SO2) 등 6개 항목입니다.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>데이터 수집 주기: 매시간 정시 측정</li>
                <li>데이터 정확도: 국가 대기오염 측정망 표준 준수</li>
                <li>활용 시 주의사항: 기기 점검 등으로 인해 일시적으로 데이터가 누락될 수 있습니다.</li>
              </ul>
            </div>
          </section>
        </div>

        {/* Right Column: Metadata & Actions */}
        <div className="space-y-8">
          <section className="bg-white rounded-[16px] p-8 shadow-sm border border-line-normal space-y-8 sticky top-28">
            <div className="space-y-4">
              <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest">데이터 상세 정보</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-line-neutral">
                  <div className="flex items-center gap-2 text-slate-500 font-bold text-sm">
                    <Building2 size={16} /> 제공부서
                  </div>
                  <span className="text-slate-900 font-black text-sm">{mockDetailData.department}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-line-neutral">
                  <div className="flex items-center gap-2 text-slate-500 font-bold text-sm">
                    <Calendar size={16} /> 등록일
                  </div>
                  <span className="text-slate-900 font-black text-sm">{mockDetailData.regDate}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-line-neutral">
                  <div className="flex items-center gap-2 text-slate-500 font-bold text-sm">
                    <RefreshCw size={16} /> 갱신주기
                  </div>
                  <span className="text-slate-900 font-black text-sm">{mockDetailData.updateCycle}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-line-neutral">
                  <div className="flex items-center gap-2 text-slate-500 font-bold text-sm">
                    <Database size={16} /> 데이터 형식
                  </div>
                  <span className="text-slate-900 font-black text-sm">{mockDetailData.format}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-line-neutral">
                  <div className="flex items-center gap-2 text-slate-500 font-bold text-sm">
                    {mockDetailData.accessStatus === '공개' ? <Unlock size={16} /> : <Lock size={16} />} 
                    이용상태
                  </div>
                  <span className={`font-black text-sm ${mockDetailData.accessStatus === '공개' ? 'text-emerald-500' : 'text-amber-500'}`}>
                    {mockDetailData.accessStatus}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button className="w-full py-4 bg-[var(--color-primary)] text-white rounded-[16px] font-black text-base hover:bg-[var(--color-primary-hover)] transition-all shadow-lg shadow-[var(--color-primary)]/20 flex items-center justify-center gap-2">
                <Download size={20} /> 데이터 다운로드
              </button>
              <button className="w-full py-4 bg-slate-900 text-white rounded-[16px] font-black text-base hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                <Zap size={20} /> API 활용 신청
              </button>
            </div>

            <div className="space-y-4 pt-4">
              <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Tag size={16} className="text-emerald-500" /> 관련 태그
              </h4>
              <div className="flex flex-wrap gap-2">
                {mockDetailData.tags.map(tag => (
                  <span key={tag} className="px-3 py-1.5 bg-gray-50 border border-line-normal rounded-lg text-xs font-bold text-slate-600 hover:bg-white hover:border-[var(--color-primary-border)]/30 transition-all cursor-pointer">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
