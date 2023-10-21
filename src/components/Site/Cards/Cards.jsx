import React from "react";
import { IconContext } from "react-icons";

import { ImYoutube2 } from "react-icons/im";
import { IoMailOutline, IoArrowForward } from "react-icons/io5";
import style from "./Cards.module.scss";
import Eclipse from "src/assets/Site/Ellipse.png";

function Cards() {
  return (
    <div className={style.service_container} id="Технология">
      <img src={Eclipse} alt="" />
      <div className={style.title_wrapper}>
        <span className={style.service_title}>
          РЕКЛАМА КОТОРАЯ ПОВЫШАЕТ УЗНАВАЕМОСТЬ И ЦЕННОСТЬ ВАШЕГО БРЕНДА
        </span>
      </div>

      <div className={style.service_card}>
        <div className={style.card}>
          <h3 style={{ textAlign: "center", marginBottom: "35px" }}>
            BRANDFORMANCE
          </h3>
          <a
            href="#"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              color: "white",
            }}
          >
            <div
              style={{
                fontSize: "24px",
                display: "flex",
                justifyContent: "center",
                color: "#cccccc",
              }}
            >
              <span style={{ lineHeight: "30px" }}>
                {" "}
                Это онлайн платформа для размещения видеорекламы на крупнейшем
                видеохостинге{" "}
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    height: "32px",
                    fontSize: "80px",
                  }}
                >
                  {/* <IconContext.Provider
                    value={{ color: "#14da8f", size: "70px", marginTop: "5px" }}
                  > */}
                  <ImYoutube2 style={{ height: "30px" }} />
                  {/* </IconContext.Provider> */}
                </div>
              </span>
            </div>
          </a>
        </div>

        <div className={style.card}>
          <h3 style={{ textAlign: "center", marginBottom: "35px" }}>
            REACH & FREQUENCY
          </h3>
          <div
            style={{
              fontSize: "24px",
              display: "flex",
              justifyContent: "center",
              color: "#cccccc",
              lineHeight: "30px",
            }}
          >
            Мы обеспечиваем охват до 12 млн. человек. Это активные потребители
            18-44 лет, со средним и высоким доходом
          </div>
        </div>
        <div className={style.card}>
          <h3 style={{ textAlign: "center", marginBottom: "35px" }}>
            INSTREAM VIDEO
          </h3>
          <div
            style={{
              fontSize: "24px",
              display: "flex",
              justifyContent: "center",
              color: "#cccccc",
              lineHeight: "30px",
            }}
          >
            Это наиболее эффективный формат видеорекламы с самым высоким уровнем
            вовлечения и запоминаемости
          </div>
        </div>
        <div className={style.card}>
          <h3 style={{ textAlign: "center", marginBottom: "35px" }}>
            BRAND SAFETY
          </h3>
          <div
            style={{
              fontSize: "24px",
              display: "flex",
              justifyContent: "center",
              color: "#cccccc",
              lineHeight: "30px",
            }}
          >
            Гарантия максимальной безопасности и требуемого уровня
            позиционирования вашего бренда
          </div>
        </div>
        <div className={style.card}>
          <h3 style={{ textAlign: "center", marginBottom: "35px" }}>
            VIEWABILITY
          </h3>
          <div
            style={{
              fontSize: "24px",
              display: "flex",
              justifyContent: "center",
              color: "#cccccc",
              lineHeight: "30px",
            }}
          >
            Максимальную видимость и вовлечение обеспечит наш формат
            фиксированной и неисчезающей рекламы
          </div>
        </div>
        <div className={style.card}>
          <h3 style={{ textAlign: "center", marginBottom: "35px" }}>
            ANALYTICS
          </h3>
          <div
            style={{
              fontSize: "24px",
              display: "flex",
              justifyContent: "center",
              color: "#cccccc",
              lineHeight: "30px",
            }}
          >
            Прозрачность и точность размещения, вам обеспечит доступ к онлайн
            статистике аудитории вашей рекламы
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;
