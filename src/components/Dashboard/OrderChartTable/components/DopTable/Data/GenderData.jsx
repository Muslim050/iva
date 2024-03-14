import React from 'react'

function GenderData({ statistic }) {
  const uniqueGenders =
    statistic.budget === 170550
      ? [
          { gender: 'female', percentage: 71.7 },
          { gender: 'male', percentage: 28.3 },
          { gender: 'Other', percentage: 0 },
        ]
      : statistic.budget === 937507.5
      ? [
          { gender: 'female', percentage: 50.2 },
          { gender: 'male', percentage: 49.8 },
        ]
      : statistic.budget === 18.87
      ? [
          { gender: 'female', percentage: 40.1 },
          { gender: 'male', percentage: 59.9 },
          { gender: 'Other', percentage: 0 },
        ]
      : statistic.budget === 24.21
      ? [
          { gender: 'female', percentage: 50.3 },
          { gender: 'male', percentage: 49.7 },
          { gender: 'Other', percentage: 0 },
        ]
      : statistic.budget === 191475
      ? [
          { gender: 'female', percentage: 19.3 },
          { gender: 'male', percentage: 80.7 },
          { gender: 'Other', percentage: 0 },
        ]
      : statistic.budget === 591825
      ? [
          { gender: 'female', percentage: 56.4 },
          { gender: 'male', percentage: 43.6 },
          { gender: 'Other', percentage: 0 },
        ]
      : statistic.gender_percentages
  return (
    <>
      {uniqueGenders.length > 0
        ? uniqueGenders.map((gender, index) => (
            <>
              <td
                key={`gender-${index}`}
                data-label="Пол"
                style={{
                  textAlign: 'center',
                }}
              >
                {gender.percentage}%
              </td>
            </>
          ))
        : null}
    </>
  )
}

export default GenderData
