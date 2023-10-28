import React from "react";
import style from "./BuisnessModel.module.scss";
import Eclipse from "src/assets/Site/Ellipse.png";
import LeftForm from "./LeftForm";
import RightForm from "./RightForm";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

function BuisnessModel() {
  const [ref, inView] = useInView({
    triggerOnce: true,
  });
  const variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };
  return (
    <div
      id="Бизнес"
      style={{
        padding: "100px 0",

        position: "relative",
        background: "rgb(2,43,72)",
        background:
          "linear-gradient(0deg, rgba(2,43,72,1) 0%, rgba(2,29,52,1) 33%, rgba(2,29,52,1) 63%, rgba(2,43,72,1) 100%)",
      }}
    >
      <div className={style.service_container}>
        <motion.img
          initial="hidden"
          // animate={inView ? "hidden" : "visible"}
          animate={inView ? "hidden" : "visible"}
          variants={variants}
          transition={{ duration: 0.9, delay: 0.4 }}
          src={Eclipse}
          alt=""
          style={{
            position: "absolute",
            right: "-20%",
            bottom: "-40%",
          }}
        />

        <div className={style.title_wrapper}>
          <span className={style.service_title}>
            РАЗВИВАЙТЕ СВОЙ БИЗНЕС ВМЕСТЕ С НАМИ
          </span>
          <h2 className={style.service_subtitle}>
            Приглашаем к сотрудничеству рекламодателей, медиа компаний,
            киностудий, производителей видеоконтента, видео-блогеров
          </h2>
        </div>

        <div className={style.wrapperForm}>
          <LeftForm />

          <RightForm />
        </div>
      </div>
    </div>
  );
}

export default BuisnessModel;
