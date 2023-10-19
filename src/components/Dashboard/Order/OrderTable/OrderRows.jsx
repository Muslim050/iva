import React from "react";
import { SortButton } from "src/utils/SortButton";
import style from "./OrderTable.module.scss";

function OrderRows({ data, sort, sortKey, changeSort }) {
  const user = localStorage.getItem("role");

  const isAdmin = user === "admin";

  const porogViews = data.map((i) => i.online_views > 0);

  const headers = [
    { key: "id", label: "№" },
    { key: "name", label: "Кампания" },
    { key: "promo_file", label: "Ролик" },

    { key: "format", label: "Формат" },
    { key: "expected_start_date", label: "Начало" },
    { key: "expected_end_date", label: "Конец" },
    { key: "expected_number_of_views", label: "Показы" },
    // { key: "porog", label: "Прогресс", visible: isAdmin },

    { key: "budget", label: "$Бюджет" },
    { key: "", label: "Статус" },
    { key: "", label: "Остаток" },

    { key: "deistvia", label: "Детали" },
    { key: "porog", label: "Статус оплаты", visible: isAdmin },
  ];

  return (
    <>
      <tr>
        {headers.map((row) => {
          const showStatusColumn = user !== "admin";
          if (row.key === "is_connected" && !showStatusColumn) {
            return null;
          }

          if (row.key === "porog" && !row.visible) {
            return null; // Пропускать невидимую колонку "порог"
          }
          return (
            <th key={row.key} className={style.th_Order}>
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

export default OrderRows;
