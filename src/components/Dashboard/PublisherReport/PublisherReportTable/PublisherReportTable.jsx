import React from 'react'
import style from './PublisherReportTable.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import ButtonTable from 'src/components/UI/ButtonTable/ButtonTable'
import { ReactComponent as Reload } from 'src/assets/Table/reload.svg'
import { ReactComponent as Search } from 'src/assets/Search.svg'
import { ReactComponent as Close } from 'src/assets/CloseS.svg'

import { addPublisherReport } from 'src/redux/publisher/publisherSlice'
import FormatterView from 'src/components/UI/formatter/FormatterView'
import FormatterBudjet from 'src/components/UI/formatter/FormatterBudjet'
import { fetchChannel } from 'src/redux/channel/channelSlice'
import DatePicker from 'react-datepicker'
import { format } from 'date-fns'

const headers = [
  { key: 'id', label: 'ID' },
  { key: 'company', label: 'Компания' },
  { key: 'name', label: 'Рекламодатель' },
  { key: 'email', label: 'Агентство' },
  { key: 'phone_number', label: 'Канал' },
  { key: 'commission_rate', label: 'Название Видео' },
  { key: 'commission_rate', label: 'Формат' },
  { key: 'commission_rate', label: 'Начало' },
  { key: 'commission_rate', label: 'Конец' },
  { key: 'commission_rate', label: 'Показы факт' },
  { key: 'commission_rate', label: 'Бюджет компании' },
  { key: 'commission_rate', label: 'Комиссия Агенства' },
  { key: 'commission_rate', label: 'Комиссия AdTech Media' },
  { key: 'commission_rate', label: 'Бюджет' },
]
const formatV = [
  { value: 'preroll', text: 'Pre-roll' },
  { value: 'mixroll', text: 'Mix-roll' },
]

