import React from 'react'
import FormatterView from "../../../UI/formatter/FormatterView";
import style from "./receivedOrders.module.scss";
import OpenTableSentOrder from "../OpenTableSentOrder/OpenTableSentOrder";
import AdvertStatus from "../../../UI/AdvertStatus/AdvertStatus";
import {ReactComponent as Video} from 'src/assets/Table/video.svg'
import {AnimatePresence} from "framer-motion";
import MyModal from "../../../UI/ModalComponents/ModalUI/ModalUI";
import CommentSentOrderModal from "../CommentSentOrderModal/CommentSentOrderModal";
import {formatDate} from "../../../../utils/formatterDate";

function SentOrderList ({
                          listsentPublisher,
                        }) {
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
              <div style={{display: 'flex'}}>
                <div>{i + 1}</div>
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
              <AdvertStatus status={item.order_status} endDate={item.deactivation_date}/>
            </td>
            <td>
              <button
                className={style.dopBtn}
                style={{height: "30px", display: "flex", justifyContent: "space-between"}}
                onClick={() => handleRowClick (item.id)}
              >
                Открыть
              </button>
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
