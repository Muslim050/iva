import React from "react";
import style from "../../../StatictickChannelTable.module.scss";

function StatictickAgeGeo({ dataChannel }) {
  const uniqueGenders = Array.from(
    new Set(dataChannel.geo_percentages.map((geo) => geo.country))
  );
  return (
    <>
      {uniqueGenders.map((geo, index) => (
        <th
          key={geo}
          className={style.tableChart__tdd}
          style={{
            fontFamily: "Roboto, sans-serif",
            fontSize: "12px",
          }}
        >
          {geo}
        </th>
      ))}
    </>
  );
}

export default StatictickAgeGeo;
