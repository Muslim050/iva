import React from 'react'
import {useDispatch} from 'react-redux'
import {useLocation} from 'react-router-dom'
import ComplitedTable from 'src/components/Dashboard/Confirmed-ComplitedOrder/ComplitedOrders/ComplitedTable'

function CompletedOrder ({filteredComplitedI, filteredConfirmedI}) {
  const location = useLocation ()
  const dispatch = useDispatch ()

  return (
    <div>
      CompletedOrder
      <ComplitedTable/>
    </div>
  )
}

export default CompletedOrder
