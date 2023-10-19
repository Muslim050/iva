import React from "react";

function GenderData({ statistic }) {
  return (
    <>
      {statistic.gender_percentages.map((gender, index) => (
        <>
          <td
            key={`gender-${index}`}
            data-label="Пол"
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
