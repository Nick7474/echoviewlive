import { 
  Lightbulb, 
  ChevronRight, 
  Upload, 
  CheckCircle2, 
  Zap, 
  Truck, 
  ShieldCheck, 
  Database,
  Info,
  ArrowRight,
  FileText,
  History,
  Download
} from 'lucide-react';
import { useState } from 'react';
import { motion } from 'motion/react';

const STEPS = [
  { title: '아이디어 제안', desc: '시민의 일상 속 불편함과 해결 아이디어를 자유롭게 제안합니다.', icon: <Lightbulb size={24} /> },
  { title: '전문가 검토', desc: '제안된 주제의 실현 가능성 및 스마트 도시 적합성을 검토합니다.', icon: <ShieldCheck size={24} /> },
  { title: '리빙랩 선정', desc: '최종 선정된 주제는 실제 리빙랩 과제로 확정되어 추진됩니다.', icon: <CheckCircle2 size={24} /> },
  { title: '실증 및 확산', desc: '시민과 함께 데이터를 검증하고 도시 서비스로 확산합니다.', icon: <Zap size={24} /> },
];

const ACHIEVEMENTS = [
  {
    category: '에너지',
    title: '아파트 단지 태양광 발전 공동 모니터링 실증',
    desc: '광명 5개 아파트 단지 태양광 발전 데이터를 시민이 직접 모니터링하고 절감 행동 실증',
    result: '전기절감 12.4%',
    date: '2025.09 완료',
    color: 'amber',
    icon: <Zap size={20} />,
    dataCount: 5,
    service: '신재생 에너지 가상거래 서비스'
  },
  {
    category: '모빌리티',
    title: '전기버스 DRT 1차 노선 수요 실증',
    desc: '시민 탑승 데이터를 기반으로 DRT 최적 노선을 분석, 3개 노선 개선안 도출',
    result: '만족도 87점',
    date: '2025.11 완료',
    color: 'blue',
    icon: <Truck size={20} />,
    dataCount: 11,
    service: '친환경 배달 / 카셰어링 / DRT'
  },
  {
    category: '세이프티',
    title: 'IoT 그린배리어 설치 효과 시민 검증',
    desc: '시민 참여 PM2.5 비교 측정 실험으로 그린배리어 구역 미세먼지 저감 효과 실증',
    result: 'PM2.5 18% 저감',
    date: '2025.10 완료',
    color: 'pink',
    icon: <ShieldCheck size={20} />,
    dataCount: 5,
    service: 'IoT 그린배리어 / AIoT 침수관제'
  }
];

