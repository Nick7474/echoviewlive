import { 
  Rocket, 
  Database, 
  Search, 
  PenTool, 
  CheckCircle2, 
  FileText, 
  Upload, 
  ArrowRight,
  Lightbulb,
  Cpu,
  Globe,
  Monitor,
  Briefcase,
  Zap,
  Activity,
  Info,
  ShieldCheck,
  ChevronRight,
  Download
} from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';

const STEPS = [
  { id: 1, title: '아이디어 제안', icon: <Lightbulb size={20} /> },
  { id: 2, title: '데이터 검토', icon: <Database size={20} /> },
  { id: 3, title: '적정성 평가', icon: <ShieldCheck size={20} /> },
  { id: 4, title: '최종 선정', icon: <CheckCircle2 size={20} /> },
];

const CATEGORIES = [
  { id: 'analysis', label: '데이터 분석', icon: <Database size={18} />, color: 'sky' },
  { id: 'poc', label: 'PoC 실증', icon: <Rocket size={18} />, color: 'blue' },
  { id: 'biz', label: '비즈니스 모델', icon: <Briefcase size={18} />, color: 'indigo' },
  { id: 'tech', label: '신기술 융합', icon: <Cpu size={18} />, color: 'purple' },
];

export default function OpenLabSuggestion() {
  const shouldReduceMotion = useReducedMotion();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('');

  return (
    <div className="max-w-[1560px] mx-auto space-y-12">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 bg-sky-100 text-sky-600 px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest">
            <Rocket size={14} /> Open Lab Idea Hub
          </div>
          <h2 className="text-4xl font-black text-gray-900 tracking-tight leading-tight">
            오픈랩 혁신 아이디어 제안
          </h2>
          <p className="text-gray-500 text-lg font-medium max-w-2xl leading-relaxed">
            광명시의 공공데이터와 여러분의 혁신적인 기술을 결합하여<br />
            새로운 도시 가치를 창출하는 비즈니스 모델을 제안해 주세요.
          </p>
        </div>
        
        {/* Step Indicator */}
        <div className="flex items-center gap-4 bg-white p-4 rounded-[32px] border border-line-normal shadow-sm">
          {STEPS.map((step, idx) => (
            <div key={step.id} className="flex items-center gap-4">
              <div className="flex flex-col items-center gap-2">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                  currentStep >= step.id ? 'bg-sky-500 text-white shadow-lg shadow-sky-200' : 'bg-gray-50 text-gray-300'
                }`}>
                  {step.icon}
                </div>
                <span className={`text-[10px] font-black ${currentStep >= step.id ? 'text-sky-600' : 'text-gray-400'}`}>
                  {step.title}
                </span>
              </div>
              {idx < STEPS.length - 1 && (
                <div className={`w-8 h-0.5 rounded-full ${currentStep > step.id ? 'bg-sky-500' : 'bg-gray-100'}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Form Area */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-[40px] border border-line-normal shadow-sm overflow-hidden p-10 sm:p-12 space-y-12">
            {/* Category Selection */}
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-sky-500 rounded-xl flex items-center justify-center text-white text-sm font-black">01</div>
                <h3 className="text-xl font-black text-gray-900">제안 분야 선택</h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex flex-col items-center gap-4 p-6 rounded-[28px] border-2 transition-all ${
                      selectedCategory === cat.id 
                        ? 'bg-sky-50 border-sky-500 text-sky-600 shadow-lg shadow-sky-100' 
                        : 'bg-white border-line-normal text-gray-400 hover:border-sky-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                      selectedCategory === cat.id ? 'bg-sky-500 text-white' : 'bg-gray-50 text-gray-400'
                    }`}>
                      {cat.icon}
                    </div>
                    <span className="text-sm font-black">{cat.label}</span>
                  </button>
                ))}
              </div>
            </section>

            {/* Content Input */}
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-sky-500 rounded-xl flex items-center justify-center text-white text-sm font-black">02</div>
                <h3 className="text-xl font-black text-gray-900">제안 내용 작성</h3>
              </div>
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-sm font-black text-gray-700 ml-1">아이디어 제목</label>
                  <input 
                    type="text" 
                    placeholder="핵심 내용을 포함한 명확한 제목을 입력해 주세요"
                    className="w-full px-6 py-4 bg-gray-50 border border-line-normal rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all font-medium"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-black text-gray-700 ml-1">제안 배경 및 필요성</label>
                  <textarea 
                    rows={4}
                    placeholder="이 아이디어가 왜 필요한지, 어떤 문제를 해결할 수 있는지 설명해 주세요"
                    className="w-full px-6 py-4 bg-gray-50 border border-line-normal rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all font-medium resize-none"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-black text-gray-700 ml-1">상세 제안 내용</label>
                  <textarea 
                    rows={8}
                    placeholder="구체적인 실행 방안, 활용 데이터, 기대 효과 등을 상세히 기술해 주세요"
                    className="w-full px-6 py-4 bg-gray-50 border border-line-normal rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all font-medium resize-none"
                  />
                </div>
              </div>
            </section>

            {/* File Upload */}
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-sky-500 rounded-xl flex items-center justify-center text-white text-sm font-black">03</div>
                <h3 className="text-xl font-black text-gray-900">첨부 파일</h3>
              </div>
              <div className="border-2 border-dashed border-line-normal rounded-[32px] p-12 flex flex-col items-center justify-center gap-4 bg-gray-50/50 hover:bg-sky-50/30 hover:border-sky-300 transition-all cursor-pointer group">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-gray-400 group-hover:text-sky-500 shadow-sm group-hover:shadow-md transition-all">
                  <Upload size={32} />
                </div>
                <div className="text-center">
                  <p className="text-gray-900 font-black mb-1">파일을 드래그하거나 클릭하여 업로드</p>
                  <p className="text-gray-400 text-xs font-medium">PDF, PPTX, DOCX (최대 20MB)</p>
                </div>
              </div>
            </section>

            {/* Submit Button */}
            <div className="pt-6 flex items-center gap-4">
              <button className="flex-grow bg-sky-500 hover:bg-sky-600 text-white py-5 rounded-[24px] font-black text-lg transition-all shadow-xl shadow-sky-200 flex items-center justify-center gap-3 group">
                제안서 제출하기 <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-10 py-5 bg-gray-100 hover:bg-gray-200 text-gray-500 rounded-[24px] font-black text-lg transition-all">
                임시 저장
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar Info Area */}
        <div className="space-y-8">
          {/* Data Status Card */}
          <div className="bg-[#0f2a4a] rounded-[40px] p-8 text-white space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-400/10 rounded-full -mr-16 -mt-16 blur-2xl" />
            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center">
                  <Activity size={20} />
                </div>
                <h4 className="text-lg font-black">실시간 데이터 현황</h4>
              </div>
              <div className="space-y-4">
                {[
                  { label: '공공데이터 개방', value: '1,245건', trend: '+12' },
                  { label: '오픈 API 호출', value: '85.4만', trend: '+5.2%' },
                  { label: '데이터 분석 인프라', value: '정상', trend: 'Stable' },
                ].map((stat, i) => (
                  <div key={i} className="bg-white/5 rounded-2xl p-4 flex items-center justify-between border border-white/10">
                    <span className="text-sky-100/60 text-xs font-bold">{stat.label}</span>
                    <div className="text-right">
                      <div className="text-sm font-black">{stat.value}</div>
                      <div className="text-[10px] text-sky-400 font-bold">{stat.trend}</div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full py-4 bg-white/10 hover:bg-white/20 rounded-2xl text-xs font-black transition-all flex items-center justify-center gap-2 border border-white/10">
                <Download size={14} /> 데이터 카탈로그 다운로드
              </button>
            </div>
          </div>

          {/* User Status Card */}
          <div className="bg-white rounded-[40px] border border-line-normal shadow-sm p-8 space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-sky-100 text-sky-600 rounded-xl flex items-center justify-center">
                <PenTool size={20} />
              </div>
              <h4 className="text-lg font-black text-gray-900">나의 제안 현황</h4>
            </div>
            <div className="space-y-4">
              <div className="p-5 bg-gray-50 rounded-3xl border border-line-normal space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-sky-500 uppercase tracking-wider">In Progress</span>
                  <span className="text-[10px] font-bold text-gray-400">2026.03.20</span>
                </div>
                <p className="text-sm font-black text-gray-800 leading-tight">스마트 가로등 에너지 절감 데이터 분석 모델</p>
                <div className="flex items-center gap-2">
                  <div className="flex-grow h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div className="w-1/2 h-full bg-sky-500" />
                  </div>
                  <span className="text-[10px] font-black text-sky-600">50%</span>
                </div>
              </div>
              <button className="w-full py-4 bg-sky-50 text-sky-600 hover:bg-sky-100 rounded-2xl text-xs font-black transition-all flex items-center justify-center gap-2">
                전체 내역 보기 <ChevronRight size={14} />
              </button>
            </div>
          </div>

          {/* Info Card */}
          <div className="bg-sky-50 rounded-[40px] p-8 space-y-6">
            <div className="flex items-center gap-3 text-sky-600">
              <Info size={20} />
              <h4 className="text-lg font-black">제안 시 유의사항</h4>
            </div>
            <ul className="space-y-4">
              {[
                '타인의 지식재산권을 침해하지 않아야 합니다.',
                '이미 시행 중인 사업은 선정에서 제외될 수 있습니다.',
                '제안된 아이디어는 오픈랩 운영 정책에 따라 관리됩니다.',
                '선정 시 PoC 실증 인프라 및 예산이 지원됩니다.'
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-3 text-xs font-bold text-sky-700/70 leading-relaxed">
                  <div className="w-1.5 h-1.5 bg-sky-400 rounded-full mt-1.5 flex-shrink-0" />
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
