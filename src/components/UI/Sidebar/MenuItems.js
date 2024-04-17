import { ReactComponent as Confirm } from '../../../assets/Sidebar/confirmedorder.svg'
import { ReactComponent as Order } from '../../../assets/Sidebar/order.svg'
import { ReactComponent as Inventory } from '../../../assets/Sidebar/inventory.svg'
import { ReactComponent as Pablisher } from '../../../assets/Sidebar/pablisher.svg'
import { ReactComponent as Advertiser } from '../../../assets/Sidebar/advertiser.svg'
import { ReactComponent as Channel } from '../../../assets/Sidebar/channel.svg'
import { ReactComponent as AdvertiserAgency } from '../../../assets/Sidebar/advertiseragency.svg'
import { ReactComponent as Video } from '../../../assets/Sidebar/video.svg'
import { ReactComponent as Wallet } from '../../../assets/Sidebar/Wallet.svg'
import { ReactComponent as PublisherReport } from '../../../assets/Sidebar/publisherReport.svg'

export const menuItems = [
  {
    roles: ['admin'],
    label: 'Revenue',
    to: '/revenue',
    icon: <Wallet />,
  },
  {
    roles: ['advertising_agency', 'advertiser', 'admin'],
    label: 'Заказы',
    to: '/order',
    icon: <Order />,
  },
  {
    roles: ['channel', 'publisher'],
    label: 'Заказы',
    to: '/confirmed-order',
    icon: <Confirm />,
  },
  {
    roles: ['publisher', 'admin'],
    label: 'Отчет',
    to: '/publisher-report',
    icon: <PublisherReport />,
  },
  {
    roles: ['channel', 'publisher', 'admin'],
    label: 'Инвентарь',
    to: '/inventory',
    icon: <Inventory />,
  },
  {
    roles: ['channel', 'publisher', 'admin'],
    label: 'Видео',
    to: '/video',
    icon: <Video />,
  },

  {
    roles: ['channel', 'publisher', 'admin'],
    label: 'Каналы',
    to: '/channel',
    icon: <Channel />,
  },
  {
    roles: ['publisher', 'admin'],
    label: 'Паблишеры',
    to: '/publisher',
    icon: <Pablisher />,
  },
  {
    roles: ['admin', 'advertising_agency'],
    label: 'Рекламодатели',
    to: '/advertiser',
    icon: <Advertiser />,
  },
  {
    roles: ['admin'],
    label: 'Агентства',
    to: '/advertiser-agency',
    icon: <AdvertiserAgency />,
  },
]