export default function LivingLabSuggestion() {
  const [category, setCategory] = useState('에너지');

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-[40px] bg-emerald-900 text-white p-10 sm:p-16">
        <div className="relative z-10 max-w-3xl space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold border border-white/20"
          >
            <Lightbulb size={14} className="text-primary" />
            <span>시민 참여 리빙랩</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black leading-tight tracking-tighter"
          >
            리빙랩 주제를 <br />
            <span className="text-primary">직접 제안해 보세요!</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-emerald-100/80 leading-relaxed"
          >
            광명시에서 해결하고 싶은 도시 문제나 아이디어가 있으신가요? <br />
            시민이 제안한 주제가 실제 리빙랩 과제로 채택되어 에코뷰 플랫폼을 통해 데이터 실증을 지원받습니다.
          </motion.p>
        </div>
        
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary rounded-full blur-[120px]" />
        </div>
      </section>

      {/* Process Steps */}
      <section className="space-y-10">
        <div className="text-left space-y-2">
          <h3 className="text-2xl font-bold text-gray-900">제안 프로세스</h3>
          <p className="text-gray-400">아이디어가 실제 과제가 되기까지의 과정입니다.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, idx) => (
            <div key={idx} className="relative group">
              <div className="bg-white p-8 rounded-[32px] border border-line-normal shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full space-y-4">
                <div className="w-14 h-14 bg-emerald-50 text-primary rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                  {step.icon}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-primary font-black text-sm">0{idx + 1}</span>
                    <h4 className="font-bold text-gray-900">{step.title}</h4>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                </div>
              </div>
              {idx < STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 -translate-y-1/2 z-10 text-gray-200">
                  <ChevronRight size={24} />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Suggestion Form */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center justify-between border-b border-line-neutral pb-6">
            <h3 className="text-2xl font-bold text-gray-900">주제 제안하기</h3>
            <button className="text-primary text-sm font-bold flex items-center gap-1 hover:underline">
              <Download size={16} /> 제안 양식 다운로드
            </button>
          </div>

          <form className="space-y-8">
            {/* Category Selection */}
            <div className="space-y-4">
              <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <CheckCircle2 size={16} className="text-primary" /> 제안 분야 선택
              </label>
              <div className="flex flex-wrap gap-3">
                {['에너지', '모빌리티', '세이프티', '데이터'].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`px-6 py-2.5 rounded-xl text-sm font-bold border transition-all ${
                      category === cat 
                        ? 'bg-primary border-primary text-white shadow-md' 
                        : 'bg-white border-line-normal text-gray-500 hover:border-primary hover:text-primary'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Title Input */}
            <div className="space-y-4">
              <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <CheckCircle2 size={16} className="text-primary" /> 제안 제목
              </label>
              <input 
                type="text" 
                placeholder="제안하고자 하는 주제의 핵심 명칭을 입력해 주세요."
                className="w-full px-5 py-4 bg-gray-50 border border-line-normal rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>

            {/* Content Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <label className="text-sm font-bold text-gray-700">현황 및 문제점</label>
                <textarea 
                  rows={6}
                  placeholder="일상에서 느끼는 불편함이나 개선이 필요한 상황을 설명해 주세요."
                  className="w-full px-5 py-4 bg-gray-50 border border-line-normal rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                />
              </div>
              <div className="space-y-4">
                <label className="text-sm font-bold text-gray-700">해결 아이디어</label>
                <textarea 
                  rows={6}
                  placeholder="스마트 기술이나 시민 참여를 통해 해결할 수 있는 방법을 제안해 주세요."
                  className="w-full px-5 py-4 bg-gray-50 border border-line-normal rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                />
              </div>
            </div>

            {/* File Upload */}
            <div className="space-y-4">
              <label className="text-sm font-bold text-gray-700">참고 자료 첨부 (선택)</label>
              <div className="border-2 border-dashed border-line-normal rounded-[24px] p-10 flex flex-col items-center justify-center gap-4 bg-gray-50/50 hover:bg-[var(--color-primary-subtle)]/30 hover:border-primary/30 transition-all cursor-pointer group">
                <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center text-gray-400 group-hover:text-primary transition-colors">
                  <Upload size={28} />
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold text-gray-700">클릭하거나 파일을 여기로 드래그하세요</p>
                  <p className="text-xs text-gray-400 mt-1">PDF, JPG, PNG (최대 3개, 파일당 10MB 이내)</p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button className="w-full bg-primary hover:bg-primary text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-primary/20 transition-all hover:-translate-y-1">
                제안서 제출하기
              </button>
            </div>
          </form>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-8">
          {/* Data Status Card */}
          <div className="bg-white rounded-[32px] border border-line-normal shadow-sm p-8 space-y-6">
            <div className="flex items-center gap-3 border-b border-line-neutral pb-4">
              <Database className="text-primary" size={24} />
              <h4 className="font-bold text-gray-900">활용 가능 데이터 현황</h4>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              제안하신 아이디어는 광명시의 풍부한 데이터 자원을 활용하여 실증됩니다.
            </p>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                <span className="text-sm font-medium text-gray-600">광명시 데이터허브</span>
                <span className="text-primary font-black">488종</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                <span className="text-sm font-medium text-gray-600">경기도 데이터허브</span>
                <span className="text-primary font-black">40종</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-[var(--color-primary-subtle)] rounded-2xl border border-line-normal">
                <span className="text-sm font-bold text-primary">마일별 특화 데이터</span>
                <span className="text-primary font-black">25종</span>
              </div>
            </div>
            <div className="flex items-start gap-2 text-[11px] text-gray-400 bg-gray-50 p-3 rounded-lg">
              <Info size={14} className="flex-shrink-0 mt-0.5" />
              <p>공간정보, 정책플랫폼, ITS, 대기환경, 온실가스 등 다양한 카테고리의 실시간 API 연계가 가능합니다.</p>
            </div>
          </div>

          {/* My Status Card */}
          <div className="bg-gray-900 rounded-[32px] p-8 text-white space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="font-bold flex items-center gap-2">
                <History size={20} className="text-primary" /> 나의 제안 현황
              </h4>
              <button className="text-xs text-gray-400 hover:text-white transition-colors">전체보기</button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="space-y-1">
                  <p className="text-sm font-bold truncate max-w-[140px]">전기차 충전소 최적 입지...</p>
                  <p className="text-[11px] text-gray-500">2026.03.20 제안</p>
                </div>
                <span className="bg-primary/20 text-primary text-[10px] font-bold px-2 py-1 rounded-md">검토 중</span>
              </div>
              <p className="text-xs text-center text-gray-500 py-2">최근 제안 내역이 1건 있습니다.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="space-y-10">
        <div className="flex items-end justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-[var(--color-primary-subtle)] text-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
              Results
            </div>
            <h3 className="text-3xl font-bold text-gray-900 tracking-tight">리빙랩 주요 성과</h3>
            <p className="text-gray-400">시민의 아이디어로 변화된 광명시의 모습입니다.</p>
          </div>
          <button className="text-gray-400 hover:text-primary font-bold text-sm flex items-center gap-1 transition-colors">
            전체 보기 <ArrowRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ACHIEVEMENTS.map((item, idx) => (
            <div key={idx} className="bg-white rounded-[40px] border border-line-normal shadow-sm overflow-hidden group hover:shadow-2xl transition-all duration-500">
              <div className={`h-48 p-8 flex flex-col justify-between relative overflow-hidden ${
                item.color === 'amber' ? 'bg-amber-50' : 
                item.color === 'blue' ? 'bg-blue-50' : 'bg-pink-50'
              }`}>
                <div className="flex items-center justify-between relative z-10">
                  <span className={`text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-widest ${
                    item.color === 'amber' ? 'bg-amber-500 text-white' : 
                    item.color === 'blue' ? 'bg-blue-500 text-white' : 'bg-pink-500 text-white'
                  }`}>
                    {item.category}
                  </span>
                  <div className="text-gray-400 group-hover:text-primary transition-colors">
                    <FileText size={20} />
                  </div>
                </div>
                <div className="flex justify-center relative z-10">
                  <div className={`w-20 h-20 rounded-3xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500 ${
                    item.color === 'amber' ? 'bg-white text-amber-500' : 
                    item.color === 'blue' ? 'bg-white text-blue-500' : 'bg-white text-pink-500'
                  }`}>
                    {item.icon}
                  </div>
                </div>
                {/* Decorative background shape */}
                <div className={`absolute -bottom-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-20 ${
                  item.color === 'amber' ? 'bg-amber-500' : 
                  item.color === 'blue' ? 'bg-blue-500' : 'bg-pink-500'
                }`} />
              </div>
              <div className="p-8 space-y-6">
                <div className="space-y-3">
                  <h4 className="text-lg font-bold text-gray-900 leading-snug group-hover:text-primary transition-colors">{item.title}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">{item.desc}</p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-line-normal">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-gray-400 uppercase">실증 결과</p>
                    <p className={`text-lg font-black ${
                      item.color === 'amber' ? 'text-amber-600' : 
                      item.color === 'blue' ? 'text-blue-600' : 'text-pink-600'
                    }`}>{item.result}</p>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-[10px] font-bold text-gray-400 uppercase">연계 데이터</p>
                    <p className="text-sm font-bold text-gray-700">{item.dataCount}종 연계</p>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-2xl space-y-2">
                  <p className="text-[10px] font-bold text-gray-400 uppercase">주요 서비스</p>
                  <p className="text-xs font-medium text-gray-600">{item.service}</p>
                </div>
                <div className="text-[11px] text-gray-400">{item.date}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
