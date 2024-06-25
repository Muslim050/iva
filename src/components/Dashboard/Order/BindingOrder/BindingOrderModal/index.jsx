import React from "react";
import {useDispatch, useSelector} from "react-redux";
import style from "./BindingOrderModal.module.scss";
import {ReactComponent as Close} from "src/assets/Modal/Close.svg";
import {ReactComponent as SaveInventory} from "src/assets/Table/SaveInventory.svg";
import {toast} from "react-toastify";
import {fetchInventory} from "../../../../../redux/inventory/inventorySlice";
import axios from "axios";

import Index from "./DopOrder";
import {hideModalSInventory} from "src/redux/modalSlice";
import backendURL from "src/utils/url";
import AddInventory from "./AddInventory";
import AddSentPublisher from "./AddSentPublisher";

const BindingOrderModal = ({onRowsSelected, expandedRows}) => {
  const dispatch = useDispatch ();
  const [selectedRows, setSelectedRows] = React.useState ([]);
  const [tabs, setTabs] = React.useState ('inventory');

  const [onceOrder, setOnceOrder] = React.useState ([]);

  const [loading, setLoading] = React.useState (true);

  const {order} = useSelector ((state) => state);
  const orders = order?.order;

  const {inventory} = useSelector ((state) => state);
  const inventor = inventory?.inventory;

  const orddd = orders.filter ((i) => i.id === expandedRows);
  const filteredInventory = inventor.filter (
    (i) =>
      i.status !== "unused" &&
      i.status !== "pre_booked" &&
      i.status !== "booked" &&
      i.status !== "in_use" &&
      i.status !== "inactive"
  );
  const fetchOnceOrder = async () => {
    const token = localStorage.getItem ("token");

    const response = await axios.get (
      `${backendURL}/order/${expandedRows}/`,

      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setOnceOrder (response.data.data);
  };
  React.useEffect (() => {
    // eslint-disable-next-line no-restricted-globals
    dispatch (fetchInventory ({status: "open"})).then (() => setLoading (false));
    fetchOnceOrder ();
  }, [dispatch]);

  const isDisabled = selectedRows.length === 0;

  function handleRow () {
    const selectedInventory = inventor.filter ((i) =>
      selectedRows.includes (i.id)
    );

    const orderFormat = orddd.map ((i) => i.format);

    const isFormatMatched = selectedInventory.every ((i) => {
      if (orderFormat.includes ("mixroll")) {
        return i.format;
      } else if (orderFormat.includes ("preroll")) {
        return i.format === "preroll";
      }
      return false;
    });

    if (isFormatMatched) {
      onRowsSelected (selectedRows);
    } else {
      toast.error ("Формат инвентаря не соответствует требованиям заказа");
    }
  }

  const handleButtonClick = () => {
    dispatch (hideModalSInventory ());
  };


  const [addInventroyModal, setAddInventroyModal] = React.useState (false);


  return (
    <>
      {loading ? (
        <div className="loaderWrapper" style={{height: "10vh"}}>
          <div className="spinner"></div>
        </div>
      ) : (
        <>
          <div
            className="modalWindow__title"
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            Добавить инвентарь
            <Close
              className="modalWindow__title__button"
              onClick={handleButtonClick}
            />
          </div>
          <div className={style.dopOrder}>
            <Index onceOrder={onceOrder}/>
          </div>
          {/*Табы*/}
          <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", padding: "5px 0"}}>
            <TabsComponent
              tabs={tabs}
              setTabs={setTabs}
            />

          </div>
          {/*Табы*/}

          {tabs === 'inventory' ?
            <AddInventory
              filteredInventory={filteredInventory}
              setSelectedRows={setSelectedRows}
              selectedRows={selectedRows}
            />
            :
            <AddSentPublisher
              setSelectedRows={setSelectedRows}
              selectedRows={selectedRows}
              expandedRows={expandedRows}
              setAddInventroyModal={setAddInventroyModal}
              onceOrder={onceOrder}
            />
          }
          {
            tabs === 'inventory' && <div
              style={{
                display: "flex",
                justifyContent: "end",
                marginTop: "15px",
              }}
            >
              <button
                onClick={handleRow}
                disabled={isDisabled}
                className={style.ok_btn}
              >
                Добавить инвентарь
                <SaveInventory
                  style={{width: "20px", height: "20px", marginLeft: "5px"}}
                />
              </button>
            </div>
          }

        </>
      )}
    </>
  );
}


const TabsComponent = ({setTabs, tabs}) => {
  return (
    <div className="toggle__swipper" style={{marginBottom: "0px"}}>
      <button
        className={`toggle__swipper__text ${tabs === "inventory" ? "active" : ""}`}
        onClick={() => setTabs ('inventory')}
        style={{
          borderRadius: " 8px 0px 0px 8px"
        }}
      >
        Инвентари
      </button>

      <button
        className={`toggle__swipper__text ${tabs === "sentPublisher" ? "activeR" : ""}`}
        onClick={() => setTabs ('sentPublisher')}
        style={{
          borderRadius: "0px 8px 8px 0px"
        }}
      >
        Записи Паблишеру
      </button>
    </div>
  );
};

export default BindingOrderModal;