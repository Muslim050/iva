import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { AnimatePresence } from "framer-motion";
import BindingOrderTableRows from "./BindingOrderTableRows";
import axios from "axios";
import BindingOrderTableData from "./BindingOrderTableData";
import BindingOrderModal from "../BindingOrderModal/BindingOrderModal";
import { ReactComponent as ArrowR } from "src/assets/arrow-right.svg";
import { ReactComponent as ArrowInv } from "src/assets/Table/arrowInv.svg";
import {
  inventoryPrebook,
  inventoryVerify,
} from "../../../../../redux/inventoryStatus/inventoryStatusSlice";
import { fetchOrder } from "../../../../../redux/order/orderSlice";
import {
  assignInventories,
  confirmOrder,
  deactivateInventories,
  removeInventories,
} from "../../../../../redux/orderStatus/orderStatusSlice";
import { toastConfig } from "../../../../../utils/toastConfig";
import { sortData } from "src/utils/SortData";
import ButtonTable from "src/components/UI/ButtonTable/ButtonTable";
import { hideModalSInventory, showModalSInventory } from "src/redux/modalSlice";
import ModalUI from "src/components/UI/ModalComponents/ModalUI/ModalUI";
import backendURL from "src/utils/url";
import CircularBadge from "src/components/UI/Circular/CircularBadge";
import FormatterView from "src/components/UI/formatter/FormatterView";
import AdvertStatus from "src/components/UI/AdvertStatus/AdvertStatus";

