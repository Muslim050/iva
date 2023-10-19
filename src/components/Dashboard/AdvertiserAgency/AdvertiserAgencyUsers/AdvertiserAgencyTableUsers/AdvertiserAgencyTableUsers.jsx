import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as Add } from "src/assets/Table/add.svg";
import { ReactComponent as Reload } from "src/assets/Table/reload.svg";

import { fetchAdvertiserAgencyUsers } from "../../../../../redux/AgencySlice/advertiserAgencyUsers/advertiserAgencyUsersSlice";
import { showModalAdvertiserAgencyUser } from "src/redux/modalSlice";
import { SortButton } from "src/utils/SortButton";
import { sortData } from "src/utils/SortData";
import style from "./AdvertiserAgencyTableUsers.module.scss";
import ButtonTable from "src/components/UI/ButtonTable/ButtonTable";
import AdvertiserTableUsersList from "./AdvertiserAgencyTableUsersList";

const headers = [
  { key: "id", label: "№" },
  { key: "username", label: "Username" },
  { key: "name", label: "Рекламное агентство" },
  { key: "first_name", label: "Имя" },
  { key: "last_name", label: "Фамилия" },
  { key: "email", label: "Email" },
  { key: "side", label: "Роль" },
  { key: "phone_number", label: "Номер" },
];

function AdvertiserAgencyTableUsers() {
  const dispatch = useDispatch();
  const [sortKey, setSortKey] = React.useState("last_name");
  const [sort, setSort] = React.useState("ascn");
  const [loading, setLoading] = React.useState(true);
  const data = useSelector(
    (state) => state.advertiserAgencyUsers.advertiserAgencyUsers
  );

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

  React.useEffect(() => {
    dispatch(fetchAdvertiserAgencyUsers()).then(() => setLoading(false));
  }, [dispatch]);
  const handleButtonClick = () => {
    dispatch(showModalAdvertiserAgencyUser());
  };
  const handleReload = () => {
    dispatch(fetchAdvertiserAgencyUsers());
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
              Таблица пользователей &nbsp;
              <ButtonTable onClick={handleReload}>
                <Reload style={{ width: "23px", height: "23px" }} />
              </ButtonTable>
            </div>
            <ButtonTable onClick={handleButtonClick}>
              <Add style={{ width: "25px", marginRight: "12px" }} />
              Создать пользователя
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
                <AdvertiserTableUsersList sortedData={sortedData} />
              </tbody>
            </table>
          ) : (
            <div className="empty_list">
              Список пустой. Добавьте Пользователя!
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default AdvertiserAgencyTableUsers;
