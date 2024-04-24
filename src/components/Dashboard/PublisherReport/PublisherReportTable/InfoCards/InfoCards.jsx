import React from 'react'
import style from './InfoCards.module.scss'
import { useParams } from 'react-router-dom'
import FormatterView from '../../../../UI/formatter/FormatterView'
import FormatterBudjet from '../../../../UI/formatter/FormatterBudjet'

export function InfoCardsBottom({
  totalViews,
  totalBudget,
  totalComisy,
  currentItems,
  totalComisyAdtech,
  totalbudjetChannel,
  channelName, uniqueChannelNameFiltered
}) {
  return (
    <tr align="center">
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>

      <th
        className={style.infoCards_bottom_th}
        rowSpan="1"
        style={{ fontWeight: '400' }}
      >
        <div style={{ display: 'flex', justifyContent: 'center' }}>Итого:</div>
      </th>

      <th
        className={style.infoCards_bottom_th}
        rowSpan="2"
        style={{
          borderLeft: '4px solid white',
        }}
      >
        <div className={style.infoCards_bottom_th__toptext}>
          Показы
          <div className={style.infoCards_bottom_th__bottomtext}>
            <FormatterView data={totalViews} />
          </div>
        </div>
      </th>

      <th
        className={style.infoCards_bottom_th}
        rowSpan="2"
        style={{
          borderLeft: '4px solid white',
        }}
      >
        <div className={style.infoCards_bottom_th__toptext}>
          Бюджет
          <div
            className={style.infoCards_bottom_th__bottomtext}
            style={{ display: 'flex' }}
          >
            {totalBudget === 0 ? (
              <div
                style={{
                  fontSize: '13px',
                  lineHeight: '15px',
                  color: '#fa8a00',
                }}
              >
                ---
              </div>
            ) : (
              <>
                <FormatterBudjet
                  budget={totalBudget}
                  // data={getOrder.expected_start_date}
                />
              </>
            )}
          </div>
        </div>
      </th>
      <th
        className={style.infoCards_bottom_th}
        rowSpan="2"
        style={{
          borderLeft: '4px solid white',
        }}
      >
        <div className={style.infoCards_bottom_th__toptext}>
          Комиссия Агенства
          <div
            className={style.infoCards_bottom_th__bottomtext}
            style={{ display: 'flex' }}
          >
            {totalComisy === 0 ? (
              <div
                style={{
                  fontSize: '13px',
                  lineHeight: '15px',
                  color: '#fa8a00',
                }}
              >
                ---
              </div>
            ) : (
              <>
                <FormatterBudjet
                  budget={totalComisy}
                  // data={getOrder.expected_start_date}
                />
              </>
            )}
          </div>
        </div>
      </th>
      <th
        className={style.infoCards_bottom_th}
        rowSpan="2"
        style={{
          borderLeft: '4px solid white',
        }}
      >
        <div className={style.infoCards_bottom_th__toptext}>
          Комиссия AdTech Media
          <div
            className={style.infoCards_bottom_th__bottomtext}
            style={{ display: 'flex' }}
          >
            {totalComisyAdtech === 0 ? (
              <div
                style={{
                  fontSize: '13px',
                  lineHeight: '15px',
                  color: '#fa8a00',
                }}
              >
                Введется <br /> аналитика
              </div>
            ) : (
              <>
                <FormatterBudjet
                  budget={totalComisyAdtech}
                  // data={getOrder.expected_start_date}
                />
              </>
            )}
          </div>
        </div>
      </th>
      <th
        className={style.infoCards_bottom_th}
        rowSpan="2"
        style={{
          borderLeft: '4px solid white',
        }}
      >
        <div className={style.infoCards_bottom_th__toptext}>
          К оплате - {uniqueChannelNameFiltered}
          <div
            className={style.infoCards_bottom_th__bottomtext}
            style={{ display: 'flex' }}
          >
            {totalbudjetChannel === 0 ? (
              <div
                style={{
                  fontSize: '13px',
                  lineHeight: '15px',
                  color: '#fa8a00',
                }}
              >
                ---
              </div>
            ) : (
              <>
                <FormatterBudjet
                  budget={totalbudjetChannel}
                  // data={getOrder.expected_start_date}
                />
              </>
            )}
          </div>
        </div>
      </th>
    </tr>
  )
}
