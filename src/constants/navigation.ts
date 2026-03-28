export interface NavItem {
  title: string;
  path: string;
  children?: NavItem[];
}

export const NAVIGATION_MENU: NavItem[] = [
  {
    title: '시민참여',
    path: '/citizen/lab/intro',
    children: [
      {
        title: '리빙랩',
        path: '/citizen/lab/intro',
        children: [
          { title: '리빙랩 소개/일정', path: '/citizen/lab/intro' },
          { title: '공고 목록/신청', path: '/citizen/lab/announcements' },
          { title: '리빙랩 주제 제안', path: '/citizen/lab/suggestion' },
        ],
      },
      {
        title: '오픈랩',
        path: '/citizen/openlab/intro',
        children: [
          { title: '오픈랩 소개/일정', path: '/citizen/openlab/intro' },
          { title: '공고 목록/신청', path: '/citizen/openlab/announcements' },
          { title: '오픈랩 주제 제안', path: '/citizen/openlab/suggestion' },
          { title: '취창업 지원', path: '/citizen/openlab/support' },
        ],
      },
      {
        title: '시티즌교육',
        path: '/citizen/education/intro',
        children: [
          { title: '소개/일정', path: '/citizen/education/intro' },
          { title: '공고 목록/신청', path: '/citizen/education/announcements' },
        ],
      },
    ],
  },
  {
    title: '데이터',
    path: '/data/list',
    children: [
      {
        title: '데이터 목록',
        path: '/data/list',
        children: [
          { title: '데이터 검색/조회', path: '/data/list' },
          { title: '데이터 상세 정보', path: '/data/detail' },
          { title: '데이터 다운로드/API 활용 신청', path: '/data/download' },
        ],
      },
      { title: '신규 데이터 신청', path: '/data/new-request' },
      { title: '데이터 활용 가이드', path: '/data/guide' },
    ],
  },
  {
    title: '탄소중립 스마트도시',
    path: '/carbon/status',
    children: [
      { title: '실시간 탄소중립 현황', path: '/carbon/status' },
      { title: '탄소감축 현황', path: '/carbon/reduction' },
      { title: '탄소중립 인사이트', path: '/carbon/insights' },
    ],
  },
  {
    title: '도시지표',
    path: '/indicators/carbon',
    children: [
      { title: '탄소지표', path: '/indicators/carbon' },
      { title: '스마트도시 지표', path: '/indicators/smart' },
    ],
  },
  {
    title: '스마트 시티맵',
    path: '/map/cctv',
    children: [
      { title: 'CCTV', path: '/map/cctv' },
      { title: '안전 시설', path: '/map/safety' },
      { title: '편의 시설', path: '/map/convenience' },
    ],
  },
  {
    title: '이용안내',
    path: '/intro/site',
    children: [
      { title: '사이트 소개', path: '/intro/site' },
      { title: '사업 소개', path: '/intro/business' },
      { title: '공지사항', path: '/notice' },
      { title: '이용안내', path: '/guide' },
      { title: '기타 홈페이지', path: '/related-sites' },
    ],
  },
];
