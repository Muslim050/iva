import {ReactComponent as Confirm} from '../../../assets/Sidebar/confirmedorder.svg'
import {ReactComponent as Order} from '../../../assets/Sidebar/order.svg'
import {ReactComponent as Inventory} from '../../../assets/Sidebar/inventory.svg'
import {ReactComponent as Pablisher} from '../../../assets/Sidebar/pablisher.svg'
import {ReactComponent as Advertiser} from '../../../assets/Sidebar/advertiser.svg'
import {ReactComponent as Channel} from '../../../assets/Sidebar/channel.svg'
import {ReactComponent as AdvertiserAgency} from '../../../assets/Sidebar/advertiseragency.svg'
import {ReactComponent as Video} from '../../../assets/Sidebar/video.svg'
import {ReactComponent as Wallet} from '../../../assets/Sidebar/Wallet.svg'
import {ReactComponent as PublisherReport} from '../../../assets/Sidebar/publisherReport.svg'
import {ReactComponent as AdvertiserReport} from '../../../assets/Sidebar/advreport.svg'

export const menuItems = [
  {
    roles: ['admin'],
    label: 'Revenue',
    to: '/revenue',
    icon: <Wallet/>,
  },
  {
    roles: ['advertising_agency', 'advertiser', 'admin'],
    label: 'Заказы',
    to: '/order',
    icon: <Order/>,
  },
  {
    roles: ['channel', 'publisher'],
    label: 'Заказы',
    to: '/confirmed-order',
    icon: <Confirm/>,
  },
  {
    roles: ['channel', 'publisher'],
    label: 'Заказы Паблишера',
    to: '/sents-order',
    icon: <svg width="64px" height="40px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="#000000">
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <path
          d="M6 8a.992.992 0 01.294-.707l2.999-3a1 1 0 111.414 1.414L9.414 7H15.5a2.5 2.5 0 000-5 1 1 0 110-2C17.981 0 20 2.018 20 4.5 20 6.981 17.981 9 15.5 9H9.414l1.293 1.293A.999.999 0 0110 12.002a.997.997 0 01-.706-.294l-3-3a.99.99 0 01-.217-.326A.992.992 0 016 8zM3 3v11h3.5c.775 0 1.388.662 1.926 1.244l.11.12c.366.391.886.636 1.464.636s1.098-.245 1.463-.637l.11-.119h.001C12.112 14.662 12.725 14 13.5 14H17v-2a1 1 0 112 0v5.5a1.5 1.5 0 01-1.5 1.5h-15A1.5 1.5 0 011 17.5v-15A1.5 1.5 0 012.5 1H7a1 1 0 010 2H3z"
          fill="#53545C"></path>
      </g>
    </svg>,
  },
  {
    roles: ['publisher', 'channel', 'admin'],
    label: 'Отчет-Паблишера',
    to: '/publisher-report',
    icon: <PublisherReport/>,
  },
  {
    roles: ['advertiser', 'advertising_agency', 'admin'],
    label: 'Отчет-Рекламодателя',
    to: '/advertiser-report',
    icon: <AdvertiserReport/>,
  },
  {
    roles: ['channel', 'publisher', 'admin'],
    label: 'Инвентарь',
    to: '/inventory',
    icon: <Inventory/>,
  },
  {
    roles: ['channel', 'publisher', 'admin'],
    label: 'Видео',
    to: '/video',
    icon: <Video/>,
  },

  {
    roles: ['channel', 'publisher', 'admin'],
    label: 'Каналы',
    to: '/channel',
    icon: <Channel/>,
  },
  {
    roles: ['publisher', 'admin'],
    label: 'Паблишеры',
    to: '/publisher',
    icon: <Pablisher/>,
  },
  {
    roles: ['admin', 'advertising_agency'],
    label: 'Рекламодатели',
    to: '/advertiser',
    icon: <Advertiser/>,
  },
  {
    roles: ['admin'],
    label: 'Агентства',
    to: '/advertiser-agency',
    icon: <AdvertiserAgency/>,
  },
]
