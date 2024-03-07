import React from 'react'
import style from '../../../OrderChartTable.module.scss'

function OrderChartGeo({ statistic }) {
  const uniqueGenders =
    statistic.budget === 170550
      ? Array.from(
          new Set(
            [
              { country: 'RU', percentage: 60.4 },
              { country: 'UZ', percentage: 10.9 },
              { country: 'KG', percentage: 3.4 },
              { country: 'Other', percentage: 9.9 },
            ].map((gen) => gen.country),
          ),
        )
      : statistic.budget === 937507.5
      ? Array.from(
          new Set(
            [
              { country: 'UZ', percentage: 98.3 },
              { country: 'Other', percentage: 0 },
            ].map((gen) => gen.country),
          ),
        )
      : statistic.budget === 18.87
      ? Array.from(
          new Set(
            [
              { country: 'UZ', percentage: 62 },
              { country: 'RU', percentage: 22.6 },
              { country: 'KG', percentage: 5.8 },
              { country: 'Other', percentage: 4.3 },
            ].map((gen) => gen.country),
          ),
        )
      : statistic.budget === 24.21
      ? Array.from(
          new Set(
            [
              { country: 'UZ', percentage: 75.3 },
              { country: 'RU', percentage: 15.5 },
              { country: 'KG', percentage: 3.9 },
              { country: 'Other', percentage: 2 },
            ].map((gen) => gen.country),
          ),
        )
      : statistic.budget === 191475
      ? Array.from(
          new Set(
            [
              { country: 'UZ', percentage: 56.1 },
              { country: 'RU', percentage: 24.6 },
              { country: 'KG', percentage: 2.7 },
              { country: 'Other', percentage: 2.7 },
            ].map((gen) => gen.country),
          ),
        )
      : Array.from(new Set(statistic.geo_percentages.map((geo) => geo.country)))

  console.log('uniqueGenders', uniqueGenders)
  return (
    <>
      {uniqueGenders.map((geo, index) => (
        <th
          key={index}
          className={style.tableChart__tdd}
          style={{
            fontSize: '14px',
          }}
        >
          {geo}
        </th>
      ))}
    </>
  )
}

export default OrderChartGeo
