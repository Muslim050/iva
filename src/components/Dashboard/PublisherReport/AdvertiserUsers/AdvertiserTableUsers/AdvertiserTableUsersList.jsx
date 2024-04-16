import React from 'react'
import FormatterPhone from 'src/components/UI/formatter/FormatterPhone'
import style from './AdvertiserTableUsers.module.scss'

function AdvertiserTableUsersList({ sortedData }) {
  const user = localStorage.getItem('role')
  const [activeTooltip, setActiveTooltip] = React.useState(null)

  return (
    <>
      {sortedData().map((advertiseruser, i) => {
        return (
          <tr key={advertiseruser.id} className={style.table__tr}>
            <td>{advertiseruser.id}</td>
            <td
              className={style.table_td}
              style={{ position: 'relative' }}
              onMouseEnter={() => setActiveTooltip(i)}
              onMouseLeave={() => setActiveTooltip(null)}
            >
              {advertiseruser.username}{' '}
              {user === 'admin' && (
                <span
                  className={
                    activeTooltip === i ? style.tooltiptext : style.hidden
                  }
                >
                  ID:{advertiseruser.id}
                </span>
              )}
            </td>
            <td
              className={style.table_td}
              style={{ position: 'relative' }}
              onMouseEnter={() => setActiveTooltip(i)}
              onMouseLeave={() => setActiveTooltip(null)}
            >
              {advertiseruser.advertiser.name}
              {user === 'admin' && (
                <span
                  className={
                    activeTooltip === i ? style.tooltiptext : style.hidden
                  }
                >
                  ID: {advertiseruser.advertiser.id}
                </span>
              )}
            </td>
            <td> {advertiseruser.first_name}</td>
            <td> {advertiseruser.last_name}</td>
            <td> {advertiseruser.email}</td>
            <td> {advertiseruser.side === 'advertiser' && 'Рекламодатель'}</td>

            <td>
              <FormatterPhone phoneNumber={advertiseruser.phone_number} />
            </td>
          </tr>
        )
      })}
    </>
  )
}

export default AdvertiserTableUsersList
