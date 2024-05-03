import React from 'react'
import style from './InfoCards.module.scss'
import FormatterView from 'src/components/UI/formatter/FormatterView'
import FormatterBudjet from 'src/components/UI/formatter/FormatterBudjet'


export function InfoCardsBottom (
  {
    totalViews,
    totalBudget,
  }) {
  const ndc = totalBudget * 0.12
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
        style={{fontWeight: '400'}}
      >
        <div style={{display: 'flex', justifyContent: 'center'}}>Итого:</div>
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
            <FormatterView data={totalViews}/>
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
            style={{fontWeight: "600"}}

          >

            Бюджет
            <br/>
            НДС
            <div style={{display: "flex", width: "max-content"}}>
              Итого с НДС
            </div>
          </div>
        </div>
      </th>
      <th
        className={style.infoCards_bottom_th}
        rowSpan="2"
      >
        <div className={style.infoCards_bottom_th__toptext}>
          <div
            className={style.infoCards_bottom_th__bottomtext}
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
                <div style={{fontWeight: "600"}}>
                  <FormatterBudjet
                    budget={totalBudget}
                    // data={getOrder.expected_start_date}
                  />
                </div>
                <div style={{fontWeight: "600"}}>
                  <FormatterBudjet
                    budget={ndc}
                    // data={getOrder.expected_start_date}
                  />
                </div>
                <div style={{fontWeight: "600"}}>
                  <FormatterBudjet
                    budget={totalBudget + ndc}
                    // data={getOrder.expected_start_date}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </th>
    </tr>
  )
}
