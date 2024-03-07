import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchVideos } from '../../../../redux/video/videoSlice'
import TableVideoList from './TableVideoList'
import TableLinkedVideo from './TableLinkedVideo/TableLinkedVideo'
import { ReactComponent as Reload } from 'src/assets/Table/reload.svg'
import { ReactComponent as Add } from 'src/assets/Table/add.svg'
import { showModalVideo } from 'src/redux/modalSlice'
import ButtonTable from 'src/components/UI/ButtonTable/ButtonTable'
import { sortData } from 'src/utils/SortData'
import { SortButton } from 'src/utils/SortButton'
import ModalUI from 'src/components/UI/ModalComponents/ModalUI/ModalUI'
import { AnimatePresence } from 'framer-motion'
import EditVideoModal from './EditVideoModal/EditVideoModal'
import MyModal from '../../../UI/ModalComponents/ModalUI/ModalUI'

const headers = [
  { key: 'id', label: '№' },
  { key: 'name', label: 'Канал' },
  { key: 'name', label: 'Название Видео' },
  { key: 'category', label: 'Категория' },
  { key: 'publication_time', label: 'Начало' },
  { key: 'duration', label: 'Хрон видео' },
  { key: '', label: 'Ссылка на видео' },
]

function TableVideo({ setShowModal }) {
  const dispatch = useDispatch()
  const videos = useSelector((state) => state.video.videos)
  const [loading, setLoading] = React.useState(true)
  const [showModalSelectingInventory, setShowModalSelectingInventory] =
    React.useState(false)
  const [id, setId] = React.useState(null)
  const [sortKey, setSortKey] = React.useState('last_name')
  const [sort, setSort] = React.useState('ascn')
  const { showVideoLinked } = useSelector((state) => state.modal)
  const [showModalEditAdmin, setShowModalEditAdmin] = React.useState(false)
  const [currentOrder, setCurrentOrder] = React.useState(null)

  const inventoryPublish = (id) => {
    setId(id)
  }

  React.useEffect(() => {
    dispatch(fetchVideos()).then(() => setLoading(false))
  }, [dispatch])
  const sortedData = React.useCallback(
    () =>
      sortData({
        tableData: videos,
        sortKey,
        reverse: sort === 'desc',
      }),
    [videos, sortKey, sort],
  )
  function changeSort(key) {
    setSort(sort === 'ascn' ? 'desc' : 'ascn')
    setSortKey(key)
  }
  const handleButtonClick = () => {
    dispatch(showModalVideo())
  }
  const handleReload = () => {
    dispatch(fetchVideos())
  }
  return (
    <>
      <AnimatePresence>
        {showVideoLinked && (
          <ModalUI>
            <TableLinkedVideo selectedId={id} />
          </ModalUI>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showModalEditAdmin && (
          <MyModal>
            <EditVideoModal
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
              Видео &nbsp;
              <ButtonTable onClick={handleReload}>
                <Reload style={{ width: '23px', height: '23px' }} />
              </ButtonTable>
            </div>
            <ButtonTable onClick={handleButtonClick}>
              <Add style={{ width: '25px', marginRight: '12px' }} />
              Создать видео
            </ButtonTable>
          </div>

          {videos.length ? (
            <table className="tableWrapper">
              <thead>
                <tr>
                  {headers.map((row) => {
                    const user = localStorage.getItem('role')
                    const showStatusColumn = user !== 'admin'
                    if (row.key === 'is_connected' && !showStatusColumn) {
                      return null
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
                <TableVideoList
                  inventoryPublish={inventoryPublish}
                  sortedData={sortedData}
                  setShowModalSelectingInventory={
                    setShowModalSelectingInventory
                  }
                  setCurrentOrder={setCurrentOrder}
                  setShowModalEditAdmin={setShowModalEditAdmin}
                />
              </tbody>
            </table>
          ) : (
            <div className="empty_list">Список пустой. Добавьте Видео!</div>
          )}
        </div>
      )}
    </>
  )
}

export default TableVideo