function PublisherReportTable() {
  const [loading, setLoading] = React.useState(true)
  const [filterLoading, setFilterLoading] = React.useState(false)

  const data = useSelector((state) => state.publisher.publisherReport)
  const dispatch = useDispatch()
  const itemsPerPage = 100
  const [currentPage, setCurrentPage] = React.useState(1)
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem)
  const channel = useSelector((state) => state.channel.channel)
  const [selectedAdvertiser, setSelectedAdvertiser] = React.useState(null)
  const [selectedFormat, setSelectedFormat] = React.useState('')

  const [startDate, setStartDate] = React.useState(null)
  const [endDate, setEndDate] = React.useState(null)

  // Функция для изменения страницы
  const paginate = (pageNumber) => setCurrentPage(pageNumber)
  React.useEffect(() => {
    dispatch(addPublisherReport()).then(() => setLoading(false))
  }, [dispatch])

  const handleStartDateChange = (date) => {
    setStartDate(date) // Keep the Date object for DatePicker
  }

  const handleEndDateChange = (date) => {
    setEndDate(date) // Keep the Date object for DatePicker
  }
  const handleReload = () => {
    dispatch(addPublisherReport())
  }
  React.useEffect(() => {
    dispatch(fetchChannel())
  }, [dispatch])

  const handleSearch = () => {
    if (selectedAdvertiser) {
      setFilterLoading(true) // Set loading to true right before dispatch
      const formattedStartDate = startDate
        ? format(startDate, 'yyyy-MM-dd')
        : undefined
      const formattedEndDate = endDate
        ? format(endDate, 'yyyy-MM-dd')
        : undefined

      dispatch(
        addPublisherReport({
          id: selectedAdvertiser,
          startDate: formattedStartDate,
          endDate: formattedEndDate,
          format: selectedFormat,
        }),
      )
        .then(() => {
          setFilterLoading(false)
        })
        .catch(() => {
          setFilterLoading(false) // Ensure loading is reset on error
        })
    } else {
      console.log('No advertiser selected')
    }
  }

  const handleSelectChange = (event) => {
    setSelectedAdvertiser(event.target.value)
  }

  const handleSelectFormat = (event) => {
    setSelectedFormat(event.target.value)
  }

  const handleClear = () => {
    setFilterLoading(true)
    setSelectedAdvertiser('')
    setStartDate(null)
    setEndDate(null)
    dispatch(addPublisherReport()).then(() => setFilterLoading(false))
  }
  const showClearButton =
    selectedAdvertiser !== '' || startDate !== null || endDate !== null

  console.log('selectedAdvertiser', selectedAdvertiser)

  return (
    <>
      {loading ? (
        <div className="loaderWrapper" style={{ height: '80vh' }}>
          <div style={{ marginRight: '15px' }}>Загрузка отчета</div>
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="tableWrapper">
          <div className="tableWrapper__table_title">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              Отчет &nbsp;
              <ButtonTable onClick={handleReload}>
                <Reload style={{ width: '23px', height: '23px' }} />
              </ButtonTable>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'end',
                gap: '10px',
                overflow: 'hidden',
              }}
            >
              {filterLoading && (
                <div className="loaderWrapper" style={{ height: '5vh' }}>
                  <div
                    className="spinner"
                    style={{ width: '25px', height: '25px' }}
                  ></div>
                </div>
              )}

              <div style={{ width: '300px' }}>
                <label
                  style={{
                    fontSize: '12px',
                    color: 'var(--text-color)',
                    fontWeight: '400',
                  }}
                >
                  Выбрать канал
                  <select
                    value={selectedAdvertiser}
                    onChange={handleSelectChange}
                    style={{ width: '100%' }}
                    className={style.input}
                  >
                    <option value="">Выберите канал</option>
                    {channel.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                </label>
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
                  Выбрать формат
                </label>

                <select
                  id="countries"
                  className={style.input}
                  onChange={handleSelectFormat}
                >
                  <option value="">Формат</option>

                  {formatV.map((option, index) => (
                    <option key={index} value={option.value}>
                      {option.text}
                    </option>
                  ))}
                </select>
              </div>
              {(selectedAdvertiser || startDate || endDate) && (
                <ButtonTable onClick={handleClear}>
                  <Close style={{ width: '23px', height: '23px' }} />
                </ButtonTable>
              )}
              <ButtonTable onClick={handleSearch}>
                <Search style={{ width: '23px', height: '23px' }} />
              </ButtonTable>
            </div>
          </div>
          {data && data.length ? (
            <table style={{ width: '100%' }}>
              <thead>
                <tr>
                  {headers.map((row) => (
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
                {currentItems.map((person, i) => (
                  <tr key={person.id}>
                    <td>{indexOfFirstItem + i + 1}</td>

                    <td>{person.order_name}</td>
                    <td>{person.advertiser_name}</td>

                    <td>{person.advertising_agency_name}</td>
                    <td>{person.channel_name}</td>
                    <td>{person.video_content_name}</td>
                    <td>{person.format}</td>

                    <td>
                      {new Date(person.order_start_date)
                        .toLocaleDateString('en-GB')
                        .replace(/\//g, '.')}
                    </td>
                    <td>
                      {new Date(person.order_end_date)
                        .toLocaleDateString('en-GB')
                        .replace(/\//g, '.')}
                    </td>

                    <td>
                      <FormatterView data={person.recorded_view_count} />
                    </td>

                    <td>
                      <div style={{ display: 'flex' }}>
                        <FormatterBudjet budget={person.budget_fact} />
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex' }}>
                        <FormatterBudjet
                          budget={person.agency_commission_total}
                        />
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex' }}>
                        <FormatterBudjet
                          budget={person.adtechmedia_commission_total}
                        />
                      </div>
                    </td>

                    <td>
                      <div style={{ display: 'flex' }}>
                        <FormatterBudjet budget={person.channel_budget_total} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="empty_list">
              Установите фильтр или по данным пораметрам не найдены данные!
            </div>
          )}
          <div className={style.pagination}>
            {Array.from(
              { length: Math.ceil(data.length / itemsPerPage) },
              (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => paginate(index + 1)}
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
