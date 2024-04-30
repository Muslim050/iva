import React from 'react'
import style from './AdvChartTable.module.scss'

import FormatterView from 'src/components/UI/formatter/FormatterView'
import FormatterBudjet from 'src/components/UI/formatter/FormatterBudjet'

function AdvChartData ({statistic, index, handleRowClick, isExpanded}) {
  const user = localStorage.getItem ('role')
  const [activeTooltip, setActiveTooltip] = React.useState (null)

  const uniqueGendersss = statistic.gender_percentages
  const uniqueAge = statistic.age_group_percentages
  const uniqueGeo = statistic.geo_percentages


  return (
    <>
      <td className={style.table_td} style={{padding: "10px 10px"}}>{index + 1}</td>
      <td className={style.table_td} style={{display: 'table-cell', width: '250px', padding: "10px 10px"}}>
        {statistic.channel_name}
      </td>
      <td
        onMouseEnter={() => setActiveTooltip (statistic.id)}
        onMouseLeave={() => setActiveTooltip (null)}
        style={{
          position: "relative",
          zIndex: "3",
          display: 'table-cell',
          width: '300px',
          color: "blue",
          padding: "10px 10px"
        }}
        className={style.table_td}>
        {statistic.video_name.length > 25 ? statistic.video_name.substring (0, 25) + '...' : statistic.video_name}
        <span
          className={
            activeTooltip === statistic.id ? style.tooltiptext : style.hidden
          }
        >{statistic.video_name}</span>
      </td>
      <td className={style.table_td} style={{padding: "10px 10px"}}>
        {(statistic.order_format === 'preroll' && 'Pre-roll') ||
          ('mixroll' && 'Mix-roll')}
      </td>
      <td className={style.table_td} style={{padding: "10px 10px"}}>
        <div>
          <div style={{display: 'flex', width: '100px'}}>
            {new Date (statistic.publication_date).toLocaleDateString ('ru-RU', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            })}
          </div>
          <div>
            {new Date (statistic.publication_date).toLocaleTimeString ([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </div>
        </div>
      </td>
      <td className={style.table_td} style={{padding: "10px 10px"}}>
        <div>
          <div style={{display: 'flex', width: '100px'}}>
            {new Date (statistic.deactivation_date).toLocaleDateString ('ru-RU', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            })}
          </div>
          <div>
            {new Date (statistic.deactivation_date).toLocaleTimeString ([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </div>
        </div>
      </td>
      <td className={style.table_td} style={{padding: "10px 10px"}}>
        <FormatterView data={statistic.online_view_count}/>
      </td>

      <td className={style.table_td} style={{padding: "10px 10px"}}>
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
      <td className={style.table_td} style={{padding: "0px", borderLeft: "1px solid #f3f0f0"}}>
        <div style={{display: "flex", justifyContent: "space-between",}}>
          {uniqueGendersss.length > 0
            ? uniqueGendersss.map ((gender, index) => (
              <>
                <td
                  key={`gender-${index}`}
                  data-label="Пол"
                  style={{
                    textAlign: 'center',
                    padding: "5px",
                    width: "60px",
                    fontSize: "13px",
                    fontWeight: "600",
                    color: "blue"
                  }}
                >
                  {gender.percentage}%
                </td>
              </>
            ))
            : null}
        </div>
      </td>
      <td className={style.table_td} style={{padding: "0px", borderLeft: "1px solid #f3f0f0"}}>
        <div style={{display: "flex", justifyContent: "start"}}>
          {uniqueAge.length > 0
            ? uniqueAge.map ((age, index) => (
              <td
                key={`age-${index}`}
                data-label="Возраст"
                style={{
                  textAlign: 'center',
                  padding: "7px",
                  width: "60px",
                  fontSize: "13px",
                  fontWeight: "600",
                  color: "blue"
                }}
              >
                {age.percentage}%
              </td>
            ))
            : null}
        </div>
      </td>

      <td className={style.table_td} style={{padding: "0px", borderLeft: "1px solid #f3f0f0"}}>
        <div style={{display: "flex", justifyContent: "start"}}>
          {uniqueGeo.length > 0
            ? uniqueGeo.map ((geo, index) => (
              <>
                <div
                  key={`geo-${index}`}
                  data-label="Гео"
                  style={{
                    textAlign: 'center',
                    padding: "5px",
                    width: "60px",
                    fontSize: "13px",
                    fontWeight: "600",
                    color: "blue"
                  }}
                >
                  {geo.percentage}%
                </div>
              </>
            ))
            : null}
        </div>
      </td>

      {/*<td style={{padding: "0px", borderLeft: "1px solid #f3f0f0", borderRight: "1px solid #e3e3e3", width: "430px"}}>*/}
      {/*  <TheadAge statistic={statistic}/>*/}
      {/*</td>*/}

      {/*<td style={{padding: "0px", borderRight: "1px solid #f3f0f0", width: "250px"}}>*/}
      {/*  <TheadGeo statistic={statistic}/>*/}
      {/*</td>*/}

    </>
  )
}

export default AdvChartData
