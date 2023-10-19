import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPublisher } from "../../../../redux/publisher/publisherSlice";
import style from "./PublisherTable.module.scss";
import ButtonTable from "src/components/UI/ButtonTable/ButtonTable";
import { showModalPablisher } from "src/redux/modalSlice";
import { ReactComponent as Add } from "src/assets/Table/add.svg";
import { SortButton } from "src/utils/SortButton";
import { sortData } from "src/utils/SortData";
import FormatterPhone from "src/components/UI/formatter/FormatterPhone";
import { ReactComponent as Reload } from "src/assets/Table/reload.svg";

const headers = [
  { key: "id", label: "№" },
  { key: "name", label: "Имя" },
  { key: "email", label: "Email" },
  { key: "phone_number", label: "Номер телефона" },
];

function PublisherTable() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.publisher.publisher);
  const user = localStorage.getItem("role");
  const [sortKey, setSortKey] = React.useState("last_name");
  const [sort, setSort] = React.useState("ascn");
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    dispatch(fetchPublisher()).then(() => setLoading(false));
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
    dispatch(showModalPablisher());
  };
  const handleReload = () => {
    dispatch(fetchPublisher());
  };
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
              Паблишеры &nbsp;
              <ButtonTable onClick={handleReload}>
                <Reload style={{ width: "23px", height: "23px" }} />
              </ButtonTable>
            </div>

            {user === "publisher" ? (
              ""
            ) : (
              <ButtonTable onClick={handleButtonClick}>
                <Add style={{ width: "25px", marginRight: "12px" }} />
                Создать паблишера
              </ButtonTable>
            )}
          </div>

          {data && data ? (
            <table style={{ width: "100%" }}>
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
                {sortedData().map((pablisher, i) => {
                  return (
                    <tr key={pablisher.id}>
                      <td>{i + 1}</td>
                      <td>{pablisher.name}</td>
                      <td>{pablisher.email}</td>
                      <td>
                        <FormatterPhone phoneNumber={pablisher.phone_number} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div className="empty_list">
              Список пустой. Добавьте Рекламодателя!
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default PublisherTable;
