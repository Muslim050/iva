import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TableVideoList from './TableRevenueList'
import TableRevenueList2 from './TableRevenueList2'
import TableRevenueList3 from './TableRevenueList3'
import { fetchRevenue } from 'src/redux/revenueSlice'
import style from './TableRevenue.module.scss'
import { ReactComponent as Filter } from 'src/assets/Table/Filter.svg'
import FilteredTooltipRevenue from './FilteredTooltipRevenue/FilteredTooltipRevenue'
import ButtonTable from 'src/components/UI/ButtonTable/ButtonTable'
import { ReactComponent as ArrowR } from '../../../../assets/arrow-right.svg'
import { Link } from 'react-router-dom'
import ButtonBorder from 'src/components/UI/ButtonBorder/ButtonBorder'
import { ReactComponent as Delete } from 'src/assets/Table/Delete.svg'

function TableRevenue() {
  const dispatch = useDispatch()
  const { results } = useSelector((state) => state.revenue.revenue)
  const [loading, setLoading] = React.useState(true)
  const [isTooltip, setIsTooltip] = React.useState(false)
  const [startDate, setStartDate] = React.useState('')
  const [endDate, setEndDate] = React.useState('')
  const handleProfileClick = () => {
    setIsTooltip(!isTooltip)
  }
  React.useEffect(() => {
    dispatch(fetchRevenue()).then(() => setLoading(false))
  }, [dispatch])

  const handleDateStatictick = () => {
    setLoading(true)
    dispatch(fetchRevenue({ startDate, endDate })).then(() => setLoading(false))
    setIsTooltip(false)
  }

  const clearDate = () => {
    setStartDate('')
    setEndDate('')
    dispatch(fetchRevenue())
  }

  return (
    <>
      {loading ? (
        <div className="loaderWrapper">
          <div className="spinner"></div>
        </div>
      ) : (
        <>
          <div className={style.tableChartWrapper__table_title}>
            <div className={style.profile}>
              <Link to={'/order'}>
                <ButtonTable>
                  <ArrowR
                    style={{
                      width: '18px',
                      height: '15px',
                      transform: 'rotate(180deg)',
                      marginRight: '5px',
                    }}
                  />
                  Назад
                </ButtonTable>
              </Link>
              <div style={{ display: 'flex' }}>
                {startDate && endDate !== '' ? (
                  <div
                    style={{
                      alignItems: 'center',
                      display: 'grid',
                      padding: '10px',
                      border: '1px solid rgb(245 174 86)',
                      borderRadius: '8px',
                    }}
                  >
                    <div style={{ display: '-webkit-inline-box' }}>
                      <div style={{ marginRight: '5px' }}>
                        <div>Выбранный период:</div>С {startDate} по {endDate}
                      </div>
                      <div>
                        <ButtonBorder onClick={() => clearDate()}>
                          <Delete
                            style={{
                              width: '16px',
                              height: '16px',
                            }}
                          />
                        </ButtonBorder>
                      </div>
                    </div>
                  </div>
                ) : (
                  ''
                )}

                <div style={{ display: 'grid', marginLeft: '10px' }}>
                  <div style={{ fontSize: '10px', marginBottom: '10px' }}>
                    Выбрать период
                  </div>
                  <button
                    className={style.profile__wrapper}
                    onClick={handleProfileClick}
                  >
                    <Filter style={{ width: '20px', height: '20px' }} />
                  </button>
                </div>
              </div>

              <FilteredTooltipRevenue
                isTooltip={isTooltip}
                handleDateStatictick={handleDateStatictick}
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
                setIsTooltip={setIsTooltip}
              />

              {/* {isTooltip && (
                <div
                  lassName={style.profile__wrapper__tooltip}
                  style={{
                    position: "absolute",
                    right: "0px",
                    top: "65px",
                    backgroundColor: "#fff",
                    boxShadow: "0 0 5px #bbbbbb",
                    padding: "14px",
                    borderRadius: "10px",
                    zIndex: "2",
                  }}
                >
                  <div>
                    <label
                      style={{
                        fontSize: "10px",
                        color: "var(--text-color)",
                        fontWeight: "400",
                      }}
                    >
                      Дата начало
                    </label>
                    <input
                      className={style.input}
                      type="date"
                      value={startDate}
                      onChange={handleStartDateChange}
                      style={{
                        width: "210px",
                      }}
                    />
                  </div>
                  <div>
                    <label
                      style={{
                        fontSize: "10px",
                        color: "var(--text-color)",
                        fontWeight: "400",
                      }}
                    >
                      Дата конец
                    </label>
                    <input
                      className={style.input}
                      type="date"
                      value={endDate}
                      onChange={handleEndDateChange}
                      style={{
                        width: "210px",
                      }}
                    />
                  </div>

                  <div style={{ display: "flex" }}>
                    <button
                      className={style.btn_filtered}
                      onClick={handleDateStatictick} // Добавляем проверку перед сортировкой
                      disabled={!canClcked}
                    >
                      Сортировать
                    </button>
                    <button
                      className={style.btn_filtered__close}
                      onClick={() => setIsTooltip(!isTooltip)}
                    >
                      <Close style={{ height: "30px" }} />
                    </button>
                  </div>
                </div>
              )} */}
            </div>
          </div>
          <div className={style.tableRevenue}>
            <>
              <TableVideoList results={results} />
              <TableRevenueList2 results={results} />
              <TableRevenueList3 results={results} />
            </>
          </div>
        </>
      )}
    </>
  )
}

export default TableRevenue
