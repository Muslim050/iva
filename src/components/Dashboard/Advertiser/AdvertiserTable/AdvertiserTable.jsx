import React from "react";
import style from "./AdvertiserTable.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as Add } from "src/assets/Table/add.svg";
import { fetchAdvertiser } from "src/redux/advertiser/advertiserSlice";
import { showModalAdvertiser } from "src/redux/modalSlice";
import { SortButton } from "src/utils/SortButton";
import { sortData } from "src/utils/SortData";
import ButtonTable from "src/components/UI/ButtonTable/ButtonTable";
import FormatterPhone from "src/components/UI/formatter/FormatterPhone";
import { ReactComponent as Reload } from "src/assets/Table/reload.svg";

const headers = [
  { key: "id", label: "№" },
  { key: "name", label: "Имя" },
  { key: "email", label: "Email" },
  { key: "phone_number", label: "Номер телефона" },
  { key: "advertising_agency", label: "Рекламное агенство" },
];

function AdvertiserTable() {
  const [sortKey, setSortKey] = React.useState("last_name");
  const [sort, setSort] = React.useState("ascn");
  const [loading, setLoading] = React.useState(true);

  const data = useSelector((state) => state.advertiser.advertisers);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchAdvertiser()).then(() => setLoading(false));
  }, [dispatch]);

  const handleReload = () => {
    dispatch(fetchAdvertiser());
  };

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
    dispatch(showModalAdvertiser());
  };

  return (
    <>
      {loading ? (
        <div className="loaderWrapper" style={{ height: "20vh" }}>
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="tableWrapper">
          <div className="tableWrapper__table_title">
            <div style={{ display: "flex", alignItems: "center" }}>
              Таблица Рекламодателей &nbsp;
              <ButtonTable onClick={handleReload}>
                <Reload style={{ width: "23px", height: "23px" }} />
              </ButtonTable>
            </div>
            <ButtonTable onClick={handleButtonClick}>
              <Add style={{ width: "25px", marginRight: "12px" }} />
              Создать рекламодателя
            </ButtonTable>
          </div>
          {data.length ? (
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
                {sortedData().map((person, i) => {
                  return (
                    <tr key={person.id} className={style.table__tr}>
                      <td>{i + 1}</td>
                      <td>{person.name}</td>
                      <td>{person.email}</td>
                      <td>
                        <FormatterPhone phoneNumber={person.phone_number} />
                      </td>
                      <td>
                        {person.advertising_agency &&
                        person.advertising_agency.name ? (
                          person.advertising_agency.name
                        ) : (
                          <>------</>
                        )}
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

export default AdvertiserTable;
