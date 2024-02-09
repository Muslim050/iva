import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchInventory } from '../../../../redux/inventory/inventorySlice'
import { sortData } from 'src/utils/SortData'
import ButtonTable from 'src/components/UI/ButtonTable/ButtonTable'
import { ReactComponent as Reload } from 'src/assets/Table/reload.svg'
import { ReactComponent as Add } from 'src/assets/Table/add.svg'
import { SortButton } from 'src/utils/SortButton'
import { showModalInventory } from 'src/redux/modalSlice'
import { AnimatePresence } from 'framer-motion'
import MyModal from '../../../UI/ModalComponents/ModalUI/ModalUI'
import TableInventoryData from './TableInventoryData'
import EditInventoryModal from '../EditInventoryModal/EditInventoryModal'

const headers = [
  { key: 'id', label: '№' },
  { key: 'channel.name', label: 'Канал' },
  { key: 'video_content.name', label: 'Контент' },
  { key: 'format', label: 'Формат' },
  { key: 'start_at', label: 'Тайм код' },
  {
    key: 'expected_number_of_views',
    label: 'Прогноз',
  },
  { key: 'expected_promo_duration', label: 'Хронометраж' },
  { key: 'category', label: 'Категория' },

  { key: 'publication_time', label: 'Дата начала' },
  { key: 'status', label: 'Статус' },
]

function TableInventory() {
  const dispatch = useDispatch()
  const data = useSelector((state) => state.inventory.inventory)
  const status = useSelector((state) => state.status.status)
  const [sortKey, setSortKey] = React.useState('last_name')
  const [sort, setSort] = React.useState('desc')
  const [loading, setLoading] = React.useState(true)
  const user = localStorage.getItem('role')
  const [showModalEditAdmin, setShowModalEditAdmin] = React.useState(false)

  const [expandedRows, setExpandedRows] = React.useState('')
  const [currentOrder, setCurrentOrder] = React.useState(null)

  React.useEffect(() => {
    if (status === 'succeeded') {
      fetchInventory()
    }
    dispatch(fetchInventory()).then(() => setLoading(false))
  }, [dispatch, status])

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
    dispatch(showModalInventory())
  }
  const handleReload = () => {
    dispatch(fetchInventory())
  }

  return (
    <>
      <AnimatePresence>
        {showModalEditAdmin && (
          <MyModal>
            <EditInventoryModal
              setShowModalEditAdmin={setShowModalEditAdmin}
              currentOrder={currentOrder}
            />
          </MyModal>
        )}
      </AnimatePresence>
      {loading ? (
        <div className="loaderWrapper">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="tableWrapper">
          <div className="tableWrapper__table_title">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              Инвентарь &nbsp;
              <ButtonTable onClick={handleReload}>
                <Reload style={{ width: '23px', height: '23px' }} />
              </ButtonTable>
            </div>
            {user === 'admin' ? (
              ''
            ) : (
              <ButtonTable onClick={handleButtonClick}>
                <Add style={{ width: '25px', height: '23px' }} />
                Создать инвентарь
              </ButtonTable>
            )}
          </div>

          {data && data.length ? (
            <table style={{ width: '100%' }}>
              <thead>
                <tr>
                  {headers.map((row) => {
                    const user = localStorage.getItem('role')
                    const showStatusColumn = user !== 'admin'
                    if (row.key === 'is_connected' && !showStatusColumn) {
                      return null
                    }
                    if (data.status === 'open') {
                      headers.push({ key: 'status', label: 'Действия' })
                    }
                    return (
                      <th key={row.key}>
                        <SortButton
                          row={row.label}
                          columnKey={row.key}
                          onClick={() => changeSort(row.key)}
                          sort={sort}
                          sortKey={sortKey}
                        />
                      </th>
                    )
                  })}
                </tr>
              </thead>
              <tbody>
                <TableInventoryData
                  sortedData={sortedData}
                  setCurrentOrder={setCurrentOrder}
                  setShowModalEditAdmin={setShowModalEditAdmin}
                />
              </tbody>
            </table>
          ) : (
            <div className="empty_list">Список пустой. Добавьте инвентарь!</div>
          )}
        </div>
      )}
    </>
  )
}

export default TableInventory
