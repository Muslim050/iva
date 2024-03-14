import React from 'react'

function AgeData({ statistic }) {
  const uniqueAge =
    statistic.budget === 170550
      ? [
          { age_group: 'age18-24', percentage: 12.2 },
          { age_group: 'age25-34', percentage: 26.1 },
          { age_group: 'age35-44', percentage: 20.2 },
          { age_group: 'age45-54', percentage: 13 },
          { age_group: 'age55-64', percentage: 16.8 },
          { age_group: 'age65-', percentage: 11.8 },
        ]
      : statistic.budget === 937507.5
      ? [
          { age_group: 'age13-17', percentage: 3.5 },
          { age_group: 'age18-24', percentage: 22.3 },
          { age_group: 'age25-34', percentage: 40.2 },
          { age_group: 'age35-44', percentage: 21.5 },
          { age_group: 'age45-54', percentage: 7.9 },
          { age_group: 'age55-64', percentage: 3.6 },
          { age_group: 'age65-', percentage: 1.1 },
        ]
      : statistic.budget === 18.87
      ? [
          { age_group: 'age13-17', percentage: 2.3 },
          { age_group: 'age18-24', percentage: 18 },
          { age_group: 'age25-34', percentage: 34.2 },
          { age_group: 'age35-44', percentage: 24.4 },
          { age_group: 'age45-54', percentage: 11.2 },
          { age_group: 'age55-64', percentage: 7.7 },
          { age_group: 'age65-', percentage: 2.2 },
        ]
      : statistic.budget === 24.21
      ? [
          { age_group: 'age13-17', percentage: 6 },
          { age_group: 'age18-24', percentage: 23.5 },
          { age_group: 'age25-34', percentage: 33.7 },
          { age_group: 'age35-44', percentage: 28.2 },
          { age_group: 'age45-54', percentage: 5.9 },
          { age_group: 'age55-64', percentage: 2.6 },
        ]
      : statistic.budget === 191475
      ? [
          { age_group: 'age18-24', percentage: 17.5 },
          { age_group: 'age25-34', percentage: 39.3 },
          { age_group: 'age35-44', percentage: 25.9 },
          { age_group: 'age45-54', percentage: 10.9 },
          { age_group: 'age55-64', percentage: 5.1 },
          { age_group: 'age65-', percentage: 1.3 },
        ]
      : statistic.budget === 591825
      ? [
          { age_group: 'age13-17', percentage: 1.7 },
          { age_group: 'age18-24', percentage: 18.1 },
          { age_group: 'age25-34', percentage: 40.9 },
          { age_group: 'age35-44', percentage: 23.1 },
          { age_group: 'age45-54', percentage: 8.4 },
          { age_group: 'age55-64', percentage: 5.3 },
          { age_group: 'age65-', percentage: 2.6 },
        ]
      : statistic.age_group_percentages

  return (
    <>
      {uniqueAge.length > 0
        ? uniqueAge.map((age, index) => (
            <td
              key={`age-${index}`}
              data-label="Возраст"
              style={{
                textAlign: 'center',
              }}
            >
              {age.percentage}%
            </td>
          ))
        : null}
    </>
  )
}

export default AgeData
