import React from 'react'
import style from './InfoCards.module.scss'
import {useParams} from 'react-router-dom'
import FormatterView from 'src/components/UI/formatter/FormatterView'
import FormatterBudjet from 'src/components/UI/formatter/FormatterBudjet'

export function InfoCardsTop ({getOrder}) {
  const {id} = useParams ()
  const user = localStorage.getItem ('role')

  return (
    <div style={{display: 'flex'}}>
      <div className={style.infoCart}>
        Заказ
        <div className={style.infoCart__text}>№-{id}</div>
      </div>

      <div className={style.infoCart}>
        План показов: &nbsp;
        {
          getOrder.status === 'in_progress' ? <div className={style.infoCart__text}>
              <FormatterView data={getOrder.expected_number_of_views}/>
            </div> :
            <div className={style.infoCart__text}>
              <FormatterView data={getOrder.online_views}/>
            </div>
        }

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

export function InfoCardsBottom ({
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

      <th
        className={style.infoCards_bottom_th}
        rowspan="1"
        style={{fontWeight: '400'}}
      >
        <div style={{display: 'flex', justifyContent: 'center'}}>Итого:</div>
      </th>
      <th
        className={style.infoCards_bottom_th}
        rowspan="1"
        style={{
          borderLeft: '4px solid white',
          width: '130px',
        }}
      >
        <div className={style.infoCards_bottom_th__toptext}>
          Остаток
          <div className={style.infoCards_bottom_th__bottomtext}>
            {getOrder.status === 'in_progress' ?
              <FormatterView
                data={getOrder.expected_number_of_views - getOrder.online_views}
              /> :
              <FormatterView
                data='0'
              />

            }
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
        <div
          className={style.infoCards_bottom_th__toptext}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'column',
          }}
        >
          Прогресс{' '}
          {getOrder.status === 'in_progress' ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-around',
                marginTop: '5px',
                padding: '3px 5px',
                borderRadius: '7px',
                background: (() => {
                  const ratie = Math.floor (
                    (getOrder.online_views /
                      getOrder.expected_number_of_views) *
                    100,
                  )

                  if (ratie >= 100) {
                    return '#ec2020'
                  } else if (ratie >= 80) {
                    return 'rgba(85, 112, 241, 0.16)'
                  } else if (ratie >= 50) {
                    return 'rgba(50, 147, 111, 0.16)'
                  } else if (ratie >= 1) {
                    return 'rgb(86 112 241)'
                  }
                  return 'inherit'
                }) (),

                color: (() => {
                  const ratio = Math.floor (
                    (getOrder.online_views /
                      getOrder.expected_number_of_views) *
                    100,
                  )
                  if (ratio >= 100) {
                    return '#f8f8f8'
                  } else if (ratio >= 80) {
                    return '#5570F1'
                  } else if (ratio >= 50) {
                    return '#519C66'
                  } else if (ratio >= 1) {
                    return 'rgb(228 232 253)'
                  }
                  return 'inherit'
                }) (),
              }}
            >
              {getOrder.online_views > 0 &&
                Math.floor (
                  (getOrder.online_views / getOrder.expected_number_of_views) *
                  100,
                ) +
                ' ' +
                '%'}
            </div>
          ) : <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              marginTop: '5px',
              padding: '3px 5px',
              borderRadius: '7px',
              background: (() => {
                const ratie = Math.floor (
                  (totalViews /
                    getOrder.online_views) *
                  100,
                )

                if (ratie >= 100) {
                  return '#ec2020'
                } else if (ratie >= 80) {
                  return 'rgba(85, 112, 241, 0.16)'
                } else if (ratie >= 50) {
                  return 'rgba(50, 147, 111, 0.16)'
                } else if (ratie >= 1) {
                  return 'rgb(86 112 241)'
                }
                return 'inherit'
              }) (),

              color: (() => {
                const ratio = Math.floor (
                  (totalViews /
                    getOrder.online_views) *
                  100,
                )
                if (ratio >= 100) {
                  return '#f8f8f8'
                } else if (ratio >= 80) {
                  return '#5570F1'
                } else if (ratio >= 50) {
                  return '#519C66'
                } else if (ratio >= 1) {
                  return 'rgb(228 232 253)'
                }
                return 'inherit'
              }) (),
            }}
          >
            {totalViews > 0 &&
              Math.floor (
                (totalViews / getOrder.online_views) *
                100,
              ) +
              ' ' +
              '%'}
          </div>}
          {/*{getOrder.status === 'finished' ? (*/}
          {/*  <div*/}
          {/*    style={{*/}
          {/*      padding: '3px 4px',*/}
          {/*      borderRadius: '7px',*/}
          {/*      background: 'rgb(156 81 81)',*/}
          {/*      color: '#eedede',*/}
          {/*      marginTop: '8px',*/}
          {/*      display: 'flex',*/}
          {/*      justifyContent: 'center',*/}
          {/*    }}*/}
          {/*  >*/}
          {/*    100%*/}
          {/*  </div>*/}
          {/*) : null}*/}

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
