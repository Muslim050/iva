import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PublisherTableUsersList from "./PublisherTableUsersList";
import {
  fetchPublisherUsers,
  selectUsers,
} from "../../../../../redux/publisherUsers/publisherUsersSlice";
import { ReactComponent as Reload } from "src/assets/Table/reload.svg";

import { showModalPablisherUser } from "src/redux/modalSlice";
import { sortData } from "src/utils/SortData";
import { ReactComponent as Add } from "src/assets/Table/add.svg";
import ButtonTable from "src/components/UI/ButtonTable/ButtonTable";
import { SortButton } from "src/utils/SortButton";

const headers = [
  { key: "id", label: "№" },
  { key: "user_name", label: "Логин" },
  { key: "publisher.name", label: "Паблишер" },
  { key: "first_name", label: "Имя" },
  { key: "last_name", label: "Фамилия" },
  { key: "email", label: "Email" },
  { key: "side", label: "Роль" },
  { key: "phone_number", label: "Номер" },
];
function PublisherTableUsers() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.publisherUser.publisherUsers);
  const [loading, setLoading] = React.useState(true);
  const [sortKey, setSortKey] = React.useState("user_name");
  const [sort, setSort] = React.useState("ascn");
  React.useEffect(() => {
    dispatch(fetchPublisherUsers()).then(() => setLoading(false));
  }, [selectUsers]);
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
    dispatch(showModalPablisherUser());
  };
  const handleReload = () => {
    dispatch(fetchPublisherUsers());
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
              Пользователи &nbsp;
              <ButtonTable onClick={handleReload}>
                <Reload style={{ width: "23px", height: "23px" }} />
              </ButtonTable>
            </div>

            <ButtonTable onClick={handleButtonClick}>
              <Add style={{ width: "25px", marginRight: "12px" }} />
              Создать пользователя
            </ButtonTable>
          </div>
          {data.length && data ? (
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
                <PublisherTableUsersList sortedData={sortedData} />
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

export default PublisherTableUsers;
