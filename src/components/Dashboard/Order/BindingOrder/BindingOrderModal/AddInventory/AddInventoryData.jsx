import React from "react";
import AdvertStatus from "../../../../../UI/AdvertStatus/AdvertStatus";
import FormatterTime from "../../../../../UI/formatter/FormatterTime";
import FormatterView from "../../../../../UI/formatter/FormatterView";
import style from "../BindingOrderModal.module.scss";

function AddInventoryData ({inventor, selectedRows, setSelectedRows}) {
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
            onClick={() => handleRowClick (advert.id)}
            className={selectedRows.includes (advert.id) ? "selected" : ""}
          >
            <th className={style.table__tr_th}>
              <input
                type="checkbox"
                onChange={() => handleRowClick (advert.id)}
                checked={selectedRows.includes (advert.id)}
              />
            </th>

            <th className={style.table__tr_th}>{advert.channel.name}</th>
            <th className={style.table__tr_th}>{advert.video_content?.name}</th>
            <th className={style.table__tr_th}>
              {(advert.format === "preroll" && "Pre-roll") ||
                ("midroll1" && "Mid-roll 1") ||
                ("midroll2" && "Mid-roll 2") ||
                ("midroll3" && "Mid-roll 3") ||
                ("midroll4" && "Mid-roll 4")}
            </th>
            <th className={style.table__tr_th}>{advert.start_at}</th>
            <th className={style.table__tr_th}>
              <FormatterView data={advert.expected_number_of_views}/>
            </th>
            <th className={style.table__tr_th}>
              <FormatterTime data={advert.expected_promo_duration}/>
            </th>

            <th className={style.table__tr_th}>
              {advert.video_content?.category}
            </th>
            <th className={style.table__tr_th}>
              {new Date (advert.video_content?.publication_time)
                .toLocaleDateString ("en-GB")
                .replace (/\//g, ".")}
            </th>

            <th className={style.table__tr_th}>
              <div>
                <AdvertStatus status={advert.status}/>
              </div>
            </th>
          </tr>
        </>
      ))}
    </>
  );
}

export default AddInventoryData;
