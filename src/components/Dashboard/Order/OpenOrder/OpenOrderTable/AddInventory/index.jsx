import style from "../BindingOrderModal.module.scss";
import AddInventoryData from "./AddInventoryData";
import React from "react";
import {useDispatch} from "react-redux";
import {deactivateInventories} from "../../../../../../redux/orderStatus/orderStatusSlice";
import {toastConfig} from "../../../../../../utils/toastConfig";
import {toast} from "react-toastify";
import {fetchOrder} from "../../../../../../redux/order/orderSlice";
import AdvertStatus from "../../../../../UI/AdvertStatus/AdvertStatus";
import FormatterView from "../../../../../UI/formatter/FormatterView";

export default function AddInventory ({
                                        getOrder,
                                        setSelectedRows,
                                        selectedRows,
                                        expandedRows,
                                        fetchGetOrder,
                                        statusOr,
                                        onceOrder
                                      }) {
  const dispatch = useDispatch ()
  const role = localStorage.getItem ('role')
  const handleDeactivateInventory = (inventory_id) => {
    const confirmDeactivate = window.confirm (
      'Вы уверены, что хотите завершить инвентарь?',
    )
    if (confirmDeactivate) {
      dispatch (deactivateInventories ({inventory_id}))
        .then (() => {
          toast.success ('Инвентарь успешно завершен', toastConfig)
          fetchGetOrder (); // Вызов функции после успешного запроса
        })
        .catch ((error) => {
          toast.error (error.message, toastConfig)
          fetchGetOrder (); // Вызов функции после успешного запроса
        })
    } else {
      toast.info ('Операция отменена', toastConfig)
      dispatch (fetchOrder ())
    }
  }
  let totalOnlineView = 0


  return (
    <div className={style.tableWrapper}>
      {getOrder.length && getOrder ? (
        <table className={style.table}>
          <thead>
          <tr>
            <th style={{color: "#717377", fontWeight: "500"}}>
              №
            </th>
            <th style={{color: "#717377", fontWeight: "500"}}>
              Канал
            </th>
            <th style={{color: "#717377", fontWeight: "500"}}>
              Название Видео
            </th>
            <th style={{color: "#717377", fontWeight: "500"}}>
              Категория
            </th>
            <th style={{color: "#717377", fontWeight: "500"}}>
              Формат
            </th>
            <th style={{color: "#717377", fontWeight: "500"}}>
              Прогноз показов
            </th>

            <th style={{color: "#717377", fontWeight: "500"}}>
              Ссылка
            </th>
            <th style={{color: "#717377", fontWeight: "500"}}>
              Время публикаций
            </th>
            <th style={{color: "#717377", fontWeight: "500"}}>
              Показы
            </th>
            <th style={{color: "#717377", fontWeight: "500"}}>
              Статус/Действия
            </th>
          </tr>
          </thead>
          <tbody>
          <AddInventoryData
            inventor={getOrder}
            expandedRows={expandedRows}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
            handleDeactivateInventory={handleDeactivateInventory}
            statusOr={statusOr}
            totalOnlineView={totalOnlineView}
          />
          </tbody>
        </table>
      ) : (
        <div className="empty_list" style={{padding: "10px 0"}}>Список пустой, добавьте размещение</div>
      )}
      {
        role === 'admin' ? <div style={{
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
              marginBottom: "10px"

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

        </div> : null
      }


    </div>
  )
}

