import React from 'react'
import style from './AdvChartTable.module.scss'
import TheadGender from './components/TheadAgeGeoGender/TheadGender'
import TheadAge from './components/TheadAgeGeoGender/TheadAge'
import TheadGeo from './components/TheadAgeGeoGender/TheadGeo'

const headers = [
  { key: 'index', label: '№' },
  { key: 'channel_name', label: 'Канал' },
  { key: 'video_name', label: 'Название видео' },
  { key: 'order_format', label: 'Формат' },
  { key: 'publication_date', label: 'Начало' },
  { key: 'publication_date', label: 'Конец' },
  { key: 'online_view_count', label: 'Показы' },
  { key: 'budget', label: 'Бюджет' },
]

function OrderChartRow({ statistic }) {
  return (
    <>
      <tr>
        {headers.map((header) => {
          return (
            <td key={header.key} className={style.tableCell}>
              {header.label}
            </td>
          )
        })}
        <td
          className={style.tableCell}
          style={{
            padding: '0px',
            background: 'rgba(85, 112, 242, 0.39)',
            borderRadius: '12px 0px 0px 12px',
          }}
        >
          <td
            style={{
              padding: '6px',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              borderBottom: '1px solid #f3f3f3',
              alignItems: 'center',
              fontWeight: '600',
              color: '#6e7079',
            }}
          >
            Пол
          </td>
          <TheadGender statistic={statistic} />
        </td>
        <td
          className={style.tableCell}
          style={{
            padding: '0px',
            borderLeft: '1px solid #ddd',
            background: 'rgba(85, 112, 242, 0.39)',
          }}
        >
          <td
            style={{
              padding: '6px ',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              borderBottom: '1px solid #f3f3f3',
              alignItems: 'center',
              borderRadius: '0px 0px 0px 0px',
              fontWeight: '600',
              color: '#6e7079',
            }}
          >
            Возраст
          </td>
          <TheadAge statistic={statistic} />
        </td>

        <td
          className={style.tableCell}
          style={{
            padding: '0px',
            borderLeft: '1px solid #ddd',
            background: 'rgba(85, 112, 242, 0.39)',
            borderRadius: '0px 12px 12px 0px',
          }}
        >
          <td
            style={{
              padding: '6px ',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              borderBottom: '1px solid #f3f3f3',
              alignItems: 'center',
              // borderRadius: "0px 12px 0px 0px",
              fontWeight: '600',
              color: '#6e7079',
            }}
          >
            Гео
          </td>
          <TheadGeo statistic={statistic} />
        </td>
      </tr>
    </>
  )
}

export default OrderChartRow
