/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
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

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LivingLabIntro />} />
          <Route path="openlab" element={<OpenLabIntro />} />
          <Route path="openlab/announcements" element={<OpenLabAnnouncements />} />
          <Route path="openlab/suggestion" element={<OpenLabSuggestion />} />
          <Route path="openlab/support" element={<OpenLabSupport />} />
          <Route path="citizen-edu" element={<CitizenEducationIntro />} />
          <Route path="citizen-edu/announcements" element={<CitizenEducationAnnouncements />} />
          <Route path="data/list" element={<DataSearchList />} />
          <Route path="data/list/detail" element={<DataDetail />} />
          <Route path="data/list/download" element={<DataDownloadRequest />} />
          <Route path="data/list/request" element={<NewDataRequest />} />
          <Route path="data/list/guide" element={<DataUsageGuide />} />
          <Route path="carbon/neutral" element={<CarbonNeutralStatus />} />
          <Route path="carbon/reduction" element={<CarbonReductionStatus />} />
          <Route path="carbon/insights" element={<CarbonInsights />} />
          <Route path="carbon/indicators" element={<CarbonIndicators />} />
          <Route path="smart-city/indicators" element={<SmartCityIndicators />} />
          <Route path="smart-city/map/cctv" element={<SmartCityMapCCTV />} />
          <Route path="smart-city/map/safety" element={<SmartCityMapSafety />} />
          <Route path="smart-city/map/convenience" element={<SmartCityMapConvenience />} />
          <Route path="mypage/applications" element={<MyApplications />} />
          <Route path="mypage/data-requests" element={<MyDataRequests />} />
          <Route path="mypage/interests" element={<MyInterests />} />
          <Route path="mypage/account" element={<MyAccount />} />
          <Route path="announcements" element={<LivingLabAnnouncements />} />
          <Route path="suggestion" element={<LivingLabSuggestion />} />
          <Route path="notice" element={<NoticeList />} />
          <Route path="intro/site" element={<SiteIntro />} />
          <Route path="intro/business" element={<BusinessIntro />} />
          <Route path="intro/etc" element={<EtcIntro />} />
          {/* Add more routes here as needed */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
