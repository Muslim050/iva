import React from 'react'
import style from '../../../AdvChartTable.module.scss'

function OrderChartAge ({statistic}) {
  function findVideoWithThreeGenders (data) {
    return data.find (item => item?.age_group_percentages.length === 7);
  }

  const result = findVideoWithThreeGenders (statistic);
  const uniqueAge =
    Array.from (
      new Set (result.age_group_percentages.map ((gen) => gen.age_group)),
    )

  return (
    <>

      <div style={{
        display: "flex", justifyContent: "start",
        borderRadius: "0px 0px 0px 0px"
      }}>
        {uniqueAge.length > 0
          ? uniqueAge.map ((genderData, index) => (
            <td
              key={index}
              className={style.tableChart__tdd}
              style={{
                fontSize: '12px', padding: "6px", width: "60px", fontWeight: "600",
                color: "#6e7079"

              }}
            >
              {genderData.substring (3)}
            </td>
          ))
          : null}
      </div>

    </>
  )
}

export default OrderChartAge
