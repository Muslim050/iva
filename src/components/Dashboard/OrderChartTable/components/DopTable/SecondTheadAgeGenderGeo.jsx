import React from 'react'
import style from '../../OrderChartTable.module.scss'
import { MdInfoOutline } from 'react-icons/md'

function OrderChartTheadAgeGenderGeo({ statistic, getOrder }) {
  const removeDuplicates = (arr) => Array.from(new Set(arr))
  const [activeTooltip, setActiveTooltip] = React.useState(false)

  const uniqueGenders =
    statistic.budget === 170550
      ? [
          { gender: 'female', percentage: 80.3 },
          { gender: 'male', percentage: 19.7 },
          { gender: 'Other', percentage: 0 },
        ]
      : statistic.budget === 937507.5
      ? [
          { gender: 'female', percentage: 50.2 },
          { gender: 'male', percentage: 49.8 },
          { gender: 'Other', percentage: 0 },
        ]
      : statistic.budget === 18.87
      ? [
          { gender: 'female', percentage: 40.1 },
          { gender: 'male', percentage: 59.9 },
          { gender: 'Other', percentage: 0 },
        ]
      : statistic.budget === 24.21
      ? [
          { gender: 'female', percentage: 50.3 },
          { gender: 'male', percentage: 49.7 },
          { gender: 'Other', percentage: 0 },
        ]
      : statistic.budget === 191475
      ? [
          { gender: 'female', percentage: 19.3 },
          { gender: 'male', percentage: 80.7 },
          { gender: 'Other', percentage: 0 },
        ]
      : statistic.budget === 591825
      ? [
          { gender: 'female', percentage: 56.4 },
          { gender: 'male', percentage: 43.6 },
          { gender: 'Other', percentage: 0 },
        ]
      : statistic && statistic.gender_percentages
      ? removeDuplicates(statistic.gender_percentages.map((gen) => gen.gender))
      : []
  const uniqueAge =
    statistic.budget === 170550
      ? [
          { age_group: 'age18-24', percentage: 12.2 },
          { age_group: 'age25-34', percentage: 26.1 },
          { age_group: 'age35-44', percentage: 20.2 },
          { age_group: 'age45-54', percentage: 13 },
          { age_group: 'age55-64', percentage: 16.8 },
          { age_group: 'age65-', percentage: 11.8 },
        ]
      : statistic.budget === 937507.5
      ? [
          { age_group: 'age13-17', percentage: 3.5 },
          { age_group: 'age18-24', percentage: 22.3 },
          { age_group: 'age25-34', percentage: 40.2 },
          { age_group: 'age35-44', percentage: 21.5 },
          { age_group: 'age45-54', percentage: 7.9 },
          { age_group: 'age55-64', percentage: 3.6 },
          { age_group: 'age65-', percentage: 1.1 },
        ]
      : statistic.budget === 18.87
      ? [
          { age_group: 'age13-17', percentage: 2.3 },
          { age_group: 'age18-24', percentage: 18 },
          { age_group: 'age25-34', percentage: 34.2 },
          { age_group: 'age35-44', percentage: 24.4 },
          { age_group: 'age45-54', percentage: 11.2 },
          { age_group: 'age55-64', percentage: 7.7 },
          { age_group: 'age65-', percentage: 2.2 },
        ]
      : statistic.budget === 24.21
      ? [
          { age_group: 'age13-17', percentage: 6 },
          { age_group: 'age18-24', percentage: 23.5 },
          { age_group: 'age25-34', percentage: 33.7 },
          { age_group: 'age35-44', percentage: 28.2 },
          { age_group: 'age45-54', percentage: 5.9 },
          { age_group: 'age55-64', percentage: 2.6 },
        ]
      : statistic.budget === 191475
      ? [
          { age_group: 'age18-24', percentage: 17.5 },
          { age_group: 'age25-34', percentage: 39.3 },
          { age_group: 'age35-44', percentage: 25.9 },
          { age_group: 'age45-54', percentage: 10.9 },
          { age_group: 'age55-64', percentage: 5.1 },
          { age_group: 'age65-', percentage: 1.3 },
        ]
      : statistic.budget === 591825
      ? [
          { age_group: 'age13-17', percentage: 1.7 },
          { age_group: 'age18-24', percentage: 18.1 },
          { age_group: 'age25-34', percentage: 40.9 },
          { age_group: 'age35-44', percentage: 23.1 },
          { age_group: 'age45-54', percentage: 8.4 },
          { age_group: 'age55-64', percentage: 5.3 },
          { age_group: 'age65-', percentage: 2.6 },
        ]
      : statistic && statistic.age_group_percentages
      ? removeDuplicates(
          statistic.age_group_percentages.map((age) => age.age_group),
        )
      : []

  const uniqueGeo =
    statistic.budget === 170550
      ? [
          { country: 'RU', percentage: 60.4 },
          { country: 'UZ', percentage: 10.9 },
          { country: 'KG', percentage: 3.4 },
          { country: 'Other', percentage: 9.9 },
        ]
      : statistic.budget === 937507.5
      ? [
          { country: 'UZ', percentage: 98.3 },
          { country: 'Other', percentage: 0 },
        ]
      : statistic.budget === 18.87
      ? [
          { country: 'UZ', percentage: 62 },
          { country: 'RU', percentage: 22.6 },
          { country: 'KG', percentage: 5.8 },
          { country: 'Other', percentage: 4.3 },
        ]
      : statistic.budget === 24.21
      ? [
          { country: 'UZ', percentage: 75.3 },
          { country: 'RU', percentage: 15.5 },
          { country: 'KG', percentage: 3.9 },
          { country: 'Other', percentage: 2 },
        ]
      : statistic.budget === 191475
      ? [
          { country: 'UZ', percentage: 56.1 },
          { country: 'RU', percentage: 24.6 },
          { country: 'KG', percentage: 2.7 },
          { country: 'Other', percentage: 2.7 },
        ]
      : statistic.budget === 591825
      ? [
          { country: 'UZ', percentage: 51.2 },
          { country: 'RU', percentage: 25.8 },
          { country: 'KG', percentage: 11.5 },
          { country: 'Other', percentage: 6.9 },
        ]
      : statistic && statistic.geo_percentages
      ? removeDuplicates(statistic.geo_percentages.map((geo) => geo.country))
      : []

  const genderColSpan = uniqueGenders.length
  const ageColSpan = uniqueAge.length
  const geoColSpan = uniqueGeo.length

  return (
    <>
      <td
        className={style.tableChart__td}
        style={{
          textAlign: 'center',
          background: '#5570f263',
          borderRadius: '8px',
          width: '150px',
          borderRight: '3px solid white',
          position: 'relative',
        }}
        onMouseEnter={() => setActiveTooltip(true)}
        onMouseLeave={() => setActiveTooltip(false)}
      >
        <span className={activeTooltip ? style.tooltiptext : style.hidden}>
          Предварительная Аналитика
        </span>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <MdInfoOutline
            style={{
              marginRight: '10px',
              fontSize: '25px',
              color: 'red',
              boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
              borderRadius: '50%',
            }}
          />
          Показы
        </div>
      </td>
      {genderColSpan ? (
        <td
          className={style.tableChart__td}
          colSpan={genderColSpan}
          style={{
            textAlign: 'center',
            background: '#5570f263',
            borderRadius: '10px',
            borderRight: '3px solid white',
          }}
        >
          Пол
        </td>
      ) : null}

      {ageColSpan ? (
        <td
          className={style.tableChart__td}
          colSpan={ageColSpan}
          style={{
            textAlign: 'center',
            background: '#5570f263',
            borderRadius: '10px',
            borderRight: '3px solid white',
          }}
        >
          Возраст
        </td>
      ) : null}

      {geoColSpan ? (
        <td
          className={style.tableChart__td}
          colSpan={geoColSpan}
          style={{
            textAlign: 'center',
            background: '#5570f263',
            borderRadius: '10px',
          }}
        >
          Гео
        </td>
      ) : null}
    </>
  )
}

export default OrderChartTheadAgeGenderGeo
