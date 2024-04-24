import React from 'react'
import style from './InfoCards.module.scss'
import { useParams } from 'react-router-dom'
import FormatterView from 'src/components/UI/formatter/FormatterView'
import FormatterBudjet from 'src/components/UI/formatter/FormatterBudjet'

export function InfoCardsTop({ getOrder }) {
  const { id } = useParams()
  return (
    <div style={{ display: 'flex' }}>
      <div className={style.infoCart}>
        Заказ
        <div className={style.infoCart__text}>№-{id}</div>
      </div>

      <div className={style.infoCart}>
        План показов: &nbsp;
        <div className={style.infoCart__text}>
          <FormatterView data={getOrder.expected_number_of_views} />
        </div>
      </div>
      <div className={style.infoCart}>
        План бюджета: &nbsp;
        <div
          className={style.infoCart__text}
          style={{
            display: 'flex',
          }}
        >
          <FormatterBudjet
            budget={getOrder.budget}
            data={getOrder.expected_start_date}
          />
        </div>
      </div>
    </div>
  )
}

export function InfoCardsBottom({
  totalViews,
  totalBudget,
  totalAnalitickView,
  getOrder,
}) {
  return (
    <tr align="center">
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>


      <th
        className={style.infoCards_bottom_th}
        rowspan="1"
        style={{fontWeight: '400'}}
      >
        <div style={{display: 'flex', justifyContent: 'center'}}>Итого:</div>
      </th>


      <th
        className={style.infoCards_bottom_th}
        rowspan="2"
        style={{
          borderLeft: '4px solid white',
        }}
      >
        <div className={style.infoCards_bottom_th__toptext}>
          Показы
          <div className={style.infoCards_bottom_th__bottomtext}>
            <FormatterView data={totalViews}/>
          </div>
        </div>
      </th>

      <th
        className={style.infoCards_bottom_th}
        rowspan="2"
        style={{
          borderLeft: '4px solid white',
        }}
      >
        <div className={style.infoCards_bottom_th__toptext}>
          Бюджет
          <div
            className={style.infoCards_bottom_th__bottomtext}
            style={{display: 'flex'}}
          >
            {totalBudget === 0 ? (
              <div
                style={{
                  fontSize: '13px',
                  lineHeight: '15px',
                  color: '#fa8a00',
                }}
              >
                Введется <br/> аналитика
              </div>
            ) : (
              <>
                <FormatterBudjet
                  budget={totalBudget}
                  data={getOrder.expected_start_date}
                />
              </>
            )}
          </div>
        </div>
      </th>
    </tr>
  )
}
