import React from "react";
import style from "./SelectUI.module.scss";

function SelectUI ({
                     label,
                     options,
                     register,
                     error,
                     inputWidth,
                     marginRight,
                     marginLeft,
                   }) {
  const ScontainerStyle = {
    width: inputWidth ? "100%" : "210px",
    marginBottom: "18px",
    position: "relative",
    marginRight: marginRight || 0,
    marginLeft: marginLeft || 0,
  };
  const [errorVisible, setErrorVisible] = React.useState (false);

  React.useEffect (() => {
    setErrorVisible (!!error); // Отображать ошибку, если она присутствует
  }, [error]);

  return (
    <div style={ScontainerStyle}>
      <select
        className={`${style.select__select} ${errorVisible ? style.show : ""}`}
        style={{padding: "12px", marginBottom: "5px"}}
        {...register}
      >
        <option value="">Выбрать {label}</option>
        {options.map ((option, index) => (
          <option key={index} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>

      <span
        className={`${style.select__error} ${errorVisible ? style.show : ""}`}
      >
        {error && <p>{error}</p>}
      </span>
    </div>
  );
}

export default SelectUI;
