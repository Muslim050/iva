import React from "react";
import style from "../../../OrderChartTable.module.scss";
import Anonim from "src/assets/anonim.png";

function OrderChartTwoThead({ statistic }) {
  const uniqueGenders = Array.from(
    new Set(statistic.gender_percentages.map((gen) => gen.gender))
  );
  return (
    <>
      {uniqueGenders.map((gender, index) => (
        <th
          key={index}
          className={style.tableChart__tdd}
          style={{
            fontFamily: "Roboto, sans-serif",
            fontSize: "12px",
          }}
        >
          {gender === "female" ? (
            "Ж"
          ) : gender === "male" ? (
            "М"
          ) : gender === "Other" ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img src={Anonim} alt="Anonim" style={{ width: "20px" }} />
            </div>
          ) : (
            gender
          )}
        </th>
      ))}
    </>
  );
}

export default OrderChartTwoThead;