function BindingOrderTable({ expandedRows, statusOr, advert }) {
  const dispatch = useDispatch();
  const [sortKey, setSortKey] = React.useState("last_name");
  const [sort, setSort] = React.useState("ascn");
  const [getOrder, setGetOrder] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const { showSelectedInventory } = useSelector((state) => state.modal);
  const CounterBadge = getOrder.map((i) => i.status)[0];
  const role = localStorage.getItem("role");

  const fetchGetOrder = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${backendURL}/order/${expandedRows}/`,

      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setGetOrder(response.data.data.inventories);
    setIsLoading(false);
  };
  function handleRowsSelected(selectedRows) {
    dispatch(assignInventories({ selectedRows, expandedRows })).then(() => {
      toast.success("Инвентарь успешно привязан к заказу!", toastConfig);
      dispatch(hideModalSInventory());

      dispatch(fetchGetOrder());
    });
  }
  function handleConfirmOrder() {
    dispatch(confirmOrder({ expandedRows })).then(() => {
      dispatch(hideModalSInventory());
      dispatch(fetchOrder());
    });
  }
  const handleRemoveInventory = (expandedRows, inventory_id) => {
    const confirmDelete = window.confirm("Вы уверены, что хотите удалить?");
    if (confirmDelete) {
      dispatch(removeInventories({ expandedRows, inventory_id }))
        .then(() => {
          toast.success("Инвентарь успешно удален", toastConfig);
          fetchGetOrder();
        })
        .catch((error) => {
          toast.error(error.message, toastConfig);
          fetchGetOrder();
        });
    } else {
      toast.info("Операция отменена", toastConfig);
      fetchGetOrder();
    }
  };
  const handleButtonClick = () => {
    dispatch(showModalSInventory());
  };
  const handleDeactivateInventory = (inventory_id) => {
    const confirmDeactivate = window.confirm(
      "Вы уверены, что хотите завершить инвентарь?"
    );
    if (confirmDeactivate) {
      dispatch(deactivateInventories({ inventory_id }))
        .then(() => {
          toast.success("Инвентарь успешно завершен", toastConfig);
          fetchGetOrder();
        })
        .catch((error) => {
          toast.error(error.message, toastConfig);
          fetchGetOrder();
        });
    } else {
      toast.error("Попробуйте еще раз", toastConfig);
      fetchGetOrder();
    }
  };
  const handleInventoryInPrebook = (expandedRows, inventory_id) => {
    const confirmPrebook = window.confirm(
      "Данный инвентарь отправляется каналу?"
    );
    if (confirmPrebook) {
      dispatch(inventoryPrebook({ expandedRows, inventory_id }))
        .then(() => {
          toast.success("Инвентарь отправлен паблишеру", toastConfig);
          fetchGetOrder();
        })
        .catch((error) => {
          toast.error(error.message, toastConfig);
          fetchGetOrder();
        });
    } else {
      toast.info("Операция отменена", toastConfig);
      fetchGetOrder();
    }
  };
  const handleInventoryVerify = (expandedRows, inventory_id) => {
    const confirmVerify = window.confirm(
      "Данный инвентарь отправляется каналу?"
    );
    if (confirmVerify) {
      dispatch(inventoryVerify({ expandedRows, inventory_id }))
        .then(() => {
          toast.success("Инвентарь успешно отправлен", toastConfig);
          fetchGetOrder();
        })
        .catch((error) => {
          toast.error(error.message, toastConfig);
          fetchGetOrder();
        });
    } else {
      toast.error("Попробуйте еще раз", toastConfig);
      fetchGetOrder();
    }
  };
  React.useEffect(() => {
    dispatch(fetchOrder());
    fetchGetOrder();
  }, [dispatch]);
  const sortedData = React.useCallback(
    () =>
      sortData({
        tableData: getOrder,
        sortKey,
        reverse: sort === "desc",
      }),
    [getOrder, sortKey, sort]
  );
  function changeSort(key) {
    setSort(sort === "ascn" ? "desc" : "ascn");
    setSortKey(key);
  }

  //Итого онлайн просмотров
  let totalOnlineView = 0;
  totalOnlineView += advert.online_views;

  //Итого онлайн просмотров

  console.log("getOrder", totalOnlineView);
  return (
    <>
      <AnimatePresence>
        {showSelectedInventory && (
          <ModalUI>
            <BindingOrderModal
              onRowsSelected={handleRowsSelected}
              expandedRows={expandedRows}
            />
          </ModalUI>
        )}
      </AnimatePresence>

      {isLoading ? (
        <div className="loaderWrapper" style={{ height: "10vh" }}>
          <div className="spinner"></div>
        </div>
      ) : getOrder.length === 0 ? (
        <div className="empty_list">Список пустой. Добавьте инвентарь!</div>
      ) : (
        <>
          <div className="tableWrapper">
            <table className="tableWrapper">
              <thead>
                <BindingOrderTableRows
                  sortKey={sortKey}
                  sort={sort}
                  changeSort={changeSort}
                  getOrder={getOrder}
                />
              </thead>
              <tbody>
                <BindingOrderTableData
                  statusOr={statusOr}
                  expandedRows={expandedRows}
                  getOrder={getOrder}
                  onRemoveInventory={handleRemoveInventory}
                  onInventoryPrebook={handleInventoryInPrebook}
                  onRemoveDeactivate={handleDeactivateInventory}
                  onInventoryVerify={handleInventoryVerify}
                  sortedData={sortedData}
                />
              </tbody>
            </table>
          </div>
        </>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          marginTop: "10px",
        }}
      >
        <div
          style={{
            display: "flex",

            alignItems: "center",
            border: "2px solid #ff991e",
            borderRadius: "12px",
            background: "#ffcc9163",
            marginRight: "10px",
          }}
        >
          {statusOr === "finished" ? (
            ""
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "0px 10px",
              }}
            >
              <div style={{ marginRight: "5px" }}>Статус: </div>
              <AdvertStatus status={advert.status}>
                {role === "admin" || role === "advertising_agency" ? (
                  <>
                    {role === "admin" || role === "advertising_agency" ? (
                      <>
                        {advert.status === "in_progress" ? (
                          <div
                            style={{
                              display: (() => {
                                const ratie = Math.floor(
                                  (advert.online_views /
                                    advert.expected_number_of_views) *
                                    100
                                );
                                if (ratie >= 1) {
                                  return "initial";
                                }
                                return "none";
                              })(),
                              padding: "1px 5px",
                              borderRadius: "7px",
                              fontWeight: "600",
                              background: (() => {
                                const ratie = Math.floor(
                                  (advert.online_views /
                                    advert.expected_number_of_views) *
                                    100
                                );

                                if (ratie >= 100) {
                                  return "#ec2020";
                                } else if (ratie >= 80) {
                                  return "#fd8b00";
                                } else if (ratie >= 50) {
                                  return "rgba(50, 147, 111, 0.16)";
                                } else if (ratie >= 1) {
                                  return "rgb(86 112 241)";
                                }
                                return "inherit";
                              })(),

                              color: (() => {
                                const ratio =
                                  (advert.online_views /
                                    advert.expected_number_of_views) *
                                  100;

                                if (ratio >= 100) {
                                  return "#f8f8f8";
                                } else if (ratio >= 80) {
                                  return "#764306";
                                } else if (ratio >= 50) {
                                  return "#047f27";
                                } else if (ratio >= 1) {
                                  return "rgb(228 232 253)";
                                }
                                return "inherit";
                              })(),
                            }}
                          >
                            {advert.online_views > 0 &&
                              Math.floor(
                                (advert.online_views /
                                  advert.expected_number_of_views) *
                                  100
                              ) +
                                " " +
                                "%"}
                          </div>
                        ) : null}
                        {advert.status === "finished" ? (
                          <div
                            style={{
                              display: "initial",
                              padding: "1px 4px",
                              borderRadius: "7px",
                              background: "rgb(156 81 81)",
                              color: "#eedede",
                              marginLeft: "10px",
                            }}
                          >
                            100%
                          </div>
                        ) : null}
                      </>
                    ) : null}
                  </>
                ) : null}
              </AdvertStatus>
            </div>
          )}

          {statusOr === "finished" ? (
            ""
          ) : (
            <div
              style={{
                display: "flex",
                padding: "8px 10px",
                borderLeft: "2px solid #ff991d",
              }}
            >
              <div style={{ marginRight: "5px" }}> Остаток: </div>
              <FormatterView
                data={advert.expected_number_of_views - advert.online_views}
              />
            </div>
          )}
          {statusOr === "finished" ? (
            ""
          ) : (
            <div
              style={{
                display: "flex",
                padding: "8px 10px",
                borderLeft: "2px solid #ff991d",
              }}
            >
              <div style={{ marginRight: "5px" }}>Итого показы: </div>
              <FormatterView data={totalOnlineView} />
            </div>
          )}
        </div>

        {statusOr === "finished" ? (
          ""
        ) : (
          <ButtonTable onClick={handleButtonClick}>
            Добавить инвентарь
            <ArrowInv
              style={{ width: "18px", height: "17px", marginLeft: "5px" }}
            />
          </ButtonTable>
        )}
        {statusOr === "in_progress" ||
        statusOr === "accepted" ||
        statusOr === "open" ||
        statusOr === "finished" ||
        statusOr === "confirmed" ||
        getOrder.length === 0 ? (
          ""
        ) : (
          <div style={{ marginLeft: "10px", position: "relative" }}>
            <ButtonTable onClick={handleConfirmOrder} color="green">
              Подтвердить
              <ArrowR style={{ width: "18px", height: "15px" }} />
            </ButtonTable>
            {CounterBadge === "booked" ? (
              <CircularBadge
                style={{
                  backgroundColor: "#ff7d00",
                  color: "#4833d0",
                  width: "15px",
                  height: "15px",
                  top: "-5px",
                  right: "-5px",
                }}
              />
            ) : (
              ""
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default BindingOrderTable;
