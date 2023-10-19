import React from "react";
import { IconContext } from "react-icons";
import { IoMailOutline, IoArrowForward } from "react-icons/io5";
import style from "./Features.module.scss";
import Eclipse from "src/assets/Site/Ellipse.png";

function Features() {
  return (
    <div
      id="форматы"
      style={{
        background: "rgb(2,43,72)",
        background:
          "linear-gradient(0deg, rgba(2,43,72,1) 0%, rgba(2,29,52,1) 33%, rgba(2,29,52,1) 63%, rgba(2,43,72,1) 100%)",
      }}
    >
      <div className={style.service_container}>
        <img src={Eclipse} alt="" />

        <div className={style.title_wrapper}>
          <span className={style.service_title}>
            РЕКЛАМА КОТОРАЯ ПРЕВРАЩАЕТ ЗРИТЕЛЕЙ В ПОКУПАТЕЛЕЙ
          </span>
        </div>

        <div className={style.service_card}>
          <div className={style.card}>
            <h3 style={{ textAlign: "center" }}>PRE-ROLL</h3>
            <div
              style={{
                fontSize: "24px",
                display: "flex",
                justifyContent: "center",
                color: "#cccccc",
              }}
            >
              Рекламный ролик до 20 сек размещается непосредственно перед
              началом видеоконтента
            </div>
          </div>

          <div className={style.card}>
            <h3 style={{ textAlign: "center" }}>MID-ROLL</h3>
            <div
              style={{
                fontSize: "24px",
                display: "flex",
                justifyContent: "center",
                color: "#cccccc",
              }}
            >
              Рекламный ролик до 20 сек размещается примерно на 7-10 минуте
              видеоконтента
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Features;
