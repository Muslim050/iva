import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ButtonTable from "src/components/UI/ButtonTable/ButtonTable";
import { fetchOrder } from "../../../../redux/order/orderSlice";
import OrderData from "./OrderData";
import OrderRows from "./OrderRows";
import style from "./OrderTable.module.scss";
import { ReactComponent as Reload } from "src/assets/Table/reload.svg";
import { ReactComponent as Add } from "src/assets/Table/add.svg";
import { showModalOrder } from "src/redux/modalSlice";
import { sortData } from "src/utils/SortData";

function OrderTable() {
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(true);
  const [sortKey, setSortKey] = React.useState("last_name");
  const [sort, setSort] = React.useState("desc");
  const { order } = useSelector((state) => state);

  const user = localStorage.getItem("role");
  const data = order?.order;

  React.useEffect(() => {
    dispatch(fetchOrder()).then(() => setLoading(false));
  }, [dispatch]);
  const sortedData = React.useCallback(
    () =>
      sortData({
        tableData: data,
        sortKey,
        reverse: sort === "desc",
      }),
    [data, sortKey, sort]
  );
  function changeSort(key) {
    setSort(sort === "ascn" ? "desc" : "ascn");
    setSortKey(key);
  }
  const handleButtonClick = () => {
    dispatch(showModalOrder());
  };
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <>
      {loading ? (
        <div className="loaderWrapper">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className={style.tableWrapper_Order}>
          <div className="tableWrapper__table_title">
            <div style={{ display: "flex", alignItems: "center" }}>
              Заказы &nbsp;
              <ButtonTable onClick={handleReload}>
                <Reload style={{ width: "23px", height: "23px" }} />
              </ButtonTable>
            </div>
            {user === "admin" ? (
              ""
            ) : (
              <ButtonTable onClick={handleButtonClick}>
                <Add style={{ width: "25px", marginRight: "12px" }} />
                Создать заказ
              </ButtonTable>
            )}
          </div>

          {data.length && data ? (
            <table className={style.tableWrapper_Order}>
              <thead className={style.thead_Order}>
                <OrderRows
                  data={data}
                  sortKey={sortKey}
                  sort={sort}
                  changeSort={changeSort}
                />
              </thead>
              <tbody className={style.tbody_Order}>
                <OrderData sortedData={sortedData} />
              </tbody>
            </table>
          ) : (
            <div className="empty_list">Список пустой. Добавьте заказ!</div>
          )}
        </div>
      )}
    </>
  );
}

export default OrderTable;
