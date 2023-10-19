import React from "react";
import style from "../../../StatictickChannelTable.module.scss";

function StatictickAge({ dataChannel }) {
  const uniqueGenders = Array.from(
    new Set(dataChannel.age_group_percentages.map((age) => age.age_group))
  );
  return (
    <>
      {uniqueGenders.map((gender, index) => (
        <td
          key={gender}
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

export default StatictickAge;
