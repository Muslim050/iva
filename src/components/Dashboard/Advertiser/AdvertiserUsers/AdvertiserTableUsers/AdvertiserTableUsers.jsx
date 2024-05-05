import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {ReactComponent as Add} from "src/assets/Table/add.svg";
import {showModalAdvertiserUser} from "src/redux/modalSlice";
import {sortData} from "src/utils/SortData";
import {SortButton} from "src/utils/SortButton";
import ButtonTable from "src/components/UI/ButtonTable/ButtonTable";
import AdvertiserTableUsersList from "./AdvertiserTableUsersList";
import {fetchAdvertiserUsers} from "src/redux/advertiserUsers/advertiserUsersSlice";
import {ReactComponent as Reload} from "src/assets/Table/reload.svg";

const headers = [
  {key: "id", label: "№"},
  {key: "user_name", label: "Username"},
  {key: "advertiser.name", label: "Рекламодатель"},
  {key: "first_name", label: "Имя"},
  {key: "last_name", label: "Фамилия"},
  {key: "email", label: "Email"},
  {key: "side", label: "Роль"},
  {key: "phone_number", label: "Номер"},
];

function AdvertiserTableUsers () {
  const dispatch = useDispatch ();
  const [loading, setLoading] = React.useState (true);
  const [sortKey, setSortKey] = React.useState ("user_name");
  const [sort, setSort] = React.useState ("ascn");
  const role = localStorage.getItem ('role');
  const data = useSelector ((state) => state.advertiserUsers.advertiserUsers);
  React.useEffect (() => {
    dispatch (fetchAdvertiserUsers ()).then (() => setLoading (false));
  }, [dispatch]);

  const sortedData = React.useCallback (
    () =>
      sortData ({
        tableData: data,
        sortKey,
        reverse: sort === "desc",
      }),
    [data, sortKey, sort]
  );

  function changeSort (key) {
    setSort (sort === "ascn" ? "desc" : "ascn");
    setSortKey (key);
  }

  const handleButtonClick = () => {
    dispatch (showModalAdvertiserUser ());
  };
  const handleReload = () => {
    dispatch (fetchAdvertiserUsers ());
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
            <div style={{display: "flex", alignItems: "center"}}>
              Таблица пользователи рекламодателей &nbsp;
              <ButtonTable onClick={handleReload}>
                <Reload style={{width: "23px", height: "23px"}}/>
              </ButtonTable>
            </div>
            {
              role === 'admin' &&
              <ButtonTable onClick={handleButtonClick}>
                <Add style={{width: "25px", marginRight: "12px"}}/>
                Создать пользователя
              </ButtonTable>
            }

          </div>
          {data.length ? (
            <table style={{width: "100%"}}>
              <thead>
              <tr>
                {headers.map ((row) => {
                  return (
                    <th key={row.key}>
                      <SortButton
                        row={row.label}
                        columnKey={row.key}
                        onClick={() => changeSort (row.key)}
                        sort={sort}
                        sortKey={sortKey}
                      />
                    </th>
                  );
                })}
              </tr>
              </thead>

              <tbody>
              <AdvertiserTableUsersList sortedData={sortedData}/>
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

export default AdvertiserTableUsers;
