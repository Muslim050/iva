import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import { fetchStatistics } from '../../../redux/statisticsSlice'
import FormatterView from '../../UI/formatter/FormatterView'
import style from './OrderChartTable.module.scss'
import { ReactComponent as Filter } from 'src/assets/Table/Filter.svg'
import TheadAgeGenderGeo from './components/DopTable/SecondTheadAgeGenderGeo'
import WrapperThead from './components/DopTable/FirstTheadAgeGeoGender/WrapperThead'
import OrderChartThead from './OrderChartThead'
import OrderChartData from './OrderChartData'
import { ReactComponent as Eye } from 'src/assets/eye.svg'
import { InfoCardsBottom, InfoCardsTop } from './components/InfoCards/InfoCards'
import FilteredTooltip from './components/FilteredTooltip/FilteredTooltip'
import GenderData from './components/DopTable/Data/GenderData'
import AgeData from './components/DopTable/Data/AgeData'
import GeoData from './components/DopTable/Data/GeoData'
import { ReactComponent as Close } from 'src/assets/Modal/Close.svg'

function OrderChartTable() {
  const location = useLocation()
  const advertData = location.state?.advert || {}
  const [getOrder, setGetOrder] = React.useState(advertData)

  const dispatch = useDispatch()
  const [expandedRows, setExpandedRows] = React.useState('')
  const { id } = useParams()
  const [loading, setLoading] = React.useState(true)
  const [loadingClose, setLoadingClose] = React.useState(false)
  const data = useSelector((state) => state.statistics.statistics.results)
  const [isTooltip, setIsTooltip] = React.useState(false)
  const [startDate, setStartDate] = React.useState('')
  const [endDate, setEndDate] = React.useState('')
  const [dataFiltered, setDataFiltered] = React.useState(false)

  React.useEffect(() => {
    const startDateObj = new Date(advertData.expected_start_date)
    const endDateObj = advertData.actual_end_date
      ? new Date(advertData.actual_end_date)
      : new Date(advertData.expected_end_date)

    const minDate = startDateObj.toISOString().split('T')[0]
    const maxDate = endDateObj.toISOString().split('T')[0]

    setStartDate(minDate)
    setEndDate(maxDate)
  }, [
    advertData.expected_start_date,
    advertData.expected_end_date,
    advertData.actual_end_date,
  ])

  const handleRowClick = (videoLink) => {
    setExpandedRows((prevExpandedRow) =>
      prevExpandedRow === videoLink ? '' : videoLink,
    )
  }

  // Отправка запроса с фильтра
  const handleDateStatictick = () => {
    setLoading(true)
    setDataFiltered(true)
    dispatch(fetchStatistics({ order_id: id, startDate, endDate })).then(() =>
      setLoading(false),
    )
    setIsTooltip(false)
  }

  const handleProfileClick = () => {
    setIsTooltip(!isTooltip)
  }
  const closeH = () => {
    setIsTooltip(!isTooltip)
  }
  const handleClear = () => {
    setIsTooltip(false)
    setDataFiltered(false)
    setLoadingClose(true)

    // Recalculate the start and end dates from advertData
    const startDateObj = new Date(advertData.expected_start_date)
    const endDateObj = advertData.actual_end_date
      ? new Date(advertData.actual_end_date)
      : new Date(advertData.expected_end_date)

    const minDate = startDateObj.toISOString().split('T')[0]
    const maxDate = endDateObj.toISOString().split('T')[0]

    // Reset the startDate and endDate states
    setStartDate(minDate)
    setEndDate(maxDate)

    // Fetch statistics without the date filters (assumed default fetch behavior)
    dispatch(fetchStatistics({ order_id: id })).then(() =>
      setLoadingClose(false),
    )
  }
  const dataFilteredClose = () => {
    setDataFiltered(false)
    setLoadingClose(true)
    dispatch(fetchStatistics({ order_id: id })).then(() =>
      setLoadingClose(false),
    )
  }
  React.useEffect(() => {
    dispatch(fetchStatistics({ order_id: id })).then(() => setLoading(false))
  }, [dispatch])

  let totalViews = 0
  let totalBudget = 0
  let totalAnalitickView = 0
  let totalData = []

  const [sortOrder, setSortOrder] = React.useState('asc')
  const [sortedOrder, setSortedOrder] = React.useState([])
  React.useEffect(() => {
    const sortData = () => {
      if (data?.length > 0) {
        const sortedData = [...data].sort((a, b) => {
          console.log('aaaaa', a)
          const dateA = new Date(a.publication_date)
          const dateB = new Date(b.publication_date)
          return sortOrder === 'asc' ? dateA - dateB : dateB - dateA
        })
        setSortedOrder(sortedData)
      }
    }
    sortData()
  }, [data, sortOrder])

  const handleSort = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
  }
  const rotateStyle = {
    transform: sortOrder === 'asc' ? 'rotate(180deg) ' : 'rotate(0deg)',
    transition: 'transform 0.3s ease',
    color: sortOrder === 'asc' ? '#717377 ' : '#5670f1',
  }
  return (
    <>
      {loading ? (
        <div className="loaderWrapper">
          <div style={{ color: 'var(--text-color, )' }}>
            {' '}
            Загрузка статистики &nbsp;
          </div>
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="tableWrapper">
          <div className={style.tableChartWrapper__table_title}>
            {/* Ячейки с инфо Бюджет,План показов, План бюджета */}
            <div>
              <div style={{ display: 'flex' }}>
                <div>{data.name}</div> &nbsp; / &nbsp;
                <div>{getOrder.advertiser.name}</div>
              </div>
              <InfoCardsTop getOrder={getOrder} />
            </div>
            {/* Ячейки с инфо Бюджет,План показов, План бюджета */}
            <div className={style.profile}>
              {dataFiltered && (
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
                    <div style={{ marginTop: '4px' }}>
                      {new Date(startDate).toLocaleDateString('ru-RU', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                      })}
                      -
                      {new Date(endDate).toLocaleDateString('ru-RU', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                      })}
                    </div>
                  </div>

                  <Close
                    onClick={dataFilteredClose}
                    style={{
                      cursor: 'pointer',
                      border: 'solid 1px orange',
                      marginLeft: '10px',
                      borderRadius: '8px',
                    }}
                  />
                </div>
              )}
              {loadingClose && (
                <div className="loaderWrapper" style={{ height: '6vh' }}>
                  <div
                    className="spinner"
                    style={{ width: '25px', height: '25px' }}
                  ></div>
                </div>
              )}

              {/* <DownloadReport
                getOrder={getOrder}
                startDate={startDate}
                endDate={endDate}
              /> */}

              <div style={{ display: 'grid', marginLeft: '10px' }}>
                <div style={{ fontSize: '10px' }}>Выбрать период</div>
                <button
                  className={style.profile__wrapper}
                  onClick={handleProfileClick}
                >
                  <Filter style={{ width: '20px', height: '20px' }} />
                </button>
              </div>

              <FilteredTooltip
                getOrder={getOrder}
                isTooltip={isTooltip}
                handleDateStatictick={handleDateStatictick}
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
                setIsTooltip={setIsTooltip}
                closeH={closeH}
                handleClear={handleClear}
              />
            </div>
          </div>

          <table className="tableWrapper">
            {/* Колонки основной таблица  */}
            <thead>
              <OrderChartThead handleSort={handleSort} sortOrder={sortOrder} />
            </thead>
            {/* Колонки основной таблица  */}

            <tbody>
              {sortedOrder &&
                sortedOrder.map((statistic, index) => {
                  totalBudget += statistic.budget
                  totalAnalitickView += statistic.online_view_count
                  totalViews += statistic.online_view_count
                  totalData.push(statistic)
                  return (
                    <React.Fragment key={statistic.video_link}>
                      {/* Данные таблицы  */}
                      <tr key={index}>
                        <OrderChartData
                          statistic={statistic}
                          index={index}
                          handleRowClick={handleRowClick}
                          isExpanded={expandedRows === statistic.video_link}
                        />
                      </tr>
                      {/* Данные таблицы  */}

                      {/* Дополнительная таблица */}
                      {expandedRows === statistic.video_link && (
                        <tr
                          key={index}
                          className={`${style.doprow} ${style.list__item__open}`}
                        >
                          <td
                            colSpan="10"
                            className={`${style.list__item} ${
                              expandedRows === statistic.video_link
                                ? style.list__item__open
                                : ''
                            }`}
                          >
                            <div className="tableWrapper">
                              {/* {statistic.age_group_percentages.length === 0 &&
                              statistic.gender_percentages.length === 0 &&
                              statistic.geo_percentages.length === 0 ? (
                                <div
                                  style={{
                                    fontSize: '15px',
                                    lineHeight: '15px',
                                    color: '#fa8a00',
                                    textAlign: 'center',
                                  }}
                                >
                                  Введется аналитика данных
                                </div>
                              ) : ( */}
                              <table className="tableWrapper">
                                <thead style={{ border: 0 }}>
                                  {/* Колонки  ГЕО Возраст ПОЛ доп таблица  */}
                                  <tr>
                                    <TheadAgeGenderGeo
                                      data={sortedOrder}
                                      statistic={statistic}
                                    />
                                  </tr>
                                  {/* Колонки ГЕО Возраст ПОЛ доп таблица  */}
                                </thead>

                                <thead style={{ borderTop: '0' }}>
                                  {/* Колонки подробная инфа ГЕО Возраст ПОЛ */}
                                  <tr className={style.tableChart__tr}>
                                    <th style={{ textAlign: 'center' }}>
                                      <Eye
                                        style={{
                                          width: '25px',
                                          height: '25px',
                                        }}
                                      />
                                    </th>
                                    <WrapperThead statistic={statistic} />
                                  </tr>
                                  {/* Колонки подробная инфа ГЕО Возраст ПОЛ */}
                                </thead>

                                <td
                                  data-label="Показов"
                                  style={{ textAlign: 'center' }}
                                >
                                  {statistic.video_link ===
                                  'https://www.youtube.com/watch?v=OcR6AYdiyUo' ? (
                                    <FormatterView data="59 971" />
                                  ) : (
                                    <FormatterView
                                      data={statistic.online_view_count}
                                    />
                                  )}
                                </td>

                                <GenderData statistic={statistic} />
                                <AgeData statistic={statistic} />
                                <GeoData statistic={statistic} />
                              </table>
                              {/* )} */}
                            </div>
                          </td>
                        </tr>
                      )}
                      {/* Дополнительная таблица */}
                    </React.Fragment>
                  )
                })}
            </tbody>

            <thead style={{ border: 0 }}>
              {/* Ячейки с инфо Итого:	 */}
              <InfoCardsBottom
                totalViews={totalViews}
                totalBudget={totalBudget}
                totalAnalitickView={totalAnalitickView}
                getOrder={getOrder}
                totalData={totalData}
              />
              {/* Ячейки с инфо Итого:	 */}
            </thead>
          </table>
        </div>
      )}
    </>
  )
}

export default OrderChartTable
