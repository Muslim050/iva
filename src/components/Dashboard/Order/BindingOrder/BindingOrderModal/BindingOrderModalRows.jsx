import React from "react";

function BindingOrderModalRows({ setSelectedRows, inventor, selectedRows }) {
  return (
    <>
      <tr>
        <th>
          <input
            type="checkbox"
            onChange={(event) => {
              if (event.target.checked) {
                setSelectedRows(inventor.map((row) => row.id));
              } else {
                setSelectedRows([]);
              }
            }}
            checked={selectedRows.length === inventor.length}
          />
        </th>
        <th>Паблишер</th>
        <th>Название Видео</th>
        <th>Формат рекламы</th>
        <th>Тайм код рекламы</th>
        <th>Желаемое количество просмотров</th>
        <th>Хронометраж видео</th>
        <th>Категория</th>
        <th>Время публикаций</th>
        <th>Статус</th>
      </tr>
    </>
  );
}

export default BindingOrderModalRows;
