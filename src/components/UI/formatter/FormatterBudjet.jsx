import React from 'react'
const currentDate = new Date('2024-01-10')

function FormatterBudjet(props) {
  const number = Math.floor(props.budget)
  const formattedNumber = number ? number.toLocaleString('ru-RU') : ''

  const orderDate = new Date(props.data)
  const isPastDate = orderDate < currentDate
  return (
    <div>
      <div>
        {formattedNumber} {isPastDate ? '$' : 'сум'}
      </div>
    </div>
  )
}

export default FormatterBudjet
