import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchStatistics } from '../../../redux/statisticsSlice'
import FormatterView from '../../UI/formatter/FormatterView'
import style from './OrderChartTable.module.scss'
import axios from 'axios'
import backendURL from 'src/utils/url'
import { ReactComponent as Filter } from 'src/assets/Table/Filter.svg'
import TheadAgeGenderGeo from './components/DopTable/SecondTheadAgeGenderGeo'
import WrapperThead from './components/DopTable/FirstTheadAgeGeoGender/WrapperThead'
import OrderChartThead from './OrderChartThead'
import OrderChartData from './OrderChartData'
import { ReactComponent as Eye } from 'src/assets/eye.svg'
import DownloadReport from './components/DownloadReport'
import { InfoCardsBottom, InfoCardsTop } from './components/InfoCards/InfoCards'
import FilteredTooltip from './components/FilteredTooltip/FilteredTooltip'
import GenderData from './components/DopTable/Data/GenderData'
import AgeData from './components/DopTable/Data/AgeData'
import GeoData from './components/DopTable/Data/GeoData'

function OrderChartTable() {
  const dispatch = useDispatch()
  const [expandedRows, setExpandedRows] = React.useState('')
  const { id } = useParams()
  const [loading, setLoading] = React.useState(true)
  const data = useSelector((state) => state.statistics.statistics.results)
  const [getOrder, setGetOrder] = React.useState([])
  const [isTooltip, setIsTooltip] = React.useState(false)

  const [startDate, setStartDate] = React.useState('')
  const [endDate, setEndDate] = React.useState('')

  const handleRowClick = (videoLink) => {
    setExpandedRows((prevExpandedRow) =>
      prevExpandedRow === videoLink ? '' : videoLink,
    )
  }

  // Отправка запроса с фильтра
  const handleDateStatictick = () => {
    setLoading(true)
    dispatch(fetchStatistics({ id, startDate, endDate })).then(() =>
      setLoading(false),
    )
    setIsTooltip(false)
  }
  // Отправка запроса с фильтра

  const fetchGetOrder = async () => {
    const token = localStorage.getItem('token')

    const response = await axios.get(
      `${backendURL}/order/${id}/`,

      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    )
    setGetOrder(response.data.data)
    const { actual_start_date, actual_end_date, expected_end_date } =
      response.data.data

    // Format actual_start_date and actual_end_date into Date objects
    const startDateObj = new Date(actual_start_date)
    const endDateObj = actual_end_date
      ? new Date(actual_end_date)
      : new Date(expected_end_date)

    // Convert Date objects to ISO string to set as min and max attributes of date inputs
    const minDate = startDateObj.toISOString().split('T')[0]
    const maxDate = endDateObj.toISOString().split('T')[0]

    // Set the initial values of startDate and endDate
    setStartDate(minDate)
    setEndDate(maxDate)
  }
  const handleProfileClick = () => {
    setIsTooltip(!isTooltip)
  }
  React.useEffect(() => {
    fetchGetOrder()
  }, [data])

  React.useEffect(() => {
    dispatch(fetchStatistics({ id })).then(() => setLoading(false))
  }, [dispatch])

  let totalViews = 0
  let totalBudget = 0
  let totalAnalitickView = 0

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
              <div>{getOrder.name}</div>
              <InfoCardsTop getOrder={getOrder} />
            </div>
            {/* Ячейки с инфо Бюджет,План показов, План бюджета */}
            <div className={style.profile}>
              <DownloadReport
                getOrder={getOrder}
                startDate={startDate}
                endDate={endDate}
              />

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
              />
            </div>
          </div>

          <table className="tableWrapper">
            {/* Колонки основной таблица  */}
            <thead>
              <OrderChartThead />
            </thead>
            {/* Колонки основной таблица  */}

            <tbody>
              {data &&
                data.map((statistic, index) => {
                  totalViews += statistic.online_view_count
                  totalBudget += statistic.budget
                  totalAnalitickView += statistic.online_view_count

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
                              {statistic.age_group_percentages.length === 0 &&
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
                              ) : (
                                <table className="tableWrapper">
                                  <thead style={{ border: 0 }}>
                                    {/* Колонки  ГЕО Возраст ПОЛ доп таблица  */}
                                    <tr>
                                      <TheadAgeGenderGeo
                                        data={data}
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
                                    <FormatterView
                                      data={statistic.online_view_count}
                                    />
                                  </td>

                                  <GenderData statistic={statistic} />
                                  <AgeData statistic={statistic} />
                                  <GeoData statistic={statistic} />
                                </table>
                              )}
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
