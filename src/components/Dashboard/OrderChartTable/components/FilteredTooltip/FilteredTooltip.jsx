import React from 'react'
import style from './FilteredTooltip.module.scss'
import { ReactComponent as Close } from 'src/assets/Close.svg'
import DownloadReport from '../DownloadReport'

function FilteredTooltip({
  isTooltip,
  handleDateStatictick,
  actualStartDate,
  actualEndDate,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  setIsTooltip,
  getOrder,
}) {
  const handleStartDateChange = (event) => {
    setStartDate(event.target.value)
  }

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value)
  }

  React.useEffect(() => {
    setStartDate(actualStartDate)
  }, [actualStartDate])
  React.useEffect(() => {
    setEndDate(actualEndDate)
  }, [actualEndDate])
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
          }}
        >
          <button
            className={style.btn_filtered__close}
            onClick={() => setIsTooltip(!isTooltip)}
          >
            <Close style={{ height: '30px' }} />
          </button>
          <div>
            <label
              style={{
                fontSize: '10px',
                color: 'var(--text-color)',
                fontWeight: '400',
              }}
            >
              Дата начало
            </label>
            <input
              className={style.input}
              type="date"
              value={startDate}
              onChange={handleStartDateChange}
              min={startDate} // Set the min attribute to restrict the selectable range
              max={endDate} // Set the max attribute to restrict the selectable range
              style={{
                width: '210px',
              }}
            />
          </div>

          <div>
            <label
              style={{
                fontSize: '10px',
                color: 'var(--text-color)',
                fontWeight: '400',
              }}
            >
              Дата конец
            </label>
            <input
              className={style.input}
              type="date"
              value={endDate}
              onChange={handleEndDateChange}
              min={startDate}
              max={endDate}
              style={{
                width: '210px',
              }}
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
            />
          </div>
        </div>
      )}
    </>
  )
}

export default FilteredTooltip
