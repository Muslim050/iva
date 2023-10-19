import React from "react";
import style from "./FilteredTooltipRevenue.module.scss";
import { ReactComponent as Close } from "src/assets/Close.svg";

function FilteredTooltipRevenue({
  isTooltip,
  handleDateStatictick,

  startDate,
  setStartDate,
  endDate,
  setEndDate,
  setIsTooltip,
}) {
  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  console.log("endDasdsadasdsate", endDate);

  const canClcked = startDate && endDate;
  return (
    <>
      {isTooltip && (
        <div
          lassName={style.profile__wrapper__tooltip}
          style={{
            position: "absolute",
            right: "0px",
            top: "65px",
            backgroundColor: "#fff",
            boxShadow: "0 0 5px #bbbbbb",
            padding: "14px",
            borderRadius: "10px",
            zIndex: "2",
          }}
        >
          <div>
            <label
              style={{
                fontSize: "10px",
                color: "var(--text-color)",
                fontWeight: "400",
              }}
            >
              Дата начало
            </label>
            <input
              className={style.input}
              type="date"
              value={startDate}
              onChange={handleStartDateChange}
              style={{
                width: "210px",
              }}
            />
          </div>
          <div>
            <label
              style={{
                fontSize: "10px",
                color: "var(--text-color)",
                fontWeight: "400",
              }}
            >
              Дата конец
            </label>
            <input
              className={style.input}
              type="date"
              value={endDate}
              onChange={handleEndDateChange}
              style={{
                width: "210px",
                marginLeft: "6px",
                marginTop: "10px",
              }}
            />
          </div>

          <div style={{ display: "flex" }}>
            <button
              className={style.btn_filtered}
              onClick={handleDateStatictick} // Добавляем проверку перед сортировкой
              disabled={!canClcked}
            >
              Сортировать
            </button>
            <button
              className={style.btn_filtered__close}
              onClick={() => setIsTooltip(!isTooltip)}
            >
              <Close style={{ height: "30px" }} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default FilteredTooltipRevenue;
