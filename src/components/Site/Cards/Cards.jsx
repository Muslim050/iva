import React from "react";
import { IconContext } from "react-icons";
import { IoMailOutline, IoArrowForward } from "react-icons/io5";
import style from "./Cards.module.scss";
import Eclipse from "src/assets/Site/Ellipse.png";

function Cards() {
  return (
    <div className={style.service_container} id="Преимущества">
      <img src={Eclipse} alt="" />
      <div className={style.title_wrapper}>
        <span className={style.service_title}>РЕКЛАМА КОТОРАЯ</span>
      </div>

      <div className={style.service_card}>
        <div className={style.card}>
          <h3 style={{ textAlign: "center" }}>BRANDFORMANCE</h3>
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
              Это онлайн платформа для размещения видеорекламы на крупнейшем
              видеохостинге
            </div>
          </a>
        </div>

        <div className={style.card}>
          <h3 style={{ textAlign: "center" }}>REACH & FREQUENCY</h3>
          <div
            style={{
              fontSize: "24px",
              display: "flex",
              justifyContent: "center",
              color: "#cccccc",
            }}
          >
            Мы обеспечиваем охват до 12 млн. человек. Это активные потребители
            18-44 лет, со средним и высоким доходом
          </div>
        </div>
        <div className={style.card}>
          <h3 style={{ textAlign: "center" }}>INSTREAM VIDEO</h3>
          <div
            style={{
              fontSize: "24px",
              display: "flex",
              justifyContent: "center",
              color: "#cccccc",
            }}
          >
            Это наиболее эффективный формат видеорекламы с самым высоким уровнем
            вовлечения и запоминаемости
          </div>
        </div>
        <div className={style.card}>
          <h3 style={{ textAlign: "center" }}>BRAND SAFETY</h3>
          <div
            style={{
              fontSize: "24px",
              display: "flex",
              justifyContent: "center",
              color: "#cccccc",
            }}
          >
            Гарантия максимальной безопасности и требуемого уровня
            позиционирования вашего бренда
          </div>
        </div>
        <div className={style.card}>
          <h3 style={{ textAlign: "center" }}>VIEWABILITY</h3>
          <div
            style={{
              fontSize: "24px",
              display: "flex",
              justifyContent: "center",
              color: "#cccccc",
            }}
          >
            Максимальную видимость и вовлечение обеспечит наш формат
            фиксированной и неисчезающей рекламы
          </div>
        </div>
        <div className={style.card}>
          <h3 style={{ textAlign: "center" }}>ANALYTICS</h3>
          <div
            style={{
              fontSize: "24px",
              display: "flex",
              justifyContent: "center",
              color: "#cccccc",
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
