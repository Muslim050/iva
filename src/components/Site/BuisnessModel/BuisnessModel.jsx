import React from "react";
import style from "./BuisnessModel.module.scss";
import Image1 from "src/assets/Site/1.png";
import Image2 from "src/assets/Site/2.png";
import Eclipse from "src/assets/Site/Ellipse.png";

function BuisnessModel() {
  return (
    <div
      id="Бизнес"
      style={{
        position: "relative",
        background: "rgb(2,43,72)",
        background:
          "linear-gradient(0deg, rgba(2,43,72,1) 0%, rgba(2,29,52,1) 33%, rgba(2,29,52,1) 63%, rgba(2,43,72,1) 100%)",
      }}
    >
      <div className={style.service_container}>
        <img
          src={Eclipse}
          alt=""
          style={{ position: "absolute", right: " -25%" }}
        />

        <div className={style.title_wrapper}>
          <span className={style.service_title}>
            Бизнес модель сотрудничества
          </span>
          <h2 className={style.service_subtitle}>
            Мы предлагаем понятную и прозрачную бизнес модель сотрудничества,
            основанную на разделения доходов от рекламы - Revenue Share
          </h2>
        </div>

        <div className={style.service_card}>
          <div className={style.card}>
            <img src={Image1} alt="" />
          </div>

          <div className={style.card}>
            <img src={Image2} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BuisnessModel;
