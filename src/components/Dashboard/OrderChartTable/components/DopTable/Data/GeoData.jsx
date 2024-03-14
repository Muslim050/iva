import React from 'react'

function GeoData({ statistic }) {
  const uniqueGeo =
    statistic.budget === 170550
      ? [
          { country: 'RU', percentage: 60.4 },
          { country: 'UZ', percentage: 10.9 },
          { country: 'KG', percentage: 3.4 },
          { country: 'Other', percentage: 9.9 },
        ]
      : statistic.budget === 937507.5
      ? [
          { country: 'UZ', percentage: 98.3 },
          { country: 'Other', percentage: 0 },
        ]
      : statistic.budget === 18.87
      ? [
          { country: 'UZ', percentage: 62 },
          { country: 'RU', percentage: 22.6 },
          { country: 'KG', percentage: 5.8 },
          { country: 'Other', percentage: 4.3 },
        ]
      : statistic.budget === 24.21
      ? [
          { country: 'UZ', percentage: 75.3 },
          { country: 'RU', percentage: 15.5 },
          { country: 'KG', percentage: 3.9 },
          { country: 'Other', percentage: 2 },
        ]
      : statistic.budget === 191475
      ? [
          { country: 'UZ', percentage: 56.1 },
          { country: 'RU', percentage: 24.6 },
          { country: 'KG', percentage: 2.7 },
          { country: 'Other', percentage: 2.7 },
        ]
      : statistic.budget === 591825
      ? [
          { country: 'UZ', percentage: 51.2 },
          { country: 'RU', percentage: 25.8 },
          { country: 'KG', percentage: 11.5 },
          { country: 'Other', percentage: 6.9 },
        ]
      : statistic.geo_percentages

  return (
    <>
      {uniqueGeo.length > 0
        ? uniqueGeo.map((geo, index) => (
            <>
              <td
                key={`geo-${index}`}
                data-label="Гео"
                style={{
                  textAlign: 'center',
                }}
              >
                {geo.percentage}%
              </td>
            </>
          ))
        : null}
    </>
  )
}

export default GeoData
