import React from 'react'
import style from './AdvChartTable.module.scss'

const headers = [
  { key: 'index', label: '№' },
  { key: 'channel_name', label: 'Канал' },
  { key: 'video_name', label: 'Название видео' },
  { key: 'order_format', label: 'Формат' },
  { key: 'publication_date', label: 'Начало' },
  { key: 'publication_date', label: 'Конец' },
  { key: 'online_view_count', label: 'Показы' },
  { key: 'budget', label: 'Бюджет' },

  { key: 'gender', label: 'Пол' },
  { key: 'age', label: 'Возраст' },
  { key: 'geo', label: 'Гео' },

]

function OrderChartRow() {
  return (
    <>
      <tr>
        {headers.map((row) => {
          return (
            <th key={row.key} className={style.tableChart__th}>
              {row.label}
            </th>
          )
        })}

      </tr>
    </>
  )
}

export default OrderChartRow
