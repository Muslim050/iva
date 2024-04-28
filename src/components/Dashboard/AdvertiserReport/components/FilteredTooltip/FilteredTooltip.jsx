import React, { useEffect } from 'react'
import style from './FilteredTooltip.module.scss'
import { ReactComponent as Close } from 'src/assets/Close.svg'
import DownloadReport from '../DownloadReport'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import ButtonTable from "../../../../UI/ButtonTable/ButtonTable";
import { ReactComponent as Delete } from 'src/assets/Delete.svg'

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
  fetchGetOrder, advdata,selectedOptionAdv,handleSelectChangeADV,handleClear,
                           selectedOrderName, selectedAdvName,
                           ShortListdata,selectedOptionOrder,handleSelectChangeOrder,selectedAdv,loadingDots
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
            zIndex: '4',
            width: 'auto',
          }}
        >
          <button className={style.btn_filtered__close} onClick={closeH}>
            <Close style={{height: '30px'}}/>
          </button>



          <div style={{width: '300px', marginTop: '10px'}}>
            <label
              style={{
                fontSize: '12px',
                color: 'var(--text-color)',
                fontWeight: '400',
              }}
            >
              Выбрать рекламодателя
              <select
                value={selectedOptionAdv}
                onChange={handleSelectChangeADV}
                style={{width: '100%'}}
                className={style.input}
                // disabled={!selectedChannel}
              >
                <option value="">Выберите рекламодателя</option>
                {advdata.map((option) => (
                  <option key={option.id} value={JSON.stringify(option)}>
                    {option.name}
                  </option>
                ))}
              </select>
            </label>
          </div>





          {/*{loadingDots ? <div>*/}
          {/*    <div className={style.loader}></div>*/}
          {/*  </div>*/}
          {/*  : */}


            <div style={{display: "flex", marginTop: '10px', gap: "10px", position: "relative"}}>
              {loadingDots && <div style={{position: "absolute", background: "#5f5f5f1c", width: "100%", height: "100%", zIndex: "3", display: "flex", alignItems: "center", justifyContent: "center"}}>
                  <div className={style.loader}></div>
                </div>}


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
            </div>

          <div style={{display: 'flex', marginTop: '10px', gap: "10px"}}>
            <button
              className={style.btn_filtered}
              onClick={handleDateStatictick}
            >
              Сортировать
            </button>

            {(startDate || endDate)
              ? <DownloadReport
                getOrder={getOrder}
                startDate={startDate}
                endDate={endDate}
                setIsTooltip={setIsTooltip}
                // fetchGetOrder={fetchGetOrder}
              /> : null
            }
            {( startDate || endDate  || selectedOrderName || selectedAdvName) && (
              <div >
                <ButtonTable
                  onClick={handleClear}
                  Customstyle={{ justifyContent: 'center'}}
                >
                  <Delete style={{width: '30px', height: '30px'}}/>
                </ButtonTable>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default FilteredTooltip
