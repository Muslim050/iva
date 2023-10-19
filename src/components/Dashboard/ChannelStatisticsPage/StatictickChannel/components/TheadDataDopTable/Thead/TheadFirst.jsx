import React from "react";
import style from "../../../StatictickChannelTable.module.scss";

function TheadFirst({ dataChannel }) {
  const removeDuplicates = (arr) => Array.from(new Set(arr));
  const uniqueGenders = dataChannel
    ? removeDuplicates(dataChannel.gender_percentages.map((gen) => gen.gender))
    : [];
  const uniqueAge = dataChannel
    ? removeDuplicates(
        dataChannel.age_group_percentages.map((age) => age.age_group)
      )
    : [];
  const uniqueGeo = dataChannel
    ? removeDuplicates(dataChannel.geo_percentages.map((geo) => geo.country))
    : [];
  const genderColSpan = uniqueGenders.length;
  const ageColSpan = uniqueAge.length;
  const geoColSpan = uniqueGeo.length;

  return (
    <>
      <td
        className={style.tableChart__td}
        colSpan={genderColSpan}
        style={{
          textAlign: "center",
          background: "#5570f263",
          borderRadius: "10px",
          borderRight: "3px solid white",
        }}
      >
        Пол
      </td>

      <td
        className={style.tableChart__td}
        colSpan={ageColSpan}
        style={{
          textAlign: "center",
          background: "#5570f263",
          borderRadius: "10px",
          borderRight: "3px solid white",
        }}
      >
        Возраст
      </td>
      <td
        className={style.tableChart__td}
        colSpan={geoColSpan}
        style={{
          textAlign: "center",
          background: "#5570f263",
          borderRadius: "10px",
        }}
      >
        Гео
      </td>
    </>
  );
}

export default TheadFirst;
