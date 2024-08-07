import React from 'react'
import style from './PublisherReportTable.module.scss'
import {useDispatch, useSelector} from 'react-redux'
import {ReactComponent as Filter} from '../../../../assets/Table/Filter.svg'
import {addPublisherReport, fetchPublisher, resetPublisherReport,} from '../../../../redux/publisher/publisherSlice'
import FormatterView from '../../../UI/formatter/FormatterView'
import FormatterBudjet from '../../../UI/formatter/FormatterBudjet'
import {fetchChannel} from '../../../../redux/channel/channelSlice'
import {format} from 'date-fns'
import FilteredTooltip from './FilteredTooltip/FilteredTooltip'
import {InfoCardsBottom, InfoCardsDop} from './InfoCards/InfoCards'
import {fetchAdvertiser} from '../../../../redux/advertiser/advertiserSlice'
import {formatDate} from 'src/utils/formatterDate'

const formatV = [
  {value: 'mixroll-uz', text: 'Mix-roll-UZ'},
  {value: 'preroll-uz', text: 'Pre-roll-UZ'},
  {value: 'preroll', text: 'Pre-roll'},
  {value: 'mixroll', text: 'Mix-roll'},
]

function PublisherReportTable () {
  const [loading, setLoading] = React.useState (true)
  const [filterLoading, setFilterLoading] = React.useState (false)
  const data = useSelector ((state) => state.publisher.publisherReport)
  const advdata = useSelector ((state) => state.advertiser.advertisers)
  const publisher = useSelector ((state) => state.publisher.publisher)
  const user = localStorage.getItem ('role')

  const dispatch = useDispatch ()
  const itemsPerPage = 100
  const [currentPage, setCurrentPage] = React.useState (1)
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = data.slice (indexOfFirstItem, indexOfLastItem)
  const channel = useSelector ((state) => state.channel.channel)

  const [selectedChannel, setSelectedChannel] = React.useState (null)
  const [selectedChannelName, setSelectedChannelName] = React.useState (null)
  const [selectedOptionChannel, setSelectedOptionChannel] = React.useState ('')

  const [selectedAdv, setSetSelectedAdv] = React.useState (null)
  const [selectedAdvName, setSelectedAdvName] = React.useState (null)
  const [selectedOptionAdv, setSelectedOptionAdv] = React.useState ('')

  const [selectedPublisher, setSetSelectedPublisher] = React.useState (null)
  const [selectedPublisherName, setSelectedPublisherName] = React.useState (null)
  const [selectedOptionPublisher, setSelectedOptionPublisher] =
    React.useState ('')

  const [selectedFormat, setSelectedFormat] = React.useState ('')
  const [isTooltip, setIsTooltip] = React.useState (false)

  const [startDate, setStartDate] = React.useState (null)
  const [endDate, setEndDate] = React.useState (null)

  const [startDateMonth, setStartDateMonth] = React.useState (null)
  const [endDateMonth, setEndDateMonth] = React.useState (null)
  const [dateRange, setDateRange] = React.useState ([])
  const currentMonth = new Date ()
  const startOfCurrentMonth = new Date (
    currentMonth.getFullYear (),
    currentMonth.getMonth (),
    1,
  )
  const [selectedMonth, setSelectedMonth] = React.useState ('')
  // Функция для изменения страницы
  const paginate = (pageNumber) => setCurrentPage (pageNumber)
  React.useEffect (() => {
    dispatch (addPublisherReport ()).then (() => setLoading (false))
  }, [dispatch])
  React.useEffect (() => {
    if (selectedPublisher) {
      dispatch (fetchChannel (selectedPublisher))
    } else {
      dispatch (fetchChannel ())
    }
  }, [dispatch, selectedPublisher])
  React.useEffect (() => {
    if (user === "admin") {
      dispatch (fetchPublisher ())

    }
  }, [dispatch])
  React.useEffect (() => {
    if (selectedChannel) {
      // Проверка на наличие значения
      dispatch (fetchAdvertiser ({id: selectedChannel})).then (() =>
        setLoading (false),
      )
    }
  }, [dispatch, selectedChannel])

  React.useEffect (() => {
    setStartDateMonth (dateRange[0])
    setEndDateMonth (dateRange[1])
  }, [dateRange])
  const handleStartDateChange = (date) => {
    setStartDate (date) // Keep the Date object for DatePicker
  }
  const handleEndDateChange = (date) => {
    setEndDate (date) // Keep the Date object for DatePicker
  }

  const uniqueChannelName = new Set (data.map ((item) => item.channel_name))
  const uniqueChannelNameFiltered = Array.from (uniqueChannelName)

  React.useEffect (() => {
    if (dateRange.length === 2) {
      setStartDateMonth (dateRange[0])
      setEndDateMonth (dateRange[1])
    }
  }, [dateRange])
  const handleSearch = () => {
    if (selectedChannel || selectedPublisher) {
      setFilterLoading (true)

      const formattedStartDate = startDate
        ? format (startDate, 'yyyy-MM-dd')
        : undefined
      const formattedEndDate = endDate
        ? format (endDate, 'yyyy-MM-dd')
        : undefined

      const formattedStartDateMonth = startDateMonth
        ? format (startDateMonth, 'yyyy-MM-dd')
        : undefined
      const formattedEndDateMonth = endDateMonth
        ? format (endDateMonth, 'yyyy-MM-dd')
        : undefined

      const useMonthBasedDates = startDateMonth !== undefined

      let targetCountry = ''
      let formatVideo = selectedFormat
      if (selectedFormat === 'mixroll-uz' || selectedFormat === 'preroll-uz') {
        targetCountry = 'uz'
        formatVideo = selectedFormat.replace ('-uz', '')
      }
      dispatch (
        addPublisherReport ({
          id: selectedChannel,
          startDate: useMonthBasedDates
            ? formattedStartDateMonth
            : formattedStartDate,
          endDate: useMonthBasedDates
            ? formattedEndDateMonth
            : formattedEndDate,
          publisher: selectedPublisher,
          format: formatVideo, // Send the correct format
          target_country: targetCountry,
        }),
      )
        .then (() => {
          setFilterLoading (false)
        })
        .catch (() => {
          setFilterLoading (false) // Ensure loading is reset on error
        })
      setIsTooltip (!isTooltip)
    } else {
      console.log ('No advertiser selected')
    }
  }
  const handleSelectChange = (event) => {
    const value = event.target.value
    setSelectedOptionChannel (value)
    if (value) {
      const option = JSON.parse (value)
      setSelectedChannel (option.id)
      setSelectedChannelName (option.name)
    } else {
      setSelectedChannel (null)
      setSelectedChannelName ('')
    }
  }
  const handleSelectChangeADV = (event) => {
    const value = event.target.value
    setSelectedOptionAdv (value)

    if (value) {
      const option = JSON.parse (value)
      setSetSelectedAdv (option.id)
      setSelectedAdvName (option.name)
    } else {
      setSetSelectedAdv (null)
      setSelectedAdvName ('')
    }
  }

  const handleSelectChangePablisher = (event) => {
    const value = event.target.value
    setSelectedOptionPublisher (value)

    if (value) {
      const option = JSON.parse (value)
      setSetSelectedPublisher (option.id)
      setSelectedPublisherName (option.name)
    } else {
      setSetSelectedPublisher (null)
      setSelectedPublisherName ('')
    }
  }
  const handleSelectFormat = (event) => {
    setSelectedFormat (event.target.value)
  }
  const handleClear = () => {
    setFilterLoading (true)
    setSelectedChannel (null)
    setSelectedOptionChannel ('')
    setSelectedAdvName ('')
    setSelectedMonth ('')
    setSelectedChannelName (null)
    setStartDate (null)
    setEndDate (null)
    setSelectedFormat ('')
    setDateRange ([])
    setSetSelectedPublisher (null)
    setSelectedPublisherName (null)
    setSelectedOptionPublisher ('')
    // setSelectedMonth (startOfCurrentMonth);  // Сброс выбранной даты в DatePicker
    dispatch (resetPublisherReport ()) // Dispatch the reset action
    setFilterLoading (false)
  }
  const handleProfileClick = () => {
    setIsTooltip (!isTooltip)
    setStartDate (startDate)
    setEndDate (endDate)
  }
  let totalViews = 0
  let totalBudget = 0
  let totalComisy = 0
  let totalComisyAdtech = 0
  let totalbudjetChannel = 0
  let channelName = ''

  const headers = [
    {key: 'id', label: 'ID'},
    {key: 'company', label: 'Компания'},
    {key: 'name', label: 'Рекламодатель'},
    {key: 'phone_number', label: 'Канал'},
    {key: 'commission_rate', label: 'Название Видео'},
    {key: 'commission_rate', label: 'Формат'},
    {key: 'commission_rate', label: 'Начало'},
    {key: 'commission_rate', label: 'Конец'},
    {key: 'commission_rate', label: 'Показы факт'},
    {key: 'commission_rate', label: 'Бюджет компании'},
    {key: 'commission_rate', label: 'Комиссия Агенства'},
    {key: 'commission_rate', label: 'Комиссия AdTech Media'},
    {key: 'commission_rate', label: `Бюджет - ${uniqueChannelNameFiltered}`},
  ]
  // const handleDateChange = (date) => {
  //   const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1)
  //   const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0)
  //   setDateRange([startOfMonth, endOfMonth])
  //   setSelectedMonth(startOfMonth)
  //   setEndDateMonth(dateRange[1])
  //   setStartDateMonth(dateRange[0])
  // }

  const handleDateChange = (date) => {
    if (date) {
      const startOfMonth = new Date (date.getFullYear (), date.getMonth (), 1)
      const endOfMonth = new Date (date.getFullYear (), date.getMonth () + 1, 0)
      setDateRange ([startOfMonth, endOfMonth])
      setSelectedMonth (startOfMonth) // Убедитесь, что здесь всегда передается объект Date
    }
  }

  return (
    <>
      {loading ? (
        <div className="loaderWrapper" style={{height: '80vh'}}>
          <div style={{marginRight: '15px'}}>Загрузка отчета</div>
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="tableWrapper">
          <div className="tableWrapper__table_title">
            <div style={{display: 'flex', alignItems: 'center'}}>
              Отчет-Паблишера &nbsp;
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'end',
                gap: '10px',
              }}
            >
              {filterLoading && (
                <div className="loaderWrapper" style={{height: '5vh'}}>
                  <div
                    className="spinner"
                    style={{width: '25px', height: '25px'}}
                  ></div>
                </div>
              )}

              <div className={style.profile}>
                {selectedAdvName && (
                  <div
                    style={{
                      padding: '10px',
                      borderRadius: '8px',
                      background: '#FEF5EA',
                      border: '1px solid #ffd8a9',
                      marginRight: '5px',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '13px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                      }}
                    >
                      Рекламодатель
                      <div style={{marginTop: '4px'}}>{selectedAdvName}</div>
                    </div>
                  </div>
                )}
                {selectedChannelName && (
                  <div
                    style={{
                      padding: '10px',
                      borderRadius: '8px',
                      background: '#FEF5EA',
                      border: '1px solid #ffd8a9',
                      marginRight: '5px',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '13px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                      }}
                    >
                      Канал
                      <div style={{marginTop: '4px'}}>
                        {selectedChannelName}
                      </div>
                    </div>
                  </div>
                )}
                {dateRange && (
                  <div
                    style={{
                      padding: '10px',
                      borderRadius: '8px',
                      background: '#FEF5EA',
                      border: '1px solid #ffd8a9',
                      marginRight: '5px',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '13px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                      }}
                    >
                      Месяц
                      <div style={{marginTop: '4px'}}>
                        {selectedMonth
                          ? selectedMonth
                            .toLocaleString ('ru-RU', {month: 'long'})
                            .toLowerCase ()
                          : 'All'}
                      </div>
                    </div>
                  </div>
                )}
                {selectedPublisher && (
                  <div
                    style={{
                      padding: '10px',
                      borderRadius: '8px',
                      background: '#FEF5EA',
                      border: '1px solid #ffd8a9',
                      marginRight: '5px',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '13px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                      }}
                    >
                      Паблишер
                      <div style={{marginTop: '4px'}}>
                        {selectedPublisherName}
                      </div>
                    </div>
                  </div>
                )}
                {(startDate || endDate) && (
                  <div
                    style={{
                      padding: '10px',
                      borderRadius: '8px',
                      background: '#FEF5EA',
                      border: '1px solid #ffd8a9',
                      marginRight: '5px',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '13px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                      }}
                    >
                      Выбранный период
                      <div style={{marginTop: '4px'}}>
                        {endDate && <>{formatDate (endDate)}</>}
                      </div>
                    </div>
                  </div>
                )}

                {selectedFormat && (
                  <div
                    style={{
                      padding: '10px',
                      borderRadius: '8px',
                      background: '#FEF5EA',
                      border: '1px solid #ffd8a9',
                      marginRight: '5px',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '13px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                      }}
                    >
                      Формат
                      <div style={{marginTop: '4px'}}>{selectedFormat}</div>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <div style={{display: 'grid', marginLeft: '10px'}}>
                  <div style={{fontSize: '10px'}}>Выбрать период</div>
                  <button
                    className={style.profile__wrapper}
                    onClick={handleProfileClick}
                  >
                    <Filter style={{width: '20px', height: '20px'}}/>
                  </button>
                </div>
                <div style={{position: 'absolute'}}>
                  <FilteredTooltip
                    isTooltip={isTooltip}
                    //
                    startDate={startDate}
                    endDate={endDate}
                    //
                    handleSelectFormat={handleSelectFormat}
                    selectedFormat={selectedFormat}
                    //
                    handleProfileClick={handleProfileClick}
                    //
                    channel={channel}
                    advdata={advdata}
                    //
                    selectedChannel={selectedChannel}
                    //
                    selectedAdv={selectedAdv}
                    //
                    handleSelectChange={handleSelectChange}
                    handleSelectChangeADV={handleSelectChangeADV}
                    //
                    handleClear={handleClear}
                    handleSearch={handleSearch}
                    //
                    handleEndDateChange={handleEndDateChange}
                    handleStartDateChange={handleStartDateChange}
                    //
                    selectedOptionChannel={selectedOptionChannel}
                    selectedOptionAdv={selectedOptionAdv}
                    //
                    setStartDateMonth={setStartDateMonth}
                    setEndDateMonth={setEndDateMonth}
                    startDateMonth={startDateMonth}
                    endDateMonth={endDateMonth}
                    //
                    setDateRange={setDateRange}
                    dateRange={dateRange}
                    setSelectedMonth={setSelectedMonth}
                    selectedMonth={selectedMonth}
                    //
                    handleDateChange={handleDateChange}
                    publisher={publisher}
                    handleSelectChangePablisher={handleSelectChangePablisher}
                    selectedOptionPublisher={selectedOptionPublisher}
                    selectedPublisher={selectedPublisher}
                    selectedChannelName={selectedChannelName}
                    selectedPublisherName={selectedPublisherName}
                    formatV={formatV}
                  />
                </div>
              </div>
            </div>
          </div>
          {data && data.length ? (
            <table style={{width: '100%'}}>
              <thead>
              <tr>
                {headers.map ((row) => (
                  <th
                    key={row.key}
                    style={{
                      fontSize: '14px',
                      fontWeight: '400',
                      color: '#2C2D33',
                    }}
                  >
                    {row.label}
                  </th>
                ))}
              </tr>
              </thead>
              <tbody>
              {currentItems.map ((person, i) => {
                totalBudget += person.budget_fact
                totalViews += person.recorded_view_count
                totalComisy += person.agency_commission_total
                totalComisyAdtech += person.adtechmedia_commission_total
                totalbudjetChannel += person.channel_budget_total

                channelName = person

                return (
                  <tr key={person.id}>
                    <td>{indexOfFirstItem + i + 1}</td>

                    <td>{person.order_name}</td>
                    <td>{person.advertiser_name}</td>

                    <td>{person.channel_name}</td>
                    {/*<td>{person.video_content_name}</td>*/}
                    <td
                      style={{width: 'inherit', color: 'blue'}}
                      className={style.table_td}
                    >
                      {person.video_content_name}
                    </td>
                    <td>{person.format}</td>

                    <td>{formatDate (person.order_start_date)}</td>
                    <td>{formatDate (person.order_end_date)}</td>

                    <td>
                      <FormatterView data={person.recorded_view_count}/>
                    </td>

                    <td>
                      <div style={{display: 'flex'}}>
                        <FormatterBudjet
                          budget={person.budget_fact}
                          data={person.order_start_date}
                        />
                      </div>
                    </td>
                    <td>
                      <div style={{display: 'flex'}}>
                        <FormatterBudjet
                          budget={person.agency_commission_total}
                          data={person.order_start_date}
                        />
                      </div>
                    </td>
                    <td>
                      <div style={{display: 'flex'}}>
                        <FormatterBudjet
                          budget={person.adtechmedia_commission_total}
                          data={person.order_start_date}
                        />
                      </div>
                    </td>

                    <td>
                      <div style={{display: 'flex'}}>
                        <FormatterBudjet
                          budget={person.channel_budget_total}
                          data={person.order_start_date}
                        />
                      </div>
                    </td>
                  </tr>
                )
              })}
              </tbody>

              <thead style={{border: 0}}>
              {/* Ячейки с инфо Итого:	 */}
              <InfoCardsBottom
                totalViews={totalViews}
                totalBudget={totalBudget}
                totalComisy={totalComisy}
                currentItems={currentItems}
                totalComisyAdtech={totalComisyAdtech}
                totalbudjetChannel={totalbudjetChannel}
                channelName={channelName}
                uniqueChannelNameFiltered={uniqueChannelNameFiltered}
              />
              {/* Ячейки с инфо Итого:	 */}
              </thead>
              <thead style={{border: 0}}>
              {/* Ячейки с инфо Итого:	 */}
              <InfoCardsDop totalComisyAdtech={totalComisyAdtech}/>
              </thead>
            </table>
          ) : (
            <>
              <div className="empty_list">
                Установите фильтр для отображение данных!
              </div>
            </>
          )}
          <div className={style.pagination}>
            {Array.from (
              {length: Math.ceil (data.length / itemsPerPage)},
              (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => paginate (index + 1)}
                  className={`${style.button} ${
                    currentPage === index + 1 ? style.active : ''
                  }`}
                >
                  {index + 1}
                </button>
              ),
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default PublisherReportTable
