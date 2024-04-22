import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchStatistics } from '../../../redux/statisticsSlice'
import FormatterView from '../../UI/formatter/FormatterView'
import style from './AdvChartTable.module.scss'
import axios from 'axios'
import backendURL from 'src/utils/url'
import { ReactComponent as Filter } from 'src/assets/Table/Filter.svg'
import TheadAgeGenderGeo from './components/DopTable/SecondTheadAgeGenderGeo'
import WrapperThead from './components/DopTable/FirstTheadAgeGeoGender/WrapperThead'
import OrderChartThead from './AdvChartThead'
import AdvChartData from './AdvChartData'
import { ReactComponent as Eye } from 'src/assets/eye.svg'
import DownloadReport from './components/DownloadReport'
import { InfoCardsBottom, InfoCardsTop } from './components/InfoCards/InfoCards'
import FilteredTooltip from './components/FilteredTooltip/FilteredTooltip'
import GenderData from './components/DopTable/Data/GenderData'
import AgeData from './components/DopTable/Data/AgeData'
import GeoData from './components/DopTable/Data/GeoData'
import { ReactComponent as Close } from 'src/assets/Modal/Close.svg'

function AdvertiserReportTable() {
    const dispatch = useDispatch()
    const [expandedRows, setExpandedRows] = React.useState('')
    const { id } = useParams()
    const [loading, setLoading] = React.useState(true)
    const [loadingClose, setLoadingClose] = React.useState(false)

    const data = useSelector((state) => state.statistics.statistics.results)
    const [getOrder, setGetOrder] = React.useState([])
    const [isTooltip, setIsTooltip] = React.useState(false)
    const [startDate, setStartDate] = React.useState('')
    const [endDate, setEndDate] = React.useState('')
    const [dataFiltered, setDataFiltered] = React.useState(false)

    const handleRowClick = (videoLink) => {
        setExpandedRows((prevExpandedRow) =>
            prevExpandedRow === videoLink ? '' : videoLink,
        )
    }

    // Отправка запроса с фильтра
    const handleDateStatictick = () => {
        setLoading(true)
        setDataFiltered(true)
        dispatch(fetchStatistics({ id, startDate, endDate })).then(() =>
            setLoading(false),
        )
        setIsTooltip(false)
    }

    const fetchGetOrder = async () => {
        const token = localStorage.getItem('token')
        setLoading(true)
        const response = await axios.get(
            `${backendURL}/order/`,

            {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            },
        )
        setGetOrder(response.data.data)
        const { expected_start_date, actual_end_date, expected_end_date } =
            response.data.data

        const startDateObj = new Date(expected_start_date)
        const endDateObj = actual_end_date
            ? new Date(actual_end_date)
            : new Date(expected_end_date)
        setLoading(false)
        // const minDate = startDateObj.toISOString().split('T')[0]
        // const maxDate = endDateObj.toISOString().split('T')[0]

        // setStartDate(minDate)
        // setEndDate(maxDate)
    }
    const handleProfileClick = () => {
        setIsTooltip(!isTooltip)
        fetchGetOrder()
            .then(() => {})
            .catch((error) => {
                console.error('Ошибка при получении данных заказа:', error)
            })
    }
    const closeH = () => {
        setIsTooltip(!isTooltip)
        fetchGetOrder()
            .then(() => {})
            .catch((error) => {
                console.error('Ошибка при получении данных заказа:', error)
            })
        setStartDate(startDate)
        setEndDate(endDate)
    }
    React.useEffect(() => {
        fetchGetOrder()
    }, [])
    const dataFilteredClose = () => {
        setDataFiltered(false)
        setLoadingClose(true)
        // dispatch(fetchStatistics()).then(() => setLoadingClose(false))
    }
    React.useEffect(() => {
        dispatch(fetchStatistics({})).then(() => setLoading(false))
    }, [dispatch])

    let totalViews = 0
    let totalBudget = 0
    let totalAnalitickView = 0


    console.log("getOrder", getOrder)
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
                                fetchGetOrder={fetchGetOrder}
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
                                totalBudget += statistic.budget
                                totalAnalitickView += statistic.online_view_count
                                totalViews += statistic.online_view_count
                                return (
                                    <React.Fragment key={statistic.video_link}>
                                        {/* Данные таблицы  */}
                                        <tr key={index}>
                                            <AdvChartData
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
                        />
                        {/* Ячейки с инфо Итого:	 */}
                        </thead>
                    </table>
                </div>
            )}
        </>
    )
}

export default AdvertiserReportTable
