import React from 'react'
import FormatterView from '../../../../UI/formatter/FormatterView'
import style from './BindingOrderTable.module.scss'

import { AnimatePresence } from 'framer-motion'
import VerifyModal from '../VerifyModal/VerifyModal'
import { ReactComponent as Linkk } from 'src/assets/link.svg'
import AdvertStatus from 'src/components/UI/AdvertStatus/AdvertStatus'
import { useDispatch, useSelector } from 'react-redux'
import { showModalVerify } from 'src/redux/modalSlice'
import ModalUI from 'src/components/UI/ModalComponents/ModalUI/ModalUI'
import FormatterTimeTwoDigit from 'src/components/UI/formatter/FormatterTimeTwoDigit'
import ButtonContainer from './ButtonContainer'

function BindingOrderTableData({
  getOrder,
  expandedRows,
  onRemoveInventory,
  onInventoryPrebook,
  onRemoveDeactivate,
  statusOr,
  sortedData,
}) {
  const [showModalSelectingVerify, setShowModalSelectingVerify] =
    React.useState(false)
  const [selectedInventoryId, setSelectedInventoryId] = React.useState('')
  const [activeTooltip, setActiveTooltip] = React.useState(null)

  const handleInventoryPrebook = (inventory_id) => {
    onInventoryPrebook(expandedRows, inventory_id)
  }

  const handleDeactivateInventory = (inventory_id) => {
    onRemoveDeactivate(inventory_id)
  }
  const handleRemoveInventory = (inventory_id) => {
    onRemoveInventory(expandedRows, inventory_id)
  }
  const filteredVideoLink = getOrder.find(
    (item) => item.id === selectedInventoryId,
  )
  const { showVerify } = useSelector((state) => state.modal)
  const dispatch = useDispatch()
  const showButtonClick = () => {
    dispatch(showModalVerify())
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

      {sortedData().map((invetar, i) => (
        <tr key={i}>
          <td className={style.table_td}>{i + 1}</td>
          <td
            style={{ position: 'relative' }}
            className={style.table_td}
            onMouseEnter={() => setActiveTooltip(i)}
            onMouseLeave={() => setActiveTooltip(null)}
          >
            {invetar.channel.name}

            <span
              className={activeTooltip === i ? style.tooltiptext : style.hidden}
            >
              ID:{invetar.id}
            </span>
          </td>
          <td
            style={{ position: 'relative' }}
            className={style.table_td}
            onMouseEnter={() => setActiveTooltip(i)}
            onMouseLeave={() => setActiveTooltip(null)}
          >
            {invetar.video_content.name}
            <span
              className={activeTooltip === i ? style.tooltiptext : style.hidden}
            >
              ID:{invetar.video_content.id}
            </span>
          </td>

          <td className={style.table_td}>
            {(invetar.format === 'preroll' && 'Pre-roll') ||
              ('mixroll' && 'Mix-roll')}
          </td>
          <td className={style.table_td}>
            {' '}
            <FormatterTimeTwoDigit data={invetar.start_at} />{' '}
          </td>
          <td className={style.table_td}>
            <FormatterView data={invetar.expected_number_of_views} />
          </td>
          <td className={style.table_td}>
            <FormatterTimeTwoDigit data={invetar.expected_promo_duration} />
          </td>
          <td className={style.table_td}>
            <a
              href={`${invetar.video_content.link_to_video}&t=${invetar.start_at}`}
              target="_blank"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor:
                  invetar.verified_link_with_timecode === null
                    ? 'not-allowed'
                    : 'pointer',
              }}
              className={
                invetar.verified_link_with_timecode === null
                  ? style.linkWrapper__dis
                  : style.linkWrapper__file
              }
              onClick={(e) => {
                if (invetar.verified_link_with_timecode === null) {
                  e.preventDefault()
                }
              }}
              rel="noreferrer"
            >
              Ссылка
              <Linkk
                style={{ width: '18px', height: '18px', marginLeft: '5px' }}
              />
            </a>
          </td>
          <td className={style.table_td}>{invetar.video_content.category}</td>
          <td className={style.table_td}>
            {new Date(invetar.video_content?.actual_publication_time)
              .toLocaleDateString('en-GB')
              .replace(/\//g, '.')}
          </td>

          {invetar.online_views > 1 ? (
            <td className={style.table_td}>
              {/* <FormatterView data={invetar.online_views} /> */}

              <td className={style.table_td}>
                <FormatterView data={invetar.online_views} />
              </td>
            </td>
          ) : // <td className={style.table_td}></td>
          null}

          <td className={style.table_td}>
            <div>
              <AdvertStatus
                status={invetar.status}
                endDate={invetar.deactivation_date}
              />
            </div>
          </td>
          <td className={style.table_td}>
            <ButtonContainer
              invetar={invetar}
              statusOr={statusOr}
              handleInventoryPrebook={handleInventoryPrebook}
              setSelectedInventoryId={setSelectedInventoryId}
              handleDeactivateInventory={handleDeactivateInventory}
              handleRemoveInventory={handleRemoveInventory}
              showModalVerify={showModalVerify}
            />
          </td>
        </tr>
      ))}
    </>
  )
}

export default BindingOrderTableData
