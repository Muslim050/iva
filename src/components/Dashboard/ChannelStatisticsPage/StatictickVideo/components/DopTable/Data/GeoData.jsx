import React from "react";
import style from "./StatictickData.module.scss";

function GeoData({ statistic }) {
  return (
    <>
      {statistic.geo_percentages.map((geo, index) => (
        <>
          <td
            className={style.tabledop_td}
            key={index}
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
