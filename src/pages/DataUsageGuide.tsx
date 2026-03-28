import { useState } from 'react';
import { 
  BookOpen, 
  Code2, 
  Database, 
  FileJson, 
  FileSpreadsheet, 
  FileCode, 
  Key, 
  ShieldCheck, 
  HelpCircle, 
  ChevronDown,
  ArrowRight,
  Zap,
  CheckCircle2,
  Terminal,
  Globe,
  Search,
  Download
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function DataUsageGuide() {
  const [activeTab, setActiveTab] = useState<'portal' | 'api' | 'format'>('portal');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      id: 1,
      question: '공공데이터 포털의 데이터는 누구나 이용할 수 있나요?',
      answer: '네, 광명시 공공데이터 포털에서 제공하는 데이터는 원칙적으로 누구나 자유롭게 이용할 수 있습니다. 다만, 개인정보 보호나 국가 안보 등 관련 법령에 따라 이용이 제한되는 일부 데이터는 별도의 신청 및 승인 절차가 필요할 수 있습니다.'
    },
    {
      id: 2,
      question: 'Open API 인증키는 어떻게 발급받나요?',
      answer: '데이터 상세 페이지에서 "API 활용 신청" 버튼을 클릭하여 신청서를 작성해 주세요. 담당 부서의 승인이 완료되면 마이페이지 또는 신청 결과 안내 이메일을 통해 인증키를 확인하실 수 있습니다.'
    },
    {
      id: 3,
      question: '데이터의 출처를 반드시 명시해야 하나요?',
      answer: '네, 공공데이터를 활용하여 서비스나 저작물을 제작할 경우 "출처: 광명시 공공데이터 포털"과 같이 출처를 명확히 기재해 주셔야 합니다.'
    }
  ];

  return (
    <div className="max-w-[1560px] mx-auto space-y-12 pb-20">
      {/* Header Section */}
      <section className="bg-white rounded-[16px] p-8 sm:p-12 shadow-sm border border-line-normal flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-4 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--color-primary-subtle)] text-[var(--color-primary)] text-[10px] font-black rounded uppercase tracking-widest">
            <BookOpen size={12} /> Usage Guide
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
            데이터 활용 가이드
          </h1>
          <p className="text-slate-500 text-lg font-medium max-w-2xl">
            광명시 공공데이터를 보다 쉽고 효과적으로 활용하는 방법을 안내해 드립니다. <br className="hidden lg:block" />
            포털 이용 방법부터 Open API 연동 가이드까지 한눈에 확인하세요.
          </p>
        </div>
        <div className="flex-shrink-0 w-32 h-32 bg-[var(--color-primary-subtle)] rounded-full flex items-center justify-center text-[var(--color-primary)]">
          <BookOpen size={64} />
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="flex items-center justify-center gap-4">
        {[
          { id: 'portal', title: '포털 이용 안내', icon: <Globe size={18} /> },
          { id: 'api', title: 'Open API 가이드', icon: <Code2 size={18} /> },
          { id: 'format', title: '데이터 형식 안내', icon: <Database size={18} /> }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-8 py-4 rounded-[16px] font-black text-sm flex items-center gap-2 transition-all ${
              activeTab === tab.id 
                ? 'bg-slate-900 text-white shadow-xl' 
                : 'bg-white text-slate-400 border border-line-normal hover:border-slate-900 hover:text-slate-900'
            }`}
          >
            {tab.icon} {tab.title}
          </button>
        ))}
      </section>

      {/* Tab Content */}
      <section className="bg-white rounded-[16px] p-8 sm:p-12 shadow-sm border border-line-normal min-h-[600px]">
        {activeTab === 'portal' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { step: '01', title: '데이터 검색', desc: '키워드나 카테고리를 통해 원하는 데이터를 찾습니다.', icon: <Search size={24} /> },
                { step: '02', title: '데이터 확인', desc: '상세 정보와 미리보기를 통해 데이터 구성을 확인합니다.', icon: <CheckCircle2 size={24} /> },
                { step: '03', title: '다운로드/신청', desc: '필요한 형식으로 다운로드하거나 API 활용을 신청합니다.', icon: <Download size={24} /> }
              ].map((item, idx) => (
                <div key={idx} className="p-8 bg-gray-50 rounded-[16px] border border-line-normal space-y-6 relative group hover:bg-white hover:shadow-xl transition-all duration-500">
                  <span className="absolute top-4 right-6 text-4xl font-black text-gray-100 group-hover:text-emerald-50 transition-colors">{item.step}</span>
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-emerald-500 shadow-sm">
                    {item.icon}
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xl font-black text-slate-900">{item.title}</h4>
                    <p className="text-slate-500 text-sm font-medium leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-8">
              <h3 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                <HelpCircle className="text-emerald-500" size={28} /> 자주 묻는 질문 (FAQ)
              </h3>
              <div className="space-y-4">
                {faqs.map((faq) => (
                  <div key={faq.id} className="border border-line-normal rounded-[16px] overflow-hidden">
                    <button 
                      onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                      className="w-full px-8 py-6 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors text-left"
                    >
                      <span className="text-lg font-black text-slate-900">{faq.question}</span>
                      <ChevronDown className={`text-gray-400 transition-transform duration-300 ${openFaq === faq.id ? 'rotate-180' : ''}`} size={20} />
                    </button>
                    <AnimatePresence>
                      {openFaq === faq.id && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="bg-gray-50 px-8 py-6 border-t border-line-normal"
                        >
                          <p className="text-slate-600 font-medium leading-relaxed">{faq.answer}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'api' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-12"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h3 className="text-2xl font-black text-slate-900">API 연동 프로세스</h3>
                  <div className="space-y-4">
                    {[
                      { title: '인증키 발급', desc: '회원가입 후 데이터별 API 활용 신청을 통해 인증키를 발급받습니다.', icon: <Key size={18} /> },
                      { title: '엔드포인트 확인', desc: '제공되는 API의 기본 URL과 파라미터 정보를 확인합니다.', icon: <Globe size={18} /> },
                      { title: '데이터 호출', desc: '발급받은 인증키를 포함하여 HTTP GET 방식으로 데이터를 호출합니다.', icon: <Terminal size={18} /> },
                      { title: '결과 처리', desc: 'JSON 또는 XML 형식으로 반환되는 데이터를 시스템에 적용합니다.', icon: <FileCode size={18} /> }
                    ].map((step, idx) => (
                      <div key={idx} className="flex items-start gap-4 p-6 bg-gray-50 rounded-[16px] border border-line-normal">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-emerald-500 shadow-sm flex-shrink-0">
                          {step.icon}
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-black text-slate-900">{step.title}</h4>
                          <p className="text-slate-500 text-sm font-medium leading-relaxed">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="space-y-4">
                  <h3 className="text-2xl font-black text-slate-900">샘플 코드 (JavaScript)</h3>
                  <div className="bg-slate-900 rounded-[16px] p-8 font-mono text-sm text-emerald-400 overflow-x-auto">
                    <pre className="space-y-2">
                      <code>{`// API 호출 예시
const API_KEY = 'YOUR_AUTH_KEY';
const url = \`https://api.gm.go.kr/data/v1/air-quality?key=\${API_KEY}\`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log('실시간 대기질 정보:', data);
  })
  .catch(error => {
    console.error('데이터 호출 실패:', error);
  });`}</code>
                    </pre>
                  </div>
                </div>
                <div className="p-6 bg-amber-50 border border-amber-100 rounded-[16px] flex items-start gap-4">
                  <ShieldCheck className="text-amber-500 flex-shrink-0" size={24} />
                  <div className="space-y-1">
                    <h4 className="font-black text-amber-900">보안 주의사항</h4>
                    <p className="text-amber-700 text-sm font-medium leading-relaxed">
                      발급받은 API 인증키는 타인에게 노출되지 않도록 주의해 주세요. 
                      클라이언트 사이드(브라우저)에서 직접 호출 시 키가 노출될 수 있으므로 서버 사이드 프록시 활용을 권장합니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'format' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: 'CSV', icon: <FileSpreadsheet size={32} />, color: 'bg-emerald-50 text-emerald-500', desc: '쉼표로 구분된 텍스트 파일로 엑셀이나 데이터 분석 도구에서 쉽게 활용 가능합니다.' },
                { title: 'JSON', icon: <FileJson size={32} />, color: 'bg-blue-50 text-blue-500', desc: '경량 데이터 교환 형식으로 웹/앱 서비스 개발 시 가장 널리 사용됩니다.' },
                { title: 'XML', icon: <FileCode size={32} />, color: 'bg-amber-50 text-amber-500', desc: '계층적 구조를 가진 데이터 형식으로 복잡한 데이터 관계를 표현하기에 적합합니다.' }
              ].map((format, idx) => (
                <div key={idx} className="p-10 bg-white border border-line-normal rounded-[16px] shadow-sm hover:shadow-xl transition-all duration-500 text-center space-y-6">
                  <div className={`w-20 h-20 ${format.color} rounded-2xl flex items-center justify-center mx-auto shadow-sm`}>
                    {format.icon}
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-2xl font-black text-slate-900">{format.title}</h4>
                    <p className="text-slate-500 text-sm font-medium leading-relaxed">{format.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-slate-50 p-10 rounded-[16px] border border-line-normal flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="space-y-2 text-center lg:text-left">
                <h4 className="text-xl font-black text-slate-900">원하시는 형식이 없으신가요?</h4>
                <p className="text-slate-500 font-medium">특정 데이터 형식이 필요하신 경우 신규 데이터 신청을 통해 요청해 주세요.</p>
              </div>
              <button className="px-10 py-4 bg-[var(--color-primary)] text-white rounded-[16px] font-black text-base hover:bg-[var(--color-primary-hover)] transition-all shadow-lg shadow-[var(--color-primary)]/20 flex items-center gap-2">
                신규 데이터 신청하기 <ArrowRight size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </section>
    </div>
  );
}
