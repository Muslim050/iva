import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { ReactComponent as Home } from '../../../assets/Sidebar/Home.svg'
import getTitle from './RouteItems'
import style from './SubHeader.module.scss'

function Breadcrumbs({ title, route, id }) {
  const routes = route.slice(0, -1)

  const user = localStorage.getItem('role')
  const transformedTitle = getTitle(title, id)

  return (
    <div className={style.breadcrumbs}>
      <div className={style.breadcrumbs__wrapper}>
        <div className={style.breadcrumbs__link}>
          <Home className={style.breadcrumbs__link__icon} />
        </div>
        {routes.map((el) => {
          const transformedTitle = getTitle(el)
          return (
            <div className={style.breadcrumbs__link}>
              <div>/ &nbsp; {transformedTitle} &nbsp;</div>
            </div>
          )
        })}
        <div>/ &nbsp; {transformedTitle}</div>
      </div>
      <div style={{ fontSize: '14px' }}>
        Роль: &nbsp;
        {(user === 'admin' && 'Менеджер') ||
          (user === 'channel' && 'Канал') ||
          (user === 'advertiser' && 'Рекламодатель') ||
          (user === 'publisher' && 'Паблишер') ||
          (user === 'advertising_agency' && 'Рекламное агентство')}
      </div>
    </div>
  )
}

export default Breadcrumbs
