import React from 'react'
import style from './TableInventory.module.scss'
import CircularTable from 'src/components/UI/Circular/CircularTable'
import CircularBadge from 'src/components/UI/Circular/CircularBadge'
import FormatterTime from '../../../UI/formatter/FormatterTime'
import FormatterView from '../../../UI/formatter/FormatterView'
import AdvertStatus from 'src/components/UI/AdvertStatus/AdvertStatus'
import { ReactComponent as Arrow } from 'src/assets/Table/arrow.svg'
import ButtonBorder from 'src/components/UI/ButtonBorder/ButtonBorder'
import { ReactComponent as Edit } from 'src/assets/Table/Edit.svg'
import BindingInventoryOrderTable from '../BindingInventoryOrderTable/BindingInventoryOrderTable'

function TableInventoryData({
  sortedData,
  setShowModalEditAdmin,
  setCurrentOrder,
}) {
  const user = localStorage.getItem('role')
  const [expandedRows, setExpandedRows] = React.useState('')
  const [activeTooltip, setActiveTooltip] = React.useState(null)

  const handleRowClick = (id) => {
    setExpandedRows(id === expandedRows ? false : id)
  }
  return (
    <>
      {sortedData().map((inventor, i) => (
        <>
          <tr className={style.table__tr}>
            <td className={style.table_td}>
              <div style={{ display: 'flex' }}>
                <div>{i + 1}</div>
                {user === 'publisher' || user === 'channel' ? (
                  <>
                    {inventor.status === 'pre_booked' ? (
                      <CircularTable />
                    ) : null}
                  </>
                ) : null}

                {user === 'admin' ? (
                  <>{inventor.status === 'open' ? <CircularTable /> : null}</>
                ) : null}
              </div>
            </td>
            <td
              style={{ position: 'relative' }}
              className={style.table_td}
              onMouseEnter={() => setActiveTooltip(i)}
              onMouseLeave={() => setActiveTooltip(null)}
            >
              {inventor.channel === null ? '' : inventor.channel.name}
              <span
                className={
                  activeTooltip === i ? style.tooltiptext : style.hidden
                }
              >
                ID:{inventor.id}
              </span>
            </td>

            <td className={style.table_td}> {inventor.video_content?.name}</td>
            <td className={style.table_td}>
              {(inventor.format === 'preroll' && 'Pre-roll') ||
                (inventor.format === 'midroll1' && 'Mid-roll 1') ||
                (inventor.format === 'midroll2' && 'Mid-roll 2') ||
                (inventor.format === 'midroll3' && 'Mid-roll 3') ||
                (inventor.format === 'midroll4' && 'Mid-roll 4')}
            </td>
            <td className={style.table_td}>
              <FormatterTime data={inventor.start_at} />
            </td>
            <td className={style.table_td}>
              <FormatterView data={inventor.expected_number_of_views} />
            </td>
            <td className={style.table_td}>
              {inventor.expected_promo_duration}
            </td>
            <td className={style.table_td}>
              {inventor.video_content?.category}
            </td>
            <td className={style.table_td}>
              {new Date(inventor.video_content?.publication_time)
                .toLocaleDateString('en-GB')
                .replace(/\//g, '.')}
            </td>
            <td className={style.table_td}>
              <div>
                <AdvertStatus status={inventor.status} />
              </div>
            </td>

            {inventor.status === 'pre_booked' ||
            inventor.status === 'booked' ? (
              <td className={style.table_td}>
                <button
                  className={style.dopBtn}
                  onClick={() => handleRowClick(inventor.id)}
                  style={{ position: 'relative' }}
                >
                  Открыть
                  <span className={style.arrow}>
                    <Arrow
                      className={`${style.arrow__icon} ${
                        expandedRows === inventor.id ? style.arrow__rotate : ''
                      }`}
                    />
                  </span>
                  {inventor.status === 'pre_booked' ? (
                    <CircularBadge
                      style={{
                        backgroundColor: '#ff7d00',
                        color: '#4833d0',
                        width: '15px',
                        height: '15px',
                        top: '-5px',
                        right: '-5px',
                      }}
                    />
                  ) : null}
                </button>
              </td>
            ) : null}

            <td>
              {inventor.status === 'inactive' ? (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginLeft: '7px',
                    marginRight: '10px',
                    width: '100%',
                    lineHeight: '9px',
                    textAlign: 'center',
                  }}
                >
                  <div>
                    <div>{inventor.deactivation_date.split('T')[0]}</div>
                    <br />
                    <div>
                      {new Date(inventor.deactivation_date).toLocaleTimeString(
                        [],
                        {
                          hour: '2-digit',
                          minute: '2-digit',
                        },
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                ''
              )}
              {(user === 'admin' ||
                user === 'advertiser' ||
                user === 'advertising_agency') &&
              inventor.status === 'open' ? (
                <ButtonBorder
                  onClick={() => {
                    setShowModalEditAdmin(true)
                    setCurrentOrder(inventor)
                  }}
                >
                  <Edit
                    style={{
                      width: '16px',
                      height: '16px',
                    }}
                  />
                </ButtonBorder>
              ) : null}
            </td>
          </tr>

          {expandedRows === inventor.id && (
            <tr className={style.doprow}>
              <td
                colSpan="11"
                className={`${style.list__item} ${
                  expandedRows === inventor.id ? style.list__item__open : ''
                }`}
              >
                {/* <div className={style.status__wrapper}>{advert.status}</div> */}

                <BindingInventoryOrderTable expandedRows={expandedRows} />
              </td>
            </tr>
          )}
        </>
      ))}
    </>
  )
}

export default TableInventoryData
