import React from 'react'
import style from '../../../OrderChartTable.module.scss'
import Anonim from 'src/assets/anonim.png'

function OrderChartTwoThead({ statistic }) {
  const uniqueGenders =
    statistic.budget === 170550
      ? Array.from(
          new Set(
            [
              { gender: 'female', percentage: 80.3 },
              { gender: 'male', percentage: 19.7 },
              { gender: 'Other', percentage: 19.7 },
            ].map((gen) => gen.gender),
          ),
        )
      : statistic.budget === 937507.5
      ? Array.from(
          new Set(
            [
              { gender: 'female', percentage: 50.2 },
              { gender: 'male', percentage: 49.8 },
            ].map((gen) => gen.gender),
          ),
        )
      : statistic.budget === 18.87
      ? Array.from(
          new Set(
            [
              { gender: 'female', percentage: 40.1 },
              { gender: 'male', percentage: 59.9 },
              { gender: 'Other', percentage: 0 },
            ].map((gen) => gen.gender),
          ),
        )
      : statistic.budget === 24.21
      ? Array.from(
          new Set(
            [
              { gender: 'female', percentage: 50.3 },
              { gender: 'male', percentage: 49.7 },
              { gender: 'Other', percentage: 0 },
            ].map((gen) => gen.gender),
          ),
        )
      : statistic.budget === 191475
      ? Array.from(
          new Set(
            [
              { gender: 'female', percentage: 19.3 },
              { gender: 'male', percentage: 80.7 },
              { gender: 'Other', percentage: 0 },
            ].map((gen) => gen.gender),
          ),
        )
      : statistic.budget === 591825
      ? Array.from(
          new Set(
            [
              { gender: 'female', percentage: 56.4 },
              { gender: 'male', percentage: 43.6 },
              { gender: 'Other', percentage: 0 },
            ].map((gen) => gen.gender),
          ),
        )
      : Array.from(
          new Set(statistic.gender_percentages.map((gen) => gen.gender)),
        )

  return (
    <>
      {uniqueGenders.length > 0
        ? uniqueGenders.map((gender, index) => (
            <th
              key={index}
              className={style.tableChart__tdd}
              style={{
                fontSize: '14px',
              }}
            >
              {gender === 'female' ? (
                'Ж'
              ) : gender === 'male' ? (
                'М'
              ) : gender === 'Other' ? (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <img src={Anonim} alt="Anonim" style={{ width: '20px' }} />
                </div>
              ) : (
                <>{gender}</>
              )}
            </th>
          ))
        : null}
    </>
  )
}

export default OrderChartTwoThead
