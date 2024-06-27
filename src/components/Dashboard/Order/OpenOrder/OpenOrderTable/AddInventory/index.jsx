import style from "../BindingOrderModal.module.scss";
import AddInventoryData from "./AddInventoryData";
import React from "react";
import {useDispatch} from "react-redux";
import {deactivateInventories} from "../../../../../../redux/orderStatus/orderStatusSlice";
import {toastConfig} from "../../../../../../utils/toastConfig";
import {toast} from "react-toastify";
import axios from "axios";
import backendURL from "../../../../../../utils/url";

export default function AddInventory ({getOrder, setSelectedRows, selectedRows, expandedRows}) {
  const dispatch = useDispatch ()


  const fetchOnceOrder = async () => {
    const token = localStorage.getItem ("token");
    const response = await axios.get (
      `${backendURL}/order/${expandedRows}/`,

      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };


  const handleDeactivateInventory = (inventory_id) => {
    const confirmDeactivate = window.confirm (
      'Вы уверены, что хотите завершить инвентарь?',
    )
    if (confirmDeactivate) {
      dispatch (deactivateInventories ({inventory_id}))
        .then (() => {
          toast.success ('Инвентарь успешно завершен', toastConfig)
          fetchOnceOrder ()
        })
        .catch ((error) => {
          toast.error (error.message, toastConfig)
          fetchOnceOrder ()
        })
    } else {
      toast.error ('Попробуйте еще раз', toastConfig)
      fetchOnceOrder ()
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
              Время публикаций
            </th>

            <th style={{color: "#717377", fontWeight: "500"}}>
              Показы
            </th>
            <th style={{color: "#717377", fontWeight: "500"}}>
              Ссылка
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
        <div className="empty_list">Список пустой.</div>
      )}
    </div>
  )
}

