import React from 'react'
import FormatterView from '../../../../../UI/formatter/FormatterView'
import style from '../BindingOrderModal.module.scss'
import ButtonBorder from '../../../../../UI/ButtonBorder/ButtonBorder'
import { showModalVerify } from '../../../../../../redux/modalSlice'
import { ReactComponent as Star } from 'src/assets/Table/Star.svg'
import CircularBadge from '../../../../../UI/Circular/CircularBadge'
import { useDispatch, useSelector } from 'react-redux'
import { AnimatePresence } from 'framer-motion'
import ModalUI from '../../../../../UI/ModalComponents/ModalUI/ModalUI'
import VerifyModal from '../../VerifyModal/VerifyModal'
import AdvertStatus from '../../../../../UI/AdvertStatus/AdvertStatus'
import { ReactComponent as Deactivate } from 'src/assets/Table/deactivate.svg'
import { ReactComponent as Linkk } from 'src/assets/link.svg'
import { formatDate } from '../../../../../../utils/formatterDate'

// export const truncate = (str, num) => {
//   if (str?.length <= num) {
//     return str
//   }
//   return str?.slice(0, num) + '...'
// }

function AddInventoryData({
  inventor,
  selectedRows,
  setSelectedRows,
  expandedRows,
  handleDeactivateInventory,
  statusOr,
  totalOnlineView,
  onceOrder,
}) {
  const dispatch = useDispatch()
  const [selectedInventoryId, setSelectedInventoryId] = React.useState('')
  const role = localStorage.getItem('role')
  const [activeTooltip, setActiveTooltip] = React.useState(null)

  const { showVerify } = useSelector((state) => state.modal)
  const [showModalSelectingVerify, setShowModalSelectingVerify] =
    React.useState(false)

  function handleRowClick(rowId) {
    if (selectedRows.includes(rowId)) {
      setSelectedRows(selectedRows.filter((id) => id !== rowId))
    } else {
      setSelectedRows([...selectedRows, rowId])
    }
  }

  const filteredVideoLink = inventor.find(
    (item) => item.id === selectedInventoryId,
  )

  const truncate = (str, num) => {
    if (str?.length <= num) {
      return str
    }
    return str?.slice(0, num) + '...'
  }
  return (
    <>
      <AnimatePresence>
        {showVerify && (
          <ModalUI>
            <VerifyModal
              setShowModalSelectingVerify={setShowModalSelectingVerify}
              onInventoryVerify
              expandedRows={expandedRows}
              selectedInventoryId={selectedInventoryId}
              videoLink={filteredVideoLink}
            />
          </ModalUI>
        )}
      </AnimatePresence>

      {inventor.map(
        (advert, i) => (
          (totalOnlineView += advert?.online_views),
          (
            <>
              <>
                <tr
                  key={i}
                  onClick={() => handleRowClick(advert.id)}
                  className={selectedRows.includes(advert.id) ? 'selected' : ''}
                >
                  <th className={style.table__tr_th}>{i + 1}</th>
                  <th
                    className={style.table__tr_th}
                    style={{ position: 'relative' }}
                    onMouseEnter={() => setActiveTooltip(i)}
                    onMouseLeave={() => setActiveTooltip(null)}
                  >
                    {truncate(advert.channel?.name, 20)}
                    <span
                      className={
                        activeTooltip === i ? style.tooltiptext : style.hidden
                      }
                    >
                      {advert.channel?.name}
                    </span>
                  </th>
                  <th
                    className={style.table__tr_th}
                    style={{ position: 'relative' }}
                    onMouseEnter={() => setActiveTooltip(i)}
                    onMouseLeave={() => setActiveTooltip(null)}
                  >
                    {truncate(advert.video_content?.name, 20)}
                    <span
                      className={
                        activeTooltip === i ? style.tooltiptext : style.hidden
                      }
                    >
                      {advert.video_content?.name}
                    </span>
                  </th>

                  <th className={style.table__tr_th}>
                    {advert.video_content?.category}
                  </th>
                  <th className={style.table__tr_th} style={{ color: 'blue' }}>
                    {(advert.format === 'preroll' && 'Pre-roll') ||
                      ('midroll1' && 'Mid-roll 1') ||
                      ('midroll2' && 'Mid-roll 2') ||
                      ('midroll3' && 'Mid-roll 3') ||
                      ('midroll4' && 'Mid-roll 4')}
                  </th>
                  <th className={style.table__tr_th}>
                    <FormatterView data={advert.expected_number_of_views} />
                  </th>

                  <th className={style.table__tr_th}>
                    <a
                      href={`${advert.video_content.link_to_video}&t=${advert.start_at}`}
                      target="_blank"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor:
                          advert.verified_link_with_timecode === null
                            ? 'not-allowed'
                            : 'pointer',
                      }}
                      className={
                        advert.verified_link_with_timecode === null
                          ? style.linkWrapper__dis
                          : style.linkWrapper__file
                      }
                      onClick={(e) => {
                        if (advert.verified_link_with_timecode === null) {
                          e.preventDefault()
                        }
                      }}
                      rel="noreferrer"
                    >
                      Ссылка
                      <Linkk
                        style={{
                          width: '18px',
                          height: '18px',
                          marginLeft: '5px',
                        }}
                      />
                    </a>
                  </th>

                  <th className={style.table__tr_th}>
                    {advert.video_content?.actual_publication_time === null ? (
                      <>{formatDate(advert.video_content?.publication_time)}</>
                    ) : (
                      <>
                        {formatDate(
                          advert.video_content?.actual_publication_time,
                        )}
                      </>
                    )}
                  </th>

                  {/* <th className={style.table__tr_th}> */}
                  {/* <FormatterView data={advert.online_views} /> */}

                  {advert.online_views || advert.total_online_views ? (
                    <td className={style.table__tr_th}>
                      <div
                        style={{
                          display: 'flex',
                          gap: '5px',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                      >
                        <div
                          style={{
                            marginLeft: '2px',
                            fontSize: '15px',
                            background: `${
                              onceOrder.target_country
                                ? '#606afc'
                                : 'transparent'
                            }`,
                            padding: '0px 6px',
                            borderRadius: '10px',

                            color: `${
                              onceOrder.target_country ? 'white' : '#6e7079'
                            }`,
                          }}
                        >
                          <FormatterView data={advert.online_views} />
                        </div>
                        {onceOrder.target_country && (
                          <FormatterView data={advert.total_online_views} />
                        )}
                      </div>
                    </td>
                  ) : (
                    <td>----</td>
                  )}
                  {/* </th> */}
                  <th className={style.table__tr_th}>
                    <div style={{ display: 'flex', gap: '5px' }}>
                      <AdvertStatus
                        status={advert.status}
                        endDate={advert.deactivation_date}
                      />
                      {/*{*/}
                      {/*  (role === 'advertiser' || role === 'advertising_agency' || advert.status === "in_use" || advert.status === "inactive" || advert.verified_link_with_timecode != null) ?*/}
                      {/*    // <AdvertStatus status={advert.status}/>*/}
                      {/*    ''*/}
                      {/*    :*/}
                      {/*    <div style={{width: "fit-content"}}>*/}
                      {/*      <ButtonBorder*/}
                      {/*        onClick={() => {*/}
                      {/*          dispatch (showModalVerify ());*/}
                      {/*          setSelectedInventoryId (() => advert.id);*/}
                      {/*        }}*/}
                      {/*        style={{position: "relative", width: "fit-content"}}*/}
                      {/*      >*/}
                      {/*        <Star*/}
                      {/*          style={{*/}
                      {/*            width: "16px",*/}
                      {/*            height: "16px",*/}
                      {/*            marginRight: "5px",*/}
                      {/*          }}*/}
                      {/*        />*/}
                      {/*        {advert.video_content.link_to_video ? (*/}
                      {/*          <CircularBadge*/}
                      {/*            style={{*/}
                      {/*              backgroundColor: "#4833d0",*/}
                      {/*              width: "15px",*/}
                      {/*              height: "15px",*/}
                      {/*              top: "-5px",*/}
                      {/*              right: "-5px",*/}
                      {/*              position: "absolute",*/}
                      {/*            }}*/}
                      {/*          />*/}
                      {/*        ) : (*/}
                      {/*          ""*/}
                      {/*        )}*/}
                      {/*        Проверить*/}
                      {/*      </ButtonBorder>*/}

                      {/*    </div>*/}
                      {/*}*/}

                      {role === 'admin' &&
                      advert.status === 'booked' &&
                      advert.video_content.link_to_video ? (
                        <div style={{ position: 'relative' }}>
                          <ButtonBorder
                            onClick={() => {
                              dispatch(showModalVerify())
                              setSelectedInventoryId(advert.id)
                            }}
                            style={{
                              position: 'relative',
                              width: 'fit-content',
                            }}
                          >
                            <Star
                              style={{
                                width: '16px',
                                height: '16px',
                                marginRight: '5px',
                              }}
                            />
                            <CircularBadge
                              style={{
                                backgroundColor: '#4833d0',
                                width: '15px',
                                height: '15px',
                                top: '-5px',
                                right: '-5px',
                                position: 'absolute',
                              }}
                            />
                            Проверить
                          </ButtonBorder>
                        </div>
                      ) : null}

                      {role === 'admin' && advert.status === 'in_use' ? (
                        <div>
                          <ButtonBorder
                            onClick={() => handleDeactivateInventory(advert.id)}
                          >
                            <Deactivate
                              style={{
                                width: '16px',
                                height: '16px',
                                marginRight: '5px',
                              }}
                            />
                            Завершить
                          </ButtonBorder>
                        </div>
                      ) : (
                        ''
                      )}
                    </div>
                  </th>
                </tr>
              </>
            </>
          )
        ),
      )}
    </>
  )
}

export default AddInventoryData
