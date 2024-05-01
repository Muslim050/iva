import React from 'react'

function AgeData ({statistic}) {
  const uniqueAge = statistic.age_group_percentages
  console.log (uniqueAge)
  return (
    <div style={{borderTop: "1px solid #e3e3e3",}}>
      {uniqueAge
        ? uniqueAge.map ((age, index) => (
          <td
            key={`age-${index}`}
            data-label="Возраст"
          >
            {age.percentage}%
          </td>
        ))
        : <div>Введется
          аналитика</div>}
    </div>
  )
}

export default AgeData
