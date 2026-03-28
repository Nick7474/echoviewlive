/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import LivingLabIntro from './pages/LivingLabIntro';
import OpenLabIntro from './pages/OpenLabIntro';
import LivingLabAnnouncements from './pages/LivingLabAnnouncements';
import LivingLabSuggestion from './pages/LivingLabSuggestion';
import OpenLabAnnouncements from './pages/OpenLabAnnouncements';
import OpenLabSuggestion from './pages/OpenLabSuggestion';
import OpenLabSupport from './pages/OpenLabSupport';
import CitizenEducationIntro from './pages/CitizenEducationIntro';
import CitizenEducationAnnouncements from './pages/CitizenEducationAnnouncements';
import DataSearchList from './pages/DataSearchList';
import DataDetail from './pages/DataDetail';
import DataDownloadRequest from './pages/DataDownloadRequest';
import NewDataRequest from './pages/NewDataRequest';
import DataUsageGuide from './pages/DataUsageGuide';
import NoticeList from './pages/NoticeList';
import CarbonNeutralStatus from './pages/CarbonNeutralStatus';
import CarbonReductionStatus from './pages/CarbonReductionStatus';
import CarbonInsights from './pages/CarbonInsights';
import CarbonIndicators from './pages/CarbonIndicators';
import SmartCityIndicators from './pages/SmartCityIndicators';
import MyApplications from './pages/MyApplications';
import MyDataRequests from './pages/MyDataRequests';
import MyInterests from './pages/MyInterests';
import MyAccount from './pages/MyAccount';
import SmartCityMapCCTV from './pages/SmartCityMapCCTV';
import SmartCityMapSafety from './pages/SmartCityMapSafety';
import SmartCityMapConvenience from './pages/SmartCityMapConvenience';
import SiteIntro from './pages/SiteIntro';
import BusinessIntro from './pages/BusinessIntro';
import EtcIntro from './pages/EtcIntro';
import SiteGuide from './pages/SiteGuide';
import RelatedSites from './pages/RelatedSites';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* 시민참여 */}
          <Route index element={<LivingLabIntro />} />
          <Route path="citizen/lab/intro" element={<LivingLabIntro />} />
          <Route path="citizen/lab/announcements" element={<LivingLabAnnouncements />} />
          <Route path="citizen/lab/suggestion" element={<LivingLabSuggestion />} />
          <Route path="citizen/openlab/intro" element={<OpenLabIntro />} />
          <Route path="citizen/openlab/announcements" element={<OpenLabAnnouncements />} />
          <Route path="citizen/openlab/suggestion" element={<OpenLabSuggestion />} />
          <Route path="citizen/openlab/support" element={<OpenLabSupport />} />
          <Route path="citizen/education/intro" element={<CitizenEducationIntro />} />
          <Route path="citizen/education/announcements" element={<CitizenEducationAnnouncements />} />
          {/* 데이터 */}
          <Route path="data/list" element={<DataSearchList />} />
          <Route path="data/detail" element={<DataDetail />} />
          <Route path="data/download" element={<DataDownloadRequest />} />
          <Route path="data/new-request" element={<NewDataRequest />} />
          <Route path="data/guide" element={<DataUsageGuide />} />
          {/* 탄소중립 스마트도시 */}
          <Route path="carbon/status" element={<CarbonNeutralStatus />} />
          <Route path="carbon/reduction" element={<CarbonReductionStatus />} />
          <Route path="carbon/insights" element={<CarbonInsights />} />
          {/* 도시지표 */}
          <Route path="indicators/carbon" element={<CarbonIndicators />} />
          <Route path="indicators/smart" element={<SmartCityIndicators />} />
          {/* 스마트 시티맵 */}
          <Route path="map/cctv" element={<SmartCityMapCCTV />} />
          <Route path="map/safety" element={<SmartCityMapSafety />} />
          <Route path="map/convenience" element={<SmartCityMapConvenience />} />
          {/* 이용안내 */}
          <Route path="intro/site" element={<SiteIntro />} />
          <Route path="intro/business" element={<BusinessIntro />} />
          <Route path="notice" element={<NoticeList />} />
          <Route path="guide" element={<SiteGuide />} />
          <Route path="related-sites" element={<RelatedSites />} />
          {/* 마이페이지 */}
          <Route path="my/applications" element={<MyApplications />} />
          <Route path="my/data" element={<MyDataRequests />} />
          <Route path="my/interests" element={<MyInterests />} />
          <Route path="my/account" element={<MyAccount />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
