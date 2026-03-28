export interface NavItem {
  title: string;
  path: string;
  children?: NavItem[];
}

export const NAVIGATION_MENU: NavItem[] = [
  {
    title: '홈',
    path: '/',
    children: [
      { title: '광명시 데이터 일반 현황', path: '/' },
      { title: '주요 메뉴 게시글 바로가기', path: '/' },
    ],
  },
  {
    title: '시민참여',
    path: '/',
    children: [
      {
        title: '리빙랩',
        path: '/',
        children: [
          { title: '리빙랩 소개/일정', path: '/' },
          { title: '공고 목록/신청', path: '/announcements' },
          { title: '리빙랩 주제 제안', path: '/suggestion' },
        ],
      },
      {
        title: '오픈랩',
        path: '/openlab',
        children: [
          { title: '오픈랩 소개/일정', path: '/openlab' },
          { title: '공고 목록/신청', path: '/openlab/announcements' },
          { title: '오픈랩 주제 제안', path: '/openlab/suggestion' },
          { title: '취창업 지원', path: '/openlab/support' },
        ],
      },
      {
        title: '시티즌 교육',
        path: '/citizen-edu',
        children: [
          { title: '시티즌 교육 소개/일정', path: '/citizen-edu' },
          { title: '공고 목록/신청', path: '/citizen-edu/announcements' },
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
          { title: '데이터 상세 정보', path: '/data/list/detail' },
          { title: '데이터 다운로드/API 활용 신청', path: '/data/list/download' },
        ],
      },
      { title: '신규 데이터 신청', path: '/data/list/request' },
      { title: '데이터 활용 가이드', path: '/data/list/guide' },
    ],
  },
  {
    title: '탄소중립 스마트도시',
    path: '/carbon/neutral',
    children: [
      {
        title: '탄소중립 현황',
        path: '/carbon/neutral',
        children: [
          { title: '실시간 탄소중립 현황', path: '/carbon/neutral' },
          { title: '탄소감축현황', path: '/carbon/reduction' },
          { title: '탄소중립인사이트', path: '/carbon/insights' },
        ]
      }
    ],
  },
  {
    title: '도시지표',
    path: '/carbon/indicators',
    children: [
      {
        title: '지표 서비스',
        path: '/carbon/indicators',
        children: [
          { title: '탄소지표', path: '/carbon/indicators' },
          { title: '스마트도시 지표', path: '/smart-city/indicators' },
        ]
      }
    ],
  },
  {
    title: '스마트 시티맵',
    path: '/smart-city/map/cctv',
    children: [
      {
        title: '시티맵 서비스',
        path: '/smart-city/map/cctv',
        children: [
          { title: 'CCTV', path: '/smart-city/map/cctv' },
          { title: '안전 시설', path: '/smart-city/map/safety' },
          { title: '편의 시설', path: '/smart-city/map/convenience' },
        ]
      }
    ],
  },
  {
    title: '이용안내',
    path: '/intro/site',
    children: [
      {
        title: '고객지원',
        path: '/intro/site',
        children: [
          { title: '사이트 소개', path: '/intro/site' },
          { title: '사업 소개', path: '/intro/business' },
          { title: '공지사항', path: '/notice' },
          { title: '이용안내', path: '/guide' },
          { title: '기타 홈페이지', path: '/related-sites' },
        ]
      }
    ],
  },
];
