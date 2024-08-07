import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Advertiser from './pages/Dashboard/Advertiser/AdvertiserPage/advertiser/advertiser'
import AdvertiserUsers from './pages/Dashboard/Advertiser/AdvertiserPage/advertiserUsers/advertiserUsers'
import Home from './pages/Home/Home'
import Inventory from './pages/Dashboard/Inventory/Inventory'
import Loginn from './pages/Login/Loginn'
import Video from './pages/Dashboard/video/video'
import Protected from './Protected'
import Order from './pages/Dashboard/Order/Order'
import Channel from './pages/Dashboard/ChannelPage/channel/channel'
import ChannelUsers from './pages/Dashboard/ChannelPage/channelUsers/channelUsers'
import OrderChart from './pages/Dashboard/OrderChart/OrderChart'
import AdvertiserAgency from './pages/Dashboard/Advertiser/AdvertiserAgencyPage/advertiserAgency/advertiserAgency'
import AdvertiserAgencyUsers
  from './pages/Dashboard/Advertiser/AdvertiserAgencyPage/advertiserAgencyUsers/advertiserAgencyUsers'
import PublisherUsers from './pages/Dashboard/Pablisher/publisherUsers/publisherUsers'
import Publisher from './pages/Dashboard/Pablisher/publishers/publishers'
import ChannelStatistics from './pages/Dashboard/ChannelStatistics/ChannelStatistics'
import NotFound from './pages/NotFound'
import Revenue from './pages/Dashboard/Revenue/Revenue'
import News from './components/Site/News/News'
import PublisherReport from './components/Dashboard/Reports/PublisherReport/PublisherReportTable'
import AdvertiserReport from "./components/Dashboard/Reports/AdvertiserReport/AdvertiserReportTable";
import SentOrder from "./components/Dashboard/SentOrder";

function App () {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Protected
              allowedRoles={[
                'admin',
                'advertising_agency',
                'advertiser',
                'publisher',
                'channel',
              ]}
            >
              <Home/>
            </Protected>
          }
        >
          <Route
            path="/order"
            index
            element={
              <Protected
                allowedRoles={['admin', 'advertising_agency', 'advertiser']}
              >
                <Order/>
              </Protected>
            }
          />
          <Route
            path="/sents-order"
            index
            element={
              <Protected allowedRoles={['publisher', 'channel']}>
                <SentOrder/>
              </Protected>
            }
          />

          <Route
            path="/inventory"
            element={
              <Protected allowedRoles={['channel', 'publisher', 'admin']}>
                <Inventory/>
              </Protected>
            }
          />
          <Route
            path="/revenue"
            element={
              <Protected allowedRoles={['admin']}>
                <Revenue/>
              </Protected>
            }
          />
          <Route
            path="/publisher"
            element={
              <Protected allowedRoles={['publisher', 'admin']}>
                <Publisher/>
              </Protected>
            }
          />
          <Route
            path="/publisher-users"
            element={
              <Protected allowedRoles={['publisher', 'admin']}>
                <PublisherUsers/>
              </Protected>
            }
          />
          <Route
            path="/video"
            element={
              <Protected allowedRoles={['channel', 'publisher', 'admin']}>
                <Video/>
              </Protected>
            }
          />
          <Route
            path="/advertiser"
            element={
              <Protected allowedRoles={['admin', 'advertising_agency']}>
                <Advertiser/>
              </Protected>
            }
          />
          <Route
            path="/advertiser-users"
            element={
              <Protected allowedRoles={['admin', 'advertising_agency']}>
                <AdvertiserUsers/>
              </Protected>
            }
          />

          <Route
            path="/advertiser-agency"
            element={
              <Protected allowedRoles={['admin']}>
                <AdvertiserAgency/>
              </Protected>
            }
          />

          <Route
            path="/advertiser-agency-users"
            element={
              <Protected allowedRoles={['admin']}>
                <AdvertiserAgencyUsers/>
              </Protected>
            }
          />
          <Route
            path="/channel"
            element={
              <Protected allowedRoles={['publisher', 'admin', 'channel']}>
                <Channel/>
              </Protected>
            }
          />
          <Route
            path="/channel-users"
            element={
              <Protected allowedRoles={['publisher', 'admin', 'channel']}>
                <ChannelUsers/>
              </Protected>
            }
          />

          <Route
            path="/chart-order-table/:id"
            element={
              <Protected
                allowedRoles={[
                  'publisher',
                  'admin',
                  'channel',
                  'advertising_agency',
                  'advertiser',
                ]}
              >
                <OrderChart/>
              </Protected>
            }
          />
          <Route
            path="/statistics-channel/:id"
            element={
              <Protected
                allowedRoles={[
                  'admin',
                  'advertising_agency',
                  'advertiser',
                  'publisher',
                  'channel',
                ]}
              >
                <ChannelStatistics/>
              </Protected>
            }
          />

          <Route
            path="/publisher-report"
            element={
              <Protected allowedRoles={['publisher', 'channel', 'admin']}>
                <PublisherReport/>
              </Protected>
            }
          />
          <Route
            path="/advertiser-report"
            element={
              <Protected allowedRoles={['advertiser', 'advertising_agency', 'admin']}>
                <AdvertiserReport/>
              </Protected>
            }
          />

          {/* Other routes */}
        </Route>
        <Route path="/login" element={<Loginn/>}/>
        <Route path="/news" element={<News/>}/>

        <Route path="*" element={<NotFound/>}/>

        {/* Login and NotFound routes */}
      </Routes>
    </>
  )
}

export default App
