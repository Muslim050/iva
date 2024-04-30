import React from 'react'

function GeoData ({statistic}) {
  const uniqueGeo = statistic.geo_percentages
  return (
    <>
      {uniqueGeo.length > 0
        ? uniqueGeo.map ((geo, index) => (
          <>
            <td
              key={`geo-${index}`}
              data-label="Гео"
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
