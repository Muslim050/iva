import React from 'react'
import ButtonTable from '../../../UI/ButtonTable/ButtonTable'
import { ReactComponent as Download } from 'src/assets/Table/Download.svg'
import axios from 'axios'
import backendURL from 'src/utils/url'

function DownloadReport({
  getOrder,
  startDate,
  endDate,
  setIsTooltip,
  fetchGetOrder,
}) {
  const [loading, setLoading] = React.useState(false)
  const exportExcel = async (id) => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      let urllink = `${backendURL}/order/statistics-export/?order_id=${id}`

      if (startDate && endDate) {
        urllink += `&start_date=${startDate}&end_date=${endDate}`
      }

      const response = await axios.get(urllink, {
        responseType: 'blob', // Set the response type to blob
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      const blob = new Blob([response.data], {
        type: 'application/vnd.ms-excel',
      })
      console.log(blob)
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `${getOrder.name}.xlsx`)
      link.click()
      setIsTooltip(false)
      // fetchGetOrder()
      //   .then(() => {})
      //   .catch((error) => {
      //     console.error('Ошибка при получении данных заказа:', error)
      //   })
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <ButtonTable onClick={() => exportExcel(getOrder.id)} disabled={loading}>
        {loading ? (
          <div className="loaderWrapper" style={{ height: '30px' }}>
            <div
              className="spinner"
              style={{
                width: '30px',
                height: '30px',
                border: '3px solid #ffffff',
                borderTopColor: '#5570f1',
              }}
            ></div>
          </div>
        ) : (
          <Download style={{ width: '25px', height: '30px' }} />
        )}
      </ButtonTable>
    </>
  )
}

export default DownloadReport
