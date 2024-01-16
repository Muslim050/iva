import React from 'react'
import style from './OrderChartTable.module.scss'
import { ReactComponent as Linkk } from 'src/assets/link.svg'
import FormatterView from 'src/components/UI/formatter/FormatterView'
import FormatterBudjet from 'src/components/UI/formatter/FormatterBudjet'
import { ReactComponent as Arrow } from 'src/assets/Table/arrow.svg'

function OrderChartData({ statistic, index, handleRowClick, isExpanded }) {
  return (
    <>
      <td className={style.table_td}>{index + 1}</td>
      <td className={style.table_td}>{statistic.channel_name}</td>

      <td
        style={{ display: 'inline-block', width: '100%' }}
        className={style.table_td}
      >
        <a
          target="_blank"
          href={statistic.video_link}
          className={style.linkWrapper__file}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          rel="noreferrer"
        >
          {statistic.video_name}
          <Linkk className={style.linkk__svg} />
        </a>
      </td>

      <td className={style.table_td}>
        {(statistic.order_format === 'preroll' && 'Pre-roll') ||
          ('mixroll' && 'Mix-roll')}
      </td>

      <td className={style.table_td}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginLeft: '7px',
            marginRight: '10px',
            width: '100%',
            lineHeight: '9px',
          }}
        >
          <div>
            <div>{statistic.publication_date.split('T')[0]}</div>
            <br />
            <div>
              {new Date(statistic.publication_date).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </div>
          </div>
        </div>
        {/* {new Date(statistic.publication_date)
          .toLocaleDateString("en-GB")
          .replace(/\//g, ".")} */}
      </td>
      <td className={style.table_td}>
        {(statistic.status === 'in_use' && 'Активный') ||
          (statistic.status === 'inactive' && 'Завершен')}
      </td>

      <td className={style.table_td}>
        <FormatterView data={statistic.online_view_count} />
      </td>

      <td className={style.table_td}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {statistic.budget === 0 ? (
            <div
              style={{
                fontSize: '13px',
                lineHeight: '15px',
                color: '#fa8a00',
              }}
            >
              Введется <br /> аналитика
            </div>
          ) : (
            <>
              <FormatterBudjet
                budget={statistic.budget}
                data={statistic.publication_date}
              />
            </>
          )}
        </div>
      </td>
      <td style={{ display: 'inline-block' }} className={style.table_td}>
        <button
          className={style.dopBtn}
          onClick={() => handleRowClick(statistic.video_link)}
        >
          Показать
          <span className={style.arrow}>
            <Arrow
              className={`${style.arrow__icon} ${
                isExpanded ? style.arrow__rotate : ''
              }`}
            />
          </span>
        </button>
      </td>
    </>
  )
}

export default OrderChartData
