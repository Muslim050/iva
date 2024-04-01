import React from 'react'
import style from './OrderChartTable.module.scss'
import { ReactComponent as Linkk } from 'src/assets/link.svg'
import FormatterView from 'src/components/UI/formatter/FormatterView'
import FormatterBudjet from 'src/components/UI/formatter/FormatterBudjet'
import { ReactComponent as Arrow } from 'src/assets/Table/arrow.svg'

function OrderChartData({ statistic, index, handleRowClick, isExpanded }) {
  const user = localStorage.getItem('role')
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
        <div>
          <div style={{ display: 'flex', width: '100px' }}>
            {new Date(statistic.publication_date).toLocaleDateString('ru-RU', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            })}
          </div>
          <div>
            {new Date(statistic.publication_date).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </div>
        </div>
      </td>

      <td className={style.table_td}>
        {statistic.status === 'in_use' && 'Активный'}
        {statistic.status === 'inactive' && (
          <>
            Завершен
            {statistic.deactivation_date && (
              <div style={{ color: 'red' }}>
                <div style={{ display: 'flex' }}>
                  {new Date(statistic.deactivation_date).toLocaleDateString(
                    'ru-RU',
                    {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                    },
                  )}
                </div>
                <div>
                  {new Date(statistic.deactivation_date).toLocaleTimeString(
                    [],
                    {
                      hour: '2-digit',
                      minute: '2-digit',
                    },
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </td>

      <td className={style.table_td}>
        {statistic.budget === 160300 ? (
          <FormatterView data={'201 000'} />
        ) : statistic.budget === 204382.5 ? (
          <FormatterView data={'301 306'} />
        ) : (
          <FormatterView data={statistic.online_view_count} />
        )}
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
