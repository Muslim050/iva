import React from "react";

function GeoData({ statistic }) {
  return (
    <>
      {statistic.geo_percentages.map((geo, index) => (
        <>
          <td
            key={`geo-${index}`}
            data-label="Гео"
            style={{
              textAlign: "center",
            }}
          >
            {geo.percentage}%
          </td>
        </>
      ))}
    </>
  );
}

export default GeoData;
