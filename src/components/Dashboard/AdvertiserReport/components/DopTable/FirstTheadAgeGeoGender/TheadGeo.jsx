import React from 'react'
import style from '../../../AdvChartTable.module.scss'

function OrderChartGeo ({statistic}) {

  function findVideoWithThreeGenders (data) {
    return data.find (item => item?.geo_percentages.length === 4);
  }

  const result = findVideoWithThreeGenders (statistic);
  const uniqueGenders =
    Array.from (
      new Set (result.geo_percentages.map ((gen) => gen.country)),
    )

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
      
    </div>
  )
}

export default OrderChartGeo
