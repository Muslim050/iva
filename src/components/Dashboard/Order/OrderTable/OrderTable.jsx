import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ButtonTable from 'src/components/UI/ButtonTable/ButtonTable'
import { fetchOrder } from '../../../../redux/order/orderSlice'
import OrderData from './OrderData'
import OrderRows from './OrderRows'
import style from './OrderTable.module.scss'
import { ReactComponent as Reload } from 'src/assets/Table/reload.svg'
import { ReactComponent as Add } from 'src/assets/Table/add.svg'
import { showModalOrder } from 'src/redux/modalSlice'
import { sortData } from 'src/utils/SortData'
import { reloadInventory } from 'src/redux/inventory/inventorySlice'
import backendURL from 'src/utils/url'
import axios from 'axios'
import { toast } from 'react-toastify'
import { toastConfig } from 'src/utils/toastConfig'

function OrderTable() {
  const dispatch = useDispatch()
  const [loading, setLoading] = React.useState(true)
  const [sortKey, setSortKey] = React.useState('last_name')
  const [sort, setSort] = React.useState('desc')
  const { order } = useSelector((state) => state)
  const [loadingbtn, setLoadingbtn] = React.useState(false)

  const user = localStorage.getItem('role')
  const data = order?.order

  React.useEffect(() => {
    dispatch(fetchOrder()).then(() => setLoading(false))
  }, [dispatch])
  const sortedData = React.useCallback(
    () =>
      sortData({
        tableData: data,
        sortKey,
        reverse: sort === 'desc',
      }),
    [data, sortKey, sort],
  )
  function changeSort(key) {
    setSort(sort === 'ascn' ? 'desc' : 'ascn')
    setSortKey(key)
  }
  const handleButtonClick = () => {
    dispatch(showModalOrder())
  }
  const handleReload = async () => {
    if (loadingbtn) {
      return // Если запрос уже выполняется, ничего не делаем
    }

    try {
      setLoadingbtn(true) // Устанавливаем loadingbtn в true перед началом запроса
      const token = localStorage.getItem('token')
      const response = await axios.post(
        `${backendURL}/inventory/tasks/save-online-views`,
        null,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )
      // Обработка успешного запроса
    } catch (error) {
      // Обработка ошибки запроса
    } finally {
      setLoadingbtn(false) // Устанавливаем loadingbtn в false после завершения запроса (успешного или с ошибкой)
      toast.info('Данные просмотров успешно обновлены', toastConfig)

      dispatch(fetchOrder()) // Устанавливаем loading в true перед началом запроса
    }
  }

  return (
    <>
      {loading ? (
        <div className="loaderWrapper">
          <div style={{ marginRight: '10px' }}>Загрузка заказов</div>
          <div className="spinner"></div>
        </div>
      ) : (
        <div className={style.tableWrapper_Order}>
          <div className="tableWrapper__table_title">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              Заказы &nbsp;
              <ButtonTable onClick={() => handleReload()} disabled={loadingbtn}>
                {loadingbtn ? (
                  <div className="loaderWrapper" style={{ height: '25px' }}>
                    <div
                      className="spinner"
                      style={{
                        width: '25px',
                        height: '25px',
                        border: '3px solid #ffffff',
                        borderTopColor: '#5570f1',
                      }}
                    ></div>
                  </div>
                ) : (
                  <Reload style={{ width: '25px', height: '25px' }} />
                )}
              </ButtonTable>
            </div>
            {user === 'admin' ? (
              ''
            ) : (
              <ButtonTable onClick={handleButtonClick}>
                <Add style={{ width: '25px', marginRight: '12px' }} />
                Создать заказ
              </ButtonTable>
            )}
          </div>

          {data.length && data ? (
            <table className={style.tableWrapper_Order}>
              <thead className={style.thead_Order}>
                <OrderRows
                  data={data}
                  sortKey={sortKey}
                  sort={sort}
                  changeSort={changeSort}
                />
              </thead>
              <tbody className={style.tbody_Order}>
                <OrderData sortedData={sortedData} />
              </tbody>
            </table>
          ) : (
            <div className="empty_list">Список пустой. Добавьте заказ!</div>
          )}
        </div>
      )}
    </>
  )
}

export default OrderTable
