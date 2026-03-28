import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';

const MENU = [
  { icon: '📑', label: '사업신청내역',   path: '/my/applications' },
  { icon: '💾', label: '데이터 신청내역', path: '/my/data' },
  { icon: '⭐', label: '관심사업 관리',  path: '/my/interests' },
  { icon: '👤', label: '계정 및 정보관리', path: '/my/account' },
];

export default function MyPageLayout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();

  return (
    <div className="max-w-[1560px] mx-auto pb-20 flex flex-col lg:flex-row gap-8">
      {/* Sidebar */}
      <aside className="lg:w-[260px] flex-shrink-0">
        <div className="sticky top-28 space-y-4">
          {/* Profile Card */}
          <div className="bg-white border border-line-normal rounded-[16px] p-6 flex flex-col items-center text-center gap-3">
            <div className="w-16 h-16 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-2xl font-black">
              홍
            </div>
            <div>
              <p className="font-black text-slate-900 text-lg leading-tight">홍길동</p>
              <p className="text-xs text-slate-400 mt-0.5">citizen@gwangmyeong.kr</p>
            </div>
            <span className="px-3 py-1 bg-[var(--color-primary-subtle)] text-[var(--color-primary)] text-xs font-bold rounded-full">
              🌿 탄소중립 실천자
            </span>
          </div>

          {/* Nav Menu */}
          <nav className="bg-white border border-line-normal rounded-[16px] overflow-hidden">
            {MENU.map(item => {
              const active = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-5 py-4 text-sm border-b border-line-neutral last:border-0 transition-colors ${
                    active
                      ? 'text-[var(--color-primary)] font-medium border-l-2 border-l-[var(--color-primary)] bg-[var(--color-primary-subtle)]'
                      : 'text-slate-600 hover:bg-fill-normal border-l-2 border-l-transparent'
                  }`}
                >
                  <span>{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-grow min-w-0 space-y-6">
        {children}
      </main>
    </div>
  );
}
