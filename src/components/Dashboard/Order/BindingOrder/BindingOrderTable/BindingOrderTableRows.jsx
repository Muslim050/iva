import React from 'react'
import { SortButton } from 'src/utils/SortButton'

const headers = [
  { key: 'id', label: '№' },
  { key: 'channel.name', label: 'Канал' },
  { key: 'video_content.name', label: 'Название Видео' },
  { key: 'format', label: 'Формат' },
  { key: 'start_at', label: 'Тайм код рекламы' },
  { key: 'expected_number_of_views', label: 'Прогноз показов' },

  { key: 'expected_promo_duration', label: 'Хрон ролика' },
  { key: 'link_to_video', label: 'Ссылка' },
  { key: 'category', label: 'Категория' },
  { key: 'publication_time', label: 'Время публикаций' },
  { key: 'online_views', label: 'Показы' },

  { key: 'status', label: 'Статусы' },
  { key: 'deistviaB', label: 'Действия' },
]

function BindingOrderTableRows({ getOrder, sort, sortKey, changeSort }) {
  const hasInactiveStatus = getOrder.some((item) => item.status === 'inactive')

  return (
    <>
      <tr>
        {headers.map((row) => {
          if (row.key === 'deistviaB' && hasInactiveStatus) {
            return null // Пропустить отображение столбца, если есть статус "inactive"
          }

          // Проверка для столбца "Показы онлайн"
          if (row.key === 'online_views') {
            // Проверка наличия ненулевых online_views в заказе
            const hasNonZeroOnlineViews = getOrder.some(
              (item) => item.online_views !== 0,
            )

            // Если есть ненулевые online_views, отобразить столбец
            if (!hasNonZeroOnlineViews) {
              return null // Пропустить отображение столбца, если все online_views равны 0
            }
          }

          return (
            <th key={row.key}>
              <SortButton
                row={row.label}
                columnKey={row.key}
                onClick={() => changeSort(row.key)}
                sort={sort}
                sortKey={sortKey}
              />
            </th>
          )
        })}
      </tr>
    </>
  )
}

export default BindingOrderTableRows
