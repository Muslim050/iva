import SentOrderList from "./SentOrderList";
import React from "react";
import {fetchOnceListSentToPublisher} from "../../../../redux/order/SentToPublisher";
import {useDispatch, useSelector} from 'react-redux'

const headers = [
  {key: 'id', label: '№'},
  {key: 'name', label: 'Кампания'},

  {key: 'name', label: 'Формат'},

  {key: 'name', label: 'Начало'},
  {key: 'name', label: 'Конец'},
  {key: 'name', label: 'Ролик'},

  {key: 'category', label: 'План показов'},
  // {key: 'category', label: 'Комментарий'},

  {key: 'category', label: 'Статус'},
  {key: 'category', label: 'Действия'},


]
const ReceivedOrders = () => {
  const dispatch = useDispatch ()
  const videos = useSelector ((state) => state.video.videos)
  const [loading, setLoading] = React.useState (true)
  const {listsentPublisher} = useSelector ((state) => state.sentToPublisher)

  React.useEffect (() => {
    dispatch (fetchOnceListSentToPublisher ({})).then (() => setLoading (false))
  }, [dispatch])

  return (
    <>
      {loading ? (
        <div className="loaderWrapper">
          <div style={{color: 'var(--text-color, )'}}>
            {' '}
            Загрузка видео &nbsp;
          </div>
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="tableWrapper" style={{overflow: "visible"}}>
          <div className="tableWrapper__table_title">
            <div style={{display: 'flex', alignItems: 'center'}}>
              Полученные заказы
            </div>

          </div>

          <table className="tableWrapper">
            <thead>
            <tr>
              {headers.map ((row) => {
                const user = localStorage.getItem ('role')
                const showStatusColumn = user !== 'admin'
                if (row.key === 'is_connected' && !showStatusColumn) {
                  return null
                }
                return (
                  <th key={row.key} style={{
                    color: '#2c2d33',
                    fontWeight: '400',
                    fontSize: "14px"
                  }}>
                    {row.label}
                  </th>
                )
              })}
            </tr>
            </thead>
            <tbody>
            <SentOrderList
              listsentPublisher={listsentPublisher}
            />
            </tbody>
          </table>

        </div>
      )}
    </>
  )
}
export default ReceivedOrders;