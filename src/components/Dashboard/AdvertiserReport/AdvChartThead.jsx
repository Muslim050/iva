import React from 'react'
import style from './AdvChartTable.module.scss'
import TheadGender from "./components/DopTable/FirstTheadAgeGeoGender/TheadGender";
import TheadAge from "./components/DopTable/FirstTheadAgeGeoGender/TheadAge";
import TheadGeo from "./components/DopTable/FirstTheadAgeGeoGender/TheadGeo";

const headers = [
  {key: 'index', label: '№'},
  {key: 'channel_name', label: 'Канал'},
  {key: 'video_name', label: 'Название видео'},
  {key: 'order_format', label: 'Формат'},
  {key: 'publication_date', label: 'Начало'},
  {key: 'publication_date', label: 'Конец'},
  {key: 'online_view_count', label: 'Показы'},
  {key: 'budget', label: 'Бюджет'},

  // {key: 'gender', label: 'Пол'},
  // {key: 'age', label: 'Возраст'},
  // {key: 'geo', label: 'Гео'},

]

function OrderChartRow ({statistic}) {
  return (
    <>
      <tr>
        {headers.map ((header) => {
          return (
            <td key={header.key} className={style.tableCell}>
              {header.label}

            </td>
          );
        })}
        <td className={style.tableCell} style={{padding: "0px", borderLeft: "1px solid #ddd"}}>
          <td style={{
            padding: "10px ",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            borderBottom: "1px solid #ddd",
            alignItems: "center"
          }}>
            Пол
          </td>
          <TheadGender statistic={statistic}/>
        </td>
        <td className={style.tableCell} style={{padding: "0px", borderLeft: "1px solid #ddd"}}>
          <td style={{
            padding: "10px ",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            borderBottom: "1px solid #ddd",
            alignItems: "center"
          }}>
            Возраст
          </td>
          <TheadAge statistic={statistic}/>
        </td>

        <td className={style.tableCell} style={{padding: "0px", borderLeft: "1px solid #ddd"}}>
          <td style={{
            padding: "10px ",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            borderBottom: "1px solid #ddd",
            alignItems: "center"
          }}>
            Гео
          </td>
          <TheadGeo statistic={statistic}/>
        </td>
      </tr>
    </>
  )
}

export default OrderChartRow
