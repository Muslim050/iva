import React from 'react'
import FormatterView from "../../../UI/formatter/FormatterView";
import ModalSentOrder from "./ModalSentOrder";
import style from "./receivedOrders.module.scss";
import OpenTableSentOrder from "../OpenTableSentOrder/OpenTableSentOrder";
import AdvertStatus from "../../../UI/AdvertStatus/AdvertStatus";
import {ReactComponent as Video} from 'src/assets/Table/video.svg'
import {AnimatePresence} from "framer-motion";
import MyModal from "../../../UI/ModalComponents/ModalUI/ModalUI";
import ButtonBorder from "../../../UI/ButtonBorder/ButtonBorder";
import {ReactComponent as Comment} from 'src/assets/Table/comment.svg'
import CommentSentOrderModal from "../CommentSentOrderModal/CommentSentOrderModal";
import {formatDate} from "../../../../utils/formatterDate";
import CircularBadge from "../../../UI/Circular/CircularBadge";

function SentOrderList ({
                          listsentPublisher,
                        }) {
  const user = localStorage.getItem ('role')
  const [openPopoverIndex, setOpenPopoverIndex] = React.useState (null);
  const [expandedRows, setExpandedRows] = React.useState ('')
  const [showKomment, setShowKomment] = React.useState (false)
  const [currentOrder, setCurrentOrder] = React.useState (null)
  const handleRowClick = (id) => {
    setExpandedRows (id === expandedRows ? false : id)
  }
  return (
    <>
      <AnimatePresence>
        {showKomment && (
          <MyModal>
            <CommentSentOrderModal
              setShowKomment={setShowKomment}
              currentOrder={currentOrder}
            />
          </MyModal>
        )}
      </AnimatePresence>
      {listsentPublisher.map ((item, i) => (

        <>
          <tr>
            <td>
              <div style={{display: 'flex', position: 'relative'}}>
                <div style={{position: 'relative'}}>{i + 1}
                  {user === 'channel' || user === 'publisher' ? (
                    <>
                      {item.order_status === 'in_review' &&
                        <CircularBadge style={{background: "#05b705", width: "12px", height: "12px"}}/>}</>
                  ) : null}
                </div>


              </div>
            </td>
            <td>
              {item.order_name}
            </td>
            <td>
              {(item.format === "preroll" && "Pre-roll") ||
                ("midroll1" && "Mid-roll 1") ||
                ("midroll2" && "Mid-roll 2") ||
                ("midroll3" && "Mid-roll 3") ||
                ("midroll4" && "Mid-roll 4")}
            </td>
            <td>
              {formatDate (item.start_date)}

            </td>
            <td>
              {formatDate (item.end_date)}

            </td>
            <td className={style.td_Order}>
              <div style={{display: 'flex'}}>
                <a
                  href={item.promo_file}
                  target="_blank"
                  className={style.fileWrapper}
                  rel="noreferrer"
                >
                  <Video
                    style={{
                      width: '32px',
                      height: '32px',
                    }}
                  />
                </a>
              </div>
            </td>
            <td>
              <FormatterView data={item.ordered_number_of_views}/>
            </td>
            <td>
              <AdvertStatus status={item.order_status}/>
            </td>

            <td style={{display: "flex", gap: "10px", width: "100%", alignItems: "center", margin: "0"}}>
              <button
                className={style.dopBtn}
                style={{height: "30px"}}
                onClick={() => handleRowClick (item.id)}
              >
                Открыть
              </button>
              {
                item.order_status === 'finished' ? null : (
                  <div>
                    {item?.notes_text ? (
                      <ButtonBorder
                        onClick={() => {
                          setShowKomment (true)
                          setCurrentOrder (item)
                        }}
                      >
                        <Comment
                          style={{
                            width: '16px',
                            height: '16px',
                          }}
                        />
                      </ButtonBorder>
                    ) : null}
                  </div>
                )
              }
              {item.order_status === 'in_progress' || item.order_status === 'finished' ? null :
                <div style={{
                  color: '#53545C',
                  borderRadius: "8px",
                  fontSize: "15px",
                  border: "1.5px solid #53545C",
                  padding: '6.5px 8px',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  position: "relative"
                }}
                     onClick={() => setOpenPopoverIndex (i)}>
                  Размещение
                  {user === 'channel' || user === 'publisher' ? (
                    <>
                      {(item.order_status === 'in_review' || item.order_status === 'confirmed') ?
                        <CircularBadge style={{background: "#05b705", width: "12px", height: "12px"}}/> : null}
                    </>
                  ) : null}
                  {
                    openPopoverIndex === i && (
                      <div style={{
                        width: "430px",
                        position: "absolute",
                        zIndex: "10",
                        background: "#ffffff",
                        borderRadius: "12px",
                        border: "2px solid #cfcfd1",
                        left: "-50%",
                        padding: "12px",
                        boxShadow: "black 0px 0px 15px -7px"
                      }}>
                        <ModalSentOrder setOpenPopoverIndex={setOpenPopoverIndex} item={item}/>
                      </div>
                    )
                  }
                </div>
              }


            </td>
          </tr>

          {expandedRows === item.id && (
            <tr>
              <td

                colSpan="10"
                className={`${style.list__item} ${
                  expandedRows === item.id ? style.list__item__open : ''
                }`}
              >
                <OpenTableSentOrder
                  item={item}
                />
              </td>
            </tr>
          )}
        </>

      ))}
    </>
  )
}

export default SentOrderList
