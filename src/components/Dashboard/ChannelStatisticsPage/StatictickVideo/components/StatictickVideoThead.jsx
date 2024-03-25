import React from 'react'
import style from '../StatictickVideoTable.module.scss'

function StatictickVideoThead() {
  return (
    <>
      <tr>
        <th className={style.tableChart__th} rowspan="2">
          №
        </th>
        <th className={style.tableChart__th} rowspan="2">
          Название видео
        </th>
        <th className={style.tableChart__th} rowspan="2">
          Дата публикаций{' '}
        </th>
        <th className={style.tableChart__th} rowspan="2">
          Показы
        </th>
        <th className={style.tableChart__th} rowspan="2">
          Аналитика
        </th>
      </tr>
    </>
  )
}

export default StatictickVideoThead
