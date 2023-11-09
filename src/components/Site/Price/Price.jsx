import React, { useState } from "react";
import { useInView } from "react-intersection-observer";
import style from "./Price.module.scss";
import Eclipse from "src/assets/Site/Ellipse.png";
import { motion } from "framer-motion";

const importAll = (r) => {
  let images = {};
  r.keys().forEach((item, index) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
};

const images = importAll(
  require.context("../../../assets/Site/Price", false, /\.(png|jpe?g|svg)$/)
);

function Price() {
  const [currentImage, setCurrentImage] = useState(null);

  const handleMouseOver = (image) => {
    setCurrentImage(image);
  };

  const handleMouseOut = () => {
    setCurrentImage(null);
  };

  const [ref, inView] = useInView({
    triggerOnce: true,
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
  const renderImages = () => {
    const imageElements = [];
    for (let i = 1; i <= 15; i++) {
      const imageName = `${i}.png`;
      const imageNameColored = `${i}_2.png`;

      imageElements.push(
        <div key={i}>
          <img
            src={
              currentImage === imageName
                ? images[imageName]
                : images[imageNameColored]
            }
            onMouseOver={() => handleMouseOver(imageName)}
            onMouseOut={handleMouseOut}
            className={style.image}
          />
        </div>
      );
    }
    return imageElements;
  };
  return (
    <div className={style.service_container} id="Технология" ref={ref}>
      <motion.img
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={variantss}
        transition={{ duration: 0.9, delay: 0.4 }}
        src={Eclipse}
        alt=""
        className={style.eclipse}
      />
      <div className={style.title_wrapper}>
        <span className={style.service_title}>
          РЕКЛАМА В ПОПУЛЯРНОМ КОНТЕНТЕ ОТ ВЕДУЩИХ ПРОИЗВОДИТЕЛЕЙ
        </span>
      </div>

      <motion.div
        className={style.service_card}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={variants}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className={style.card}>{renderImages()}</div>
      </motion.div>
    </div>
  );
}

export default Price;
