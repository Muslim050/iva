import React from "react";
import style from "./Features.module.scss";
import Eclipse from "src/assets/Site/Ellipse.png";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

function Features() {
  const [ref, inView] = useInView({
    triggerOnce: true, // Trigger the animation once when it comes into view.
  });

  const variants = {
    hidden: { opacity: 0, scale: 0.8, x: -50 },
    visible: { opacity: 1, scale: 1, x: 0 },
  };
  return (
    <div
      id="форматы"
      style={{
        background: "rgb(2,43,72)",
        background:
          "linear-gradient(0deg, rgba(2,43,72,1) 0%, rgba(2,29,52,1) 33%, rgba(2,29,52,1) 63%, rgba(2,43,72,1) 100%)",
      }}
      ref={ref}
    >
      <div className={style.service_container}>
        <img src={Eclipse} alt="" />

        <div className={style.title_wrapper}>
          <span className={style.service_title}>
            РЕКЛАМА КОТОРАЯ ПРЕВРАЩАЕТ ЗРИТЕЛЕЙ В ПОКУПАТЕЛЕЙ
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
              PRE-ROLL
            </h3>
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
          </motion.div>

          <motion.div
            className={style.card}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={variants}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
              MID-ROLL
            </h3>
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
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Features;
