import React from "react";
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
import {ReactComponent as Deactivate} from "src/assets/Table/deactivate.svg";
import {ReactComponent as Linkk} from 'src/assets/link.svg'
import {formatDate} from "../../../../../../utils/formatterDate";

function AddInventoryData ({inventor, selectedRows, setSelectedRows, expandedRows, handleDeactivateInventory}) {
  const dispatch = useDispatch ();
  const [selectedInventoryId, setSelectedInventoryId] = React.useState ('')
  const role = localStorage.getItem ('role')

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

            <th className={style.table__tr_th}>{i + 1}</th>
            <th className={style.table__tr_th}>
              {advert.channel?.name}
            </th>
            <th className={style.table__tr_th}>{advert.video_content?.name}</th>
            <th className={style.table__tr_th}>
              {advert.video_content?.category}
            </th>
            <th className={style.table__tr_th} style={{color: 'blue'}}>
              {(advert.format === "preroll" && "Pre-roll") ||
                ("midroll1" && "Mid-roll 1") ||
                ("midroll2" && "Mid-roll 2") ||
                ("midroll3" && "Mid-roll 3") ||
                ("midroll4" && "Mid-roll 4")}
            </th>
            <th className={style.table__tr_th}>
              <FormatterView data={advert.expected_number_of_views}/>
            </th>

            <th className={style.table__tr_th}>
              <a
                href={`${advert.video_content.link_to_video}&t=${advert.start_at}`}
                target="_blank"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor:
                    advert.verified_link_with_timecode === null
                      ? 'not-allowed'
                      : 'pointer',
                }}
                className={
                  advert.verified_link_with_timecode === null
                    ? style.linkWrapper__dis
                    : style.linkWrapper__file
                }
                onClick={(e) => {
                  if (advert.verified_link_with_timecode === null) {
                    e.preventDefault ()
                  }
                }}
                rel="noreferrer"
              >
                Ссылка
                <Linkk
                  style={{width: '18px', height: '18px', marginLeft: '5px'}}
                />
              </a>
            </th>

            <th className={style.table__tr_th}>
              {
                advert.video_content?.actual_publication_time === null ? (
                    <>
                      {formatDate (advert.video_content?.publication_time)}
                    </>
                  )
                  : (<>
                    {formatDate (advert.video_content?.actual_publication_time)}</>)
              }

            </th>


            <th className={style.table__tr_th}>
              <FormatterView data={advert.online_views}/>
            </th>
            <th className={style.table__tr_th}>
              <div style={{display: "flex", gap: "5px"}}>
                <AdvertStatus status={advert.status} endDate={advert.deactivation_date}/>
                {
                  (role === 'advertiser' || role === 'advertising_agency' || advert.status === "in_use" || advert.status === "inactive") ?
                    // <AdvertStatus status={advert.status}/>
                    ''
                    :
                    <div style={{width: "fit-content"}}>
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

                {
                  role === 'admin' && advert.status === "in_use" ? (
                    <div>
                      <ButtonBorder onClick={() => handleDeactivateInventory (advert.id)}>
                        <Deactivate
                          style={{
                            width: "16px",
                            height: "16px",
                            marginRight: "5px",
                          }}
                        />
                        Завершить
                      </ButtonBorder>
                    </div>
                  ) : (
                    ""
                  )
                }
              </div>

            </th>
          </tr>
        </>
      ))}
    </>
  );
}

export default AddInventoryData;
