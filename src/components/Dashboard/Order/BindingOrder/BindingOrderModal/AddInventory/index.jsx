import style from "../BindingOrderModal.module.scss";
import AddInventoryRows from "./AddInventoryRows";
import AddInventoryData from "./AddInventoryData";
import React from "react";

export default function AddInventory ({filteredInventory, setSelectedRows, selectedRows}) {
  return (
    <div className={style.tableWrapper}>
      {filteredInventory.length && filteredInventory ? (
        <table className={style.table}>
          <thead>
          <AddInventoryRows
            setSelectedRows={setSelectedRows}
            selectedRows={selectedRows}
            inventor={filteredInventory}
          />
          </thead>
          <tbody>
          <AddInventoryData
            inventor={filteredInventory}
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

