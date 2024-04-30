import React from 'react'

function AgeData ({statistic}) {
  const uniqueAge = statistic.age_group_percentages
  return (
    <div style={{borderTop: "1px solid #e3e3e3",}}>
      {uniqueAge.length > 0
        ? uniqueAge.map ((age, index) => (
          <td
            key={`age-${index}`}
            data-label="Возраст"
          >
            {age.percentage}%
          </td>
        ))
        : null}
    </div>
  )
}

export default AgeData
