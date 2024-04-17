import React from "react";
import style from "./ButtonTable.module.scss";

const ButtonTable = ({ onClick, children, Customstyle }) => {
  const childrenArray = React.Children.toArray(children);

  // Предполагаем, что первый элемент - иконка, второй элемент - текст
  const icon = childrenArray[0];
  const text = childrenArray[1];
  return (
    <div className={style.button } >
      <button style={Customstyle} className={style.button__wrapper} type="button" onClick={onClick}>
        <div className={style.button__icon}>{icon}</div>
        <div className={`${style.button__text} ${style.hide_text}`}>{text}</div>
      </button>
    </div>
  );
};

export default ButtonTable;
