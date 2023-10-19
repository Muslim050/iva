import React from "react";
import style from "../StatictickVideoTable.module.scss";

function TheadAgeGenderGeo({ data }) {
  const removeDuplicates = (arr) => Array.from(new Set(arr));

  const uniqueGenders = data
    ? removeDuplicates(
        data.flatMap((obj) => obj.gender_percentages.map((gen) => gen.gender))
      )
    : [];

  const uniqueAge = data
    ? removeDuplicates(
        data.flatMap((obj) =>
          obj.age_group_percentages.map((age) => age.age_group)
        )
      )
    : [];

  const uniqueGeo = data
    ? removeDuplicates(
        data.flatMap((obj) => obj.geo_percentages.map((geo) => geo.country))
      )
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

export default TheadAgeGenderGeo;
