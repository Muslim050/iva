import React from "react";
import style from "./ButtonUI.module.scss";
import classNames from "classnames";

export const ButtonUI = ({ isValid, onClick, disabled, children, icon }) => {
  const btnClasses = classNames({
    [style.btn__wrapper__btn]: true,
    [style.btn__wrapper__disabled]: !isValid || disabled,
  });

  return (
    <div className={style.btn__wrapper}>
      <button
        disabled={!isValid || disabled}
        className={btnClasses}
        onClick={onClick}
      >
        {icon && <span className={style.icon}>{icon}</span>}
        {children}
      </button>
    </div>
  );
};

export const ButtonModal = ({ isValid, onClick, disabled, children, icon }) => {
  const btnClassesModal = classNames({
    [style.btn__wrapper__btnM]: true,
    [style.btn__wrapper__disabledM]: !isValid || disabled,
  });

  return (
    <div className={style.btn__wrapper}>
      <button
        disabled={!isValid || disabled}
        className={btnClassesModal}
        onClick={onClick}
      >
        {icon && <span className={style.icon}>{icon}</span>}
        {children}
      </button>
    </div>
  );
};
