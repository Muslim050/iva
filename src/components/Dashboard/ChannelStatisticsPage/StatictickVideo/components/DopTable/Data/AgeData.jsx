import React from "react";
import style from "./StatictickData.module.scss";

function AgeData({ statistic }) {
  return (
    <>
      {statistic.age_group_percentages.map((age, index) => (
        <>
          <td
            className={style.tabledop_td}
            key={index}
            style={{
              textAlign: "center",
            }}
          >
            {age.percentage}%
          </td>
        </>
      ))}
    </>
  );
}

export default AgeData;
