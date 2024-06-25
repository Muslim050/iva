import React from 'react'
import FormatterView from "../../../UI/formatter/FormatterView";
import ModalSentOrder from "./ModalSentOrder";
import style from "./receivedOrders.module.scss";
import OpenTableSentOrder from "../OpenTableSentOrder/OpenTableSentOrder";
import AdvertStatus from "../../../UI/AdvertStatus/AdvertStatus";

function SentOrderList ({
                          listsentPublisher,
                        }) {
  const [openPopoverIndex, setOpenPopoverIndex] = React.useState (null);
  const [expandedRows, setExpandedRows] = React.useState ('')

  const handleRowClick = (id) => {
    setExpandedRows (id === expandedRows ? false : id)

    // const item = listsentPublisher.find ((item) => item.id === id)

  }

  return (
    <>
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
              {new Date (item.start_date)
                .toLocaleDateString ('en-GB')
                .replace (/\//g, '.')}
              -
              {new Date (item.end_date)
                .toLocaleDateString ('en-GB')
                .replace (/\//g, '.')}
            </td>
            <td>
              <FormatterView data={item.ordered_number_of_views}/>
            </td>

            <td>
              <AdvertStatus status={item.order_status}/>
            </td>
            <td style={{position: "relative", display: "flex", gap: "10px"}}>
              {item.order_status === 'confirmed' ? null :
                <div style={{
                  color: '#53545C',
                  borderRadius: "8px",
                  fontSize: "15px",
                  border: "1.5px solid #53545C",
                  padding: '6.5px 8px',
                  cursor: 'pointer',
                  display: 'inline-flex'
                }}
                     onClick={() => setOpenPopoverIndex (i)}>
                  Размещение
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

              <button
                className={style.dopBtn}
                style={{height: "30px"}}
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
