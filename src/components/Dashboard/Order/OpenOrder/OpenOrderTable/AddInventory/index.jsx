import style from '../BindingOrderModal.module.scss'
import AddInventoryData from './AddInventoryData'
import React from 'react'
import { useDispatch } from 'react-redux'
import { deactivateInventories } from '../../../../../../redux/orderStatus/orderStatusSlice'
import { toastConfig } from '../../../../../../utils/toastConfig'
import { toast } from 'react-toastify'
import { fetchOrder } from '../../../../../../redux/order/orderSlice'
import AdvertStatus from '../../../../../UI/AdvertStatus/AdvertStatus'
import FormatterView from '../../../../../UI/formatter/FormatterView'

export default function AddInventory({
  getOrder,
  setSelectedRows,
  selectedRows,
  expandedRows,
  fetchGetOrder,
  statusOr,
  onceOrder,
}) {
  const dispatch = useDispatch()
  const role = localStorage.getItem('role')
  const [total, setTotal] = React.useState(0)

  const handleDeactivateInventory = (inventory_id) => {
    const confirmDeactivate = window.confirm(
      'Вы уверены, что хотите завершить инвентарь?',
    )
    if (confirmDeactivate) {
      dispatch(deactivateInventories({ inventory_id }))
        .then(() => {
          toast.success('Инвентарь успешно завершен', toastConfig)
          fetchGetOrder() // Вызов функции после успешного запроса
        })
        .catch((error) => {
          toast.error(error.message, toastConfig)
          fetchGetOrder() // Вызов функции после успешного запроса
        })
    } else {
      toast.info('Операция отменена', toastConfig)
      dispatch(fetchOrder())
    }
  }
  const [totalOnlineView, setTotalOnlineView] = React.useState(0)

  React.useEffect(() => {
    const total = getOrder.reduce(
      (acc, advert) => acc + (advert?.online_views || 0),
      0,
    )
    setTotalOnlineView(total)
  }, [getOrder])

  const [sortOrder, setSortOrder] = React.useState('asc')
  const [sortedOrder, setSortedOrder] = React.useState([])

  React.useEffect(() => {
    const sortData = () => {
      if (getOrder.length > 0) {
        const sortedData = [...getOrder].sort((a, b) => {
          const dateA = new Date(a.video_content.publication_time)
          const dateB = new Date(b.video_content.publication_time)
          return sortOrder === 'asc' ? dateA - dateB : dateB - dateA
        })
        setSortedOrder(sortedData)
      }
    }
    sortData()
  }, [getOrder, sortOrder])

  const handleSort = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
  }
  const rotateStyle = {
    transform: sortOrder === 'asc' ? 'rotate(180deg) ' : 'rotate(0deg)',
    transition: 'transform 0.3s ease',
  }
  return (
    <div className={style.tableWrapper}>
      {sortedOrder.length && sortedOrder ? (
        <table className={style.table}>
          <thead>
            <tr>
              <th style={{ color: '#717377', fontWeight: '500' }}>№</th>
              <th style={{ color: '#717377', fontWeight: '500' }}>Канал</th>
              <th style={{ color: '#717377', fontWeight: '500' }}>
                Название Видео
              </th>
              <th style={{ color: '#717377', fontWeight: '500' }}>Категория</th>
              <th style={{ color: '#717377', fontWeight: '500' }}>Формат</th>
              <th style={{ color: '#717377', fontWeight: '500' }}>
                Прогноз показов
              </th>

              <th style={{ color: '#717377', fontWeight: '500' }}>Ссылка</th>
              <th
                style={{
                  color: '#717377',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                }}
              >
                Время публикаций
                <button
                  onClick={handleSort}
                  style={{ background: 'transparent' }}
                >
                  <svg
                    width="25px"
                    height="25px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={rotateStyle}
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0" />

                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />

                    <g id="SVGRepo_iconCarrier">
                      {' '}
                      <path
                        d="M7 3V21M7 3L11 7M7 3L3 7M14 3H15M14 9H17M14 15H19M14 21H21"
                        stroke="#717377"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />{' '}
                    </g>
                  </svg>
                </button>
              </th>

              <th style={{ color: '#717377', fontWeight: '500' }}>Показы</th>
              <th style={{ color: '#717377', fontWeight: '500' }}>
                Статус/Действия
              </th>
            </tr>
          </thead>
          <tbody>
            <AddInventoryData
              inventor={sortedOrder}
              expandedRows={expandedRows}
              selectedRows={selectedRows}
              setSelectedRows={setSelectedRows}
              handleDeactivateInventory={handleDeactivateInventory}
              statusOr={statusOr}
              totalOnlineView={totalOnlineView}
              onceOrder={onceOrder}
            />
          </tbody>
        </table>
      ) : (
        <div className="empty_list" style={{ padding: '10px 0' }}>
          Список пустой, добавьте размещение
        </div>
      )}
      {getOrder.length > 0 ? (
        <>
          {' '}
          {role === 'admin' ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'end',
                marginTop: '10px',
                width: '100%',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  border: '2px solid #ff991e',
                  borderRadius: '12px',
                  background: '#ffcc9163',
                  marginRight: '10px',
                  marginBottom: '10px',
                }}
              >
                {onceOrder === 'finished' ? (
                  ''
                ) : (
                  <div
                    style={{
                      display: 'flex',
                      padding: '8px 10px',
                    }}
                  >
                    <div style={{ marginRight: '5px' }}>Итого показы:</div>
                    <FormatterView data={totalOnlineView} />
                  </div>
                )}
                {onceOrder === 'finished' ? (
                  ''
                ) : (
                  <div
                    style={{
                      display: 'flex',
                      padding: '8px 10px',
                      borderLeft: '2px solid #ff991d',
                    }}
                  >
                    <div style={{ marginRight: '5px' }}> Остаток:</div>
                    <FormatterView
                      data={
                        onceOrder.expected_number_of_views -
                        onceOrder.online_views
                      }
                    />
                  </div>
                )}
                {onceOrder === 'finished' ? (
                  ''
                ) : (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '0px 10px',
                      borderLeft: '2px solid #ff991d',
                    }}
                  >
                    <div style={{ marginRight: '5px' }}>Статус:</div>
                    <AdvertStatus status={onceOrder.status}>
                      {role === 'admin' || role === 'advertising_agency' ? (
                        <>
                          {role === 'admin' || role === 'advertising_agency' ? (
                            <>
                              {onceOrder.status === 'in_progress' ? (
                                <div
                                  style={{
                                    display: (() => {
                                      const ratie = Math.floor(
                                        (onceOrder.online_views /
                                          onceOrder.expected_number_of_views) *
                                          100,
                                      )
                                      if (ratie >= 1) {
                                        return 'initial'
                                      }
                                      return 'none'
                                    })(),
                                    padding: '1px 5px',
                                    borderRadius: '7px',
                                    fontWeight: '600',
                                    background: (() => {
                                      const ratie = Math.floor(
                                        (onceOrder.online_views /
                                          onceOrder.expected_number_of_views) *
                                          100,
                                      )

                                      if (ratie >= 100) {
                                        return '#ec2020'
                                      } else if (ratie >= 80) {
                                        return '#fd8b00'
                                      } else if (ratie >= 50) {
                                        return 'rgba(50, 147, 111, 0.16)'
                                      } else if (ratie >= 1) {
                                        return 'rgb(86 112 241)'
                                      }
                                      return 'inherit'
                                    })(),

                                    color: (() => {
                                      const ratio =
                                        (onceOrder.online_views /
                                          onceOrder.expected_number_of_views) *
                                        100

                                      if (ratio >= 100) {
                                        return '#f8f8f8'
                                      } else if (ratio >= 80) {
                                        return '#764306'
                                      } else if (ratio >= 50) {
                                        return '#047f27'
                                      } else if (ratio >= 1) {
                                        return 'rgb(228 232 253)'
                                      }
                                      return 'inherit'
                                    })(),
                                  }}
                                >
                                  {onceOrder.online_views > 0 &&
                                    Math.floor(
                                      (onceOrder.online_views /
                                        onceOrder.expected_number_of_views) *
                                        100,
                                    ) +
                                      ' ' +
                                      '%'}
                                </div>
                              ) : null}
                              {onceOrder.status === 'finished' ? (
                                <div
                                  style={{
                                    display: 'initial',
                                    padding: '1px 4px',
                                    borderRadius: '7px',
                                    background: 'rgb(156 81 81)',
                                    color: '#eedede',
                                    marginLeft: '10px',
                                  }}
                                >
                                  100%
                                </div>
                              ) : null}
                            </>
                          ) : null}
                        </>
                      ) : null}
                    </AdvertStatus>
                  </div>
                )}
              </div>
            </div>
          ) : null}
        </>
      ) : null}
    </div>
  )
}
