import React from 'react'
import style from '../StatictickVideoTable.module.scss'
import {ReactComponent as Linkk} from 'src/assets/link.svg'
import FormatterView from 'src/components/UI/formatter/FormatterView'
import {ReactComponent as Arrow} from 'src/assets/Table/arrow.svg'
import {formatDate} from "../../../../../utils/formatterDate";

function StatictickVideoData ({statistic, index, handleRowClick, isExpanded}) {
  return (
    <>
      <td data-label="#" className={style.table_td}>
        {index + 1}
      </td>

      <td className={style.table_td} style={{display: 'inline-block'}}>
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
          <Linkk className={style.linkk__svg}/>
        </a>
      </td>

      <td className={style.table_td}>
        {
          statistic.actual_publication_time ? (
              <>
                {formatDate (statistic.actual_publication_time)}</>

            )
            : (<>{formatDate (statistic.publication_time)}</>)
        }
      </td>

      <td className={style.table_td}>
        {statistic.online_view_count === 0 ? (
          <div
            style={{
              fontSize: '13px',
              lineHeight: '15px',
              color: '#fa8a00',
            }}
          >
            Введется <br/> аналитика
          </div>
        ) : (
          <FormatterView data={statistic.online_view_count}/>
        )}
      </td>

      <td style={{display: 'inline-block'}} className={style.table_td}>
        <button
          className={style.dopBtn}
          onClick={() => handleRowClick (statistic.video_link)}
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

export default StatictickVideoData
