import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { hideModalSInventory } from 'src/redux/modalSlice'
import backendURL from 'src/utils/url'
import AddInventory from './AddInventory'
import AddSentPublisher from './AddSentPublisher'

const OpenOrderTable = ({ onRowsSelected, expandedRows }) => {
  const dispatch = useDispatch()
  const [selectedRows, setSelectedRows] = React.useState([])
  const [tabs, setTabs] = React.useState('inventory')
  const [getOrder, setGetOrder] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(false)

  const [onceOrder, setOnceOrder] = React.useState([])

  const { order } = useSelector((state) => state)
  const orders = order?.order

  const { inventory } = useSelector((state) => state)
  const inventor = inventory?.inventory

  const fetchGetOrder = async () => {
    setIsLoading(true)
    const token = localStorage.getItem('token')
    const response = await axios.get(
      `${backendURL}/order/${expandedRows}/`,

      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    )
    setGetOrder(response.data.data.inventories)
    setOnceOrder(response.data.data)

    setIsLoading(false)
  }
  React.useEffect(() => {
    fetchGetOrder()
  }, [dispatch])
  const isDisabled = selectedRows.length === 0
  const handleButtonClick = () => {
    dispatch(hideModalSInventory())
  }
  const [addInventroyModal, setAddInventroyModal] = React.useState(false)
  return (
    <>
      {isLoading ? (
        <div className="loaderWrapper" style={{ height: '10vh' }}>
          <div className="spinner"></div>
        </div>
      ) : (
        <>
          {/*Табы*/}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 0',
            }}
          >
            <TabsComponent tabs={tabs} setTabs={setTabs} />
          </div>
          {/*Табы*/}

          {tabs === 'inventory' ? (
            <AddInventory
              getOrder={getOrder}
              setSelectedRows={setSelectedRows}
              selectedRows={selectedRows}
              expandedRows={expandedRows}
              fetchGetOrder={fetchGetOrder} // Передача функции как пропс
            />
          ) : (
            <AddSentPublisher
              setSelectedRows={setSelectedRows}
              selectedRows={selectedRows}
              expandedRows={expandedRows}
              setAddInventroyModal={setAddInventroyModal}
              onceOrder={onceOrder}
            />
          )}
        </>
      )}
    </>
  )
}

const TabsComponent = ({ setTabs, tabs }) => {
  const role = localStorage.getItem('role')

  return (
    <div className="toggle__swipper" style={{ marginBottom: '0px' }}>
      <button
        className={`toggle__swipper__text ${
          tabs === 'inventory' ? 'active' : ''
        }`}
        onClick={() => setTabs('inventory')}
        style={{
          borderRadius: ' 12px 0px 0px 12px',
        }}
      >
        Инвентари
      </button>

      {role === 'admin' ? (
        <button
          className={`toggle__swipper__text ${
            tabs === 'sentPublisher' ? 'activeR' : ''
          }`}
          onClick={() => setTabs('sentPublisher')}
          style={{
            borderRadius: '0px 12px 12px 0px',
          }}
        >
          Размещения
        </button>
      ) : null}
    </div>
  )
}

export default OpenOrderTable
