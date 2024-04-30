import React from 'react'
import style from '../../../AdvChartTable.module.scss'
import Anonim from 'src/assets/anonim.png'

function OrderChartTwoThead ({statistic}) {
  function findVideoWithThreeGenders (data) {
    return data.find (item => item.gender_percentages.length === 3);
  }

  const result = findVideoWithThreeGenders (statistic);
  const uniqueGenders =
    Array.from (
      new Set (result.gender_percentages.map ((gen) => gen.gender)),
    )
  return (
    <div>
      <div style={{display: "flex", justifyContent: "start"}}>

        {uniqueGenders.length > 0
          ? uniqueGenders.map ((gender, index) => (
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
                  <img src={Anonim} alt="Anonim" style={{width: '15px'}}/>
                </div>
              ) : (
                <>{gender}</>
              )}
            </td>
          ))
          : null}
      </div>
    </div>
  )
}

export default OrderChartTwoThead
