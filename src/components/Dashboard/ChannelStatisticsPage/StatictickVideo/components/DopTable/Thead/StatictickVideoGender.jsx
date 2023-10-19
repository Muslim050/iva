import React from "react";
import style from "../../../StatictickVideoTable.module.scss";
import Anonim from "src/assets/anonim.png";

function StatictickVideoGender({ statistic }) {
  const uniqueGenders = Array.from(
    new Set(statistic.gender_percentages.map((gen) => gen.gender))
  );
  return (
    <>
      {uniqueGenders.map((gender, index) => (
        <th
          key={gender}
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

export default StatictickVideoGender;
