import React, { useEffect } from 'react'
import style from './FilteredTooltip.module.scss'
import { ReactComponent as Close } from 'src/assets/Close.svg'
import DownloadReport from '../DownloadReport'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

function FilteredTooltip({
  isTooltip,
  handleDateStatictick,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  setIsTooltip,
  getOrder,
  closeH,
  fetchGetOrder,
}) {
  const handleStartDateChange = (date) => {
    setStartDate(date.toISOString().slice(0, 10)) // Преобразование даты в строку формата YYYY-MM-DD
  }

  const handleEndDateChange = (date) => {
    setEndDate(date.toISOString().slice(0, 10)) // Аналогично для конечной даты
  }

  return (
    <>
      {isTooltip && (
        <div
          className={style.profile__wrapper__tooltip}
          style={{
            position: 'absolute',
            right: '53px',
            top: '0',
            backgroundColor: '#fff',
            boxShadow: '0 0 5px #bbbbbb',
            padding: '40px 14px 14px',
            borderRadius: '10px',
            zIndex: '2',
            width: '200px',
          }}
        >
          <button className={style.btn_filtered__close} onClick={closeH}>
            <Close style={{ height: '30px' }} />
          </button>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <label
              style={{
                fontSize: '10px',
                color: 'var(--text-color)',
                fontWeight: '400',
              }}
            >
              Дата начало
            </label>
            <DatePicker
              selected={startDate ? new Date(startDate) : null}
              onChange={handleStartDateChange}
              selectsStart
              startDate={startDate ? new Date(startDate) : null}
              endDate={endDate ? new Date(endDate) : null}
              minDate={new Date(startDate)} // Устанавливаем minDate равным startDate
              maxDate={new Date(endDate)} // Устанавливаем maxDate равным endDate
              className={style.input}
            />
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginTop: '5px',
            }}
          >
            <label
              style={{
                fontSize: '10px',
                color: 'var(--text-color)',
                fontWeight: '400',
              }}
            >
              Дата конец
            </label>
            <DatePicker
              selected={endDate ? new Date(endDate) : null}
              onChange={handleEndDateChange}
              selectsEnd
              startDate={startDate ? new Date(startDate) : null}
              endDate={endDate ? new Date(endDate) : null}
              minDate={new Date(startDate)} // Устанавливаем minDate равным startDate
              maxDate={new Date(endDate)} // Устанавливаем maxDate равным endDate
              className={style.input}
            />
          </div>

          <div style={{ display: 'flex', marginTop: '10px' }}>
            <button
              className={style.btn_filtered}
              onClick={handleDateStatictick}
            >
              Сортировать
            </button>
            <DownloadReport
              getOrder={getOrder}
              startDate={startDate}
              endDate={endDate}
              setIsTooltip={setIsTooltip}
              fetchGetOrder={fetchGetOrder}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default FilteredTooltip
