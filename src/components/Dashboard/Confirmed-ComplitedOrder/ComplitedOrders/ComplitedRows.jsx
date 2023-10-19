import React from "react";
import { SortButton } from "src/utils/SortButton";

const headers = [
  { key: "id", label: "№" },
  { key: "company", label: "Кампания" },
  { key: "format", label: "Формат" },
  { key: "expected_end_date", label: "Дата верезки" },
  { key: "name", label: "Название видео" },
  { key: "start_at", label: "Удалить с" },
  { key: "action", label: "Действия" },
  { key: "action", label: "Статус оплаты" },
];

function ComplitedRows({ sortKey, sort, changeSort }) {
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

export default ComplitedRows;
