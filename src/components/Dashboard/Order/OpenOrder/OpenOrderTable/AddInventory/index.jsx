import style from "../BindingOrderModal.module.scss";
import AddInventoryRows from "./AddInventoryRows";
import AddInventoryData from "./AddInventoryData";
import React from "react";

export default function AddInventory ({getOrder, setSelectedRows, selectedRows, expandedRows}) {
  return (
    <div className={style.tableWrapper}>
      {getOrder.length && getOrder ? (
        <table className={style.table}>
          <thead>
          <AddInventoryRows
            setSelectedRows={setSelectedRows}
            selectedRows={selectedRows}
            inventor={getOrder}
          />
          </thead>
          <tbody>
          <AddInventoryData
            inventor={getOrder}
            expandedRows={expandedRows}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
          />
          </tbody>
        </table>
      ) : (
        <div className="empty_list">Список пустой.</div>
      )}
    </div>
  )
}

