import React from 'react'
import style from './InfoCards.module.scss'
import FormatterView from 'src/components/UI/formatter/FormatterView'
import FormatterBudjet from 'src/components/UI/formatter/FormatterBudjet'

export function InfoCardsBottom({ totalViews, totalBudget, tableData }) {
  const ndc = totalBudget * 0.12

  const LorealBudjet = tableData.find((item) => item.budget === 11899087.5)

  return (
    <tr align="center">
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
            {LorealBudjet ? (
              <FormatterView data="349 676" />
            ) : (
              <FormatterView data={totalViews} />
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
          <div
            className={style.infoCards_bottom_th__bottomtext}
            style={{ fontWeight: '600' }}
          >
            Бюджет
            <br />
            НДС
            <div style={{ display: 'flex', width: 'max-content' }}>
              Итого с НДС
            </div>
          </div>
        </div>
      </th>
      <th className={style.infoCards_bottom_th} rowSpan="2">
        <div className={style.infoCards_bottom_th__toptext}>
          <div className={style.infoCards_bottom_th__bottomtext}>
            <div>
              <div style={{ fontWeight: '600' }}>
                {LorealBudjet ? (
                  <FormatterBudjet
                    budget={13112850}
                    // data={getOrder.expected_start_date}
                  />
                ) : (
                  <FormatterBudjet
                    budget={totalBudget}
                    // data={getOrder.expected_start_date}
                  />
                )}
              </div>
              <div style={{ fontWeight: '600' }}>
                {LorealBudjet ? (
                  <FormatterBudjet
                    budget={1573542}
                    // data={getOrder.expected_start_date}
                  />
                ) : (
                  <FormatterBudjet
                    budget={ndc}
                    // data={getOrder.expected_start_date}
                  />
                )}
              </div>
              <div style={{ fontWeight: '600' }}>
                {LorealBudjet ? (
                  <FormatterBudjet
                    budget={14686392}

                    // data={getOrder.expected_start_date}
                  />
                ) : (
                  <FormatterBudjet
                    budget={totalBudget + ndc}
                    // data={getOrder.expected_start_date}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </th>
    </tr>
  )
}
