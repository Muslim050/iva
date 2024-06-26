import React from 'react'
import {fetchInventory} from "../../../../redux/inventory/inventorySlice";
import {useDispatch, useSelector} from "react-redux";
import OpenTableSentOrderData from "./OpenTableSentOrderData";

const headers = [
  {key: 'id', label: '№'},
  {key: 'channel.name', label: 'Канал'},
  {key: 'video_content.name', label: 'Контент'},
  {key: 'format', label: 'Формат'},
  {
    key: 'expected_number_of_views',
    label: 'Показы факт',
  },
  {key: 'category', label: 'Категория'},
  {key: 'publication_time', label: 'Дата начала'},
  {key: 'status', label: 'Действия'},
]

function OpenTableSentOrder ({item}) {
  const dispatch = useDispatch ()
  const [loading, setLoading] = React.useState (true)
  const data = useSelector ((state) => state.inventory.inventory)

  React.useEffect (() => {
    dispatch (fetchInventory ({orderAssignmentId: item.id})).then (() => setLoading (false))
  }, [dispatch])

  return (
    <>
      {loading ? (
        <div className="loaderWrapper" style={{height: '50px'}}>
          <div style={{color: 'var(--text-color, )'}}>
            Загрузка инвентарей &nbsp;
          </div>
          <div className="spinner"></div>
        </div>
      ) : (
        <>
          {data && data.length ? (

            <table style={{width: '100%'}}>
              <thead>
              <tr>
                {headers.map ((row) => {
                  const user = localStorage.getItem ('role')
                  const showStatusColumn = user !== 'admin'
                  if (row.key === 'is_connected' && !showStatusColumn) {
                    return null
                  }
                  if (data.status === 'open') {
                    headers.push ({key: 'status', label: 'Действия'})
                  }
                  return (
                    <th key={row.key}>
                      {row.label}
                    </th>
                  )
                })}
              </tr>
              </thead>
              <tbody>
              <OpenTableSentOrderData data={data}/>
              </tbody>
            </table>
          ) : (
            <div className="empty_list">Список пустой. Добавьте инвентарь!</div>
          )}</>
      )
      }</>
  )
}

export default OpenTableSentOrder
