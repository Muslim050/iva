import React from "react";
import style from "../../OrderChartTable.module.scss";

function OrderChartTheadAgeGenderGeo({ statistic }) {
  const removeDuplicates = (arr) => Array.from(new Set(arr));

  const uniqueGenders =
    statistic && statistic.gender_percentages
      ? removeDuplicates(statistic.gender_percentages.map((gen) => gen.gender))
      : [];

  const uniqueAge =
    statistic && statistic.age_group_percentages
      ? removeDuplicates(
          statistic.age_group_percentages.map((age) => age.age_group)
        )
      : [];

  const uniqueGeo =
    statistic && statistic.geo_percentages
      ? removeDuplicates(statistic.geo_percentages.map((geo) => geo.country))
      : [];

  const genderColSpan = uniqueGenders.length;
  const ageColSpan = uniqueAge.length;
  const geoColSpan = uniqueGeo.length;
  return (
    <>
      <td
        className={style.tableChart__td}
        style={{
          textAlign: "center",
          background: "#5570f263",
          borderRadius: "8px",
          width: "100px",
          borderRight: "3px solid white",
        }}
      >
        Показы
      </td>
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

export default OrderChartTheadAgeGenderGeo;
