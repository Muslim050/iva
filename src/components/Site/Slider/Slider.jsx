import React from 'react'
import style from './Slider.module.scss'
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'
import 'swiper/scss/effect-coverflow'
import Eclipse from 'src/assets/Site/Ellipse.png'
import Youtube from '../../../assets/Site/youtube.png'

import video1 from 'src/assets/Site/video1.mp4'
import video2 from 'src/assets/Site/video2.mp4'
import video3 from 'src/assets/Site/video3.mp4'
import video4 from 'src/assets/Site/video4.mp4'
import video5 from 'src/assets/Site/video5.mp4'
import video6 from 'src/assets/Site/video6.mp4'
import video7 from 'src/assets/Site/video7.mp4'
import video8 from 'src/assets/Site/video8.mp4'
import video9 from 'src/assets/Site/video9.mp4'
import video10 from 'src/assets/Site/video10.mp4'

function Slider() {
  return (
    <div className={style.service_container}>
      <img src={Eclipse} alt="" className={style.imgSliderE} />

      <div className={style.title_wrapper}>
        <span className={style.service_title}>
          РЕКЛАМА КОТОРУЮ УВИДЕЛИ МИЛЛИОНЫ ЛЮДЕЙ
        </span>{' '}
      </div>

      <div style={{ width: ' 90%', margin: '100px auto' }}>
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          coverflowEffect={{
            rotate: 2,
            stretch: 2,
            depth: 100,
            modifier: 3,
          }}
          pagination={true}
          initialSlide={5}
          className="mySwiper"
          modules={[Navigation, Pagination, EffectCoverflow]}
        >
          <SwiperSlide>
            <div className={style.video_container}>
              <img className={style.youtubeimg} src={Youtube} alt="" />
              <video src={video1} autoPlay muted loop playsInline></video>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={style.video_container}>
              <img className={style.youtubeimg} src={Youtube} alt="" />
              <video src={video2} autoPlay muted loop playsInline></video>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={style.video_container}>
              <img className={style.youtubeimg} src={Youtube} alt="" />
              <video src={video3} autoPlay muted loop playsInline></video>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={style.video_container}>
              <img className={style.youtubeimg} src={Youtube} alt="" />
              <video src={video4} autoPlay muted loop playsInline></video>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={style.video_container}>
              <img className={style.youtubeimg} src={Youtube} alt="" />
              <video src={video5} autoPlay muted loop playsInline></video>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={style.video_container}>
              <img className={style.youtubeimg} src={Youtube} alt="" />
              <video src={video6} autoPlay muted loop playsInline></video>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={style.video_container}>
              <img className={style.youtubeimg} src={Youtube} alt="" />
              <video src={video7} autoPlay muted loop playsInline></video>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={style.video_container}>
              <img className={style.youtubeimg} src={Youtube} alt="" />
              <video src={video8} autoPlay muted loop playsInline></video>
            </div>
          </SwiperSlide>{' '}
          <SwiperSlide>
            <div className={style.video_container}>
              <img className={style.youtubeimg} src={Youtube} alt="" />
              <video src={video9} autoPlay muted loop playsInline></video>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={style.video_container}>
              <img className={style.youtubeimg} src={Youtube} alt="" />
              <video src={video10} autoPlay muted loop playsInline></video>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  )
}

export default Slider
