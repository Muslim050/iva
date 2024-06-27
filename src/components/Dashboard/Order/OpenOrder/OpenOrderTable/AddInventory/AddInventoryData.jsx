import React from "react";
import FormatterTime from "../../../../../UI/formatter/FormatterTime";
import FormatterView from "../../../../../UI/formatter/FormatterView";
import style from "../BindingOrderModal.module.scss";
import ButtonBorder from "../../../../../UI/ButtonBorder/ButtonBorder";
import {showModalVerify} from "../../../../../../redux/modalSlice";
import {ReactComponent as Star} from "src/assets/Table/Star.svg";
import CircularBadge from "../../../../../UI/Circular/CircularBadge";
import {useDispatch, useSelector} from "react-redux";
import {AnimatePresence} from "framer-motion";
import ModalUI from "../../../../../UI/ModalComponents/ModalUI/ModalUI";
import VerifyModal from "../../VerifyModal/VerifyModal";
import AdvertStatus from "../../../../../UI/AdvertStatus/AdvertStatus";

function AddInventoryData ({inventor, selectedRows, setSelectedRows, expandedRows}) {
  const dispatch = useDispatch ();
  const [selectedInventoryId, setSelectedInventoryId] = React.useState ('')
  const {showVerify} = useSelector ((state) => state.modal)
  const [showModalSelectingVerify, setShowModalSelectingVerify] =
    React.useState (false)

  function handleRowClick (rowId) {
    if (selectedRows.includes (rowId)) {
      setSelectedRows (selectedRows.filter ((id) => id !== rowId));
    } else {
      setSelectedRows ([...selectedRows, rowId]);
    }
  }

  const filteredVideoLink = inventor.find (
    (item) => item.id === selectedInventoryId,
  )
  console.log (filteredVideoLink)
  return (
    <>
      <AnimatePresence>
        {showVerify && (
          <ModalUI>
            <VerifyModal
              setShowModalSelectingVerify={setShowModalSelectingVerify}
              onInventoryVerify
              expandedRows={expandedRows}
              selectedInventoryId={selectedInventoryId}
              videoLink={filteredVideoLink}
            />
          </ModalUI>
        )}
      </AnimatePresence>
      {inventor.map ((advert, i) => (
        <>
          <tr
            key={i}
            onClick={() => handleRowClick (advert.id)}
            className={selectedRows.includes (advert.id) ? "selected" : ""}
          >

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
              <FormatterView data={advert.online_views}/>
            </th>

            <th className={style.table__tr_th}>
              {
                advert.status === "in_use" ? <AdvertStatus status={advert.status}/>
                  : <div style={{width: "fit-content"}}
                  >
                    <ButtonBorder
                      onClick={() => {
                        dispatch (showModalVerify ());
                        setSelectedInventoryId (() => advert.id);
                      }}
                      style={{position: "relative", width: "fit-content"}}
                    >
                      <Star
                        style={{
                          width: "16px",
                          height: "16px",
                          marginRight: "5px",
                        }}
                      />
                      {advert.video_content.link_to_video ? (
                        <CircularBadge
                          style={{
                            backgroundColor: "#4833d0",
                            width: "15px",
                            height: "15px",
                            top: "-5px",
                            right: "-5px",
                            position: "absolute",
                          }}
                        />
                      ) : (
                        ""
                      )}
                      Проверить
                    </ButtonBorder>

                  </div>
              }

            </th>
          </tr>
        </>
      ))}
    </>
  );
}

export default AddInventoryData;
