import React from 'react'
import FormatterBudjet from '../../../../../UI/formatter/FormatterBudjet'
import AdvertStatus from '../../../../../UI/AdvertStatus/AdvertStatus'
import FormatterView from '../../../../../UI/formatter/FormatterView'
import {AnimatePresence} from 'framer-motion'
import {ReactComponent as Comment} from '../../../../../../assets/Table/comment.svg'
import MyModal from '../../../../../UI/ModalComponents/ModalUI/ModalUI'
import ButtonBorder from '../../../../../UI/ButtonBorder/ButtonBorder'
import CommentModal from '../../../CommentModal/CommentModal'

const headers = [
  {key: 'id', label: '№'},
  {key: 'name', label: 'Название кампании'},
  {key: 'email', label: 'Формат рекламы'},
  {key: 'phone_number', label: 'Дата начало'},
  {key: 'advertising_agency', label: 'Дата конец'},
  {key: 'advertising_agency', label: 'Количество просмотров'},
  {key: 'advertising_agency', label: 'Бюджет'},
  {key: 'comment', label: 'Комментарий'},
  {key: 'advertising_agency', label: 'Статус'},
]

function Index ({onceOrder}) {
  const [showKomment, setShowKomment] = React.useState (false)
  const [currentOrder, setCurrentOrder] = React.useState (null)

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
        <thead style={{borderTop: '0px'}}>
        <tr>
          {headers.map ((row) => {
            return (
              <th key={row.key} style={{color: "#717377", fontWeight: "500"}}>
                <div>{row.label}</div>
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
            <td
              style={{
                alignItems: 'baseline',
              }}
            >
              {(onceOrder.format === 'preroll' && 'Pre-roll') ||
                ('mixroll' && 'Mix-roll')}
              <div
                style={{
                  marginLeft: '2px',
                  fontSize: '15px',
                  background: '#606afc',
                  padding: '0px 4px',
                  borderRadius: '10px',
                  color: 'white',
                }}
              >
                {onceOrder.target_country}
              </div>
            </td>

            <td>
              {new Date (onceOrder.expected_start_date)
                .toLocaleDateString ('en-GB')
                .replace (/\//g, '.')}
            </td>
            <td>
              {new Date (onceOrder.expected_end_date)
                .toLocaleDateString ('en-GB')
                .replace (/\//g, '.')}
            </td>
            <td>
              <FormatterView data={onceOrder.expected_number_of_views}/>
            </td>

            <td>
              <FormatterBudjet
                budget={onceOrder.budget}
                data={onceOrder.expected_start_date}
              />
            </td>
            {onceOrder?.notes ? (
              <td style={{display: 'flex', justifyContent: 'center'}}>
                <ButtonBorder
                  onClick={() => {
                    setShowKomment (true)
                    setCurrentOrder (onceOrder)
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
            ) : <td>Комментариев нет</td>}
            <td>
              <div>
                <AdvertStatus status={onceOrder.status}/>
              </div>
            </td>
          </tr>
        </>
        </tbody>
      </table>
    </>
  )
}

export default Index
