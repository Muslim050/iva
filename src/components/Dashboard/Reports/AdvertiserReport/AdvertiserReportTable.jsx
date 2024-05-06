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
  const [startDateMonth, setStartDateMonth] = React.useState (null)
  const [endDateMonth, setEndDateMonth] = React.useState (null)
  const [dateRange, setDateRange] = React.useState ([]);
  const [selectedMonth, setSelectedMonth] = React.useState ('');


  React.useEffect (() => {
    setStartDateMonth (dateRange[0]);
    setEndDateMonth (dateRange[1]);
  }, [dateRange]);
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


  const handleDateChange = (date) => {
    const startOfMonth = new Date (date.getFullYear (), date.getMonth (), 1);
    const endOfMonth = new Date (date.getFullYear (), date.getMonth () + 1, 0);
    setDateRange ([startOfMonth, endOfMonth]);
    setSelectedMonth (startOfMonth);
    setEndDateMonth (dateRange[1])
    setStartDateMonth (dateRange[0])
  };
  // Отправка запроса с фильтра


  const handleDateStatictick = () => {
    if (selectedAdv) {
      setLoading (true); // Start loading
      const formattedStartDateMonth = startDateMonth
        ? format (startDateMonth, 'yyyy-MM-dd')
        : undefined;
      const formattedEndDateMonth = endDateMonth
        ? format (endDateMonth, 'yyyy-MM-dd')
        : undefined;

      const useMonthBasedDates = startDateMonth !== undefined;
      dispatch (
        fetchStatistics ({
          adv_id: selectedAdv,
          startDate: useMonthBasedDates ? formattedStartDateMonth : formattedStartDate,
          endDate: useMonthBasedDates ? formattedEndDateMonth : formattedEndDate,
        }),
      )
        .then (() => {
          setLoading (false); // Stop loading when the request is successful
        })
        .catch (() => {
          setLoading (false); // Stop loading also when there is an error
        });
      setIsTooltip (!isTooltip);
    } else {
      console.log ('No advertiser selected');
    }
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
    setSelectedMonth ('')
    setDateRange ([])
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
                      {startDate && (
                        <>
                          {startDate
                            .toLocaleDateString ('en-GB')
                            .replaceAll ('/', '-')}
                        </>
                      )}
                      &nbsp;
                      {endDate && (
                        <>
                          {endDate
                            .toLocaleDateString ('en-GB')
                            .replaceAll ('/', '-')}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}
              {(startDateMonth || endDateMonth) && (
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
                      {selectedMonth ? selectedMonth.toLocaleString ('ru-RU', {month: 'long'}).toLowerCase () : "All"}
                    </div>
                  </div>
                </div>
              )}
              {(selectedAdvName) && (
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
                    Выбранный Рекламадатель
                    <div style={{marginTop: '4px'}}>
                      {selectedAdvName}
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

                  handleDateChange={handleDateChange}
                  setStartDateMonth={setStartDateMonth}
                  setEndDateMonth={setEndDateMonth}
                  startDateMonth={startDateMonth}
                  endDateMonth={endDateMonth}
                  selectedMonth={selectedMonth}
                  setIsTooltip={setIsTooltip}
                  tableData={tableData}
                />
              </FilteredTooltipMain>
            </div>
          </div>
          {
            data && data.length ?
              <table className="tableWrapper" style={{overflow: "visible"}}>
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
              <div style={{display: "flex", justifyContent: "center", fontWeight: "600", padding: "30% 0"}}>
                Выберите параметры фильтра
              </div>
          }

        </div>
      )}
    </>
  )
}

export default AdvertiserReportTable
