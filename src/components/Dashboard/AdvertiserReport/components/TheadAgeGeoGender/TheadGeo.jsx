import React from 'react'
import style from '../../AdvChartTable.module.scss'

function TheadGeo ({statistic}) {

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
      {uniqueGenders.length > 0
        ? uniqueGenders.map ((geo, index) => (
          <td
            key={index}
            className={style.tableChart__tdd}
            style={{
              fontSize: '12px', padding: "6px", width: "60px", fontWeight: "600",
              color: "#6e7079"
            }}
          >
            {geo}
          </td>
        ))
        : null}
    </div>
  )
}

export default TheadGeo
