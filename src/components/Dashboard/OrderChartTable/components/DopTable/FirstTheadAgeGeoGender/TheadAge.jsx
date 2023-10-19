import React from "react";
import style from "../../../OrderChartTable.module.scss";

function OrderChartAge({ statistic }) {
  const uniqueGenders = Array.from(
    new Set(statistic.age_group_percentages.map((age) => age.age_group))
  );

  return (
    <>
      {uniqueGenders.map((gender, index) => (
        <td
          key={index}
          className={style.tableChart__tdd}
          style={{
            fontFamily: "Roboto, sans-serif",
            fontSize: "12px",
          }}
        >
          {gender.substring(3)}
        </td>
      ))}
    </>
  );
}

export default OrderChartAge;
