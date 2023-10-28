import React from "react";
import { useInView } from "react-intersection-observer";
import style from "./Cards.module.scss";
import Eclipse from "src/assets/Site/Ellipse.png";
import { motion } from "framer-motion";

function Cards() {
  const [ref, inView] = useInView({
    triggerOnce: true, // Trigger the animation once when it comes into view.
  });

  const variants = {
    hidden: { opacity: 0, scale: 0.8, x: -50 },
    visible: { opacity: 1, scale: 1, x: 0 },
  };
  const variantss = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };
  return (
    <div className={style.service_container} id="Технология" ref={ref}>
      <motion.img
        src={Eclipse}
        alt=""
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={variantss}
        transition={{ duration: 0.9, delay: 0.4 }}
      />
      <div className={style.title_wrapper}>
        <span className={style.service_title}>
          РЕКЛАМА КОТОРАЯ ПОВЫШАЕТ ЦЕННОСТЬ ВАШЕГО БРЕНДА
        </span>
      </div>

      <div className={style.service_card}>
        <motion.div
          className={style.card}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={variants}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
            BRANDFORMANCE
          </h3>

          <div
            style={{
              fontSize: "18px",
              display: "flex",
              justifyContent: "center",
              color: "#cccccc",
            }}
          >
            <span style={{ lineHeight: "30px" }}>
              {" "}
              Это онлайн платформа для размещения видеорекламы на крупнейшем
              видеохостинге YouTube
            </span>
          </div>
        </motion.div>

        <motion.div
          className={style.card}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={variants}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
            REACH & FREQUENCY
          </h3>
          <div
            style={{
              fontSize: "18px",
              display: "flex",
              justifyContent: "center",
              color: "#cccccc",
              lineHeight: "30px",
            }}
          >
            Мы обеспечиваем охват до 12 млн. человек. Это активные потребители
            18-44 лет, со средним и высоким доходом
          </div>
        </motion.div>
        <motion.div
          className={style.card}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={variants}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
            INSTREAM VIDEO
          </h3>
          <div
            style={{
              fontSize: "18px",
              display: "flex",
              justifyContent: "center",
              color: "#cccccc",
              lineHeight: "30px",
            }}
          >
            Это наиболее эффективный формат видеорекламы с самым высоким уровнем
            вовлечения и запоминаемости
          </div>
        </motion.div>

        <motion.div
          className={style.card}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={variants}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
            BRAND SAFETY
          </h3>
          <div
            style={{
              fontSize: "18px",
              display: "flex",
              justifyContent: "center",
              color: "#cccccc",
              lineHeight: "30px",
            }}
          >
            Гарантия максимальной безопасности и требуемого уровня
            позиционирования вашего бренда
          </div>
        </motion.div>
        <motion.div
          className={style.card}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={variants}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
            VIEWABILITY
          </h3>
          <div
            style={{
              fontSize: "18px",
              display: "flex",
              justifyContent: "center",
              color: "#cccccc",
              lineHeight: "30px",
            }}
          >
            Максимальную видимость и вовлечение обеспечит наш формат
            фиксированной и неисчезающей рекламы
          </div>
        </motion.div>
        <motion.div
          className={style.card}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={variants}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
            ANALYTICS
          </h3>
          <div
            style={{
              fontSize: "18px",
              display: "flex",
              justifyContent: "center",
              color: "#cccccc",
              lineHeight: "30px",
            }}
          >
            Прозрачность и точность размещения, вам обеспечит доступ к онлайн
            статистике аудитории вашей рекламы
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Cards;
