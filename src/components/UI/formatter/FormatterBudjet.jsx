import React from "react";

function FormatterBudjet(props) {
  const number = Math.floor(props.budget);
  const formattedNumber = number ? number.toLocaleString("ru-RU") : "";
  return (
    <div>
      <div>{formattedNumber}</div>
    </div>
  );
}

export default FormatterBudjet;
