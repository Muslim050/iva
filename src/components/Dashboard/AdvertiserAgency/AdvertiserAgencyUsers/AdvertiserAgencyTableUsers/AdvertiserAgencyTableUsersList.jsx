import React from 'react'
import FormatterPhone from 'src/components/UI/formatter/FormatterPhone'
import style from './AdvertiserAgencyTableUsers.module.scss'

function AdvertiserAgencyTableUsersList({ sortedData }) {
  const user = localStorage.getItem('role')
  const [activeTooltip, setActiveTooltip] = React.useState(null)

  return (
    <>
      {sortedData().map((advertiseruser, i) => (
        <>
          <tr>
            <td key={i}>{i + 1}</td>
            <td
              className={style.table_td}
              style={{ position: 'relative' }}
              onMouseEnter={() => setActiveTooltip(i)}
              onMouseLeave={() => setActiveTooltip(null)}
            >
              {advertiseruser.username}
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
              {advertiseruser.advertising_agency.name}
              {user === 'admin' && (
                <span
                  className={
                    activeTooltip === i ? style.tooltiptext : style.hidden
                  }
                >
                  ID:{advertiseruser.advertising_agency.id}
                </span>
              )}
            </td>
            <td>{advertiseruser.first_name}</td>
            <td>{advertiseruser.last_name}</td>
            <td>{advertiseruser.email}</td>
            <td>{advertiseruser.side}</td>
            <td>
              <FormatterPhone phoneNumber={advertiseruser.phone_number} />
            </td>
          </tr>
        </>
      ))}
    </>
  )
}

export default AdvertiserAgencyTableUsersList
