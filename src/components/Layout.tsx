import { useState, ReactNode, useRef, useEffect } from 'react';
import { 
  Home, 
  User, 
  Bell, 
  ChevronRight, 
  Menu,
  X,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { NAVIGATION_MENU, NavItem } from '../constants/navigation';

export default function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFullMenuOpen, setIsFullMenuOpen] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);

  // Helper to determine active menu
  const isActive = (path: string) => location.pathname === path;

  // Close full menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsFullMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close account dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (accountRef.current && !accountRef.current.contains(event.target as Node)) {
        setIsAccountDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Helper to check if a section (Living Lab, Open Lab, etc.) is active
  const isSectionActive = (section: NavItem) => {
    if (isActive(section.path)) return true;
    if (section.children?.some(child => isActive(child.path))) return true;
    // Check deep children
    return section.children?.some(child => child.children?.some(subChild => isActive(subChild.path)));
  };

  // Find current 1Depth menu for sidebar
  const current1Depth = NAVIGATION_MENU.find(menu => {
    if (location.pathname !== '/' && location.pathname.startsWith(menu.path) && menu.path !== '/') return true;
    return menu.children?.some(child => isSectionActive(child));
  }) || NAVIGATION_MENU.find(menu => menu.title === '데이터');

  // Dynamic Breadcrumb Logic
  const getBreadcrumb = () => {
    const breadcrumbs: string[] = [];
    
    // Helper to find path in menu tree
    const findInMenu = (items: NavItem[], targetPath: string, currentBreadcrumbs: string[]): boolean => {
      for (const item of items) {
        // Check if this item or any of its descendants match the path
        const isExactMatch = item.path === targetPath;
        
        const hasMatchingDescendant = (node: NavItem): boolean => {
          if (node.path === targetPath) return true;
          return node.children?.some(child => hasMatchingDescendant(child)) || false;
        };

        if (isExactMatch || hasMatchingDescendant(item)) {
          currentBreadcrumbs.push(item.title);
          if (item.children) {
            // Continue searching in children to find the most specific match
            findInMenu(item.children, targetPath, currentBreadcrumbs);
          }
          return true;
        }
      }
      return false;
    };

    findInMenu(NAVIGATION_MENU, location.pathname, breadcrumbs);

    // Fallback for specific paths not directly in menu or root
    if (breadcrumbs.length === 0) {
      if (location.pathname === '/') return ['리빙랩', '리빙랩 소개/일정'];
      return ['알림마당', '공지사항'];
    }

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumb();

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800">
      {/* GNB (Global Navigation Bar) */}
      <header 
        ref={menuRef}
        className="sticky top-0 z-50 bg-white border-b border-line-neutral shadow-sm"
        onMouseEnter={() => setIsFullMenuOpen(true)}
        onMouseLeave={() => setIsFullMenuOpen(false)}
      >
        <div className="max-w-[1560px] mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl">
              E
            </div>
            <div className="flex flex-col">
              <span className="text-primary font-bold text-sm sm:text-base leading-tight">광명시 통합플랫폼</span>
              <span className="text-primary font-black text-lg sm:text-xl leading-none tracking-tighter">ECOVIEW</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center h-full ml-auto mr-auto -translate-x-5">
            <ul className="grid grid-cols-6 h-full w-[1080px]">
              {NAVIGATION_MENU.map((menu) => {
                const isMenuOpen = current1Depth?.title === menu.title;
                return (
                  <li 
                    key={menu.title} 
                    className="h-full flex items-center justify-center"
                    onMouseEnter={() => setHoveredMenu(menu.title)}
                  >
                    <Link 
                      to={menu.path} 
                      className={`text-sm xl:text-[17px] font-bold h-full flex items-center px-2 hover:text-primary transition-colors relative group ${isMenuOpen ? 'text-primary' : 'text-gray-700'}`}
                    >
                      {menu.title}
                      {isMenuOpen && (
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* User Info & Mobile Menu Toggle */}
          <div className="flex items-center gap-3 sm:gap-6">
            <div className="hidden sm:flex items-center gap-4">
              <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors relative">
                <Bell size={20} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
              <div
                ref={accountRef}
                className="relative"
                onMouseEnter={() => setIsAccountDropdownOpen(true)}
                onMouseLeave={() => setIsAccountDropdownOpen(false)}
              >
                <Link
                  to="/my/applications"
                  className="flex items-center gap-2 text-gray-700 hover:text-primary transition-colors"
                >
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <User size={18} />
                  </div>
                  <span className="text-sm font-medium">홍길동</span>
                </Link>

                {isAccountDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-[220px] bg-[var(--color-bg-elevated)] border border-line-normal rounded-lg shadow-md z-50">
                    {/* Profile */}
                    <div className="px-4 py-3">
                      <p className="text-sm font-bold text-slate-900">홍길동</p>
                      <p className="text-xs text-slate-400 mt-0.5">citizen@gwangmyeong.kr</p>
                      <span className="inline-block mt-2 px-2 py-0.5 bg-[var(--color-primary-subtle)] text-[var(--color-primary)] text-[10px] font-bold rounded">
                        🌿 탄소중립 실천자
                      </span>
                    </div>
                    <div className="border-t border-line-normal" />
                    {/* Menu items */}
                    <div className="py-1">
                      {[
                        { icon: '📑', title: '사업신청내역', path: '/my/applications' },
                        { icon: '💾', title: '데이터 신청내역', path: '/my/data' },
                        { icon: '⭐', title: '관심사업 관리', path: '/my/interests' },
                        { icon: '👤', title: '계정 및 정보관리', path: '/my/account' },
                      ].map(item => (
                        <Link
                          key={item.path}
                          to={item.path}
                          className={`flex items-center gap-2 px-4 py-2 text-sm hover:bg-fill-normal transition-colors ${
                            isActive(item.path) ? 'text-primary font-medium' : 'text-slate-700'
                          }`}
                        >
                          <span>{item.icon}</span>
                          {item.title}
                        </Link>
                      ))}
                    </div>
                    <div className="border-t border-line-normal" />
                    {/* Logout */}
                    <div className="py-1">
                      <Link
                        to="/"
                        className="flex items-center px-4 py-2 text-sm text-slate-500 hover:bg-fill-normal transition-colors"
                      >
                        로그아웃
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <button 
              className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Full-down Menu (Mega Menu) */}
        <AnimatePresence>
          {isFullMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="absolute top-full left-0 right-0 bg-white border-t border-line-normal shadow-2xl overflow-hidden hidden lg:block"
              onMouseLeave={() => setHoveredMenu(null)}
            >
              <div className="flex justify-center">
                <div className="w-[1080px] grid grid-cols-6 border-x border-line-normal bg-white">
                  {NAVIGATION_MENU.map((menu) => {
                    const isHovered = hoveredMenu === menu.title;
                    return (
                      <div
                        key={menu.title}
                        className={`py-10 px-5 flex flex-col transition-colors duration-200 border-r border-line-normal last:border-r-0 min-h-[280px] ${
                          isHovered ? 'bg-primary' : 'bg-white'
                        }`}
                        onMouseEnter={() => setHoveredMenu(menu.title)}
                      >
                        <div className="w-full space-y-0.5">
                          {menu.children?.map((child) => {
                            const hasSubChildren = !!(child.children && child.children.length > 0);
                            if (hasSubChildren) {
                              return (
                                <div key={child.title} className="pt-3 first:pt-0">
                                  <p className={`text-[12px] font-black mb-1.5 uppercase tracking-wide ${isHovered ? 'text-white/60' : 'text-slate-900'}`}>
                                    {child.title}
                                  </p>
                                  <div className="space-y-1">
                                    {child.children?.map((sub) => (
                                      <Link
                                        key={sub.title}
                                        to={sub.path}
                                        className={`block text-[13px] transition-all hover:underline underline-offset-4 ${
                                          isHovered
                                            ? 'text-white'
                                            : isActive(sub.path)
                                              ? 'text-primary font-bold'
                                              : 'text-gray-600 hover:text-primary'
                                        }`}
                                      >
                                        {sub.title}
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              );
                            }
                            return (
                              <Link
                                key={child.title}
                                to={child.path}
                                className={`block text-[13px] transition-all hover:underline underline-offset-4 py-0.5 ${
                                  isHovered
                                    ? 'text-white'
                                    : isActive(child.path)
                                      ? 'text-primary font-bold'
                                      : 'text-gray-600 hover:text-primary'
                                }`}
                              >
                                {child.title}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed inset-0 z-[60] bg-white flex flex-col"
            >
              <div className="h-16 flex items-center justify-between px-4 border-b border-line-neutral">
                <Link to="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold">E</div>
                  <span className="text-primary font-bold text-sm">ECOVIEW</span>
                </Link>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2"><X size={24} /></button>
              </div>
              <div className="flex-grow overflow-y-auto p-4 space-y-6">
                {NAVIGATION_MENU.map((menu) => (
                  <div key={menu.title} className="space-y-3">
                    <h4 className="text-lg font-bold text-primary border-b border-line-neutral pb-2">{menu.title}</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {menu.children?.map((child) => (
                        <Link 
                          key={child.title} 
                          to={child.path} 
                          className="text-sm text-gray-600 py-1"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {child.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-6 bg-gray-50 border-t border-line-normal">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center"><User size={20} /></div>
                    <span className="font-semibold text-gray-900">홍길동님</span>
                  </div>
                  <button className="text-sm text-gray-500 underline">로그아웃</button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Breadcrumb */}
      <div className="bg-primary text-white py-2 sm:py-3">
        <div className="max-w-[1560px] mx-auto px-4 sm:px-6 flex items-center gap-2 text-xs sm:text-sm font-medium overflow-x-auto whitespace-nowrap scrollbar-hide">
          <Home size={14} className="flex-shrink-0" />
          {breadcrumbs.map((label, index) => (
            <div key={index} className="flex items-center gap-2">
              <ChevronRight size={14} className="opacity-60 flex-shrink-0" />
              <span className={index === breadcrumbs.length - 1 ? 'font-bold' : ''}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className={`flex-grow flex flex-col ${
        location.pathname.startsWith('/map/')
          ? 'w-full'
          : location.pathname.startsWith('/my/')
            ? 'max-w-[1560px] mx-auto w-full px-4 sm:px-6 py-8 sm:py-12'
            : 'max-w-[1560px] mx-auto w-full px-4 sm:px-6 py-8 sm:py-12 lg:flex-row gap-8 sm:gap-12'
      }`}>
        {/* Sidebar (LNB) */}
        {!location.pathname.startsWith('/map/') && !location.pathname.startsWith('/my/') && (
          <aside className="lg:w-[240px] flex-shrink-0">
            <div className="sticky top-28">
              <div className="mb-10">
                <h2 className="text-[32px] font-bold text-gray-900 mb-4">
                  {current1Depth?.title}
                </h2>
                <div className="h-[2px] bg-primary w-full" />
              </div>
              
              <nav className="flex flex-col">
                {current1Depth?.children?.map((section) => {
                  const hasSubChildren = !!(section.children && section.children.length > 0);
                  const active = isSectionActive(section);

                  if (hasSubChildren) {
                    return (
                      <div key={section.title} className="py-8 first:pt-0 border-b border-line-neutral last:border-0">
                        <Link
                          to={section.path}
                          className={`block text-base font-bold mb-6 hover:opacity-80 transition-opacity ${
                            active ? 'text-primary' : 'text-gray-900'
                          }`}
                        >
                          {section.title}
                        </Link>
                        <ul className="space-y-4">
                          {section.children?.map((item) => {
                            const isItemActive = isActive(item.path);
                            return (
                              <li key={item.title}>
                                <Link
                                  to={item.path}
                                  className={`block text-sm transition-colors ${
                                    isItemActive
                                      ? 'text-primary font-medium'
                                      : 'text-label-alternative hover:text-primary'
                                  }`}
                                >
                                  - {item.title}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    );
                  }

                  return (
                    <div key={section.title} className="py-3 border-b border-line-neutral last:border-0">
                      <Link
                        to={section.path}
                        className={`block text-sm transition-colors ${
                          isActive(section.path)
                            ? 'text-primary font-medium'
                            : 'text-label-alternative hover:text-primary'
                        }`}
                      >
                        - {section.title}
                      </Link>
                    </div>
                  );
                })}
              </nav>
            </div>
          </aside>
        )}

        {/* Dynamic Content */}
        <main className="flex-grow min-w-0">
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-line-normal py-10 sm:py-16">
        <div className="max-w-[1560px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-3 grayscale opacity-70">
              <div className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center text-white font-bold text-xl">
                G
              </div>
              <span className="text-xl font-bold text-gray-600 tracking-tighter">광명시</span>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm text-gray-500 mb-2">우)14234 경기도 광명시 시청로 20 | 광명시 민원콜센터: 1688-3399 (02-2680-2114)</p>
              <p className="text-xs text-gray-400 uppercase tracking-wider">COPYRIGHT(C) 2022 GWANGMYEONG CITY. ALL RIGHTS RESERVED.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
