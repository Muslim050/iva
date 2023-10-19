import React from "react";
import style from "../../../OrderChartTable.module.scss";

function OrderChartGeo({ statistic }) {
  const uniqueGenders = Array.from(
    new Set(statistic.geo_percentages.map((geo) => geo.country))
  );
  return (
    <>
      {uniqueGenders.map((geo, index) => (
        <th
          key={index}
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

export default OrderChartGeo;
