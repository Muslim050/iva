import React from 'react'
import style from './OrderChartTable.module.scss'

const headers = [
  { key: 'index', label: '№' },
  { key: 'channel_name', label: 'Канал' },
  { key: 'video_name', label: 'Название видео' },
  { key: 'order_format', label: 'Формат' },
  { key: 'publication_date', label: 'Начало' },
  { key: 'status', label: 'Статус' },
  { key: 'online_view_count', label: 'Показы' },
  { key: 'budget', label: 'Бюджет' },
  { key: 'analiz_budget', label: 'Анализ аудитории' },
]

function OrderChartRow({ sortOrder, handleSort }) {
  const rotateStyle = {
    transform: sortOrder === 'asc' ? 'rotate(180deg) ' : 'rotate(0deg)',
    transition: 'transform 0.3s ease',
    color: sortOrder === 'asc' ? '#717377 ' : '#5670f1',
  }
  return (
    <>
      <tr>
        {headers.map((row) => {
          if (row.key === 'publication_date') {
            return (
              <th
                key={row.key}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  height: 'auto',
                  gap: '5px',
                  height: '54px',
                }}
                className={style.tableChart__th}
              >
                {row.label}
                <button
                  onClick={handleSort}
                  style={{ background: 'transparent' }}
                >
                  <svg
                    width="24px"
                    height="24px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={rotateStyle}
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <g id="SVGRepo_iconCarrier">
                      <path
                        d="M7 3V21M7 3L11 7M7 3L3 7M14 3H15M14 9H17M14 15H19M14 21H21"
                        stroke="#000000"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                  </svg>
                </button>
              </th>
            )
          }
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
