import style from "../BindingOrderModal.module.scss";
import React from "react";
import AddSentPublisherRows from "./AddSentPublisherRows";
import AddSentPublisherData from "./AddSentPublisherData";
import {useDispatch, useSelector} from "react-redux";
import {fetchOnceListSentToPublisher} from "../../../../../../redux/order/SentToPublisher";
import AddSendPublisherModal from "./AddSendPublisherModal";
import {motion} from "framer-motion";
import {ReactComponent as Add} from 'src/assets/Table/add.svg'

export default function AddSentPublisher ({expandedRows}) {
  const dispatch = useDispatch ();
  const {listsentPublisher} = useSelector ((state) => state.sentToPublisher);
  const [viewNote, setViewNote] = React.useState (false);
  console.log (listsentPublisher)
  React.useEffect (() => {
    dispatch (fetchOnceListSentToPublisher ({expandedRows}))
  }, []);
  return (
    <>
      <div style={{background: "#e0e0e09e", borderRadius: "15px", margin: "5px 0"}}>
        <table className={style.table} style={{overflow: "auto"}}>
          {viewNote &&
            <thead style={{borderTop: "0"}}>
            <tr>
              <th>Паблишер</th>
              <th>Канал</th>
              <th>Формат</th>
              <th>Период</th>
              <th>Показы</th>
              <th>Бюджет</th>
              <th>Целевая аудитория</th>
              <th>Язык контента</th>
              <th>Текст и ссылка</th>
              <th>Настройка</th>

            </tr>
            </thead>}
          <tbody>
          {viewNote && (
            <motion.tr
              initial={{opacity: 0, x: -10, filter: "blur(10px)"}}
              animate={{opacity: 1, x: 0, filter: "blur(0px)"}}
              transition={{duration: 0.5}}

            >
              <AddSendPublisherModal expandedRows={expandedRows} setViewNote={setViewNote}/>
            </motion.tr>
          )}
          </tbody>
        </table>
        <div style={{display: "flex", justifyContent: "center", padding: "10px"}}>
          <button className={style.ok_btn} onClick={() => setViewNote (!viewNote)}>
            {viewNote ? "Отменить создание" :
              <div style={{display: "flex", alignItems: "center"}}><Add style={{width: '25px', height: '23px'}}/>Добавить
                запись</div>}
          </button>
        </div>
      </div>

      <div className={style.tableWrapper} style={{
        overflow: "scroll",
      }}>
        {listsentPublisher.length > 0 && (
          <>
            <table className={style.table}>
              <thead>
              <AddSentPublisherRows/>
              </thead>
              <tbody>
              <AddSentPublisherData listsentPublisher={listsentPublisher} expandedRows={expandedRows}/>
              </tbody>
            </table>
          </>
        )}
      </div>
    </>
  )
}

