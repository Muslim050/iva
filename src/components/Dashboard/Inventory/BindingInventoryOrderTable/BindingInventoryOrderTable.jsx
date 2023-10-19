import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import style from "./BindingInventoryOrderTable.module.scss";
import SelectRows from "./BindingInventoryOrderTableRows";
import axios from "axios";
import { confirmByChannel } from "../../../../redux/orderStatus/orderStatusSlice";

import BindingInventoryOrderTableData from "./BindingInventoryOrderTableData";
import { toastConfig } from "../../../../utils/toastConfig";
import { fetchInventory } from "../../../../redux/inventory/inventorySlice";
import backendURL from "src/utils/url";
import { SortButton } from "src/utils/SortButton";
import { sortData } from "src/utils/SortData";

const headers = [
  { key: "id", label: "№" },
  { key: "format", label: "Формат рекламы" },
  { key: "expected_number_of_views", label: "Прогноз показов" },
  { key: "expected_start_date", label: " Ожидаемая дата начало" },
  { key: "expected_end_date", label: "Ожидаемая дата окончания" },
  { key: "promo_file", label: "Ролик" },
];

function BindingInventoryOrderTable({ expandedRows }) {
  const dispatch = useDispatch();
  const [sortKey, setSortKey] = React.useState("last_name");
  const [sort, setSort] = React.useState("ascn");
  const [getInventory, setGetInventory] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const fetchGetInventory = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("token");

    const response = await axios.get(
      `${backendURL}/inventory/${expandedRows}/`,

      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setGetInventory([response.data.data]);
    setIsLoading(false);
  };

  function handleConfirmInventoryByChannel(inventory) {
    const confirmInventoryByChannel = window.confirm(
      "Статус меняется на confirm by channel?"
    );
    if (confirmInventoryByChannel) {
      dispatch(confirmByChannel({ expandedRows, inventory }))
        .then(() => {
          toast.success("Статус успешно изменился!", toastConfig);
          fetchGetInventory();
        })
        .catch((error) => {
          toast.error(error.message, toastConfig);
          fetchGetInventory();
        });
    } else {
      toast.info("Операция отменена", toastConfig);
    }
  }
  React.useEffect(() => {
    fetchGetInventory();
  }, [dispatch]);

  const sortedData = React.useCallback(
    () =>
      sortData({
        tableData: getInventory,
        sortKey,
        reverse: sort === "desc",
      }),
    [getInventory, sortKey, sort]
  );
  function changeSort(key) {
    setSort(sort === "ascn" ? "desc" : "ascn");
    setSortKey(key);
  }

  return (
    <>
      {isLoading ? (
        <div className={style.loaderWrapper}>
          <div className={style.spinner}></div>
        </div>
      ) : !getInventory ||
        getInventory.length === 0 ||
        getInventory.assigned_order === null ? (
        <div className="empty_list">Список пустой. Добавьте инвентарь!</div>
      ) : (
        <div className="tableWrapper">
          <table>
            <thead>
              <tr>
                {headers.map((row) => {
                  return (
                    <th key={row.key}>
                      <SortButton
                        row={row.label}
                        columnKey={row.key}
                        onClick={() => changeSort(row.key)}
                        sort={sort}
                        sortKey={sortKey}
                      />
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              <BindingInventoryOrderTableData
                expandedRows={expandedRows}
                sortedData={sortedData}
                onInventoryConfirmByChannel={handleConfirmInventoryByChannel}
              />
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default BindingInventoryOrderTable;
