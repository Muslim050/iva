import React from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import { toast } from 'react-toastify'
import { ReactComponent as Close } from 'src/assets/Modal/Close.svg'
import ButtonBorder from 'src/components/UI/ButtonBorder/ButtonBorder'
import { toastConfig } from 'src/utils/toastConfig'
import { ReactComponent as Copy } from 'src/assets/copy.svg'
import style from './CommentModal.module.scss'

const CommentModal = ({ setShowKomment, currentOrder }) => {
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(currentOrder.notes)
      .then(() => {
        toast.success('Комментарий скопирован в буфер обмена', toastConfig)
      })
      .catch((err) => {
        toast.error('Не удалось скопировать комментарий', toastConfig)
      })
  }
  return (
    <>
      <div style={{ width: '400px' }}>
        <div className="modalWindow__title">
          Комментарий к заказу
          <Close
            className="modalWindow__title__button"
            onClick={() => setShowKomment(false)}
          />
        </div>
        <div>{currentOrder.notes}</div>
        <div className={style.button}>
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

export default CommentModal
