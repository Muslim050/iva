import React from "react";
import style from "./BindingInventoryOrderTable.module.scss";

function BindingInventoryOrderTableRows() {
  return (
    <>
      <tr>
        <th scope="col" className={style.table__th}>
          #
        </th>

        <th scope="col" className={style.table__th}>
          Формат рекламы
        </th>
        <th scope="col" className={style.table__th}>
          Желаемое количество просмотров
        </th>

        <th scope="col" className={style.table__th}>
          Ожидаемая дата начало
        </th>
        <th scope="col" className={style.table__th}>
          Ожидаемая дата окончания
        </th>

        <th scope="col" className={style.table__th}>
          Ролик
        </th>
      </tr>
    </>
  );
}

export default BindingInventoryOrderTableRows;
