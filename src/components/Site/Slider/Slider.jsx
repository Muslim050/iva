import React from "react";
import style from "./Slider.module.scss";
import { Navigation, Pagination, EffectCoverflow } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import "swiper/scss/effect-coverflow";
import Eclipse from "src/assets/Site/Ellipse.png";

import Img1 from "src/assets/Site/1.jpeg";
import Img2 from "src/assets/Site/2.jpeg";
import Img3 from "src/assets/Site/3.jpeg";
import Img4 from "src/assets/Site/4.jpeg";
import Img5 from "src/assets/Site/5.jpeg";
import Img6 from "src/assets/Site/6.jpeg";

function Slider() {
  return (
    <div className={style.service_container}>
      <img src={Eclipse} alt="" className={style.imgSliderE} />

      <div className={style.title_wrapper}>
        <span className={style.service_title}>
          РЕКЛАМА КОТОРУЮ УВИДЕЛИ МИЛЛИОНЫ ЛЮДЕЙ
        </span>{" "}
      </div>

      <div style={{ width: " 90%", margin: "100px auto" }}>
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 2,
            stretch: 2,
            depth: 100,
            modifier: 3,
          }}
          pagination={true}
          initialSlide={2}
          className="mySwiper"
          modules={[Navigation, Pagination, EffectCoverflow]}
        >
          <SwiperSlide>
            <img src={Img1} alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Img2} alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Img3} alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Img4} alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Img5} alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Img6} alt="" />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default Slider;
