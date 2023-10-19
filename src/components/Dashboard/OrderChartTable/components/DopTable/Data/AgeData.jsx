import React from "react";

function AgeData({ statistic }) {
  return (
    <>
      {statistic.age_group_percentages.map((age, index) => (
        <td
          key={`age-${index}`}
          data-label="Возраст"
          style={{
            textAlign: "center",
          }}
        >
          {age.percentage}%
        </td>
      ))}
    </>
  );
}

export default AgeData;
