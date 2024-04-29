import React from 'react'
import style from '../../../AdvChartTable.module.scss'

function OrderChartGeo ({statistic}) {
  const uniqueGenders =
    Array.from (new Set (statistic.geo_percentages.map ((geo) => geo.country)))
  const uniqueGeo = statistic.geo_percentages

  return (
    <div>
      <div style={{display: "flex", justifyContent: "start"}}>

        {uniqueGenders.length > 0
          ? uniqueGenders.map ((geo, index) => (
            <td
              key={index}
              className={style.tableChart__tdd}
              style={{
                fontSize: '12px', padding: "5px", width: "60px"
              }}
            >
              {geo}
            </td>
          ))
          : null}
      </div>
      <div style={{borderTop: "1px solid #f3f0f0", display: "flex", justifyContent: "start"}}>
        {uniqueGeo.length > 0
          ? uniqueGeo.map ((geo, index) => (
            <>
              <td
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

              </td>
            </>
          ))
          : null}
      </div>
    </div>
  )
}

export default OrderChartGeo
