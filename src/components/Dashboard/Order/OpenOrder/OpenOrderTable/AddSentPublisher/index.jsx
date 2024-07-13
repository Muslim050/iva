import style from "../BindingOrderModal.module.scss";
import React from "react";
import AddSentPublisherRows from "./AddSentPublisherRows";
import AddSentPublisherData from "./AddSentPublisherData";
import {useDispatch, useSelector} from "react-redux";
import {fetchOnceListSentToPublisher} from "../../../../../../redux/order/SentToPublisher";
import AddSendPublisherModal from "./AddSendPublisherModal";
import {motion} from "framer-motion";
import {ReactComponent as Add} from 'src/assets/Table/add.svg'
import FormatterView from "../../../../../UI/formatter/FormatterView";
import AdvertStatus from "../../../../../UI/AdvertStatus/AdvertStatus";

export default function AddSentPublisher ({expandedRows, onceOrder}) {
  const dispatch = useDispatch ();
  const {listsentPublisher} = useSelector ((state) => state.sentToPublisher);
  const [viewNote, setViewNote] = React.useState (false);

  const role = localStorage.getItem ('role')
  React.useEffect (() => {
    dispatch (fetchOnceListSentToPublisher ({expandedRows}))
  }, []);
  let totalOnlineView = 0

  return (
    <>
      <div style={{background: "#e0e0e09e", borderRadius: "15px", margin: "5px 0"}}>
        <table className={style.table} style={{overflow: "auto"}}>
          {viewNote &&
            <thead style={{borderTop: "0"}}>
            <th>Паблишер</th>
            <th>Канал</th>
            <th>Формат</th>
            <th>Период размещения</th>
            <th>Показы</th>
            <th>Бюджет</th>
            <th>Возраст</th>
            <th>Ролик</th>
            <th>Текст и ссылка</th>
            <th>Target</th>
            </thead>}
          <tbody>
          {viewNote && (
            <motion.tr initial={{opacity: 0, x: -10, filter: "blur(10px)"}}
                       animate={{opacity: 1, x: 0, filter: "blur(0px)"}}
                       transition={{duration: 0.5}}>

              <AddSendPublisherModal expandedRows={expandedRows} setViewNote={setViewNote} onceOrder={onceOrder}/>
            </motion.tr>
          )}
          </tbody>
        </table>
        {
          onceOrder.status === 'finished' ? null :
            <div style={{display: "flex", justifyContent: "center", padding: "10px"}}>
              <button className={style.ok_btn} onClick={() => setViewNote (!viewNote)}>
                {viewNote ? "Отменить создание" :
                  <div style={{display: "flex", alignItems: "center"}}><Add style={{width: '25px', height: '23px'}}/>Добавить
                    запись</div>}
              </button>
            </div>
        }

      </div>

      <div className={style.container}>
        {listsentPublisher.length > 0 ? (
          <div className={style.tableWrapper}>
            <table className={style.table}>
              <thead>
              <AddSentPublisherRows/>
              </thead>
              <tbody>
              <AddSentPublisherData listsentPublisher={listsentPublisher} expandedRows={expandedRows}
                                    onceOrder={onceOrder} totalOnlineView={totalOnlineView}/>
              </tbody>
            </table>
            <div style={{
              display: 'flex',
              justifyContent: 'end',
              marginTop: '10px',
              width: '100%',
            }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  border: '2px solid #ff991e',
                  borderRadius: '12px',
                  background: '#ffcc9163',
                  marginRight: '10px',
                  marginBottom: "10px",

                }}
              >
                {onceOrder === 'finished' ? (
                  ''
                ) : (
                  <div
                    style={{
                      display: 'flex',
                      padding: '8px 10px',
                    }}
                  >
                    <div style={{marginRight: '5px'}}>Итого показы:</div>
                    <FormatterView data={totalOnlineView}/>
                  </div>
                )}
                {onceOrder === 'finished' ? (
                  ''
                ) : (
                  <div
                    style={{
                      display: 'flex',
                      padding: '8px 10px',
                      borderLeft: '2px solid #ff991d',
                    }}
                  >
                    <div style={{marginRight: '5px'}}> Остаток:</div>
                    <FormatterView
                      data={onceOrder.expected_number_of_views - onceOrder.online_views}
                    />
                  </div>
                )}
                {onceOrder === 'finished' ? (
                  ''
                ) : (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '0px 10px',
                      borderLeft: '2px solid #ff991d',

                    }}
                  >
                    <div style={{marginRight: '5px'}}>Статус:</div>
                    <AdvertStatus status={onceOrder.status}>
                      {role === 'admin' || role === 'advertising_agency' ? (
                        <>
                          {role === 'admin' || role === 'advertising_agency' ? (
                            <>
                              {onceOrder.status === 'in_progress' ? (
                                <div
                                  style={{
                                    display: (() => {
                                      const ratie = Math.floor (
                                        (onceOrder.online_views /
                                          onceOrder.expected_number_of_views) *
                                        100,
                                      )
                                      if (ratie >= 1) {
                                        return 'initial'
                                      }
                                      return 'none'
                                    }) (),
                                    padding: '1px 5px',
                                    borderRadius: '7px',
                                    fontWeight: '600',
                                    background: (() => {
                                      const ratie = Math.floor (
                                        (onceOrder.online_views /
                                          onceOrder.expected_number_of_views) *
                                        100,
                                      )

                                      if (ratie >= 100) {
                                        return '#ec2020'
                                      } else if (ratie >= 80) {
                                        return '#fd8b00'
                                      } else if (ratie >= 50) {
                                        return 'rgba(50, 147, 111, 0.16)'
                                      } else if (ratie >= 1) {
                                        return 'rgb(86 112 241)'
                                      }
                                      return 'inherit'
                                    }) (),

                                    color: (() => {
                                      const ratio =
                                        (onceOrder.online_views /
                                          onceOrder.expected_number_of_views) *
                                        100

                                      if (ratio >= 100) {
                                        return '#f8f8f8'
                                      } else if (ratio >= 80) {
                                        return '#764306'
                                      } else if (ratio >= 50) {
                                        return '#047f27'
                                      } else if (ratio >= 1) {
                                        return 'rgb(228 232 253)'
                                      }
                                      return 'inherit'
                                    }) (),
                                  }}
                                >
                                  {onceOrder.online_views > 0 &&
                                    Math.floor (
                                      (onceOrder.online_views /
                                        onceOrder.expected_number_of_views) *
                                      100,
                                    ) +
                                    ' ' +
                                    '%'}
                                </div>
                              ) : null}
                              {onceOrder.status === 'finished' ? (
                                <div
                                  style={{
                                    display: 'initial',
                                    padding: '1px 4px',
                                    borderRadius: '7px',
                                    background: 'rgb(156 81 81)',
                                    color: '#eedede',
                                    marginLeft: '10px',
                                  }}
                                >
                                  100%
                                </div>
                              ) : null}
                            </>
                          ) : null}
                        </>
                      ) : null}
                    </AdvertStatus>
                  </div>

                )}
              </div>

            </div>
          </div>
        ) : (
          <div style={{fontSize: "15px", color: "gray"}} className={style['no-records']}>
            Нет записей, Добавьте размещение
          </div>
        )}

      </div>
    </>
  )
}

