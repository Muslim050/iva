import React from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import {toast} from 'react-toastify'
import {ReactComponent as Close} from 'src/assets/Modal/Close.svg'
import {toastConfig} from 'src/utils/toastConfig'
import {ReactComponent as Copy} from 'src/assets/copy.svg'
import style from './CommentModal.module.scss'

const CommentSentOrderModal = ({setShowKomment, currentOrder}) => {
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText (currentOrder.notes)
      .then (() => {
        toast.success ('Комментарий скопирован в буфер обмена', toastConfig)
      })
      .catch ((err) => {
        toast.error ('Не удалось скопировать комментарий', toastConfig)
      })
  }
  console.log (currentOrder)
  return (
    <>
      <div style={{width: '400px'}}>
        <div className="modalWindow__title">
          Комментарий к заказу
          <Close
            className="modalWindow__title__button"
            onClick={() => setShowKomment (false)}
          />
        </div>
        <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
          <div>{currentOrder.notes_text}</div>

          <div style={{color: "blue"}}>{currentOrder.notes_url}</div>
        </div>
        <div className={style.button} style={{marginTop: "20px"}}>
          <button className={style.button__wrapper} onClick={copyToClipboard}>
            <Copy
              style={{
                width: '20px',
                height: '20px',
              }}
            />
          </button>
        </div>
      </div>
    </>
  )
}

export default CommentSentOrderModal
