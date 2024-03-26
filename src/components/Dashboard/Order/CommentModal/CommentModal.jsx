import React from 'react'

import 'react-datepicker/dist/react-datepicker.css'
// import style from './EditOrderModal.module.scss'
import { ReactComponent as Close } from 'src/assets/Modal/Close.svg'

const CommentModal = ({ setShowKomment, currentOrder }) => {
  console.log('currentOrder', currentOrder)
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
      </div>
    </>
  )
}

export default CommentModal
