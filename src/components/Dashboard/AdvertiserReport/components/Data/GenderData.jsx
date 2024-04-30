import React from 'react'

function GenderData ({statistic}) {
  const uniqueGenders = statistic.gender_percentages
  return (
    <>
      {uniqueGenders.length > 0
        ? uniqueGenders.map ((gender, index) => (
          <>
            <td
              key={`gender-${index}`}
              data-label="Пол"
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
