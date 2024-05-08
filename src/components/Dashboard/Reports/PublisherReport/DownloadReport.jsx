import React from 'react'
import ButtonTable from '../../../UI/ButtonTable/ButtonTable'
import { ReactComponent as Download } from 'src/assets/Table/Download.svg'
import axios from 'axios'
import backendURL from 'src/utils/url'
import { format } from 'date-fns'

function DownloadReport({
  startDate,
  endDate,
  endDateMonth,
  startDateMonth,
  //
  channelId,
  publisherId,
  //
  setIsTooltip,
  formatOrder,
  selectedChannelName,
  selectedPublisherName,
}) {
  const [loading, setLoading] = React.useState(false)

  const formattedStartDate = startDate
    ? format(startDate, 'yyyy-MM-dd')
    : undefined
  const formattedEndDate = endDate ? format(endDate, 'yyyy-MM-dd') : undefined

  const formattedStartDateMonth = startDateMonth
    ? format(startDateMonth, 'yyyy-MM-dd')
    : undefined
  const formattedEndDateMonth = endDateMonth
    ? format(endDateMonth, 'yyyy-MM-dd')
    : undefined

  const useMonthBasedDates = startDateMonth !== undefined
  const exportExcel = async (id) => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      let urllll = new URL(`${backendURL}/publisher/report-export/`)

      const params = new URLSearchParams()
      console.log('params', params)
      if (channelId) {
        params.append('channel_id', channelId)
      }
      if (publisherId) {
        params.append('publisher_id', publisherId)
      }
      if (useMonthBasedDates ? formattedStartDateMonth : formattedStartDate) {
        params.append(
          'start_date',
          useMonthBasedDates ? formattedStartDateMonth : formattedStartDate,
        )
      }
      if (useMonthBasedDates ? formattedEndDateMonth : formattedEndDate) {
        params.append(
          'end_date',
          useMonthBasedDates ? formattedEndDateMonth : formattedEndDate,
        )
      }
      if (formatOrder) {
        params.append('order_format', formatOrder)
      }

      urllll.search = params.toString()
      console.log(urllll)
      const response = await axios.get(urllll.href, {
        responseType: 'blob', // Set the response type to blob
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      console.log(response)

      const blob = new Blob([response.data], {
        type: 'application/vnd.ms-excel',
      })
      console.log(blob)
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute(
        'download',
        `${selectedChannelName || selectedPublisherName}.xlsx`,
      )
      link.click()
      setIsTooltip(false)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <ButtonTable
        onClick={() => exportExcel()}
        disabled={loading}
        Customstyle={{
          height: '50px',
        }}
      >
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
