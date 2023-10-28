import React from "react";
import { motion } from "framer-motion";
import styles from "src/components/Site/Header/header.module.scss";
import { Link as ScrollLink } from "react-scroll";
import Logo from "src/assets/Site/logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  const [isActive, setIsActive] = React.useState(false);

  const toggleActiveClass = () => {
    setIsActive(!isActive);
  };

  const removeActive = () => {
    setIsActive(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -180 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        ease: "easeInOut",
        duration: 1,
        delay: 0.6,
      }}
      className={styles.header}
      style={{ backdropFilter: "blur(5px)", borderBottom: "1px solid #7a7979" }}
    >
      <header className={styles.App_header}>
        <nav className={`${styles.navbar}`}>
          <Link to={"/"} className={`${styles.logo}`}>
            <img style={{ height: "50px" }} src={Logo} alt="" />
          </Link>

          <ul className={`${styles.navMenu} ${isActive ? styles.active : ""}`}>
            <li onClick={removeActive}>
              <ScrollLink
                to="Технология"
                spy={true}
                smooth={true}
                duration={500}
                className={`${styles.navLink}`}
              >
                Технология
              </ScrollLink>
            </li>
            <li onClick={removeActive}>
              <ScrollLink
                to="форматы"
                spy={true}
                smooth={true}
                duration={500}
                className={`${styles.navLink}`}
              >
                Рекламные форматы
              </ScrollLink>
            </li>
            <li onClick={removeActive}>
              <ScrollLink
                to="Бизнес"
                spy={true}
                smooth={true}
                duration={500}
                className={`${styles.navLink}`}
              >
                Бизнес модель
              </ScrollLink>
            </li>
            <Link onClick={removeActive} to={"/news"}>
              <li className={`${styles.navLink}`}>Новости</li>
            </Link>
            <Link to={"/login"}>
              <button className={styles.btn}>Войти</button>
            </Link>
          </ul>

          <div
            className={`${styles.hamburger} ${isActive ? styles.active : ""}`}
            onClick={toggleActiveClass}
          >
            <span className={`${styles.bar}`}></span>
            <span className={`${styles.bar}`}></span>
            <span className={`${styles.bar}`}></span>
          </div>
        </nav>
      </header>
    </motion.div>
  );
};

export default Header;
