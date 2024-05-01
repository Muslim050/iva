import React from 'react'
import style from './FilteredTooltip.module.scss'
import {ReactComponent as Close} from 'src/assets/Close.svg'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import ButtonTable from "../../../../../UI/ButtonTable/ButtonTable";
import {ReactComponent as Delete} from 'src/assets/Delete.svg'

function FilteredTooltip (
  {
    isTooltip,
    handleDateStatictick,
    startDate,
    endDate,
    closeH,
    advdata,
    selectedOptionAdv,
    handleSelectChangeADV,
    handleClear,
    selectedOrderName,
    selectedAdvName,
    loadingDots,
    handleEndDateChange,
    handleStartDateChange
  }) {
  return (
    <>
      {isTooltip && (
        <div
          className={style.profile__wrapper__tooltip}
          style={{
            position: 'absolute',
            right: '100%',
            top: '100%',
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
                {advdata.map ((option) => (
                  <option key={option.id} value={JSON.stringify (option)}>
                    {option.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div style={{display: "flex", marginTop: '10px', gap: "10px", position: "relative"}}>
            {loadingDots && <div style={{
              position: "absolute",
              background: "#5f5f5f1c",
              width: "100%",
              height: "100%",
              zIndex: "3",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
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
                selected={startDate}
                onChange={handleStartDateChange}
                dateFormat="dd-MM-yyyy"

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
                selected={endDate}
                onChange={handleEndDateChange}
                className={style.input}
                dateFormat="dd-MM-yyyy"

              />
            </div>
          </div>

          <div style={{display: 'flex', marginTop: '10px', gap: "10px"}}>
            {<button
              className={`${style.btn_filtered} ${!selectedAdvName ? style.btn_filtered__dis : ''}`}
              onClick={handleDateStatictick}
              disabled={!selectedAdvName}

            >
              Сортировать
            </button>
            }
            {/*{(startDate || endDate)*/}
            {/*  ? <DownloadReport*/}
            {/*    getOrder={getOrder}*/}
            {/*    startDate={startDate}*/}
            {/*    endDate={endDate}*/}
            {/*    setIsTooltip={setIsTooltip}*/}
            {/*    // fetchGetOrder={fetchGetOrder}*/}
            {/*  /> : null*/}
            {/*}*/}
            {(startDate || endDate || selectedAdvName) && (
              <div>
                <ButtonTable
                  onClick={handleClear}
                  Customstyle={{justifyContent: 'center'}}

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
