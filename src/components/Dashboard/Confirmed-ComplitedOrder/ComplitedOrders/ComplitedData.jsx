import React from "react";
import style from "./ComplitedTable.module.scss";
import { ReactComponent as Linkk } from "src/assets/link.svg";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { toastConfig } from "src/utils/toastConfig";
import { deletedComplitedOrder } from "src/redux/orderStatus/orderStatusSlice";
import { fetchComplitedInventory } from "src/redux/inventory/inventorySlice";
import { ReactComponent as Delete } from "src/assets/Table/Delete.svg";
import ButtonBorder from "src/components/UI/ButtonBorder/ButtonBorder";
import { ReactComponent as Google } from "src/assets/googleIcon.svg";

function ComplitedData({ sortedData }) {
  const dispatch = useDispatch();

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const paddedMinutes = String(minutes).padStart(2, "0");
    const remainingSeconds = seconds % 60;
    const paddedSeconds = String(remainingSeconds).padStart(2, "0");
    return `${paddedMinutes}:${paddedSeconds}`;
  };

  const handleDeletedInventory = (inventory_id) => {
    const confirmDeactivate = window.confirm("Вы уверены, что хотите ?");
    if (confirmDeactivate) {
      dispatch(deletedComplitedOrder({ inventory_id }))
        .then(() => {
          toast.success("Удаление успешно завершено", toastConfig);
          dispatch(fetchComplitedInventory());
        })
        .catch((error) => {
          toast.error(error.message, toastConfig);
          dispatch(fetchComplitedInventory());
        });
    } else {
      toast.info("Операция отменена", toastConfig);
    }
  };

  return (
    <>
      {sortedData() &&
        sortedData().map((advert, i) => (
          <>
            <tr key={i}>
              <td className={style.ComplitedDatatable_td}>{i + 1}</td>
              <td className={style.ComplitedDatatable_td}>
                {advert.assigned_order.name}
              </td>
              <td className={style.ComplitedDatatable_td}>
                {(advert.format === "preroll" && "Pre-roll") ||
                  ("mixroll" && "Mix-roll")}
              </td>

              <td className={style.ComplitedDatatable_td}>
                {new Date(advert.deactivation_date)
                  .toLocaleDateString("en-GB")
                  .replace(/\//g, ".")}
              </td>

              <th className={style.ComplitedDatatable_td}>
                <a
                  target="_blank"
                  href={advert.verified_link_with_timecode}
                  className={style.linkWrapper__file}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  {advert.video_content.name}
                  <Linkk className={style.linkk__svg} />
                </a>
              </th>

              <th className={style.ComplitedDatatable_td}>
                <div key={i.start_at}>
                  <td>{formatTime(advert.start_at)}</td>
                </div>
              </th>

              <th
                className={style.ComplitedDatatable_td}
                style={{ fontWeight: "400" }}
              >
                {advert.removal_date ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginLeft: "7px",
                      marginRight: "10px",
                      width: "100%",
                      lineHeight: "9px",
                    }}
                  >
                    <div>
                      <div>{advert.removal_date.split("T")[0]}</div>
                      <br />
                      <div>
                        {new Date(advert.removal_date).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  </div>
                ) : (
                  <ButtonBorder
                    onClick={() => handleDeletedInventory(advert.id)}
                  >
                    <Delete
                      style={{
                        width: "16px",
                        height: "16px",
                        marginRight: "5px",
                      }}
                    />
                    Подтвердить Удаление
                  </ButtonBorder>
                )}
              </th>

              <th>
                {advert.status === "finished" ? (
                  ""
                ) : (
                  <td style={{ padding: "0px" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        background: advert.is_paid ? "#DEEEE8" : "#ffcece", // Измените цвет фона в зависимости от channel.is_connected
                        display: "-webkit-inline-box",
                        padding: "3px",
                        borderRadius: "12px",
                        boxShadow: advert.is_paid
                          ? "0 0 4px #519C66"
                          : "0 0 4px #FF0000",
                        border: advert.is_paid
                          ? "1px solid #519C66"
                          : "1px solid #FF0000", // Измените цвет границы в зависимости от channel.is_connected
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        {advert.is_paid ? (
                          <div className={style.table__status}>
                            Оплачено
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                marginLeft: "10px",
                                width: "100%",
                                justifyContent: "center",
                                lineHeight: "6px",
                                textAlign: "center",
                              }}
                            >
                              <div>
                                <div>{advert.payment_date.split("T")[0]}</div>
                                <br />
                                <div>
                                  {new Date(
                                    advert.payment_date
                                  ).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className={style.table__tr_th_estatus}>
                            Не Оплачено
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                )}
              </th>
            </tr>
          </>
        ))}
    </>
  );
}

export default ComplitedData;
