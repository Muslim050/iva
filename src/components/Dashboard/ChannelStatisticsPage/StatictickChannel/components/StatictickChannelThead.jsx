import React from "react";
import style from "../StatictickChannelTable.module.scss";

function StatictickChannelThead() {
  return (
    <>
      <tr>
        <th className={style.tableChart__th} rowspan="2">
          Показы
        </th>
        <th className={style.tableChart__th} rowspan="2">
          Кол-во лайков
        </th>
        <th className={style.tableChart__th} rowspan="2">
          Кол-во дизлайков
        </th>
        <th className={style.tableChart__th} rowspan="2">
          Кол-во комментариев
        </th>
        <th className={style.tableChart__th} rowspan="2">
          Среднее кол-во минут просмотров
        </th>
        <th className={style.tableChart__th} rowspan="2">
          Аналитика
        </th>
      </tr>
    </>
  );
}

export default StatictickChannelThead;
