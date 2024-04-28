import React from 'react'
import style from './AdvChartTable.module.scss'

import FormatterView from 'src/components/UI/formatter/FormatterView'
import FormatterBudjet from 'src/components/UI/formatter/FormatterBudjet'
import TheadGender from "./components/DopTable/FirstTheadAgeGeoGender/TheadGender";
import TheadAge from "./components/DopTable/FirstTheadAgeGeoGender/TheadAge";
import TheadGeo from "./components/DopTable/FirstTheadAgeGeoGender/TheadGeo";

function AdvChartData({ statistic, index, handleRowClick, isExpanded }) {
  const user = localStorage.getItem('role')
  return (
    <>
      <td className={style.table_td}>{index + 1}</td>
      <td className={style.table_td}>{statistic.channel_name}</td>

      <td
        style={{display: 'table-cell', width: '100%', color: "blue"}}
        className={style.table_td}
      >

          {statistic.video_name}

      </td>

      <td className={style.table_td}>
        {(statistic.order_format === 'preroll' && 'Pre-roll') ||
          ('mixroll' && 'Mix-roll')}
      </td>

      <td className={style.table_td}>
        <div>
          <div style={{display: 'flex', width: '100px'}}>
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
        <div>
          <div style={{display: 'flex', width: '100px'}}>
            {new Date(statistic.deactivation_date).toLocaleDateString('ru-RU', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            })}
          </div>
          <div>
            {new Date(statistic.deactivation_date).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </div>
        </div>
      </td>


      <td className={style.table_td}>
        <FormatterView data={statistic.online_view_count}/>
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
              Введется <br/> аналитика
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
      <td style={{padding: "0px", borderLeft: "1px solid #f3f0f0"}}>
        <div>
          <TheadGender statistic={statistic} />
        </div>
      </td>

      <td style={{padding: "0px", borderLeft: "1px solid #f3f0f0", borderRight: "1px solid #e3e3e3"}}>
        <TheadAge statistic={statistic}/>
      </td>

      <td style={{padding: "0px", borderRight: "1px solid #f3f0f0"}}>
        <TheadGeo statistic={statistic}/>

      </td>
    </>
  )
}

export default AdvChartData
