import React from 'react'
import ReceivedOrders from "./receivedOrders";
import styles from "./TableVideo.module.scss";
import CompletedOrder from './сompletedOrders/'

function SentOrder ({setShowModal}) {
  const [tabs, setTabs] = React.useState ('1')
  return (
    <>
      <div style={{
        width: "400px",
        display: 'flex',
        background: "#ececec",
        padding: "2px",
        borderRadius: "6px",
        height: "30px",
        margin: "0 0 10px 0"
      }}>
        <button className={tabs === '1' ? styles.active : styles.normal} onClick={() => setTabs ('1')}>Полученные
          заказы
        </button>
        <button className={tabs === '2' ? styles.active : styles.normal} onClick={() => setTabs ('2')}>Завершенные
        </button>
      </div>
      {
        tabs === '1' ? <ReceivedOrders/> : <CompletedOrder/>
      }

    </>
  )
}

export default SentOrder
