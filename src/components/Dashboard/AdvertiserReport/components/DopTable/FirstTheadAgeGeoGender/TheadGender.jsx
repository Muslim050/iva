import React from 'react'
import style from '../../../AdvChartTable.module.scss'
import Anonim from 'src/assets/anonim.png'

function OrderChartTwoThead({ statistic }) {
  const uniqueGenders =
   Array.from(
          new Set(statistic.gender_percentages.map((gen) => gen.gender)),
        )
  const uniqueGendersss = statistic.gender_percentages

  return (
    <div >
      <div style={{ display: "flex", justifyContent: "space-between"}}>

      {uniqueGenders.length > 0
        ? uniqueGenders.map((gender, index) => (
            <td
              key={index}
              className={style.tableChart__tdd}
              style={{
                fontSize: '12px', padding: "5px", width: "60px"
              }}
            >
              {gender === 'female' ? (
                'Ж'
              ) : gender === 'male' ? (
                'М'
              ) : gender === 'Other' ? (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <img src={Anonim} alt="Anonim" style={{ width: '15px' }} />
                </div>
              ) : (
                <>{gender}</>
              )}
            </td>
          ))
        : null}
      </div>
      <div style={{borderTop: "1px solid #f3f0f0", display: "flex", justifyContent: "space-between"}}>
        {uniqueGendersss.length > 0
          ? uniqueGendersss.map((gender, index) => (
            <>
              <td
                key={`gender-${index}`}
                data-label="Пол"
                style={{
                  textAlign: 'center', padding: "5px",  width: "60px", fontSize: "13px",  fontWeight: "600", color: "blue"
                }}
              >
                {gender.percentage}%
              </td>
            </>
          ))
          : null}
      </div>
    </div>
  )
}

export default OrderChartTwoThead
