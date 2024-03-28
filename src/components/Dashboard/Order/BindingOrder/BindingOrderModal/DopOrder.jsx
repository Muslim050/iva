import React from 'react'
import { SortButton } from 'src/utils/SortButton'
import FormatterBudjet from '../../../../UI/formatter/FormatterBudjet'
import FormatterData from '../../../../UI/formatter/FormatterData'
import style from './DopOrder.module.scss'
import AdvertStatus from 'src/components/UI/AdvertStatus/AdvertStatus'
import FormatterView from 'src/components/UI/formatter/FormatterView'
import { AnimatePresence } from 'framer-motion'
import { ReactComponent as Comment } from 'src/assets/Table/comment.svg'
import MyModal from '../../../../UI/ModalComponents/ModalUI/ModalUI'
import ButtonBorder from 'src/components/UI/ButtonBorder/ButtonBorder'
import CommentModal from '../../CommentModal/CommentModal'

const headers = [
  { key: 'id', label: '№' },
  { key: 'name', label: 'Название кампании' },
  { key: 'email', label: 'Формат рекламы' },
  { key: 'phone_number', label: 'Дата начало' },
  { key: 'advertising_agency', label: 'Дата конец' },
  { key: 'advertising_agency', label: 'Количество просмотров' },
  { key: 'advertising_agency', label: 'Бюджет' },
  { key: 'comment', label: 'Комментарий' },
  { key: 'advertising_agency', label: 'Статус' },
]

function DopOrder({ onceOrder }) {
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
      <table>
        <thead>
          <tr>
            {headers.map((row) => {
              return (
                <th key={row.key}>
                  <div className="sorts-button">{row.label}</div>
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          <>
            <tr>
              <td>{onceOrder.id}</td>
              <td>{onceOrder.name}</td>

              <td>
                {(onceOrder.format === 'preroll' && 'Pre-roll') ||
                  ('mixroll' && 'Mix-roll')}
              </td>
              <td>
                {new Date(onceOrder.expected_start_date)
                  .toLocaleDateString('en-GB')
                  .replace(/\//g, '.')}
              </td>
              <td>
                {new Date(onceOrder.expected_end_date)
                  .toLocaleDateString('en-GB')
                  .replace(/\//g, '.')}
              </td>
              <td>
                <FormatterView data={onceOrder.expected_number_of_views} />
              </td>

              <td>
                <FormatterBudjet
                  budget={onceOrder.budget}
                  data={onceOrder.expected_start_date}
                />
              </td>
              {onceOrder?.notes ? (
                <td style={{ display: 'flex', justifyContent: 'center' }}>
                  <ButtonBorder
                    onClick={() => {
                      setShowKomment(true)
                      setCurrentOrder(onceOrder)
                    }}
                  >
                    <Comment
                      style={{
                        width: '16px',
                        height: '16px',
                      }}
                    />
                  </ButtonBorder>
                </td>
              ) : null}
              <td>
                <div>
                  <AdvertStatus status={onceOrder.status} />
                </div>
              </td>
            </tr>
          </>
        </tbody>
      </table>
    </>
  )
}

export default DopOrder
