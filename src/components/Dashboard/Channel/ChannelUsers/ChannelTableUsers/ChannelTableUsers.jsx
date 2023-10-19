import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PublisherTableUsersList from "./ChannelTableUsersList";
import style from "./ChannelTableUsers.module.scss";
import { toast } from "react-toastify";
import {
  fetchChannelUsers,
  selectUsers,
} from "../../../../../redux/channelUsers/channelUsersSlice";
import ButtonTable from "src/components/UI/ButtonTable/ButtonTable";
import { showModalChannelUser } from "src/redux/modalSlice";
import { ReactComponent as Reload } from "src/assets/Table/reload.svg";
import { ReactComponent as Add } from "src/assets/Table/add.svg";
import { sortData } from "src/utils/SortData";
import { SortButton } from "src/utils/SortButton";
const headers = [
  { key: "id", label: "№" },
  { key: "name", label: "Логин" },
  { key: "channel.name", label: "Канал" },
  { key: "publisher.name", label: "Имя" },
  { key: "email", label: "Фамилия" },
  { key: "phone_number", label: "Email" },
  { key: "channel_id", label: "Роль" },
  { key: "is_connected", label: "Номер" },
];
function ChannelTableUsers({ setShowModal }) {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.channelUsers.channelUsers);
  const [loading, setLoading] = React.useState(true);
  const [sortKey, setSortKey] = React.useState("last_name");
  const [sort, setSort] = React.useState("ascn");
  React.useEffect(() => {
    dispatch(fetchChannelUsers()).then(() => setLoading(false));
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
    dispatch(showModalChannelUser());
  };
  const handleReload = () => {
    dispatch(fetchChannelUsers());
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
          {data.length ? (
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

export default ChannelTableUsers;
