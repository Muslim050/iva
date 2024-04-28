import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {clearStatistics, fetchStatistics} from '../../../redux/statisticsSlice'
import FormatterView from '../../UI/formatter/FormatterView'
import style from './AdvChartTable.module.scss'
import axios from 'axios'
import backendURL from 'src/utils/url'
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
import {fetchShortList} from "../../../redux/order/orderSlice";
import {fetchAdvertiser} from "../../../redux/advertiser/advertiserSlice";
import FilteredTooltipMain from "./components/FilteredTooltip/FilteredTooltipMain";
import TheadGender from "./components/DopTable/FirstTheadAgeGeoGender/TheadGender";
import TheadAge from "./components/DopTable/FirstTheadAgeGeoGender/TheadAge";
import TheadGeo from "./components/DopTable/FirstTheadAgeGeoGender/TheadGeo";
import {resetPublisherReport} from "../../../redux/publisher/publisherSlice";

function AdvertiserReportTable() {
    const dispatch = useDispatch()
    const [expandedRows, setExpandedRows] = React.useState('')
    const [loading, setLoading] = React.useState(false)

    const [loadingClose, setLoadingClose] = React.useState(false)
    const [loadingDots, setLoadingDots] = React.useState(false)

    const user = localStorage.getItem('role')
    const AdvID = localStorage.getItem('advertiser')

//
    const data = useSelector((state) => state.statistics.statistics.results)
    const ShortListdata = useSelector((state) => state.order.shortListData)
    const advdata = useSelector((state) => state.advertiser.advertisers)
//
    const [getOrder, setGetOrder] = React.useState([])
    const [isTooltip, setIsTooltip] = React.useState(false)
    const [startDate, setStartDate] = React.useState('')
    const [endDate, setEndDate] = React.useState('')
    const [dataFiltered, setDataFiltered] = React.useState(false)

    //
    const [selectedAdv, setSetSelectedAdv] = React.useState(null)
    const [selectedAdvName, setSelectedAdvName] = React.useState(null)
    const [selectedOptionAdv, setSelectedOptionAdv] = React.useState('')
    //
    const [selectedOrder, setSetSelectedOrder] = React.useState(null)
    const [selectedOrderName, setSelectedOrderName] = React.useState(null)
    const [selectedOptionOrder, setSelectedOptionOrder] = React.useState('')

    const handleRowClick = (videoLink) => {
        setExpandedRows((prevExpandedRow) =>
            prevExpandedRow === videoLink ? '' : videoLink,
        )
    }
    const handleSelectChangeADV = (event) => {
        const value = event.target.value;
        setSelectedOptionAdv(value);

        if (value) {
            const option = JSON.parse(value);
            setSetSelectedAdv(option.id);
            setSelectedAdvName(option.name);
        } else {
            setSetSelectedAdv(null);
            setSelectedAdvName("");
        }
    };
    const handleSelectChangeOrder = (event) => {
        const value = event.target.value;
        setSelectedOptionOrder(value);

        if (value) {
            const option = JSON.parse(value);
            setSetSelectedOrder(option.id);
            setSelectedOrderName(option.name);
        } else {
            setSetSelectedOrder(null);
            setSelectedOrderName("");
        }
    };
    React.useEffect(() => {
        dispatch(fetchAdvertiser({}));
     }, [dispatch]);


    // const fetchGetOrder = async () => {
    //     const id = selectedOrder
    //     const token = localStorage.getItem('token')
    //
    //     const response = await axios.get(
    //       `${backendURL}/order/${id}/`,
    //
    //       {
    //           headers: {
    //               'Content-Type': 'application/json',
    //               Accept: 'application/json',
    //               Authorization: `Bearer ${token}`,
    //           },
    //       },
    //     )
    //     setGetOrder(response.data.data)
    //     const { expected_start_date, actual_end_date, expected_end_date } =
    //       response.data.data
    //
    //     const startDateObj = new Date(expected_start_date)
    //     const endDateObj = actual_end_date
    //       ? new Date(actual_end_date)
    //       : new Date(expected_end_date)
    //
    //     const minDate = startDateObj.toISOString().split('T')[0]
    //     const maxDate = endDateObj.toISOString().split('T')[0]
    //
    //     setStartDate(minDate)
    //     setEndDate(maxDate)
    // }
    // React.useEffect(() => {
    //     if(selectedOrder){
    //         setLoadingDots(true)
    //         fetchGetOrder(selectedOrder)
    //           .then(() => setLoadingDots(false))
    //     }
    // }, [dispatch, selectedOrder]);


    // Отправка запроса с фильтра
    const handleDateStatictick = () => {
        setLoading(true)
        setDataFiltered(true)
        dispatch(fetchStatistics({adv_id: selectedAdv,  startDate, endDate }))
          .unwrap()
          .then(() => setLoading(false))
        setIsTooltip(false)
    }
    const handleProfileClick = () => {
        setIsTooltip(!isTooltip)
    }
    const closeH = () => {
        setIsTooltip(!isTooltip)
        setStartDate(startDate)
        setEndDate(endDate)
    }
    const handleClear = () => {
        setSelectedOrderName(null)
        setSelectedAdvName(null)
        setSelectedOptionAdv('')
        setSelectedOptionOrder('')
        setStartDate(null)
        setEndDate(null)
    }
    React.useEffect(() => {
        // fetchGetOrder()
    }, [])


    const dataFilteredClose = () => {

        dispatch(clearStatistics())
        // dispatch(fetchStatistics()).then(() => setLoadingClose(false))
    }
    // React.useEffect(() => {
    //     dispatch(fetchStatistics({})).then(() => setLoading(false))
    // }, [dispatch])

    let totalViews = 0
    let totalBudget = 0
    let totalAnalitickView = 0
    let tableData = [];


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
                <div className="tableWrapper" style={{overflow: "visible"}}>
                    <div className={style.tableChartWrapper__table_title}>

                        <div className={style.profile}>
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
                                        <div style={{ marginTop: '4px' }}>
                                            {startDate && new Date(startDate).toLocaleDateString('ru-RU', {
                                                day: '2-digit',
                                                month: '2-digit',
                                                year: 'numeric',
                                            })}

                                            {endDate && new Date(endDate).toLocaleDateString('ru-RU', {
                                                    day: '2-digit',
                                                    month: '2-digit',
                                                    year: 'numeric',
                                                })
                                            }
                                        </div>
                                    </div>


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
                            <FilteredTooltipMain handleProfileClick={handleProfileClick} >
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
                                    advdata={advdata}
                                    selectedOptionAdv={selectedOptionAdv}
                                    handleSelectChangeADV={handleSelectChangeADV}
                                    ShortListdata={ShortListdata}
//
                                    setSelectedOptionOrder={setSelectedOptionOrder}
                                    handleSelectChangeOrder={handleSelectChangeOrder}
                                    selectedOptionOrder={selectedOptionOrder}
                                    selectedAdv={selectedAdv}
                                    loadingDots={loadingDots}
                                    handleClear={handleClear}
                                    selectedAdvName={selectedAdvName}
                                    selectedOrderName={selectedOrderName}
                                />
                            </FilteredTooltipMain>
                        </div>
                    </div>
                    {
                      data && data.length ? <table className="tableWrapper" style={{overflow: "visible"}}>
                          {/* Колонки основной таблица  */}
                          <thead>
                          <OrderChartThead/>
                          </thead>
                          {/* Колонки основной таблица  */}

                          <tbody>
                          {data && data.length &&
                            data.map((statistic, index) => {
                                totalBudget += statistic.budget
                                totalAnalitickView += statistic.online_view_count
                                totalViews += statistic.online_view_count
                                tableData.push(statistic);
                                return (
                                  <React.Fragment key={statistic.video_link}>
                                      {/* Данные таблицы  */}
                                      <tr key={index} style={{borderBottom: "1px solid #dad9d9"}}>
                                          <AdvChartData
                                            statistic={statistic}
                                            index={index}
                                            handleRowClick={handleRowClick}
                                            isExpanded={expandedRows === statistic.video_link}
                                          />
                                          {/*<tr*/}
                                          {/*  key={index}*/}
                                          {/*  className={`${style.doprow} ${style.list__item__open}`}*/}
                                          {/*>*/}
                                          {/*    <td*/}
                                          {/*      colSpan="10"*/}
                                          {/*      className={`${style.list__item} ${*/}
                                          {/*        expandedRows === statistic.video_link*/}
                                          {/*          ? style.list__item__open*/}
                                          {/*          : ''*/}
                                          {/*      }`}*/}

                                          {/*    >*/}

                                          {/*        <div className="tableWrapper" style={{overflow: "visible"}}>*/}
                                          {/*            <table className="tableWrapper" style={{overflow: "visible"}}>*/}
                                          {/*                <thead style={{border: 0}}>*/}
                                          {/*                /!* Колонки  ГЕО Возраст ПОЛ доп таблица  *!/*/}
                                          {/*                <tr>*/}
                                          {/*                    <TheadAgeGenderGeo*/}
                                          {/*                      data={data}*/}
                                          {/*                      statistic={statistic}*/}
                                          {/*                    />*/}
                                          {/*                </tr>*/}
                                          {/*                /!* Колонки ГЕО Возраст ПОЛ доп таблица  *!/*/}
                                          {/*                </thead>*/}

                                          {/*                <thead style={{borderTop: '0'}}>*/}
                                          {/*                /!* Колонки подробная инфа ГЕО Возраст ПОЛ *!/*/}
                                          {/*                <tr className={style.tableChart__tr}>*/}
                                          {/*                    <th style={{textAlign: 'center'}}>*/}
                                          {/*                        <Eye*/}
                                          {/*                          style={{*/}
                                          {/*                              width: '25px',*/}
                                          {/*                              height: '25px',*/}
                                          {/*                          }}*/}
                                          {/*                        />*/}
                                          {/*                    </th>*/}
                                          {/*                    <WrapperThead statistic={statistic}/>*/}
                                          {/*                </tr>*/}
                                          {/*                /!* Колонки подробная инфа ГЕО Возраст ПОЛ *!/*/}
                                          {/*                </thead>*/}

                                          {/*                <td*/}
                                          {/*                  data-label="Показов"*/}
                                          {/*                  style={{textAlign: 'center'}}*/}
                                          {/*                >*/}
                                          {/*                    <FormatterView*/}
                                          {/*                      data={statistic.online_view_count}*/}
                                          {/*                    />*/}
                                          {/*                </td>*/}

                                          {/*                <GenderData statistic={statistic}/>*/}
                                          {/*                <AgeData statistic={statistic}/>*/}
                                          {/*                <GeoData statistic={statistic}/>*/}
                                          {/*            </table>*/}
                                          {/*            /!* )} *!/*/}
                                          {/*        </div>*/}
                                          {/*    </td>*/}
                                          {/*</tr>*/}

                                      </tr>

                                      {/* Данные таблицы  */}

                                      {/* Дополнительная таблица */}


                                      {/* Дополнительная таблица */}
                                  </React.Fragment>
                                )
                            })}
                          </tbody>

                          <thead style={{border: 0}}>
                          {/* Ячейки с инфо Итого:	 */}
                          <InfoCardsBottom
                            totalViews={totalViews}
                            totalBudget={totalBudget}
                            totalAnalitickView={totalAnalitickView}
                            getOrder={getOrder}
                          />
                          {/* Ячейки с инфо Итого:	 */}
                          </thead>
                      </table> : <div style={{display: "flex", justifyContent: "center", fontWeight: "600"}}>Выберите параметры фильтра</div>
                    }

                </div>
            )}
        </>
    )
}

export default AdvertiserReportTable
