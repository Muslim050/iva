import style from "../BindingOrderModal.module.scss";
import AddInventoryData from "./AddInventoryData";
import React from "react";
import {useDispatch} from "react-redux";
import {deactivateInventories} from "../../../../../../redux/orderStatus/orderStatusSlice";
import {toastConfig} from "../../../../../../utils/toastConfig";
import {toast} from "react-toastify";
import {fetchOrder} from "../../../../../../redux/order/orderSlice";

export default function AddInventory ({getOrder, setSelectedRows, selectedRows, expandedRows, fetchGetOrder}) {
  const dispatch = useDispatch ()


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
              Формат
            </th>
            <th style={{color: "#717377", fontWeight: "500"}}>
              Прогноз показов
            </th>
            <th style={{color: "#717377", fontWeight: "500"}}>
              Категория
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
              Действия/Статус
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
          />
          </tbody>
        </table>
      ) : (
        <div className="empty_list" style={{padding: "10px 0"}}>Список пустой, добавьте размещение</div>
      )}
    </div>
  )
}

