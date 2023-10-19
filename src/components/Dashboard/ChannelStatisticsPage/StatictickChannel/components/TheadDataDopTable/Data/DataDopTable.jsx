import React from "react";

function DataDopTable({ dataChannel }) {
  return (
    <>
      {dataChannel.gender_percentages.map((gender, index) => (
        <>
          <td
            key={gender.percentage}
            data-label="Пол"
            style={{
              textAlign: "center",
            }}
          >
            {gender.percentage}%
          </td>
        </>
      ))}

      {dataChannel.age_group_percentages.map((age, index) => (
        <td
          key={index}
          data-label="Возраст"
          style={{
            textAlign: "center",
          }}
        >
          {age.percentage}%
        </td>
      ))}

      {dataChannel.geo_percentages.map((geo, index) => (
        <>
          <td
            key={index}
            data-label="Гео"
            style={{
              textAlign: "center",
            }}
          >
            {geo.percentage}%
          </td>
        </>
      ))}
    </>
  );
}

export default DataDopTable;
