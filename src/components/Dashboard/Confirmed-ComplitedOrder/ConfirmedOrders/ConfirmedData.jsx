import React from 'react'
import style from './ConfirmedTable.module.scss'
import { ReactComponent as File } from 'src/assets/Table/file.svg'
import { AnimatePresence } from 'framer-motion'
import CommentModal from '../../Order/CommentModal/CommentModal'
import MyModal from '../../../UI/ModalComponents/ModalUI/ModalUI'
import { ReactComponent as Comment } from 'src/assets/Table/comment.svg'
import ButtonBorder from 'src/components/UI/ButtonBorder/ButtonBorder'

function ConfirmedData({ sortedData }) {
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const paddedMinutes = String(minutes).padStart(2, '0')
    const remainingSeconds = seconds % 60
    const paddedSeconds = String(remainingSeconds).padStart(2, '0')
    return `${paddedMinutes}:${paddedSeconds}`
  }
  const [showKomment, setShowKomment] = React.useState(false)
  const [currentOrder, setCurrentOrder] = React.useState(null)

  return (
    <>
      <AnimatePresence>
        {showKomment && (
          <MyModal>
            <CommentModal
              setShowKomment={setShowKomment}
              currentOrder={currentOrder}
            />
          </MyModal>
        )}
      </AnimatePresence>
      {sortedData &&
        sortedData().map((advert, i) => (
          <>
            <tr key={i}>
              <td>{i + 1}</td>

              <th>
                <div>
                  <td> {advert.assigned_order.name}</td>
                </div>
              </th>
              <td>
                {(advert.format === 'preroll' && 'Pre-roll') ||
                  ('mixroll' && 'Mix-roll')}
              </td>
              <td>
                {new Date(advert.assigned_order.expected_start_date)
                  .toLocaleDateString('en-GB')
                  .replace(/\//g, '.')}
              </td>
              <td>
                {new Date(advert.assigned_order.expected_end_date)
                  .toLocaleDateString('en-GB')
                  .replace(/\//g, '.')}
              </td>
              <td>
                <div style={{ display: 'flex' }}>
                  <a
                    href={advert.assigned_order.promo_file}
                    target="_blank"
                    className={style.fileWrapper}
                  >
                    Ролик
                    <File
                      style={{
                        width: '18px',
                        height: '18px',
                        marginLeft: '5px',
                      }}
                    />
                  </a>
                </div>
              </td>

              <td>
                {advert.assigned_order.notes ? (
                  <ButtonBorder
                    onClick={() => {
                      setShowKomment(true)
                      setCurrentOrder(advert.assigned_order)
                    }}
                  >
                    <Comment
                      style={{
                        width: '16px',
                        height: '16px',
                      }}
                    />
                  </ButtonBorder>
                ) : (
                  <div>Комментариев нет</div>
                )}
              </td>

              <th>
                <div>
                  <td> {advert.video_content.name}</td>
                </div>
              </th>

              <th>
                <div>
                  <td>{advert.video_content.category}</td>
                </div>
              </th>
              <th>
                <div>
                  <td>{formatTime(advert.start_at)}</td>
                </div>
              </th>
            </tr>
          </>
        ))}
    </>
  )
}

export default ConfirmedData
