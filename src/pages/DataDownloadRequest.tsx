import { useState, useEffect } from 'react';
import { 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  ChevronRight, 
  Database, 
  Zap, 
  User, 
  Building2, 
  Mail, 
  Phone, 
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';

export default function DataDownloadRequest() {
  useEffect(() => {
    document.title = "데이터 다운로드 신청 | 에코뷰";
  }, []);
  const shouldReduceMotion = useReducedMotion();
  const [step, setStep] = useState(1);
  const [requestType, setRequestType] = useState<'download' | 'api'>('download');

  const steps = [
    { id: 1, title: '유형 선택', icon: <Database size={20} /> },
    { id: 2, title: '약관 동의', icon: <FileText size={20} /> },
    { id: 3, title: '신청서 작성', icon: <CheckCircle2 size={20} /> },
    { id: 4, title: '신청 완료', icon: <CheckCircle2 size={20} /> }
  ];

  return (
    <div className="max-w-[1560px] mx-auto space-y-12 pb-20">
      {/* Header Section */}
      <section className="bg-white rounded-[16px] p-8 sm:p-12 shadow-sm border border-line-normal flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-4 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-black rounded uppercase tracking-widest">
            <Zap size={12} /> Data Request
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
            데이터 다운로드 및 API 활용 신청
          </h1>
          <p className="text-slate-500 text-lg font-medium max-w-2xl">
            공개되지 않은 데이터의 다운로드 권한이나 실시간 데이터 연동을 위한 <br className="hidden lg:block" />
            API 활용 신청을 진행해 주세요. 광명시가 여러분의 데이터 활용을 지원합니다.
          </p>
        </div>
        <div className="flex-shrink-0 w-32 h-32 bg-[var(--color-primary-subtle)] rounded-full flex items-center justify-center text-[var(--color-primary)]">
          <Database size={64} />
        </div>
      </section>

      {/* Progress Steps */}
      <section className="bg-white rounded-[16px] p-6 shadow-sm border border-line-normal">
        <div className="flex items-center justify-between max-w-4xl mx-auto relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-line-normal -translate-y-1/2 z-0" />
          {steps.map((s, idx) => (
            <div key={s.id} className="relative z-10 flex flex-col items-center gap-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                step >= s.id ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-white border-2 border-line-normal text-gray-300'
              }`}>
                {s.icon}
              </div>
              <span className={`text-xs font-black uppercase tracking-widest ${
                step >= s.id ? 'text-emerald-600' : 'text-gray-300'
              }`}>
                {s.title}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Main Form Content */}
      <section className="bg-white rounded-[16px] p-8 sm:p-12 shadow-sm border border-line-normal min-h-[500px]">
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
            className="space-y-10 max-w-4xl mx-auto"
          >
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-black text-slate-900">신청 유형을 선택해 주세요</h2>
              <p className="text-slate-400 font-medium">원하시는 데이터 활용 방식에 따라 신청 유형이 달라집니다.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <button 
                onClick={() => setRequestType('download')}
                className={`p-10 rounded-[16px] border-2 text-left transition-all duration-300 group ${
                  requestType === 'download' ? 'border-[var(--color-primary-border)] bg-[var(--color-primary-subtle)]/30' : 'border-line-normal hover:border-[var(--color-primary-border)]/30'
                }`}
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110 ${
                  requestType === 'download' ? 'bg-emerald-500 text-white' : 'bg-fill-normal text-gray-400'
                }`}>
                  <Database size={32} />
                </div>
                <h3 className={`text-xl font-black mb-4 ${requestType === 'download' ? 'text-slate-900' : 'text-slate-400'}`}>
                  데이터 다운로드 신청
                </h3>
                <p className="text-slate-500 text-sm font-medium leading-relaxed">
                  대용량 또는 비공개 데이터를 파일(CSV, Excel 등) 형태로 내려받기 위해 신청합니다. 
                  주로 일회성 분석이나 오프라인 작업에 적합합니다.
                </p>
              </button>

              <button 
                onClick={() => setRequestType('api')}
                className={`p-10 rounded-[16px] border-2 text-left transition-all duration-300 group ${
                  requestType === 'api' ? 'border-[var(--color-primary-border)] bg-[var(--color-primary-subtle)]/30' : 'border-line-normal hover:border-[var(--color-primary-border)]/30'
                }`}
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110 ${
                  requestType === 'api' ? 'bg-emerald-500 text-white' : 'bg-fill-normal text-gray-400'
                }`}>
                  <Zap size={32} />
                </div>
                <h3 className={`text-xl font-black mb-4 ${requestType === 'api' ? 'text-slate-900' : 'text-slate-400'}`}>
                  Open API 활용 신청
                </h3>
                <p className="text-slate-500 text-sm font-medium leading-relaxed">
                  실시간으로 업데이트되는 데이터를 시스템 간 연동하기 위해 신청합니다. 
                  웹/앱 서비스 개발이나 지속적인 데이터 모니터링에 적합합니다.
                </p>
              </button>
            </div>

            <div className="flex justify-center pt-10">
              <button 
                onClick={() => setStep(2)}
                className="px-12 py-4 bg-[var(--color-primary)] text-white rounded-[16px] font-black text-base hover:bg-[var(--color-primary-hover)] transition-all shadow-lg shadow-[var(--color-primary)]/20 flex items-center gap-3"
              >
                다음 단계로 이동 <ArrowRight size={20} />
              </button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
            className="space-y-10 max-w-4xl mx-auto"
          >
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-black text-slate-900">이용 약관 및 개인정보 수집 동의</h2>
              <p className="text-slate-400 font-medium">데이터 활용을 위해 아래 약관을 확인하고 동의해 주세요.</p>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 p-8 rounded-[16px] border border-line-normal h-64 overflow-y-auto space-y-6">
                <div className="space-y-4">
                  <h4 className="font-black text-slate-900 text-lg">제1조 (목적)</h4>
                  <p className="text-slate-600 text-sm font-medium leading-relaxed">
                    본 약관은 광명시 공공데이터 포털(이하 "포털")에서 제공하는 공공데이터의 이용 조건 및 절차에 관한 사항을 규정함을 목적으로 합니다.
                  </p>
                </div>
                <div className="space-y-4">
                  <h4 className="font-black text-slate-900 text-lg">제2조 (이용자의 의무)</h4>
                  <p className="text-slate-600 text-sm font-medium leading-relaxed">
                    이용자는 제공받은 데이터를 신청 시 명시한 목적 이외의 용도로 사용해서는 안 되며, 제3자에게 무단으로 배포하거나 상업적으로 이용할 경우 법적 책임을 질 수 있습니다.
                  </p>
                </div>
                <div className="space-y-4">
                  <h4 className="font-black text-slate-900 text-lg">제3조 (권리 및 책임)</h4>
                  <p className="text-slate-600 text-sm font-medium leading-relaxed">
                    광명시는 제공되는 데이터의 정확성을 기하기 위해 노력하나, 데이터 이용으로 인해 발생하는 결과에 대해서는 책임을 지지 않습니다.
                  </p>
                </div>
              </div>
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="w-6 h-6 rounded border-2 border-line-normal flex items-center justify-center group-hover:border-[var(--color-primary-border)] transition-colors">
                  <input type="checkbox" className="hidden" />
                  <div className="w-3 h-3 bg-emerald-500 rounded-sm opacity-0 transition-opacity" />
                </div>
                <span className="text-slate-900 font-black text-sm">위 약관에 모두 동의합니다.</span>
              </label>
            </div>

            <div className="flex justify-center gap-4 pt-10">
              <button 
                onClick={() => setStep(1)}
                className="px-10 py-4 bg-white border border-line-normal text-slate-500 rounded-[16px] font-black text-base hover:bg-gray-50 transition-all"
              >
                이전으로
              </button>
              <button 
                onClick={() => setStep(3)}
                className="px-12 py-4 bg-[var(--color-primary)] text-white rounded-[16px] font-black text-base hover:bg-[var(--color-primary-hover)] transition-all shadow-lg shadow-[var(--color-primary)]/20 flex items-center gap-3"
              >
                다음 단계로 이동 <ArrowRight size={20} />
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
            className="space-y-10 max-w-4xl mx-auto"
          >
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-black text-slate-900">신청서 작성</h2>
              <p className="text-slate-400 font-medium">데이터 활용 목적과 신청자 정보를 정확히 입력해 주세요.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-black text-slate-900 flex items-center gap-2">
                    <User size={16} className="text-emerald-500" /> 신청자 성함
                  </label>
                  <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-line-normal rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-border)]/20" placeholder="성함을 입력하세요" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-black text-slate-900 flex items-center gap-2">
                    <Building2 size={16} className="text-emerald-500" /> 소속 (기관/기업)
                  </label>
                  <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-line-normal rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-border)]/20" placeholder="소속을 입력하세요" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-black text-slate-900 flex items-center gap-2">
                    <Mail size={16} className="text-emerald-500" /> 이메일 주소
                  </label>
                  <input type="email" className="w-full px-4 py-3 bg-gray-50 border border-line-normal rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-border)]/20" placeholder="example@email.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-black text-slate-900 flex items-center gap-2">
                    <Phone size={16} className="text-emerald-500" /> 연락처
                  </label>
                  <input type="tel" className="w-full px-4 py-3 bg-gray-50 border border-line-normal rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-border)]/20" placeholder="010-0000-0000" />
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-black text-slate-900 flex items-center gap-2">
                    <HelpCircle size={16} className="text-emerald-500" /> 활용 목적
                  </label>
                  <textarea className="w-full h-[300px] px-4 py-3 bg-gray-50 border border-line-normal rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-border)]/20 resize-none" placeholder="데이터를 어떻게 활용하실 예정인지 상세히 작성해 주세요."></textarea>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-4 pt-10">
              <button 
                onClick={() => setStep(2)}
                className="px-10 py-4 bg-white border border-line-normal text-slate-500 rounded-[16px] font-black text-base hover:bg-gray-50 transition-all"
              >
                이전으로
              </button>
              <button 
                onClick={() => setStep(4)}
                className="px-12 py-4 bg-[var(--color-primary)] text-white rounded-[16px] font-black text-base hover:bg-[var(--color-primary-hover)] transition-all shadow-lg shadow-[var(--color-primary)]/20 flex items-center gap-3"
              >
                신청 완료하기 <CheckCircle2 size={20} />
              </button>
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
            className="flex flex-col items-center justify-center py-20 space-y-8 text-center"
          >
            <div className="w-24 h-24 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center">
              <CheckCircle2 size={64} />
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-slate-900">신청이 정상적으로 접수되었습니다!</h2>
              <p className="text-slate-500 text-lg font-medium max-w-lg mx-auto leading-relaxed">
                담당 부서의 검토 후 영업일 기준 3~5일 이내에 <br />
                이메일로 결과를 안내해 드리겠습니다.
              </p>
            </div>
            <div className="flex gap-4">
              <button className="px-10 py-4 bg-slate-900 text-white rounded-[16px] font-black text-base hover:bg-slate-800 transition-all">
                신청 내역 확인하기
              </button>
              <button className="px-10 py-4 bg-white border border-line-normal text-slate-900 rounded-[16px] font-black text-base hover:bg-gray-50 transition-all">
                메인으로 이동
              </button>
            </div>
          </motion.div>
        )}
      </section>

      {/* Help Section */}
      <section className="bg-slate-900 rounded-[16px] p-8 sm:p-12 text-white flex flex-col lg:flex-row items-center justify-between gap-12">
        <div className="space-y-4 text-center lg:text-left">
          <h3 className="text-2xl font-black tracking-tight">신청 과정에서 도움이 필요하신가요?</h3>
          <p className="text-slate-400 text-base font-medium">
            데이터 신청 절차나 Open API 활용 방법에 대해 궁금한 점이 있다면 <br className="hidden sm:block" />
            활용 가이드를 확인하거나 담당자에게 문의해 주세요.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
          <button className="px-8 py-4 bg-white/10 text-white rounded-[16px] font-black text-sm hover:bg-white/20 transition-all">
            활용 가이드 보기
          </button>
          <button className="px-8 py-4 bg-[var(--color-primary)] text-white rounded-[16px] font-black text-sm hover:bg-[var(--color-primary-hover)] transition-all">
            1:1 문의하기
          </button>
        </div>
      </section>
    </div>
  );
}
