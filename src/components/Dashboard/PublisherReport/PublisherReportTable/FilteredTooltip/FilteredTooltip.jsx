import React, { useEffect } from 'react'
import style from './FilteredTooltip.module.scss'
import { ReactComponent as Close } from 'src/assets/Close.svg'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import ButtonTable from '../../../../UI/ButtonTable/ButtonTable'
import { ReactComponent as Search } from 'src/assets/Search.svg'
import { ReactComponent as Delete } from 'src/assets/Delete.svg'
import ru from 'date-fns/locale/ru'; // Импортируйте русскую локаль

const formatV = [
  { value: 'preroll', text: 'Pre-roll' },
  { value: 'mixroll', text: 'Mix-roll' },
]

function FilteredTooltip({
  isTooltip,
  //
  startDate,
  endDate,
  //
  handleSelectFormat,
  selectedFormat,
  //
  handleProfileClick,
  //
  advdata,
  channel,
  //
  selectedChannel,
  //
  selectedAdv,
  //
  handleSelectChange,
  handleSelectChangeADV,
  //
  handleSearch,
  handleClear,
  //
  handleEndDateChange,
  handleStartDateChange,
  //
  selectedOptionChannel,
  selectedOptionAdv,
  selectedAdvName,
    //
                           setEndDateMonth,
                           setStartDateMonth,endDateMonth, startDateMonth,
                           setDateRange,
                           dateRange,setSelectedMonth,selectedMonth,
                           download
}) {






  const handleDateChange = (date) => {
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    setDateRange([startOfMonth, endOfMonth]);
    setSelectedMonth(startOfMonth);
    setEndDateMonth(dateRange[1])
    setStartDateMonth(dateRange[0])
  };


  return (
    <>
      {isTooltip && (
          <div
              className={style.profile__wrapper__tooltip}
              style={{
                position: 'absolute',
                right: '0',
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
                onClick={handleProfileClick}
            >
              <Close style={{height: '30px'}}/>
            </button>


            <div style={{width: '300px'}}>
              <label
                  style={{
                    fontSize: '12px',
                    color: 'var(--text-color)',
                    fontWeight: '400',
                  }}
              >
                Выбрать канал
                <select
                    value={selectedOptionChannel} // Используйте ID, а не имя, для value
                    onChange={handleSelectChange}
                    style={{width: '100%'}}
                    className={style.input}
                >
                  <option value="">Выберите канал</option>
                  {channel.map((option) => (
                      <option key={option.id} value={JSON.stringify(option)}>
                        {option.name}
                      </option>
                  ))}
                </select>
              </label>
            </div>

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
                    disabled={!selectedChannel}
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


            <div style={{display: 'flex', gap: '10px', margin: '10px 0 '}}>

              <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',

                  }}
              >
                <label
                    style={{
                      fontSize: '12px',
                      color: 'var(--text-color)',
                      fontWeight: '400',
                    }}
                >
                  Месяц
                </label>
                <DatePicker
                    onChange={handleDateChange}
                    selected={selectedMonth}
                    dateFormat="MM/yyyy"
                    showMonthYearPicker
                    showFullMonthYearPicker
                    className={style.input}
                    disabled={!!startDate || !!endDate} // Здесь используется приведение dateRange к булевому типу
                    locale={ru} // Устанавливайте русскую локаль здесь

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
                      fontSize: '12px',
                      color: 'var(--text-color)',
                      fontWeight: '400',
                    }}
                >
                  Дата Конец
                </label>
                <DatePicker
                    selected={endDate}
                    onChange={handleEndDateChange}
                    className={style.input}
                    dateFormat="dd-MM-yyyy"
                    disabled={!!startDateMonth || !!endDateMonth} // Здесь используется приведение dateRange к булевому типу

                />
              </div>
            </div>

            <label
                style={{
                  fontSize: '12px',
                  color: 'var(--text-color)',
                  fontWeight: '400',
                }}
            >
              Формат
            </label>
            <select
                id="countries"
                value={selectedFormat}
                className={style.input}
                onChange={handleSelectFormat}
            >
              <option value="">All</option>

              {formatV.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.text}
                  </option>
              ))}
            </select>
            <div style={{display: 'flex', marginTop: '20px', gap: '10px'}}>
              <div style={{width: '100%'}}>
                <ButtonTable
                    onClick={handleSearch}
                    Customstyle={{width: '100%', justifyContent: 'center'}}
                >
                  <Search style={{width: '23px', height: '23px'}}/>
                  <div style={{marginLeft: '5px'}}>Сортировать</div>
                </ButtonTable>
              </div>

              {(selectedChannel || startDate || endDate || selectedFormat || startDateMonth || endDateMonth) && (
                  <div style={{width: '100%'}}>
                    <ButtonTable
                        onClick={handleClear}
                        Customstyle={{width: '100%', justifyContent: 'center'}}
                    >
                      <Delete style={{width: '23px', height: '23px'}}/>
                      <div style={{marginLeft: '5px'}}>Очистить</div>
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
