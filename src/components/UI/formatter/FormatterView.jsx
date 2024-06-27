import React from "react";

function FormatterView (props) {
  const number = props.data;
  const formattedNumber = number ? number.toLocaleString ("ru-RU") : "";
  return (
    <div>
      <div>{formattedNumber ? formattedNumber : <div style={{color: "orange"}}>----</div>} </div>
    </div>
  );
}

export default FormatterView;
