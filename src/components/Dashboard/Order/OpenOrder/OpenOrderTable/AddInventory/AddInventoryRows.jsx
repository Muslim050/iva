import React from 'react'

function AddInventoryRows ({inventor}) {
  const activeStatus = (inventor.some ((item) => item.status === 'in_use'))
  return (
    <>
      <tr>
        <th style={{color: "#717377", fontWeight: "500"}}>
          Паблишер
        </th>
        <th style={{color: "#717377", fontWeight: "500"}}>
          Название Видео
        </th>
        <th style={{color: "#717377", fontWeight: "500"}}>
          Формат рекламы
        </th>
        <th style={{color: "#717377", fontWeight: "500"}}>
          Тайм код рекламы
        </th>
        <th style={{color: "#717377", fontWeight: "500"}}>
          Желаемое количество просмотров
        </th>
        <th style={{color: "#717377", fontWeight: "500"}}>
          Хронометраж видео
        </th>
        <th style={{color: "#717377", fontWeight: "500"}}>
          Категория
        </th>
        <th style={{color: "#717377", fontWeight: "500"}}>
          Время публикаций
        </th>
        {
          activeStatus && <th style={{color: "#717377", fontWeight: "500"}}>
            Показы
          </th>
        }

        <th style={{color: "#717377", fontWeight: "500"}}>
          Действия/Статус
        </th>
      </tr>
    </>
  )
}

export default AddInventoryRows
