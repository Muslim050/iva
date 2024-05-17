import React from "react";
import FormatterTime from "../../../../UI/formatter/FormatterTime";
import FormatterView from "../../../../UI/formatter/FormatterView";
import style from "./TableLinkedVideo.module.scss";

function TableLinkedVideoList ({inventor, selectedRows, setSelectedRows}) {
  function handleRowClick (rowId) {
    if (selectedRows.includes (rowId)) {
      setSelectedRows (selectedRows.filter ((id) => id !== rowId));
    } else {
      setSelectedRows ([...selectedRows, rowId]);
    }
  }

  return (
    <>
      {inventor.map ((advert, i) => (
        <>
          <tr
            key={i}
            // className={style.table__tr}
            onClick={() => handleRowClick (advert.id)}
            className={selectedRows.includes (advert.id) ? "selected" : ""}
            // onClick={() => handleRowClick(advert.id)}
          >
            <th className={style.table__tr_th}>
              <input
                type="checkbox"
                onChange={() => handleRowClick (advert.id)}
                checked={selectedRows.includes (advert.id)}
              />
            </th>

            <th className={style.table__tr_th}>{advert.channel.name}</th>
            <th className={style.table__tr_th}>{advert.video_content.name}</th>
            <th className={style.table__tr_th}>
              {(advert.format === "preroll" && "Pre-roll") ||
                ("mixroll" && "Mix-roll")}
            </th>
            <th className={style.table__tr_th}>{advert.start_at}</th>
            <th className={style.table__tr_th}>
              <FormatterView data={advert.expected_number_of_views}/>
            </th>
            <th className={style.table__tr_th}>
              <FormatterTime data={advert.expected_promo_duration}/>
            </th>

            <th className={style.table__tr_th}>
              {advert.video_content.category}
            </th>
            <th className={style.table__tr_th}>
              {new Date (advert.video_content.publication_time)
                .toLocaleDateString ("en-GB")
                .substr (0, 10)}
            </th>

            <th className={style.table__tr_th}>
              <div
                className={`${style.table__tr_th__status} ${
                  style[advert.status]
                }`}
              >
                {advert.status}
              </div>
            </th>

            {/* <th className={style.table__tr_th}>
                          <div className={style.table__tr_th__status}>
                            {advert.status}
                          </div>
                        </th> */}
          </tr>
        </>
      ))}
    </>
  );
}

export default TableLinkedVideoList;
