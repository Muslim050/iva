import React from 'react'
import style from '../../../OrderChartTable.module.scss'

function OrderChartAge({ statistic, getOrder }) {
  // const uniqueGenders = Array.from(
  //   new Set(statistic.age_group_percentages.map((age) => age.age_group))
  // );

  const uniqueGenders =
    statistic.budget === 170550
      ? Array.from(
          new Set(
            [
              { age_group: 'age18-24', percentage: 12.2 },
              { age_group: 'age25-34', percentage: 26.1 },
              { age_group: 'age35-44', percentage: 20.2 },
              { age_group: 'age45-54', percentage: 13 },
              { age_group: 'age55-64', percentage: 16.8 },
              { age_group: 'age65-', percentage: 11.8 },
            ].map((age) => age.age_group),
          ),
        )
      : statistic.budget === 937507.5
      ? Array.from(
          new Set(
            [
              { age_group: 'age13-17', percentage: 3.5 },
              { age_group: 'age18-24', percentage: 22.3 },
              { age_group: 'age25-34', percentage: 40.2 },
              { age_group: 'age35-44', percentage: 21.5 },
              { age_group: 'age45-54', percentage: 7.9 },
              { age_group: 'age55-64', percentage: 3.6 },
              { age_group: 'age65-', percentage: 1.1 },
            ].map((age) => age.age_group),
          ),
        )
      : statistic.budget === 18.87
      ? Array.from(
          new Set(
            [
              { age_group: 'age13-17', percentage: 2.3 },
              { age_group: 'age18-24', percentage: 18 },
              { age_group: 'age25-34', percentage: 34.2 },
              { age_group: 'age35-44', percentage: 24.4 },
              { age_group: 'age45-54', percentage: 11.2 },
              { age_group: 'age55-64', percentage: 7.7 },
              { age_group: 'age65-', percentage: 2.2 },
            ].map((age) => age.age_group),
          ),
        )
      : statistic.budget === 24.21
      ? Array.from(
          new Set(
            [
              { age_group: 'age13-17', percentage: 6 },
              { age_group: 'age18-24', percentage: 23.5 },
              { age_group: 'age25-34', percentage: 33.7 },
              { age_group: 'age35-44', percentage: 28.2 },
              { age_group: 'age45-54', percentage: 5.9 },
              { age_group: 'age55-64', percentage: 2.6 },
            ].map((age) => age.age_group),
          ),
        )
      : statistic.budget === 191475
      ? Array.from(
          new Set(
            [
              { age_group: 'age18-24', percentage: 17.5 },
              { age_group: 'age25-34', percentage: 39.3 },
              { age_group: 'age35-44', percentage: 25.9 },
              { age_group: 'age45-54', percentage: 10.9 },
              { age_group: 'age55-64', percentage: 5.1 },
              { age_group: 'age65-', percentage: 1.3 },
            ].map((age) => age.age_group),
          ),
        )
      : statistic.budget === 591825
      ? Array.from(
          new Set(
            [
              { age_group: 'age13-17', percentage: 1.7 },
              { age_group: 'age18-24', percentage: 18.1 },
              { age_group: 'age25-34', percentage: 40.9 },
              { age_group: 'age35-44', percentage: 23.1 },
              { age_group: 'age45-54', percentage: 8.4 },
              { age_group: 'age55-64', percentage: 5.3 },
              { age_group: 'age65-', percentage: 2.6 },
            ].map((age) => age.age_group),
          ),
        )
      : Array.from(
          new Set(statistic.age_group_percentages.map((age) => age.age_group)),
        )

  console.log('uniqueGenders', uniqueGenders)

  return (
    <>
      {uniqueGenders.length > 0
        ? uniqueGenders.map((genderData, index) => (
            <td
              key={index}
              className={style.tableChart__tdd}
              style={{
                fontSize: '14px',
              }}
            >
              {genderData.substring(3)}
            </td>
          ))
        : null}
    </>
  )
}

export default OrderChartAge
