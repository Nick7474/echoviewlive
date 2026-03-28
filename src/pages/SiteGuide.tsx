import { useState } from 'react';
import {
  UserPlus,
  Database,
  FlaskConical,
  HelpCircle,
  ChevronDown,
  Download,
  Key,
  BookOpen,
  Users,
  Building2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const TABS = [
  { id: 'signup', label: '회원가입', icon: <UserPlus size={16} /> },
  { id: 'data',   label: '데이터 이용', icon: <Database size={16} /> },
  { id: 'lab',    label: '리빙랩·오픈랩 참여', icon: <FlaskConical size={16} /> },
  { id: 'faq',    label: 'FAQ', icon: <HelpCircle size={16} /> },
] as const;

type TabId = typeof TABS[number]['id'];

const faqs = [
  {
    id: 1,
    q: '광명시 외 지역 주민도 회원가입이 가능한가요?',
    a: '네, 누구나 가입 가능합니다. 단 리빙랩 현장 참여 과제 일부는 광명시 거주자 우선 모집될 수 있습니다.',
  },
  {
    id: 2,
    q: '리빙랩과 오픈랩의 차이는 무엇인가요?',
    a: '리빙랩은 일반 시민이 참여하는 도시 문제 해결 실증 프로그램입니다. 오픈랩은 기업·연구자·개발자가 광명시 데이터를 활용해 솔루션을 개발하고 창업까지 연계하는 프로그램입니다.',
  },
  {
    id: 3,
    q: '데이터 활용 시 저작권·라이선스 정책은 어떻게 되나요?',
    a: '공개 데이터는 공공누리 라이선스를 적용합니다. 데이터별 라이선스 유형(1~4유형)은 데이터 목록 페이지에서 확인하실 수 있습니다.',
  },
  {
    id: 4,
    q: '에코뷰 플랫폼 이용 시 비용이 발생하나요?',
    a: '기본 서비스(공개 데이터 다운로드, 리빙랩 참여, 탄소현황 조회 등)는 모두 무료입니다.',
  },
  {
    id: 5,
    q: 'API 키는 어디서 발급받나요?',
    a: '로그인 후 마이페이지 → 데이터 신청/활용 내역 → API 키 관리 탭에서 발급받을 수 있습니다.',
  },
];

export default function SiteGuide() {
  const [activeTab, setActiveTab] = useState<TabId>('signup');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="max-w-[1560px] mx-auto space-y-12 pb-20">
      {/* Header */}
      <section className="bg-white rounded-[16px] p-8 sm:p-12 shadow-sm border border-line-normal flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-4 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--color-primary-subtle)] text-[var(--color-primary)] text-[10px] font-black rounded uppercase tracking-widest">
            <BookOpen size={12} /> Site Guide
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
            이용안내
          </h1>
          <p className="text-slate-500 text-lg font-medium max-w-2xl">
            에코뷰 플랫폼의 회원가입부터 데이터 이용, 리빙랩·오픈랩 참여 방법까지<br className="hidden lg:block" />
            단계별로 안내해 드립니다.
          </p>
        </div>
        <div className="flex-shrink-0 w-32 h-32 bg-[var(--color-primary-subtle)] rounded-full flex items-center justify-center text-[var(--color-primary)]">
          <BookOpen size={64} />
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="flex flex-wrap items-center justify-center gap-3">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3.5 rounded-[16px] font-black text-sm flex items-center gap-2 transition-all ${
              activeTab === tab.id
                ? 'bg-slate-900 text-white shadow-xl'
                : 'bg-white text-slate-400 border border-line-normal hover:border-slate-900 hover:text-slate-900'
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </section>

      {/* Tab Content */}
      <section className="bg-white rounded-[16px] p-8 sm:p-12 shadow-sm border border-line-normal min-h-[500px]">

        {/* ── 회원가입 ── */}
        {activeTab === 'signup' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-black text-slate-900">회원가입 절차</h2>
              <p className="text-slate-500 font-medium">4단계를 통해 에코뷰 서비스를 이용하실 수 있습니다.</p>
            </div>

            <div className="relative">
              {/* Connector */}
              <div className="absolute top-[52px] left-[12%] right-[12%] h-0.5 bg-line-normal hidden md:block z-0" />

              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
                {[
                  { step: '01', title: '회원가입', desc: '이메일 또는 소셜 계정으로 가입', icon: <UserPlus size={22} /> },
                  { step: '02', title: '본인인증', desc: '휴대폰 인증, 광명시민 우대', icon: <Users size={22} /> },
                  { step: '03', title: '프로필 설정', desc: '관심 분야·사용 목적 입력', icon: <Building2 size={22} /> },
                  { step: '04', title: '가입 완료', desc: '서비스 전체 이용 가능', icon: <Key size={22} /> },
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center text-center gap-4">
                    <div className="w-[104px] h-[104px] rounded-full bg-[var(--color-primary)] text-white flex flex-col items-center justify-center gap-1 shadow-lg shadow-[var(--color-primary)]/20">
                      {item.icon}
                      <span className="text-xs font-black tracking-widest opacity-80">{item.step}</span>
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-base font-black text-slate-900">{item.title}</h4>
                      <p className="text-sm text-slate-500 font-medium leading-snug">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[var(--color-primary-subtle)] rounded-[16px] p-8 border border-[var(--color-primary-border)]/20 space-y-3">
              <h4 className="font-black text-slate-900 flex items-center gap-2">
                <span className="text-[var(--color-primary)]">✔</span> 가입 전 확인사항
              </h4>
              <ul className="text-sm text-slate-600 font-medium space-y-1.5 list-disc pl-5">
                <li>본인 명의 휴대폰 번호가 필요합니다.</li>
                <li>광명시 거주자는 본인인증 단계에서 거주지 인증 시 리빙랩 우선 참여 혜택이 부여됩니다.</li>
                <li>소셜 로그인(카카오·네이버) 이용 시 별도 이메일 인증이 생략됩니다.</li>
              </ul>
            </div>
          </motion.div>
        )}

        {/* ── 데이터 이용 ── */}
        {activeTab === 'data' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-black text-slate-900">데이터 이용 안내</h2>
              <p className="text-slate-500 font-medium">파일 다운로드와 Open API 두 가지 방식으로 데이터를 활용할 수 있습니다.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* 파일 다운로드 */}
              <div className="p-8 bg-gray-50 rounded-[16px] border border-line-normal space-y-6 hover:bg-white hover:shadow-xl transition-all duration-500">
                <div className="w-14 h-14 bg-[var(--color-primary-subtle)] rounded-2xl flex items-center justify-center text-[var(--color-primary)]">
                  <Download size={28} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-black text-slate-900">파일 다운로드</h3>
                  <p className="text-slate-500 text-sm font-medium">데이터 파일을 직접 내려받아 오프라인 분석에 활용합니다.</p>
                </div>
                <ul className="space-y-3">
                  {[
                    '회원 가입 후 즉시 이용 가능',
                    'CSV, JSON, XLSX 형식 지원',
                    '공개 데이터: 제한 없음',
                    '신청 데이터: 승인 후 이용',
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-slate-700 font-medium">
                      <span className="w-5 h-5 rounded-full bg-[var(--color-primary)] text-white text-[10px] flex items-center justify-center font-black flex-shrink-0">{i + 1}</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Open API */}
              <div className="p-8 bg-gray-50 rounded-[16px] border border-line-normal space-y-6 hover:bg-white hover:shadow-xl transition-all duration-500">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500">
                  <Key size={28} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-black text-slate-900">Open API</h3>
                  <p className="text-slate-500 text-sm font-medium">API 키를 발급받아 서비스·시스템에 실시간으로 데이터를 연동합니다.</p>
                </div>
                <ul className="space-y-3">
                  {[
                    '마이페이지에서 API 키 발급',
                    '일반 회원: 일 1,000건',
                    '연구자·기관: 일 10,000건',
                    '실시간 에너지·환경 데이터 지원',
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-slate-700 font-medium">
                      <span className="w-5 h-5 rounded-full bg-blue-500 text-white text-[10px] flex items-center justify-center font-black flex-shrink-0">{i + 1}</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── 리빙랩·오픈랩 참여 ── */}
        {activeTab === 'lab' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-black text-slate-900">리빙랩·오픈랩 참여 안내</h2>
              <p className="text-slate-500 font-medium">시민과 기업·연구자 모두를 위한 개방형 혁신 프로그램입니다.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* 리빙랩 */}
              <div className="p-8 bg-gray-50 rounded-[16px] border border-line-normal space-y-6 hover:bg-white hover:shadow-xl transition-all duration-500">
                <div className="w-14 h-14 bg-[var(--color-primary-subtle)] rounded-2xl flex items-center justify-center text-[var(--color-primary)]">
                  <Users size={28} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-black text-slate-900">리빙랩 참여</h3>
                  <p className="text-slate-500 text-sm font-medium">시민이 직접 도시 문제 해결 실증에 참여하는 프로그램입니다.</p>
                </div>
                <div className="space-y-3">
                  {[
                    { label: '대상', value: '광명시 거주 만 14세 이상 시민' },
                    { label: '방법', value: '공고 목록에서 과제 선택 후 신청' },
                    { label: '선발', value: '과제별 모집인원 내 서류 검토 후 선발' },
                    { label: '활동', value: '현장 실증 참여, 결과 보고서 작성' },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-3 text-sm">
                      <span className="font-black text-[var(--color-primary)] w-10 flex-shrink-0">{item.label}</span>
                      <span className="text-slate-600 font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 오픈랩 */}
              <div className="p-8 bg-gray-50 rounded-[16px] border border-line-normal space-y-6 hover:bg-white hover:shadow-xl transition-all duration-500">
                <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500">
                  <FlaskConical size={28} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-black text-slate-900">오픈랩 신청</h3>
                  <p className="text-slate-500 text-sm font-medium">데이터 기반 솔루션 개발과 창업을 연계하는 프로그램입니다.</p>
                </div>
                <div className="space-y-3">
                  {[
                    { label: '대상', value: '기업·연구자·개발자·스타트업' },
                    { label: '방법', value: '오픈랩 공고 확인 후 제안서 제출' },
                    { label: '선발', value: '심사 후 협약 체결' },
                    { label: '지원', value: '데이터·공간·멘토링·창업 연계' },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-3 text-sm">
                      <span className="font-black text-amber-500 w-10 flex-shrink-0">{item.label}</span>
                      <span className="text-slate-600 font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── FAQ ── */}
        {activeTab === 'faq' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                <HelpCircle className="text-[var(--color-primary)]" size={28} /> 자주 묻는 질문
              </h3>
              <p className="text-slate-500 font-medium">에코뷰 플랫폼 이용에 관해 자주 묻는 질문을 모았습니다.</p>
            </div>
            <div className="space-y-3">
              {faqs.map(faq => (
                <div key={faq.id} className="border border-line-normal rounded-[16px] overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                    className="w-full px-8 py-6 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors text-left"
                  >
                    <span className="text-base font-black text-slate-900 pr-4">
                      <span className="text-[var(--color-primary)] mr-2">Q{faq.id}.</span>{faq.q}
                    </span>
                    <ChevronDown
                      className={`text-gray-400 flex-shrink-0 transition-transform duration-300 ${openFaq === faq.id ? 'rotate-180' : ''}`}
                      size={20}
                    />
                  </button>
                  <AnimatePresence>
                    {openFaq === faq.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="bg-gray-50 px-8 py-6 border-t border-line-normal"
                      >
                        <p className="text-slate-600 font-medium leading-relaxed">
                          <span className="text-slate-400 font-black mr-2">A.</span>{faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </section>
    </div>
  );
}
