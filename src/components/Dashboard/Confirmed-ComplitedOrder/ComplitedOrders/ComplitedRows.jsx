import React from 'react'
import { SortButton } from 'src/utils/SortButton'

const headers = [
  { key: 'id', label: '№' },
  { key: 'company', label: 'Кампания' },
  { key: 'format', label: 'Формат' },
  { key: 'name', label: 'Название видео' },
  { key: 'expected_end_date', label: 'Статус' },

  { key: 'action', label: 'Статус оплаты' },
]

function ComplitedRows({ sortKey, sort, changeSort }) {
  return (
    <>
      <tr>
        {headers.map((row) => {
          const user = localStorage.getItem('role')
          const showStatusColumn = user !== 'admin'
          if (row.key === 'is_connected' && !showStatusColumn) {
            return null
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

export default ComplitedRows
