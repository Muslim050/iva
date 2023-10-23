import React, { useEffect } from "react";

import styles from "src/components/Site/Banner/banner.module.scss";
import Video from "src/assets/Site/Site.mp4";
import { Link as ScrollLink } from "react-scroll";

function Banner() {
  return (
    <section className={styles.banner}>
      <div className={styles.video_background}>
        <video src={Video} autoPlay muted loop></video>
      </div>

      <div className={styles.content}>
        <div className={styles.banner_wrapper_title}>BRANDFORMANCE</div>
        <h3 className={styles.banner_wrapper_subtitle}>
          Платформа онлайн видеорекламы
        </h3>
        <ScrollLink
          to="Бизнес"
          spy={true}
          smooth={true}
          duration={500}
          className={`${styles.navLink}`}
        >
          <button className={styles.btn}>ЗАКАЗАТЬ РЕКЛАМУ</button>
        </ScrollLink>
      </div>
    </section>
  );
}

export default Banner;
