import React from "react";
import style from "./TableLinkedVideo.module.scss";

function TableLinkedVideoRows({ setSelectedRows, inventor, selectedRows }) {
  return (
    <>
      <tr>
        <th scope="col" className={style.table__th}>
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
        <th scope="col" className={style.table__th}>
          Паблишер
        </th>
        <th scope="col" className={style.table__th}>
          Название Видео
        </th>
        <th scope="col" className={style.table__th}>
          Формат рекламы
        </th>
        <th scope="col" className={style.table__th}>
          Тайм код рекламы
        </th>
        <th scope="col" className={style.table__th}>
          Желаемое количество просмотров
        </th>
        <th scope="col" className={style.table__th}>
          Хронометраж видео
        </th>
        <th scope="col" className={style.table__th}>
          Категория
        </th>
        <th scope="col" className={style.table__th}>
          Время публикаций
        </th>
        <th scope="col" className={style.table__th}>
          Статус
        </th>
      </tr>
    </>
  );
}

export default TableLinkedVideoRows;
