import React from 'react'
import style from '../../../AdvChartTable.module.scss'

function OrderChartAge({ statistic, getOrder }) {
  const uniqueGenders =
      Array.from(
          new Set(statistic.age_group_percentages?.map((age) => age.age_group)),
        )
  const uniqueAge = statistic.age_group_percentages

  return (
    <>
      <div style={{
        // display: "flex",
        // justifyContent: "space-between"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between"}}>

        {uniqueGenders.length > 0
          ? uniqueGenders.map((genderData, index) => (
            <td
              key={index}
              className={style.tableChart__tdd}
              style={{
                fontSize: '12px', padding: "5px", width: "60px"
              }}
            >
              {genderData.substring(3)}
            </td>
          ))
          : null}
        </div>
        <div style={{borderTop: "1px solid #f3f0f0", display: "flex", justifyContent: "space-between"}}>
          {uniqueAge.length > 0
            ? uniqueAge.map((age, index) => (
              <td
                key={`age-${index}`}
                data-label="Возраст"
                style={{
                  textAlign: 'center', padding: "5px", width: "60px", fontSize: "13px", fontWeight: "600", color: "blue"
                }}
              >
                {age.percentage}%
              </td>
            ))
            : null}
        </div>


      </div>
    </>
  )
}

export default OrderChartAge
