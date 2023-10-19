import React from "react";
import style from "./FilteredTooltip.module.scss";
import { ReactComponent as Close } from "src/assets/Close.svg";

function FilteredTooltip({
  isTooltip,
  handleDateStatictick,
  actualStartDate,
  actualEndDate,
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

  React.useEffect(() => {
    setStartDate(actualStartDate);
  }, [actualStartDate]);
  React.useEffect(() => {
    setEndDate(actualEndDate);
  }, [actualEndDate]);
  return (
    <>
      {isTooltip && (
        <div
          lassName={style.profile__wrapper__tooltip}
          style={{
            position: "absolute",
            right: "53px",
            top: "0",
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
              min={startDate} // Set the min attribute to restrict the selectable range
              max={endDate} // Set the max attribute to restrict the selectable range
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
              min={startDate} // Set the min attribute to restrict the selectable range
              max={endDate} // Set the max attribute to restrict the selectable range
              style={{
                width: "210px",
              }}
            />
          </div>

          <div style={{ display: "flex" }}>
            <button
              className={style.btn_filtered}
              onClick={handleDateStatictick}
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

export default FilteredTooltip;
