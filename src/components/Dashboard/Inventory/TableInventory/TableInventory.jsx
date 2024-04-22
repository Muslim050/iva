import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {fetchInventory, resetInventory} from '../../../../redux/inventory/inventorySlice'
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
import style from "../../PublisherReport/PublisherReportTable/FilteredTooltip/FilteredTooltip.module.scss";
import {fetchChannel} from "../../../../redux/channel/channelSlice";
import {fetchAdvertiser} from "../../../../redux/advertiser/advertiserSlice";
import {addPublisherReport, resetPublisherReport} from "../../../../redux/publisher/publisherSlice";
import { ReactComponent as Delete } from 'src/assets/Delete.svg'
import { ReactComponent as Search } from 'src/assets/Search.svg'
const formatV = [
  { value: 'preroll', text: 'Pre-roll' },
  { value: 'mixroll', text: 'Mix-roll' },
]

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
  { key: 'online_views', label: 'Показы' },

]

function TableInventory() {
  const dispatch = useDispatch()
  const data = useSelector((state) => state.inventory.inventory)
  const status = useSelector((state) => state.status.status)
  const [sortKey, setSortKey] = React.useState('last_name')
  const [sort, setSort] = React.useState('desc')
  const [loading, setLoading] = React.useState(true)
  const [loadingClear, setLoadingClear] = React.useState(true)

  const user = localStorage.getItem('role')
  const [showModalEditAdmin, setShowModalEditAdmin] = React.useState(false)
  const [selectedOptionAdv, setSelectedOptionAdv] = React.useState('')
  const [selectedAdv, setSetSelectedAdv] = React.useState(null)
  const [selectedAdvName, setSelectedAdvName] = React.useState(null)
  const advdata = useSelector((state) => state.advertiser.advertisers)
  const [filterLoading, setFilterLoading] = React.useState(false)
  const [selectedOptionChannel, setSelectedOptionChannel] = React.useState('')
  const [selectedFormat, setSelectedFormat] = React.useState('')
  const [selectedChannel, setSelectedChannel] = React.useState(null)
  const [selectedChannelName, setSelectedChannelName] = React.useState(null)
  const [expandedRows, setExpandedRows] = React.useState('')
  const [currentOrder, setCurrentOrder] = React.useState(null)
  const channel = useSelector((state) => state.channel.channel)


  console.log("loading,",loading)
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
    dispatch(fetchInventory({})).then(() => setLoading(false))
  }
  const handleSelectFormat = (event) => {
    setSelectedFormat(event.target.value)
  }
  const handleSelectChange = (event) => {
    const value = event.target.value;
    setSelectedOptionChannel(value)
    if (value) {
      const option = JSON.parse(value);
      setSelectedChannel(option.id);
      setSelectedChannelName(option.name);
    } else {
      setSelectedChannel(null);
      setSelectedChannelName("");
    }
  }
  const handleClear = () => {
    setFilterLoading(true)
    setSelectedChannel(null)
    setSelectedOptionChannel('')
    setSelectedAdvName('')
    setSelectedChannelName(null)
    setSelectedFormat('')
    dispatch(resetInventory()) // Dispatch the reset action
    setFilterLoading(false)
    setLoading(true)
    dispatch(fetchInventory({})).then(() => setLoading(false))

  }

  const handleSearch = () => {
      setFilterLoading(true)
      dispatch(
          fetchInventory({
            id: selectedChannel,
            format: selectedFormat,
          }),
      )
          .then(() => {
            setFilterLoading(false)
          })
          .catch(() => {
            setFilterLoading(false) // Ensure loading is reset on error
          })
  }
  React.useEffect(() => {
    dispatch(fetchChannel())
  }, [dispatch])


  React.useEffect(() => {
    dispatch(fetchInventory({})).then(() => setLoading(false))
  }, [dispatch])



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
      {loading && loadingClear ? (
        <div className="loaderWrapper">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="tableWrapper">
          <div className="tableWrapper__table_title">
            <div style={{display: 'flex', alignItems: 'center', justifyContent: "space-between", width: "100%"}}>
              <div style={{display: 'flex', alignItems: 'center'}}>
                Инвентарь &nbsp;
                <ButtonTable onClick={handleReload}>
                  <Reload style={{width: '23px', height: '23px'}}/>
                </ButtonTable>
              </div>


              <div style={{display: "flex", alignItems: "end", gap: "10px"}}>
                {filterLoading && (
                    <div className="loaderWrapper" style={{height: '5vh'}}>
                      <div
                          className="spinner"
                          style={{width: '25px', height: '25px'}}
                      ></div>
                    </div>
                )}
                <div style={{width: '300px'}}>
                  <label
                      style={{
                        fontSize: '12px',
                        color: 'var(--text-color)',
                        fontWeight: '400',
                      }}
                  >
                    Выбрать канал
                    <select
                        value={selectedOptionChannel} // Используйте ID, а не имя, для value
                        onChange={handleSelectChange}
                        style={{width: '100%'}}
                        className={style.input}
                    >
                      <option value="">Выберите канал</option>
                      {channel.map((option) => (
                          <option key={option.id} value={JSON.stringify(option)}>
                            {option.name}
                          </option>
                      ))}
                    </select>
                  </label>
                </div>

                <div>
                  <label
                      style={{
                        fontSize: '12px',
                        color: 'var(--text-color)',
                        fontWeight: '400',
                      }}
                  >
                    Формат
                  </label>
                  <select
                      id="countries"
                      value={selectedFormat}
                      className={style.input}
                      onChange={handleSelectFormat}
                  >
                    <option value="">All</option>

                    {formatV.map((option, index) => (
                        <option key={index} value={option.value}>
                          {option.text}
                        </option>
                    ))}
                  </select>
                </div>

                <div style={{display: 'flex', marginTop: '20px', gap: '10px'}}>
                  {(selectedChannel || selectedFormat) && <div style={{width: '100%'}}>
                    <ButtonTable
                        onClick={handleSearch}
                        Customstyle={{width: '100%', justifyContent: 'center'}}
                    >
                      <Search style={{width: '23px', height: '23px'}}/>
                    </ButtonTable>
                  </div>}
                  {(selectedChannel || selectedFormat) && (
                      <div style={{width: '100%'}}>
                        <ButtonTable
                            onClick={handleClear}
                            Customstyle={{width: '100%', justifyContent: 'center'}}
                        >
                        <Delete style={{width: '23px', height: '23px'}}/>
                        </ButtonTable>
                      </div>
                  )}
                </div>
                {user === 'admin' ? (
                    ''
                ) : (
                    <ButtonTable onClick={handleButtonClick}>
                      <Add style={{width: '25px', height: '23px'}}/>
                      Создать инвентарь
                    </ButtonTable>
                )}
              </div>

            </div>

          </div>

          {data ? (
              <table style={{width: '100%'}}>
                <thead>
                <tr>
                  {headers.map((row) => {
                    const user = localStorage.getItem('role')
                    const showStatusColumn = user !== 'admin'
                    if (row.key === 'is_connected' && !showStatusColumn) {
                      return null
                    }
                    if (data.status === 'open') {
                      headers.push({key: 'status', label: 'Действия'})
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
