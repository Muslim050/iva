import React from "react";
import style from "./StatictickData.module.scss";

function GenderData({ statistic }) {
  return (
    <>
      {statistic.gender_percentages.map((gender, index) => (
        <>
          <td
            className={style.tabledop_td}
            key={gender.percentage}
            style={{
              textAlign: "center",
            }}
          >
            {gender.percentage}%
          </td>
        </>
      ))}
    </>
  );
}

export default GenderData;
