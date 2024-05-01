import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {clearStatistics, fetchStatistics} from 'src/redux/statisticsSlice'
import style from './AdvChartTable.module.scss'
import OrderChartThead from './AdvChartThead'
import AdvChartData from './AdvChartData'
import {InfoCardsBottom} from './components/InfoCardsBottom/InfoCards'
import FilteredTooltip from './components/FilteredTooltip/FilteredTooltip'
import {fetchAdvertiser} from "src/redux/advertiser/advertiserSlice";
import FilteredTooltipMain from "./components/FilteredTooltip/FilteredTooltipMain";
import {fetchShortList} from "src/redux/order/orderSlice";
import {format} from "date-fns";


function AdvertiserReportTable () {
  const dispatch = useDispatch ()
  const [expandedRows, setExpandedRows] = React.useState ('')
  const [loading, setLoading] = React.useState (false)
  //
  const data = useSelector ((state) => state.statistics.statistics.results)
  const ShortListdata = useSelector ((state) => state.order.shortListData)
  const advdata = useSelector ((state) => state.advertiser.advertisers)
  //
  const [isTooltip, setIsTooltip] = React.useState (false)
  const [startDate, setStartDate] = React.useState ('')
  const [endDate, setEndDate] = React.useState ('')
  //
  const [selectedAdv, setSetSelectedAdv] = React.useState (null)
  const [selectedAdvName, setSelectedAdvName] = React.useState (null)
  const [selectedOptionAdv, setSelectedOptionAdv] = React.useState ('')
  //
  const [selectedOrderName, setSelectedOrderName] = React.useState (null)
  const [selectedOptionOrder, setSelectedOptionOrder] = React.useState ('')

  //Выбор рекламадателя
  const handleSelectChangeADV = (event) => {
    const value = event.target.value;
    setSelectedOptionAdv (value);

    if (value) {
      const option = JSON.parse (value);
      setSetSelectedAdv (option.id);
      setSelectedAdvName (option.name);
    } else {
      setSetSelectedAdv (null);
      setSelectedAdvName ("");
    }
  };
  //Выбор рекламадателя

  //useEffect
  React.useEffect (() => {
    dispatch (fetchAdvertiser ({}));
  }, [dispatch]);
  React.useEffect (() => {
    if (selectedAdv) {
      dispatch (fetchShortList ({id: selectedAdv}));
    }
  }, [dispatch, selectedAdv]);
  //useEffect

  const formattedStartDate = startDate
    ? format (startDate, 'yyyy-MM-dd')
    : undefined
  const formattedEndDate = endDate
    ? format (endDate, 'yyyy-MM-dd')
    : undefined


  // Отправка запроса с фильтра
  const handleDateStatictick = () => {
    setLoading (true)
    dispatch (fetchStatistics ({adv_id: selectedAdv, startDate: formattedStartDate, endDate: formattedEndDate}))
      .unwrap ()
      .then (() => setLoading (false))
    setIsTooltip (false)
  }
  // Отправка запроса с фильтра

  const handleProfileClick = () => {
    setIsTooltip (!isTooltip)
  }
  const closeH = () => {
    setIsTooltip (!isTooltip)
    setStartDate (startDate)
    setEndDate (endDate)
  }
  const handleClear = () => {
    setSelectedOrderName (null)
    setSelectedAdvName (null)
    setSelectedOptionAdv ('')
    setSelectedOptionOrder ('')
    setStartDate (null)
    setEndDate (null)
    dispatch (clearStatistics ());

  }

  const handleStartDateChange = (date) => {
    setStartDate (date) // Keep the Date object for DatePicker
  }
  const handleEndDateChange = (date) => {
    setEndDate (date) // Keep the Date object for DatePicker
  }

  let totalViews = 0
  let totalBudget = 0
  let totalAnalitickView = 0
  let tableData = [];


  return (
    <>
      {loading ? (
        <div className="loaderWrapper">
          <div style={{color: 'var(--text-color, )'}}>
            {' '}
            Загрузка статистики &nbsp;
          </div>
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="tableWrapper" style={{overflow: "auto"}}>
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
                    <div style={{marginTop: '4px'}}>
                      {startDate && new Date (startDate).toLocaleDateString ('ru-RU', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                      })}

                      &nbsp;

                      {endDate && new Date (endDate).toLocaleDateString ('ru-RU', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                      })
                      }
                    </div>
                  </div>


                </div>
              )}
              <FilteredTooltipMain handleProfileClick={handleProfileClick}>
                <FilteredTooltip
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
                  selectedOptionOrder={selectedOptionOrder}
                  selectedAdv={selectedAdv}
                  handleClear={handleClear}
                  selectedAdvName={selectedAdvName}
                  selectedOrderName={selectedOrderName}
                  //
                  handleStartDateChange={handleStartDateChange}
                  handleEndDateChange={handleEndDateChange}
                />
              </FilteredTooltipMain>
            </div>
          </div>
          {
            data && data.length ? <table className="tableWrapper" style={{overflow: "visible"}}>
                {/* Колонки основной таблица  */}
                <thead>
                <OrderChartThead statistic={tableData}/>
                </thead>
                {/* Колонки основной таблица  */}
                <tbody>
                {data && data.length &&
                  data.map ((statistic, index) => {
                    totalBudget += statistic.budget
                    totalAnalitickView += statistic.online_view_count
                    totalViews += statistic.online_view_count
                    tableData.push (statistic);
                    return (
                      <React.Fragment key={statistic.video_link}>
                        {/* Данные таблицы  */}
                        <tr key={index} style={{borderBottom: "1px solid #dad9d9"}}>
                          <AdvChartData
                            statistic={statistic}
                            index={index}
                            isExpanded={expandedRows === statistic.video_link}
                          />
                        </tr>
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
                />
                {/* Ячейки с инфо Итого:	 */}
                </thead>
              </table> :
              <div style={{display: "flex", justifyContent: "center", fontWeight: "600", padding: "20% 0"}}>
                Выберитепараметры фильтра
              </div>
          }

        </div>
      )}
    </>
  )
}

export default AdvertiserReportTable
