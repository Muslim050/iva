import React from "react";
import style from "./ButtonBorder.module.scss";

const ButtonBorder = ({ onClick, children }) => {
  return (
    <div className={style.button}>
      <button className={style.button__wrapper} type="button" onClick={onClick}>
        {children}
      </button>
    </div>
  );
};

export default ButtonBorder;
