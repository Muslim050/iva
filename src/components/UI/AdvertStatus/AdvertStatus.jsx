import React from 'react'
import style from './AdvertStatus.module.scss'
import {formatDate} from "../../../utils/formatterDate";

const statusTexts = {
  sent: 'Отправлено',
  in_review: 'Рассматривается',
  confirmed: 'Подтверждён',
  in_progress: 'Активен',
  accepted: 'Получен',
  confirmed_by_channel: '',
  open: 'Доступный',
  pre_booked: 'Пре_бронь',
  booked: 'Бронь',
  in_use: 'Активный',
  unused: 'Не продан',
  inactive: 'Завершен',
  finished: 'Завершен',
}

const AdvertStatus = ({status, children, endDate}) => {
  const statusText = statusTexts[status] || 'Неизвестный статус'
  const wrapperStyles = endDate ? {width: 'max-content'} : {}
  return (
    <div
      className={`${style.wrapper__status} ${style[status]} `}
      style={wrapperStyles}
    >
      {statusText}

      {children}

      {endDate && (
        <div style={{color: 'red', fontSize: '11px', marginLeft: '5px'}}>
          {formatDate (endDate)}
        </div>
      )}
    </div>
  )
}

export default AdvertStatus
