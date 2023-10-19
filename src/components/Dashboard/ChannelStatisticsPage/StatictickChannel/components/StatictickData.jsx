import React from "react";
import style from "../StatictickChannelTable.module.scss";
import FormatterView from "src/components/UI/formatter/FormatterView";
import { ReactComponent as Arrow } from "src/assets/Table/arrow.svg";

function StatictickData({ dataChannel, handleRowClick, expandedRows }) {
  return (
    <>
      <td className={style.table_td}>
        <FormatterView data={dataChannel.number_of_views} />
      </td>
      <td className={style.table_td}>
        <FormatterView data={dataChannel.number_of_likes} />
      </td>
      <td className={style.table_td}>
        <FormatterView data={dataChannel.number_of_dislikes} />
      </td>
      <td className={style.table_td}>
        <FormatterView data={dataChannel.number_of_comments} />
      </td>
      <td className={style.table_td}>
        <FormatterView data={dataChannel.estimated_minutes_watched} />
      </td>

      <td style={{ display: "inline-block" }} className={style.table_td}>
        <button
          className={style.dopBtn}
          onClick={() => handleRowClick(dataChannel.number_of_views)}
        >
          Показать
          <span className={style.arrow}>
            <Arrow
              className={`${style.arrow__icon} ${
                expandedRows === dataChannel.number_of_views
                  ? style.arrow__rotate
                  : ""
              }`}
            />
          </span>
        </button>
      </td>
    </>
  );
}

export default StatictickData;
