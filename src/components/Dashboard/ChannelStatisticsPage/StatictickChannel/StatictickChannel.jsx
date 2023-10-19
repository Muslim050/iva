import React from "react";
import style from "./StatictickChannelTable.module.scss";
import TheadFirst from "./components/TheadDataDopTable/Thead/TheadFirst";
import TheadSecondWrapper from "./components/TheadDataDopTable/Thead/TheadSecondWrapper";
import StatictickData from "./components/StatictickData";
import StatictickChannelThead from "./components/StatictickChannelThead";
import DataDopTable from "./components/TheadDataDopTable/Data/DataDopTable";

function StatictickChannel({ dataChannel, channel }) {
  const [expandedRows, setExpandedRows] = React.useState("");

  const handleRowClick = (id) => {
    setExpandedRows((prevExpandedRows) =>
      id === prevExpandedRows ? false : id
    );
  };

  return (
    <>
      <div className="tableWrapper" style={{ marginTop: "10px" }}>
        <div className="tableWrapper__table_title">
          <div style={{ display: "flex", alignItems: "center" }}>
            Статистика канала
          </div>
        </div>

        {channel ? (
          <div className="loaderWrapper" style={{ height: "20vh" }}>
            <div style={{ color: "var(--text-color, )" }}>
              Загрузка статистики &nbsp;
            </div>
            <div className="spinner"></div>
          </div>
        ) : (
          <>
            {dataChannel.length === 0 ? (
              <div
                style={{
                  fontSize: "16px",
                  lineHeight: "15px",
                  color: "#fa8a00",
                  textAlign: "center",
                  fontWeight: "600",
                }}
              >
                Нужно обновить токен канала
              </div>
            ) : (
              <table className="tableWrapper">
                {/* верхние столбцы */}
                <thead>
                  <StatictickChannelThead />
                </thead>
                {/* верхние столбцы */}

                <tbody>
                  <>
                    {/* Данные основной таблицы */}
                    <tr>
                      <StatictickData
                        dataChannel={dataChannel}
                        handleRowClick={handleRowClick}
                        expandedRows={expandedRows}
                      />
                    </tr>
                    {/* Данные основной таблицы */}

                    {expandedRows && (
                      <tr className={style.list__item__open}>
                        <td
                          colSpan="6"
                          className={`${style.list__item} ${
                            expandedRows
                              ? // === statistic.id
                                style.list__item__open
                              : ""
                          }`}
                        >
                          <div className="tableWrapper">
                            <table className="tableWrapper">
                              <thead style={{ border: 0 }}>
                                {/* верхние столбцы доп таблицы*/}
                                <tr>
                                  <TheadFirst dataChannel={dataChannel} />
                                </tr>
                                {/* верхние столбцы доп таблицы*/}
                              </thead>

                              <thead style={{ borderTop: "0" }}>
                                {/* столбцы доп таблицы*/}
                                <tr>
                                  <TheadSecondWrapper
                                    dataChannel={dataChannel}
                                  />
                                </tr>
                                {/* столбцы доп таблицы*/}
                              </thead>

                              {/* Данные доп таблицы */}
                              <DataDopTable dataChannel={dataChannel} />
                              {/* Данные доп таблицы */}
                            </table>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                </tbody>
              </table>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default StatictickChannel;
