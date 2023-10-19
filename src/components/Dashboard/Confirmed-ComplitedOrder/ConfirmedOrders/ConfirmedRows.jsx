import React from "react";
import { SortButton } from "src/utils/SortButton";
import style from "./ConfirmedTable.module.scss";

const headers = [
  { key: "id", label: "№" },
  { key: "company", label: "Кампания" },
  { key: "format", label: "Формат" },
  { key: "expected_start_date", label: "Начало" },
  { key: "expected_end_date", label: "Конец" },
  { key: "promo_file", label: "Ролик" },
  { key: "name", label: "Название видео" },
  { key: "category", label: "Категория" },
  { key: "start_at", label: "Тайм код" },
];

function ConfirmedRows({ sortKey, sort, changeSort }) {
  return (
    <>
      <tr>
        {headers.map((row) => {
          const user = localStorage.getItem("role");
          const showStatusColumn = user !== "admin";
          if (row.key === "is_connected" && !showStatusColumn) {
            return null;
          }
          return (
            <th key={row.key}>
              <SortButton
                row={row.label}
                columnKey={row.key}
                onClick={() => changeSort(row.key)}
                sort={sort}
                sortKey={sortKey}
              />
            </th>
          );
        })}
      </tr>
    </>
  );
}

export default ConfirmedRows;
