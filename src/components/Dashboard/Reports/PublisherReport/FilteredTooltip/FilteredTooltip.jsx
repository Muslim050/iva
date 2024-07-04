import React from 'react'
import style from './FilteredTooltip.module.scss'
import {ReactComponent as Close} from '../../../../../assets/Close.svg'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import ButtonTable from '../../../../UI/ButtonTable/ButtonTable'
import {ReactComponent as Search} from '../../../../../assets/Search.svg'
import {ReactComponent as Delete} from '../../../../../assets/Delete.svg'
import ru from 'date-fns/locale/ru' // Импортируйте русскую локаль
import DownloadReport from '../DownloadReport'

function FilteredTooltip ({
                            isTooltip,
                            dateRange,
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
                            handleSelectChange,
                            //
                            handleSearch,
                            handleClear,
                            //
                            handleEndDateChange,
                            selectedOptionChannel,
                            endDateMonth,
                            startDateMonth,
                            selectedMonth,
                            handleDateChange,
                            publisher,
                            handleSelectChangePablisher,
                            selectedOptionPublisher,
                            selectedPublisher,
                            selectedChannelName,
                            selectedPublisherName,
                            formatV,
                          }) {
  const user = localStorage.getItem ('role')
  console.log (selectedPublisher)
  console.log (selectedChannel)
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
            maxWidth: 'maxWidth',
            width: '400px',
          }}
        >
          <button
            className={style.btn_filtered__close}
            onClick={handleProfileClick}
          >
            <Close style={{height: '30px'}}/>
          </button>

          {user === 'admin' && (
            <div style={{margin: '10px 0 '}}>
              <label
                style={{
                  fontSize: '14px',
                  color: 'var(--text-color)',
                  fontWeight: '400',
                }}
              >
                Выбрать паблишера
                <select
                  value={selectedOptionPublisher} // Используйте ID, а не имя, для value
                  onChange={handleSelectChangePablisher}
                  style={{width: '100%'}}
                  className={style.input}
                >
                  <option value="">Выберите паблишера</option>
                  {publisher.map ((option) => (
                    <option key={option.id} value={JSON.stringify (option)}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          )}

          <div>
            <label
              style={{
                fontSize: '14px',
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
                {channel.map ((option) => (
                  <option key={option.id} value={JSON.stringify (option)}>
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
                  fontSize: '14px',
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
                disabled={!!dateRange[0] || !!dateRange[1]}
                locale={ru}
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
                  fontSize: '14px',
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
              fontSize: '14px',
              color: 'var(--text-color)',
              fontWeight: '400',
            }}
          >
            Формат размещения
          </label>
          <select
            id="countries"
            value={selectedFormat}
            className={style.input}
            onChange={handleSelectFormat}
          >
            <option value="">All</option>

            {formatV.map ((option, index) => (
              <option key={index} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>
          <div
            style={{
              display: 'flex',
              marginTop: '20px',
              gap: '10px',
              height: '50px',
            }}
          >
            <div style={{width: '100%', height: '100%'}}>
              <ButtonTable
                onClick={handleSearch}
                Customstyle={{
                  width: '100%',
                  justifyContent: 'center',
                  height: '50px',
                }}
                disabled={!startDateMonth || !endDateMonth}
              >
                <Search style={{width: '23px', height: '23px'}}/>
                <div style={{marginLeft: '5px'}}>Сортировать</div>
              </ButtonTable>
            </div>

            {(startDateMonth ||
              endDateMonth ||
              startDate ||
              endDate ||
              selectedChannel) && (
              <DownloadReport
                startDate={startDate}
                endDate={endDate}
                startDateMonth={startDateMonth}
                endDateMonth={endDateMonth}
                channelId={selectedChannel}
                publisherId={selectedPublisher}
                selectedChannelsName={selectedChannelName}
                formatOrder={selectedFormat}
                selectedPublisherName={selectedPublisherName}
              />
            )}

            {(selectedChannel ||
              startDate ||
              endDate ||
              selectedFormat ||
              startDateMonth ||
              endDateMonth ||
              selectedPublisher) && (
              <div>
                <ButtonTable
                  onClick={handleClear}
                  Customstyle={{
                    width: '100%',
                    justifyContent: 'center',
                    height: '50px',
                  }}
                >
                  <Delete style={{width: '23px', height: '23px'}}/>
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
