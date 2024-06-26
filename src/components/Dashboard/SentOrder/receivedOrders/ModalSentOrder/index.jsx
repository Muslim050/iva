import React from "react";
import {ReactComponent as Close} from "src/assets/Modal/Close.svg";
import AddVideo from "./AddVideo";
import SelectedVideo from "./SelectedVideo";
import styles from './ModalSent.module.scss'

export default function ModalSentOrder ({setOpenPopoverIndex, item}) {
  const [tabs, setTabs] = React.useState ('1');
  console.log (item)
  return (
    <>
      <div>
        <div className="modalWindow__title">
          Размещение
          <Close
            className="modalWindow__title__button"
            onClick={(e) => {
              e.stopPropagation ();
              setOpenPopoverIndex (null);
            }}
          />
        </div>

        {

        }
        <div className="modalWindow">
          <div style={{
            display: 'flex',
            background: "#ececec",
            padding: "2px",
            borderRadius: "6px",
            height: "30px",
            margin: "0 0 10px 0"
          }}>
            <button
              className={tabs === '1' ? styles.active : styles.normal}
              onClick={() => setTabs ('1')}
            >
              Создать видео
            </button>
            <button
              className={tabs === '2' ? styles.active : styles.normal}
              onClick={() => setTabs ('2')}
            >
              Выбрать видео
            </button>
          </div>

          <>
            {tabs === '1' ? (
              <AddVideo item={item} setOpenPopoverIndex={setOpenPopoverIndex}/>
            ) : (
              <SelectedVideo item={item} setOpenPopoverIndex={setOpenPopoverIndex}/>
            )}
          </>

        </div>
      </div>
    </>
  );
}
