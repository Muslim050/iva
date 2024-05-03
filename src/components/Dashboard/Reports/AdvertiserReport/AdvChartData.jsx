import React from 'react'
import style from './AdvChartTable.module.scss'

import FormatterView from 'src/components/UI/formatter/FormatterView'
import FormatterBudjet from 'src/components/UI/formatter/FormatterBudjet'

function AdvChartData ({statistic, index, isExpanded}) {
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

        </div>
      </td>
      <td className={style.table_td} style={{padding: "10px 10px"}}>
        {
          statistic.online_view_count === 0 ?
            <div
              style={{
                fontSize: '13px',
                lineHeight: '15px',
                color: '#fa8a00',
                fontWeight: "600"
              }}
            >
              Введется <br/> аналитика
            </div>
            : <FormatterView data={statistic.online_view_count}/>
        }

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
                fontWeight: "600"

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

      {uniqueGendersss.length && uniqueAge.length && uniqueGeo.length ?
        <>
          <td className={style.table_td}
              style={{padding: "0px", borderLeft: "1px solid #f3f0f0",}}>
            <div style={{display: "flex", justifyContent: "space-between"}}>
              {uniqueGendersss.length > 0 ? (
                  uniqueGendersss.map ((gender, index) => (
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
                  ))
                ) :
                null
              }
            </div>
          </td>


          <td className={style.table_td}
              style={{padding: "0px", borderLeft: "1px solid #f3f0f0",}}>
            <div style={{display: "flex", justifyContent: "start"}}>
              {uniqueAge.length > 0 ? (
                uniqueAge.map ((age, index) => (
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
              ) : null}
            </div>
          </td>


          <td className={style.table_td}
              style={{padding: "0px", borderLeft: "1px solid #f3f0f0",}}>
            <div style={{display: "flex", justifyContent: "start"}}>
              {uniqueGeo.length > 0 ? (
                uniqueGeo.map ((geo, index) => (
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
                ))
              ) : null}
            </div>
          </td>

        </>
        : <div style={{position: "relative"}}>
          <td style={{
            position: "absolute", right: "-150%", fontSize: "13px",
            lineHeight: "15px",
            fontWeight: "600",
            color: "rgb(250, 138, 0)",
            display: "flex",
            justifyContent: "center",
            width: "100%",
            padding: "0",
            height: "40px",
            alignItems: "center"
          }}>Введется аналитика
          </td>
        </div>}


    </>
  )
}

export default AdvChartData
