import React from "react";
import style from "./News.module.scss";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

import { Navigation, Pagination, EffectCoverflow } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import "swiper/scss/effect-coverflow";
import arrow from "src/assets/arrow-right.svg";
import MyModal from "../../UI/ModalComponents/ModalUI/ModalUI";

import img1 from "src/assets/Site/1.jpeg";
import img2 from "src/assets/Site/2.jpeg";
import img3 from "src/assets/Site/3.jpeg";
import img4 from "src/assets/Site/4.jpeg";
import { AnimatePresence } from "framer-motion";
import Eclipse from "src/assets/Site/Ellipse.png";

const textData = [
  {
    id: "1",
    title: "Title 1",
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit Velit sunt ducimus earum ab illum hic nesciunt. Fugiat inventore suscipit corrupti hic cumque sequi et modi, at magni libero molestiae placeat?",
    more: "tetur adipisicing elit Velit sunt ducimus earum ab illum hic nesciunt. Fugiat inventore suscipit corrupti hic cumque sequi et modi, at magni libero molestiae placeat?",
    img: img1,
  },
  {
    id: "2",
    title: "Title 2",
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit Velit sunt ducimus earum ab illum hic nesciunt. Fugiat inventore suscipit corrupti hic cumque sequi et modi, at magni libero molestiae placeat?",
    more: "tetur adipisicing elit Velit sunt ducimus earum ab illum hic nesciunt. Fugiat inventore suscipit corrupti hic cumque sequi et modi, at magni libero molestiae placeat?",
    img: img2,
  },
  {
    id: "3",
    title: "Title 3",
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit Velit sunt ducimus earum ab illum hic nesciunt. Fugiat inventore suscipit corrupti hic cumque sequi et modi, at magni libero molestiae placeat?",
    more: "tetur adipisicing elit Velit sunt ducimus earum ab illum hic nesciunt. Fugiat inventore suscipit corrupti hic cumque sequi et modi, at magni libero molestiae placeat?",
    img: img3,
  },
  {
    id: "4",
    title: "Title 4",
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit Velit sunt ducimus earum ab illum hic nesciunt. Fugiat inventore suscipit corrupti hic cumque sequi et modi, at magni libero molestiae placeat?",
    more: "tetur adipisicing elit Velit sunt ducimus earum ab illum hic nesciunt. Fugiat inventore suscipit corrupti hic cumque sequi et modi, at magni libero molestiae placeat?",
    img: img4,
  },
];

export default function News() {
  const [modalData, setModalData] = React.useState(null); // Состояние для отслеживания данных для модального окна
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
  const openModal = (data) => {
    setModalData(data);
  };

  const closeModal = () => {
    setModalData(null);
  };
  return (
    <div className="wrapperSite">
      <Header />

      <div className={style.news}>
        <div className={style.news__wrapper}>
          <div className={style.news__text}>
            <Link to={"/"}>
              <button className={style.btn}>
                <img src={arrow} alt="" />
                Назад
              </button>
            </Link>
            <div className={style.news__text_title}>Новости</div>
          </div>

          <motion.div
            style={{ padding: "0px 0px 100px 0px" }}
            initial="hidden"
            animate={inView ? " hidden" : "visible"}
            variants={variants}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Swiper
              slidesPerView={3}
              spaceBetween={10}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination, Navigation]}
              navigation={true}
              className="news_mySwiper"
            >
              {textData.map((item) => (
                <SwiperSlide key={item.id}>
                  <div className={style.news__swiper}>
                    <div>
                      <h1 className={style.news__swiper__title}>
                        {item.title}
                      </h1>
                      <img src={item.img} alt="" />
                      <div className={style.news__swiper__text}>
                        {item.text}
                      </div>
                    </div>
                    <Link
                      className={style.news__swiper__links}
                      onClick={() => openModal(item)} // Нажатие на "Подробнее" для открытия модального окна
                    >
                      <div className={style.news__swiper__link}>Подробнее</div>
                      <img src={arrow} alt="" />
                    </Link>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </div>
        <AnimatePresence>
          {modalData && (
            <MyModal>
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <h1 style={{ lineHeight: "30px" }}>{modalData.title}</h1>

                  <span onClick={closeModal} className={style.close}>
                    &times;
                  </span>
                </div>
                <img
                  style={{
                    height: "230px",
                    width: "100%",
                    borderRadius: "18px",
                  }}
                  src={modalData.img}
                  alt=""
                />
                <div
                  style={{
                    fontSize: "18px",
                    marginTop: "22px",
                    color: "#2e2e2e",
                    fontWeight: "500",
                    lineHeight: "24px",
                    width: "400px",
                  }}
                >
                  <p style={{}}>{modalData.text}</p>

                  <p style={{}}>{modalData.more}</p>
                </div>
              </div>
            </MyModal>
          )}
        </AnimatePresence>
        <motion.img
          src={Eclipse}
          alt=""
          className={style.eclipse}
          initial="hidden"
          animate={inView ? "hidden" : "visible"}
          variants={variants}
          transition={{ duration: 0.9, delay: 0.4 }}
        />
        <Footer />
      </div>
    </div>
  );
}
