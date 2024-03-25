import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import ComplitedTable from 'src/components/Dashboard/Confirmed-ComplitedOrder/ComplitedOrders/ComplitedTable'
import CircularBadge from 'src/components/UI/Circular/CircularBadge'
import {
  fetchComplitedInventory,
  fetchConfirmedIInventory,
} from 'src/redux/inventory/inventorySlice'

function CompletedOrder({ filteredComplitedI, filteredConfirmedI }) {
  const location = useLocation()
  const dispatch = useDispatch()

  return (
    <div>
      <div className="toggle__swipper">
        <Link
          to="/confirmed-order"
          className={`toggle__swipper__text ${
            location.pathname === '/confirmed-order' ? 'active' : ''
          }`}
        >
          Подтвержденные
          <div style={{ position: 'relative' }}>
            {filteredConfirmedI.length > 0 && (
              <CircularBadge
                count={filteredConfirmedI.length}
                style={{
                  top: '-40px',
                  right: '-33px',
                  backgroundColor: 'red',
                  color: 'white',
                }}
              />
            )}
          </div>
        </Link>

        <Link
          to="/complited-order"
          className={`toggle__swipper__text ${
            location.pathname === '/complited-order' ? 'activeR' : ''
          }`}
        >
          Завершенные
          <div style={{ position: 'relative' }}>
            {/* {filteredComplitedI.length > 0 && (
              <CircularBadge
                count={filteredComplitedI.length}
                style={{
                  top: "-40px",
                  right: "-33px",
                  backgroundColor: "red",
                  color: "white",
                }}
              />
            )} */}
          </div>
        </Link>
      </div>

      <ComplitedTable />
    </div>
  )
}

export default CompletedOrder
