import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as XLSX from "xlsx";
import { ReactComponent as Reload } from "src/assets/Table/reload.svg";
import { ReactComponent as Download } from "src/assets/Table/Download.svg";
import ConfirmedData from "./ConfirmedData";
import ConfirmedRows from "./ConfirmedRows";
import ButtonTable from "src/components/UI/ButtonTable/ButtonTable";
import { sortData } from "src/utils/SortData";
import { fetchConfirmedIInventory } from "src/redux/inventory/inventorySlice";

function ConfirmedTable() {
  const dispatch = useDispatch();
  const [sortKey, setSortKey] = React.useState("last_name");
  const [sort, setSort] = React.useState("desc");
  const { сonfirmedInventories } = useSelector((state) => state.inventory);
  const [loading, setLoading] = React.useState(true);

  const download = () => {
    const newData = сonfirmedInventories.map((order, index) => {
      return {
        Формат: order.format,
        Предполагаемый_старт: new Date(order.assigned_order.expected_start_date)
          .toLocaleDateString("en-GB")
          .substr(0, 10),
        Предполагаемый_финиш: new Date(order.assigned_order.expected_end_date)
          .toLocaleDateString("en-GB")
          .substr(0, 10),
        Ссылка_на_ролик: order.assigned_order.promo_file,

        НАЗВАНИЕ_ВИДЕО: order.video_content.name,
        КАТЕГОРИЯ: order.video_content.category,
        НАЧАТЬ_С: order.start_at,
      };
    });
    const workSheet = XLSX.utils.json_to_sheet(newData);
    const workBook = XLSX.utils.book_new();
    const wrapTextStyle = {
      alignment: { wrapText: true },
    };
    XLSX.utils.book_append_sheet(workBook, workSheet, "students");
    let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });

    XLSX.writeFile(workBook, "confirmed_order.xlsx");
  };
  const handleReload = () => {
    dispatch(fetchConfirmedIInventory());
  };
  React.useEffect(() => {
    dispatch(fetchConfirmedIInventory()).then(() => setLoading(false));
  }, [dispatch]);
  const sortedData = React.useCallback(
    () =>
      sortData({
        tableData: сonfirmedInventories,
        sortKey,
        reverse: sort === "desc",
      }),
    [сonfirmedInventories, sortKey, sort]
  );
  function changeSort(key) {
    setSort(sort === "ascn" ? "desc" : "ascn");
    setSortKey(key);
  }
  return (
    <>
      {loading ? (
        <div className="loaderWrapper">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="tableWrapper">
          <div className="tableWrapper__table_title">
            <div style={{ display: "flex", alignItems: "center" }}>
              Потвержденные &nbsp;
              <ButtonTable onClick={handleReload}>
                <Reload style={{ width: "23px", height: "23px" }} />
              </ButtonTable>
            </div>

            <ButtonTable onClick={() => download()}>
              <Download
                style={{ width: "25px", height: "30px", marginRight: "10px" }}
              />
              Выгрузить
            </ButtonTable>
          </div>

          {сonfirmedInventories.length && сonfirmedInventories ? (
            <table className="tableWrapper">
              <thead>
                <ConfirmedRows
                  sortKey={sortKey}
                  sort={sort}
                  changeSort={changeSort}
                />
              </thead>
              <tbody>
                <ConfirmedData sortedData={sortedData} />
              </tbody>
            </table>
          ) : (
            <div className="empty_list">Список пустой. </div>
          )}
        </div>
      )}
    </>
  );
}

export default ConfirmedTable;
